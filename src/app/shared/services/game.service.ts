import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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

  private _chapters: MapChapter[] = [];
  private progress = new Map<string, ChapterProgress>();

  constructor() {
    this.progress = this.readProgress();
  }

  /** Chapters declared in map.json, in their authored order. */
  get chapters(): readonly MapChapter[] {
    return this._chapters;
  }

  /** Chapter currently being played, if any. */
  get currentChapter(): MapChapter | null {
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

  loadChapters(): Observable<readonly MapChapter[]> {
    return this.mapService.loadChapters().pipe(
      map((chapters) => this.withUnlocking(chapters)),
      tap((chapters) => (this._chapters = chapters)),
    );
  }

  isCompleted(chapterId: string): boolean {
    return this.progress.get(chapterId)?.completed ?? false;
  }

  getProgress(chapterId: string): ChapterProgress | null {
    return this.progress.get(chapterId) ?? null;
  }

  /** Starts a run of the given chapter, or resumes the stored one when it matches. */
  startChapter(
    chapterId: string,
    options: { difficulty?: Difficulty; domain?: string; random?: boolean } = {},
  ): Observable<ActivityModel> {
    return this.chapterService.startSession({
      chapterId,
      difficulty: options.difficulty,
      domain: options.domain,
      random: options.random,
    });
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
    this._chapters = this.withUnlocking(this._chapters);
  }

  resetProgress(): void {
    this.progress.clear();
    this.chapterService.clearSession();
    this._chapters = this.withUnlocking(this._chapters);
    try {
      localStorage.removeItem(GameService.STORAGE_KEY);
    } catch {
      // localStorage unavailable (e.g. private mode) - nothing to clear.
    }
  }

  /** A chapter opens once it has content and the previous one has been completed. */
  private withUnlocking(chapters: readonly MapChapter[]): MapChapter[] {
    let unlocked = true;
    return chapters.map((chapter) => {
      const locked = chapter.locked || !unlocked;
      unlocked = this.isCompleted(chapter.id);
      return { ...chapter, locked };
    });
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
