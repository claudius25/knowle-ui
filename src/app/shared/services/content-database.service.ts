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
   * Starts a game session by returning the first available activity in the chapter.
   */
  startGame(difficulty: Difficulty = 'EASY', domain = 'geography'): Observable<GameStartResponse> {
    return forkJoin({
      db: this.loadDatabase(difficulty, domain),
      dict: this.loadTranslations(difficulty, domain),
    }).pipe(
      map(({ db, dict }) => {
        const chapter = db.chapters[0];
        if (!chapter || !chapter.activities || chapter.activities.length === 0) {
          throw new Error('No activities available in this chapter');
        }

        const first = chapter.activities[0];
        return {
          activityId: first.id,
          title: dict[first.title] ?? first.title,
          type: first.type,
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

        return this.mapToClientActivity(act, dict, difficulty);
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

        if (isCorrect) {
          const nextIndex = targetIndex + 1;
          const nextAct = targetChapter.activities[nextIndex] ?? null;

          const nextActivity: NextActivity | null = nextAct
            ? {
                activityId: nextAct.id,
                title: dict[nextAct.title] ?? nextAct.title,
                type: nextAct.type,
                difficulty,
              }
            : null;

          return {
            correct: true,
            nextActivity,
          };
        }

        return {
          correct: false,
          nextActivity: null,
          retry: true,
          message: dict['quiz_incorrect'] ?? 'Incorrect answer, try again!',
        };
      }),
    );
  }

  /**
   * Helper to validate a submitted answer against the expected answer.
   */
  private checkAnswer(
    act: DbActivity,
    userAnswer: unknown,
    dict: Record<string, string>,
  ): boolean {
    switch (act.type) {
      case 'MULTIPLE_CHOICE': {
        const expectedOptionId = String(act.answer);
        const matchingOption = act.options?.find((o) => o.id === expectedOptionId);
        const translatedOptionText = matchingOption ? (dict[matchingOption.text] ?? matchingOption.text) : '';
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
        const submitted = (userAnswer && typeof userAnswer === 'object' ? userAnswer : {}) as Record<
          string,
          string
        >;

        if (!expected || typeof expected !== 'object') {
          return false;
        }

        const expectedKeys = Object.keys(expected);
        if (expectedKeys.length === 0) return false;

        return expectedKeys.every((key) => submitted[key] === expected[key]);
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
  ): Activity {
    const title = dict[act.title] ?? act.title;
    const question = dict[act.question] ?? act.question;

    switch (act.type) {
      case 'MULTIPLE_CHOICE':
        return {
          activityId: act.id,
          title,
          type: 'MULTIPLE_CHOICE',
          difficulty,
          data: {
            question,
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
