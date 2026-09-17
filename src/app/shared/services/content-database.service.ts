import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, catchError, throwError } from 'rxjs';
import {
  Activity,
  ActivityType,
  AnswerResponse,
  Difficulty,
  GameStartResponse,
  NextActivity,
} from '../models/game.types';
import { Language, LanguageService } from './language.service';

export interface DbOption {
  id: string;
  text: string;
}

export interface DbCategory {
  id: string;
  label: string;
}

export interface DbItem {
  id: string;
  label?: string;
  text?: string;
}

export interface DbPair {
  id: string;
  left: string;
  right: string;
  image?: string;
}

export interface DbReward {
  coins: number;
  energy: number;
}

export interface DbActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  question: string;
  hint?: string;
  pictures?: string[];
  options?: DbOption[];
  categories?: DbCategory[];
  items?: DbItem[];
  pairs?: DbPair[];
  answer: unknown;
  reward?: DbReward;
}

export interface DbChapter {
  id: string;
  title: string;
  description: string;
  activities: DbActivity[];
}

export interface DbDatabase {
  version: number;
  chapters: DbChapter[];
}

@Injectable({ providedIn: 'root' })
export class ContentDatabaseService {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);

  private readonly dbCache = new Map<string, DbDatabase>();
  private readonly translationsCache = new Map<string, Record<string, string>>();

  /**
   * Loads the static database JSON for the given difficulty and domain.
   */
  loadDatabase(difficulty = 'easy', domain = 'geography'): Observable<DbDatabase> {
    const diff = difficulty.toLowerCase();
    const dom = domain.toLowerCase();
    const cacheKey = `${diff}_${dom}`;

    if (this.dbCache.has(cacheKey)) {
      return of(this.dbCache.get(cacheKey)!);
    }

    const url = `/db/${diff}/${dom}/db.json`;
    return this.http.get<DbDatabase>(url).pipe(
      map((db) => {
        this.dbCache.set(cacheKey, db);
        return db;
      }),
      catchError((err) => {
        console.error(`[ContentDb] Failed to load database from ${url}:`, err);
        return throwError(() => new Error(`Failed to load content database for ${diff}/${dom}`));
      }),
    );
  }

  /**
   * Loads domain-specific content translations for the given language.
   */
  loadTranslations(
    difficulty = 'easy',
    domain = 'geography',
    lang?: Language,
  ): Observable<Record<string, string>> {
    const diff = difficulty.toLowerCase();
    const dom = domain.toLowerCase();
    const currentLang = lang ?? this.languageService.getCurrentLanguage() ?? 'ro';
    const cacheKey = `${diff}_${dom}_${currentLang}`;

    if (this.translationsCache.has(cacheKey)) {
      return of(this.translationsCache.get(cacheKey)!);
    }

    const url = `/db/${diff}/${dom}/i18n/${currentLang}.json`;
    return this.http.get<Record<string, string>>(url).pipe(
      map((dict) => {
        this.translationsCache.set(cacheKey, dict);
        return dict;
      }),
      catchError((err) => {
        console.warn(`[ContentDb] Failed to load translations from ${url}:`, err);
        return of({});
      }),
    );
  }

  /**
   * Starts a game session by returning the first or requested activity in the chapter.
   */
  startGame(
    difficulty: Difficulty = 'EASY',
    domain = 'geography',
    startIndexOrId?: number | string,
  ): Observable<GameStartResponse> {
    return forkJoin({
      db: this.loadDatabase(difficulty, domain),
      dict: this.loadTranslations(difficulty, domain),
    }).pipe(
      map(({ db, dict }) => {
        const chapter = db.chapters[0];
        if (!chapter || !chapter.activities || chapter.activities.length === 0) {
          throw new Error('No activities available in this chapter');
        }

        let target = chapter.activities[0];
        if (typeof startIndexOrId === 'number') {
          const idx = startIndexOrId > 0 ? startIndexOrId - 1 : 0;
          const clamped = Math.max(0, Math.min(idx, chapter.activities.length - 1));
          target = chapter.activities[clamped];
        } else if (typeof startIndexOrId === 'string' && startIndexOrId.trim()) {
          const trimmed = startIndexOrId.trim();
          const parsed = parseInt(trimmed, 10);
          if (!isNaN(parsed)) {
            const idx = parsed > 0 ? parsed - 1 : 0;
            const clamped = Math.max(0, Math.min(idx, chapter.activities.length - 1));
            target = chapter.activities[clamped];
          } else {
            const found = chapter.activities.find((a) => a.id === trimmed);
            if (found) {
              target = found;
            }
          }
        }

        return {
          activityId: target.id,
          title: dict[target.title] ?? target.title,
          type: target.type,
          difficulty,
        };
      }),
    );
  }

  /**
   * Loads a specific activity and translates its user-facing properties into the current language.
   */
  getActivity(
    activityId: string,
    difficulty: Difficulty = 'EASY',
    domain = 'geography',
  ): Observable<Activity> {
    return forkJoin({
      db: this.loadDatabase(difficulty, domain),
      dict: this.loadTranslations(difficulty, domain),
    }).pipe(
      map(({ db, dict }) => {
        const allActivities = db.chapters.flatMap((c) => c.activities);
        const act = allActivities.find((a) => a.id === activityId);

        if (!act) {
          throw new Error(`Activity ${activityId} not found`);
        }

        return this.mapToClientActivity(act, dict, difficulty, domain);
      }),
    );
  }

  /**
   * Submits an answer, validates it against the static database, and returns the result with nextActivity reference.
   */
  submitAnswer(
    activityId: string,
    userAnswer: unknown,
    difficulty: Difficulty = 'EASY',
    domain = 'geography',
  ): Observable<AnswerResponse> {
    return forkJoin({
      db: this.loadDatabase(difficulty, domain),
      dict: this.loadTranslations(difficulty, domain),
    }).pipe(
      map(({ db, dict }) => {
        // Find activity and chapter
        let targetChapter: DbChapter | null = null;
        let targetIndex = -1;
        let act: DbActivity | null = null;

        for (const chapter of db.chapters) {
          const idx = chapter.activities.findIndex((a) => a.id === activityId);
          if (idx !== -1) {
            targetChapter = chapter;
            targetIndex = idx;
            act = chapter.activities[idx];
            break;
          }
        }

        if (!act || !targetChapter) {
          throw new Error(`Activity ${activityId} not found`);
        }

        const isCorrect = this.checkAnswer(act, userAnswer, dict);
        const nextAct = targetChapter.activities[targetIndex + 1] ?? null;
        const nextActivity: NextActivity | null = nextAct
          ? {
              activityId: nextAct.id,
              title: dict[nextAct.title] ?? nextAct.title,
              type: nextAct.type,
              difficulty,
            }
          : null;

        if (isCorrect) {
          return {
            correct: true,
            nextActivity,
          };
        }

        return {
          correct: false,
          nextActivity,
          retry: true,
          message: dict['quiz_incorrect'] ?? 'Incorrect answer, try again!',
        };
      }),
    );
  }

  /**
   * Helper to validate a submitted answer against the expected answer.
   */
  private checkAnswer(act: DbActivity, userAnswer: unknown, dict: Record<string, string>): boolean {
    switch (act.type) {
      case 'MULTIPLE_CHOICE': {
        const expectedOptionId = String(act.answer);
        const matchingOption = act.options?.find((o) => o.id === expectedOptionId);
        const translatedOptionText = matchingOption
          ? (dict[matchingOption.text] ?? matchingOption.text)
          : '';
        const rawOptionKey = matchingOption?.text;

        return (
          userAnswer === expectedOptionId ||
          userAnswer === translatedOptionText ||
          (rawOptionKey !== undefined && userAnswer === rawOptionKey)
        );
      }

      case 'TRUE_FALSE': {
        if (typeof act.answer === 'boolean') {
          return (
            userAnswer === act.answer ||
            String(userAnswer).toLowerCase() === String(act.answer).toLowerCase()
          );
        }
        return userAnswer === act.answer;
      }

      case 'CLASSIFY': {
        const expected = act.answer as Record<string, string>;
        const submitted = (
          userAnswer && typeof userAnswer === 'object' ? userAnswer : {}
        ) as Record<string, string>;

        if (!expected || typeof expected !== 'object') {
          return false;
        }

        const expectedKeys = Object.keys(expected);
        if (expectedKeys.length === 0) return false;

        return expectedKeys.every((key) => submitted[key] === expected[key]);
      }

      case 'MATCHING': {
        if (!act.pairs || act.pairs.length === 0) return false;
        if (Array.isArray(userAnswer)) {
          if (userAnswer.length !== act.pairs.length) return false;
          return act.pairs.every((pair) => {
            const leftText = dict[pair.left] ?? pair.left;
            const rightText = dict[pair.right] ?? pair.right;
            return (
              userAnswer as Array<{ left?: string; right?: string; id?: string; rightId?: string }>
            ).some(
              (u) =>
                (u.id === pair.id &&
                  (u.rightId === pair.id || u.right === rightText || u.right === pair.right)) ||
                ((u.left === leftText || u.left === pair.left || u.left === pair.id) &&
                  (u.right === rightText || u.right === pair.right || u.right === pair.id)),
            );
          });
        }
        if (userAnswer && typeof userAnswer === 'object') {
          const userObj = userAnswer as Record<string, string>;
          return act.pairs.every((pair) => {
            const leftText = dict[pair.left] ?? pair.left;
            const rightText = dict[pair.right] ?? pair.right;
            const userRight = userObj[pair.id] ?? userObj[pair.left] ?? userObj[leftText];
            return userRight === pair.id || userRight === pair.right || userRight === rightText;
          });
        }
        return false;
      }

      case 'ORDERING': {
        const expectedOrder = Array.isArray(act.answer) ? (act.answer as string[]) : [];
        if (!Array.isArray(userAnswer)) return false;
        if (userAnswer.length !== expectedOrder.length) return false;

        return expectedOrder.every((expectedId, idx) => {
          const userVal = userAnswer[idx];
          if (typeof userVal === 'string') {
            const matchingItem = act.items?.find((item) => item.id === expectedId);
            const translatedText = matchingItem
              ? (dict[matchingItem.text ?? ''] ?? matchingItem.text)
              : '';
            return (
              userVal === expectedId ||
              userVal === translatedText ||
              (matchingItem?.text !== undefined && userVal === matchingItem.text)
            );
          }
          if (typeof userVal === 'object' && userVal !== null && 'id' in userVal) {
            return (userVal as { id: string }).id === expectedId;
          }
          return false;
        });
      }

      default:
        return JSON.stringify(userAnswer) === JSON.stringify(act.answer);
    }
  }

  /**
   * Maps an internal DbActivity to the client-facing Activity contract.
   */
  private mapToClientActivity(
    act: DbActivity,
    dict: Record<string, string>,
    difficulty: Difficulty,
    domain = 'geography',
  ): Activity {
    const title = dict[act.title] ?? act.title;
    const description = dict[act.description] ?? act.description;
    const question = dict[act.question] ?? act.question;
    const diff = difficulty.toLowerCase();
    const dom = domain.toLowerCase();

    // Resolve picture paths: if relative filename given, map to /db/{difficulty}/{domain}/pics/{filename}
    const pictures = act.pictures?.map((pic) =>
      pic.startsWith('/') || pic.startsWith('http') ? pic : `/db/${diff}/${dom}/pics/${pic}`,
    );

    switch (act.type) {
      case 'MULTIPLE_CHOICE':
        return {
          activityId: act.id,
          title,
          type: 'MULTIPLE_CHOICE',
          difficulty,
          data: {
            question,
            description,
            pictures,
            descriptionKey: act.description,
            questionKey: act.question,
            options: (act.options ?? []).map((o) => dict[o.text] ?? o.text),
          },
        };

      case 'TRUE_FALSE':
        return {
          activityId: act.id,
          title,
          type: 'TRUE_FALSE',
          difficulty,
          data: {
            question,
            description,
            pictures,
            descriptionKey: act.description,
            questionKey: act.question,
            options: [true, false],
          },
        };

      case 'CLASSIFY':
        return {
          activityId: act.id,
          title,
          type: 'CLASSIFY',
          difficulty,
          data: {
            question,
            description,
            descriptionKey: act.description,
            questionKey: act.question,
            categories: (act.categories ?? []).map((c) => ({
              id: c.id,
              label: dict[c.label] ?? c.label,
            })),
            items: (act.items ?? []).map((i) => ({
              id: i.id,
              label: dict[i.label ?? i.text ?? ''] ?? i.label ?? i.text ?? '',
            })),
          },
        };

      case 'MATCHING':
        return {
          activityId: act.id,
          title,
          type: 'MATCHING',
          difficulty,
          data: {
            question,
            description,
            descriptionKey: act.description,
            questionKey: act.question,
            pairs: (act.pairs ?? []).map((p) => ({
              id: p.id,
              left: dict[p.left] ?? p.left,
              right: dict[p.right] ?? p.right,
              image: p.image
                ? p.image.startsWith('/') || p.image.startsWith('http')
                  ? p.image
                  : `/db/${diff}/${dom}/pics/${p.image}`
                : undefined,
            })),
          },
        };

      case 'ORDERING':
        return {
          activityId: act.id,
          title,
          type: 'ORDERING',
          difficulty,
          data: {
            question,
            description,
            descriptionKey: act.description,
            questionKey: act.question,
            items: (act.items ?? []).map((item) => ({
              id: item.id,
              text: dict[item.text ?? ''] ?? item.text ?? '',
            })),
          },
        };

      default:
        // Fallback representation for unhandled types
        return {
          activityId: act.id,
          title,
          type: act.type as any,
          difficulty,
          data: {
            question,
            options: [],
          } as any,
        };
    }
  }
}
