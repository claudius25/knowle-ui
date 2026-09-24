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
  /** Graded activity: a wrong answer costs health. */
  isPractical?: boolean;
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

/** Content of a single chapter, as stored in /db/{difficulty}/{domain}/{chapter}/db.json. */
export interface DbChapterFile {
  version: number;
  chapter: DbChapter;
}

/** Identifies the content folder an activity belongs to. */
export interface ContentScope {
  difficulty: Difficulty;
  domain: string;
  chapter: string;
}

/** Root folder holding the db.json, i18n, pics and audio of one chapter. */
export function contentFolder(scope: ContentScope): string {
  const diff = scope.difficulty.toLowerCase();
  const dom = scope.domain.toLowerCase().trim();
  const chapter = scope.chapter.trim();
  return `/db/${diff}/${dom}/${chapter}`;
}

@Injectable({ providedIn: 'root' })
export class ContentDatabaseService {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);

  private readonly dbCache = new Map<string, DbChapterFile>();
  private readonly translationsCache = new Map<string, Record<string, string>>();

  /**
   * Loads the static database JSON of a single chapter.
   */
  loadChapter(scope: ContentScope): Observable<DbChapterFile> {
    const folder = contentFolder(scope);

    if (this.dbCache.has(folder)) {
      return of(this.dbCache.get(folder)!);
    }

    const url = `${folder}/db.json`;
    return this.http.get<DbChapterFile>(url).pipe(
      map((db) => {
        this.dbCache.set(folder, db);
        return db;
      }),
      catchError((err) => {
        console.error(`[ContentDb] Failed to load database from ${url}:`, err);
        return throwError(() => new Error(`Failed to load content database from ${folder}`));
      }),
    );
  }

  /**
   * Loads the chapter-specific content translations for the given language.
   */
  loadTranslations(scope: ContentScope, lang?: Language): Observable<Record<string, string>> {
    const folder = contentFolder(scope);
    const currentLang = lang ?? this.languageService.getCurrentLanguage() ?? 'ro';
    const cacheKey = `${folder}_${currentLang}`;

    if (this.translationsCache.has(cacheKey)) {
      return of(this.translationsCache.get(cacheKey)!);
    }

    const url = `${folder}/i18n/${currentLang}.json`;
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
  startGame(scope: ContentScope, startIndexOrId?: number | string): Observable<GameStartResponse> {
    return forkJoin({
      db: this.loadChapter(scope),
      dict: this.loadTranslations(scope),
    }).pipe(
      map(({ db, dict }) => {
        const chapter = db.chapter;
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
          difficulty: scope.difficulty,
        };
      }),
    );
  }

  /**
   * Loads a specific activity and translates its user-facing properties into the current language.
   */
  getActivity(activityId: string, scope: ContentScope): Observable<Activity> {
    return forkJoin({
      db: this.loadChapter(scope),
      dict: this.loadTranslations(scope),
    }).pipe(
      map(({ db, dict }) => {
        const act = db.chapter.activities.find((a) => a.id === activityId);

        if (!act) {
          throw new Error(`Activity ${activityId} not found`);
        }

        return this.mapToClientActivity(act, dict, scope);
      }),
    );
  }

  /**
   * Returns the translated labels of the options that are not the expected answer.
   * Used by the fifty-fifty help to know what it may remove.
   */
  getWrongOptionLabels(activityId: string, scope: ContentScope): Observable<string[]> {
    return forkJoin({
      db: this.loadChapter(scope),
      dict: this.loadTranslations(scope),
    }).pipe(
      map(({ db, dict }) => {
        const act = db.chapter.activities.find((a) => a.id === activityId);
        if (!act?.options) {
          return [];
        }

        const expectedOptionId = String(act.answer);
        return act.options
          .filter((option) => option.id !== expectedOptionId)
          .map((option) => dict[option.text] ?? option.text);
      }),
    );
  }

  /**
   * Submits an answer, validates it against the static database, and returns the result with nextActivity reference.
   */
  submitAnswer(
    activityId: string,
    userAnswer: unknown,
    scope: ContentScope,
  ): Observable<AnswerResponse> {
    return forkJoin({
      db: this.loadChapter(scope),
      dict: this.loadTranslations(scope),
    }).pipe(
      map(({ db, dict }) => {
        const activities = db.chapter.activities;
        const targetIndex = activities.findIndex((a) => a.id === activityId);
        const act = targetIndex === -1 ? null : activities[targetIndex];

        if (!act) {
          throw new Error(`Activity ${activityId} not found`);
        }

        const isCorrect = this.checkAnswer(act, userAnswer, dict);
        const nextAct = activities[targetIndex + 1] ?? null;
        const nextActivity: NextActivity | null = nextAct
          ? {
              activityId: nextAct.id,
              title: dict[nextAct.title] ?? nextAct.title,
              type: nextAct.type,
              difficulty: scope.difficulty,
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
      case 'MULTIPLE_CHOICE':
      case 'PUZZLE': {
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
    scope: ContentScope,
  ): Activity {
    const title = dict[act.title] ?? act.title;
    const description = dict[act.description] ?? act.description;
    const question = dict[act.question] ?? act.question;
    const hint = act.hint ? (dict[act.hint] ?? act.hint) : undefined;
    const isPractical = act.isPractical ?? false;
    const difficulty = scope.difficulty;
    const picsFolder = `${contentFolder(scope)}/pics`;

    // Resolve picture paths: a bare filename lives in the chapter's own pics folder.
    const pictures = act.pictures?.map((pic) =>
      pic.startsWith('/') || pic.startsWith('http') ? pic : `${picsFolder}/${pic}`,
    );

    switch (act.type) {
      case 'MULTIPLE_CHOICE':
        return {
          activityId: act.id,
          title,
          type: 'MULTIPLE_CHOICE',
          difficulty,
          isPractical,
          data: {
            question,
            title,
            description,
            pictures,
            hint,
            titleKey: act.title,
            descriptionKey: act.description,
            questionKey: act.question,
            hintKey: act.hint,
            options: (act.options ?? []).map((o) => dict[o.text] ?? o.text),
          },
        };

      case 'TRUE_FALSE':
        return {
          activityId: act.id,
          title,
          type: 'TRUE_FALSE',
          difficulty,
          isPractical,
          data: {
            question,
            title,
            description,
            pictures,
            hint,
            titleKey: act.title,
            descriptionKey: act.description,
            questionKey: act.question,
            hintKey: act.hint,
            options: [true, false],
          },
        };

      case 'CLASSIFY':
        return {
          activityId: act.id,
          title,
          type: 'CLASSIFY',
          difficulty,
          isPractical,
          data: {
            question,
            title,
            description,
            hint,
            titleKey: act.title,
            descriptionKey: act.description,
            questionKey: act.question,
            hintKey: act.hint,
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
          isPractical,
          data: {
            question,
            title,
            description,
            titleKey: act.title,
            descriptionKey: act.description,
            questionKey: act.question,
            pairs: (act.pairs ?? []).map((p) => ({
              id: p.id,
              left: dict[p.left] ?? p.left,
              right: dict[p.right] ?? p.right,
              image: p.image
                ? p.image.startsWith('/') || p.image.startsWith('http')
                  ? p.image
                  : `${picsFolder}/${p.image}`
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
          isPractical,
          data: {
            question,
            title,
            description,
            hint,
            titleKey: act.title,
            descriptionKey: act.description,
            questionKey: act.question,
            hintKey: act.hint,
            items: (act.items ?? []).map((item) => ({
              id: item.id,
              text: dict[item.text ?? ''] ?? item.text ?? '',
            })),
          },
        };

      case 'PUZZLE':
        return {
          activityId: act.id,
          title,
          type: 'PUZZLE',
          difficulty,
          isPractical,
          data: {
            image: pictures?.[0] ?? '',
            question,
            title,
            description,
            titleKey: act.title,
            descriptionKey: act.description,
            questionKey: act.question,
            options: (act.options ?? []).map((o) => dict[o.text] ?? o.text),
          },
        };

      default:
        // Fallback representation for unhandled types
        return {
          activityId: act.id,
          title,
          type: act.type as any,
          difficulty,
          isPractical,
          data: {
            question,
            options: [],
          } as any,
        };
    }
  }
}
