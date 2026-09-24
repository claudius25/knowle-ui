import { Injectable, inject } from '@angular/core';
import { Observable, map, of, switchMap, tap, throwError } from 'rxjs';
import { Difficulty } from '../models/game.types';
import { ActivityModel } from '../models/activities';
import { ChapterService } from './chapter.service';
import { MapChapter, MapService } from './map.service';

/** Per-chapter result kept across the whole game. */
export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  coins: number;
  health: number;
}

/** A map chapter enriched with the player's progress on it. */
export interface GameChapter extends MapChapter {
  completed: boolean;
  coins: number;
  /** No content authored yet, so it can never be opened - not a progression lock. */
  comingSoon: boolean;
}

/**
 * Owns the game across all chapters: reads the chapter list from map.json,
 * tracks which ones are unlocked or finished and hands one over to the
 * ChapterService to be played.
 */
@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly mapService = inject(MapService);
  private readonly chapterService = inject(ChapterService);

  private static readonly STORAGE_KEY = 'knowle-game-progress';

  /** Chapters exactly as authored in map.json; progress is never folded into these. */
  private mapChapters: readonly MapChapter[] = [];
  private _chapters: GameChapter[] = [];
  private progress = new Map<string, ChapterProgress>();

  constructor() {
    this.progress = this.readProgress();
  }

  /** Chapters declared in map.json, in their authored order. */
  get chapters(): readonly GameChapter[] {
    return this._chapters;
  }

  /** Chapter currently being played, if any. */
  get currentChapter(): GameChapter | null {
    const id = this.chapterService.currentChapterId;
    return this._chapters.find((chapter) => chapter.id === id) ?? null;
  }

  get totalCoins(): number {
    return [...this.progress.values()].reduce((sum, entry) => sum + entry.coins, 0);
  }

  get completedChapterCount(): number {
    return [...this.progress.values()].filter((entry) => entry.completed).length;
  }

  /** True when an interrupted chapter run can be picked back up. */
  get hasSavedChapter(): boolean {
    return this.chapterService.hasSavedSession;
  }

  loadChapters(): Observable<readonly GameChapter[]> {
    return this.mapService.loadChapters().pipe(
      tap((chapters) => (this.mapChapters = chapters)),
      map(() => this.refreshChapters()),
    );
  }

  isCompleted(chapterId: string): boolean {
    return this.progress.get(chapterId)?.completed ?? false;
  }

  getProgress(chapterId: string): ChapterProgress | null {
    return this.progress.get(chapterId) ?? null;
  }

  /** Starts a run of the given chapter; without an id the first playable one is used. */
  startChapter(
    chapterId: string,
    options: { difficulty?: Difficulty; domain?: string; random?: boolean } = {},
  ): Observable<ActivityModel> {
    const start = (id: string) =>
      this.chapterService.startSession({
        chapterId: id,
        difficulty: options.difficulty,
        domain: options.domain,
        random: options.random,
      });

    if (chapterId) {
      return start(chapterId);
    }

    return this.ensureChapters().pipe(
      switchMap((chapters) => {
        const fallback = chapters.find((chapter) => !chapter.locked && chapter.startActivityId);
        if (!fallback) {
          return throwError(() => new Error('No playable chapter available'));
        }
        return start(fallback.id);
      }),
    );
  }

  private ensureChapters(): Observable<readonly GameChapter[]> {
    return this._chapters.length ? of(this._chapters) : this.loadChapters();
  }

  resumeChapter(): Observable<ActivityModel> {
    return this.chapterService.resumeSession();
  }

  /** Records the outcome of the chapter that just ended and unlocks the next one. */
  completeCurrentChapter(): void {
    const chapterId = this.chapterService.currentChapterId;
    if (!chapterId) {
      return;
    }

    this.progress.set(chapterId, {
      chapterId,
      completed: true,
      coins: this.chapterService.coins,
      health: this.chapterService.health,
    });

    this.writeProgress();
    this.refreshChapters();
  }

  resetProgress(): void {
    this.progress.clear();
    this.chapterService.clearSession();
    this.refreshChapters();
    try {
      localStorage.removeItem(GameService.STORAGE_KEY);
    } catch {
      // localStorage unavailable (e.g. private mode) - nothing to clear.
    }
  }

  /**
   * Recomputes the played state from the authored map, so a chapter re-opens as
   * soon as the one before it is completed.
   */
  private refreshChapters(): readonly GameChapter[] {
    let previousCompleted = true;
    this._chapters = this.mapChapters.map((chapter) => {
      const completed = this.isCompleted(chapter.id);
      const comingSoon = !chapter.startActivityId;
      const entry: GameChapter = {
        ...chapter,
        locked: comingSoon || chapter.locked || !previousCompleted,
        completed,
        comingSoon,
        coins: this.progress.get(chapter.id)?.coins ?? 0,
      };
      previousCompleted = completed;
      return entry;
    });
    return this._chapters;
  }

  private readProgress(): Map<string, ChapterProgress> {
    try {
      const raw = localStorage.getItem(GameService.STORAGE_KEY);
      if (!raw) {
        return new Map();
      }
      const entries = JSON.parse(raw) as ChapterProgress[];
      return new Map(entries.map((entry) => [entry.chapterId, entry]));
    } catch {
      return new Map();
    }
  }

  private writeProgress(): void {
    try {
      localStorage.setItem(GameService.STORAGE_KEY, JSON.stringify([...this.progress.values()]));
    } catch {
      // localStorage unavailable (e.g. private mode) - progress just won't persist.
    }
  }
}
