import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, of, switchMap, tap, throwError } from 'rxjs';
import { Difficulty } from '../models/game.types';
import {
  ActivityModel,
  ActivityProgress,
  ChoiceActivityModel,
  createActivityModel,
} from '../models/activities';
import { ContentDatabaseService, ContentScope } from './content-database.service';
import { AudioPlayerService } from './audio-player.service';
import { HintDialogComponent } from '../components/hint-dialog/hint-dialog.component';

export type ChapterStatus = 'idle' | 'loading' | 'playing' | 'checking' | 'answered' | 'error';

export interface ChapterSessionOptions {
  /** Chapter to play; its content lives in /db/{difficulty}/{domain}/{chapterId}/. */
  chapterId: string;
  difficulty?: Difficulty;
  domain?: string;
  /** Serves the activities in random order instead of the authored order. */
  random?: boolean;
  /** Number of activities to play in this session. */
  activityCount?: number;
  /** 1-based index or activity id to start the ordered session from. */
  startFrom?: string | number;
}

export interface ActivityOutcome {
  activityId: string;
  correct: boolean;
  coinsDelta: number;
  healthLost: number;
}

/** Everything needed to pick an interrupted session back up after a reload. */
interface ChapterSnapshot {
  version: 1;
  chapterId: string;
  difficulty: Difficulty;
  domain: string;
  random: boolean;
  activityCount: number;
  /** Ids still waiting after the current one. */
  queue: string[];
  currentActivityId: string | null;
  currentProgress: ActivityProgress | null;
  coins: number;
  health: number;
  completedActivities: number;
  outcomes: ActivityOutcome[];
}

/**
 * Plays a single chapter: builds and serves its activity models, verifies the
 * answers and keeps the coin/health ledger of the run.
 */
@Injectable({ providedIn: 'root' })
export class ChapterService {
  private readonly contentDb = inject(ContentDatabaseService);
  private readonly audioPlayer = inject(AudioPlayerService);
  private readonly dialog = inject(MatDialog);

  static readonly ACTIVITIES_PER_SESSION = 10;
  static readonly MAX_HEALTH = 100;
  static readonly COINS_PER_CORRECT_ANSWER = 10;
  static readonly COINS_LOST_PER_RETRY = 5;
  static readonly COINS_LOST_PER_HINT = 5;
  static readonly COINS_LOST_PER_FIFTY_FIFTY = 5;
  static readonly HEALTH_LOSS_PER_MISTAKE = 20;
  private static readonly STORAGE_KEY = 'knowle-chapter-session';

  private chapterId = '';
  private difficulty: Difficulty = 'EASY';
  private domain = 'geography';
  private randomMode = false;
  private activityCount = ChapterService.ACTIVITIES_PER_SESSION;
  /** Ids still to be served, in the order they will be played. */
  private queue: string[] = [];

  private _status: ChapterStatus = 'idle';
  private _activity: ActivityModel | null = null;
  private _coins = 0;
  private _health = ChapterService.MAX_HEALTH;
  private _completedActivities = 0;
  private readonly _outcomes: ActivityOutcome[] = [];

  get status(): ChapterStatus {
    return this._status;
  }

  /** Chapter currently being played. */
  get currentChapterId(): string | null {
    return this.chapterId || null;
  }

  /** Content folder the current session reads its activities, texts and media from. */
  get scope(): ContentScope {
    return { difficulty: this.difficulty, domain: this.domain, chapter: this.chapterId };
  }

  get activity(): ActivityModel | null {
    return this._activity;
  }

  get coins(): number {
    return this._coins;
  }

  get health(): number {
    return this._health;
  }

  get completedActivities(): number {
    return this._completedActivities;
  }

  /** Coin/health ledger of every activity already completed in this session. */
  get outcomes(): readonly ActivityOutcome[] {
    return this._outcomes;
  }

  get isRandomMode(): boolean {
    return this.randomMode;
  }

  get progress(): number {
    return (this._completedActivities / this.activityCount) * 100;
  }

  get sessionComplete(): boolean {
    return this._completedActivities >= this.activityCount || this.queue.length === 0;
  }

  get isOutOfHealth(): boolean {
    return this._health <= 0;
  }

  /** True when an unfinished session is stored and can be resumed. */
  get hasSavedSession(): boolean {
    return this.readSnapshot() !== null;
  }

  /** Restores the stored session and re-serves the activity it was interrupted on. */
  resumeSession(): Observable<ActivityModel> {
    const snapshot = this.readSnapshot();
    if (!snapshot?.currentActivityId) {
      return throwError(() => new Error('No session to resume'));
    }

    this.chapterId = snapshot.chapterId;
    this.difficulty = snapshot.difficulty;
    this.domain = snapshot.domain;
    this.randomMode = snapshot.random;
    this.activityCount = snapshot.activityCount;
    this.queue = [...snapshot.queue];
    this._coins = snapshot.coins;
    this._health = snapshot.health;
    this._completedActivities = snapshot.completedActivities;
    this._outcomes.length = 0;
    this._outcomes.push(...snapshot.outcomes);
    this.audioPlayer.setContentScope(this.scope);

    return this.serve(snapshot.currentActivityId, snapshot.currentProgress);
  }

  /** Drops the stored session so the next start begins from scratch. */
  clearSession(): void {
    try {
      localStorage.removeItem(ChapterService.STORAGE_KEY);
    } catch {
      // localStorage unavailable (e.g. private mode) - nothing to clear.
    }
  }

  /** Builds the activity queue and serves the first activity. */
  startSession(options: ChapterSessionOptions): Observable<ActivityModel> {
    this.chapterId = options.chapterId;
    this.difficulty = options.difficulty ?? 'EASY';
    this.domain = options.domain ?? 'geography';
    this.randomMode = options.random ?? false;
    this.activityCount = options.activityCount ?? ChapterService.ACTIVITIES_PER_SESSION;

    this._status = 'loading';
    this._activity = null;
    this._coins = 0;
    this._health = ChapterService.MAX_HEALTH;
    this._completedActivities = 0;
    this._outcomes.length = 0;
    this.queue = [];
    this.clearSession();

    if (!this.chapterId) {
      this._status = 'error';
      return throwError(() => new Error('No chapter to play'));
    }

    this.audioPlayer.setContentScope(this.scope);

    return this.contentDb.loadChapter(this.scope).pipe(
      switchMap((db) => {
        const ids = db.chapter.activities.map((act) => act.id);
        if (ids.length === 0) {
          this._status = 'error';
          return throwError(() => new Error('No activities available'));
        }

        this.queue = this.randomMode
          ? shuffle(ids)
          : ids.slice(startIndexOf(ids, options.startFrom));
        return this.serveNext();
      }),
    );
  }

  /** Counts the current activity as done and serves the following one. */
  advance(): Observable<ActivityModel | null> {
    if (this._activity) {
      this._outcomes.push({
        activityId: this._activity.activityId,
        correct: this._activity.isCorrect,
        coinsDelta: this._activity.coinsDelta,
        healthLost: this._activity.healthLost,
      });
      this._completedActivities += 1;
    }

    if (this.sessionComplete) {
      this._activity = null;
      this._status = 'idle';
      this.clearSession();
      return of(null);
    }

    return this.serveNext();
  }

  /** Verifies the answer staged on the current activity and applies its coin/health cost. */
  submitAnswer(): Observable<boolean> {
    const activity = this._activity;
    if (!activity || this._status !== 'playing') {
      return of(false);
    }

    const answer = activity.prepareSubmission();
    if (answer === null) {
      return of(false);
    }

    this._status = 'checking';
    return this.contentDb.submitAnswer(activity.activityId, answer, this.scope).pipe(
      map((response) => response.correct),
      tap({
        next: (correct) => {
          activity.markAnswered(correct);
          this._status = 'answered';

          if (correct) {
            this.addCoins(activity, ChapterService.COINS_PER_CORRECT_ANSWER);
            return;
          }

          if (activity.isPractical) {
            this.loseHealth(activity, ChapterService.HEALTH_LOSS_PER_MISTAKE);
            return;
          }

          this.persist();
        },
        error: () => {
          activity.submitting = false;
          this._status = 'error';
        },
      }),
    );
  }

  /** Lets the player attempt the current activity again, for a coin fee. */
  retry(): void {
    const activity = this._activity;
    if (!activity?.isAnswered || activity.isCorrect) {
      return;
    }

    this.addCoins(activity, -ChapterService.COINS_LOST_PER_RETRY);
    activity.retry();
    this._status = 'playing';
  }

  /** Reveals the hint of the current activity in a dialog, for a coin fee. */
  showHint(): void {
    const activity = this._activity;
    if (!activity?.canUseHint) {
      return;
    }

    const hint = activity.useHint();
    if (!hint) {
      return;
    }

    this.addCoins(activity, -ChapterService.COINS_LOST_PER_HINT);
    this.dialog.open(HintDialogComponent, {
      data: { hint },
      panelClass: 'hint-dialog-panel',
      autoFocus: false,
      maxWidth: '90vw',
      width: '420px',
    });
  }

  /** Removes half of the wrong options of the current activity, for a coin fee. */
  useFiftyFifty(): void {
    const activity = this._activity;
    if (!(activity instanceof ChoiceActivityModel) || !activity.canUseFiftyFifty) {
      return;
    }

    this.contentDb
      .getWrongOptionLabels(activity.activityId, this.scope)
      .subscribe((wrongLabels) => {
        const toRemove = shuffle(wrongLabels).slice(
          0,
          Math.max(1, Math.floor(activity.optionLabels.length / 2)),
        );
        if (toRemove.length === 0) {
          return;
        }

        activity.useFiftyFifty(toRemove);
        this.addCoins(activity, -ChapterService.COINS_LOST_PER_FIFTY_FIFTY);
      });
  }

  private serveNext(): Observable<ActivityModel> {
    const activityId = this.queue.shift();
    if (!activityId) {
      this._status = 'error';
      return throwError(() => new Error('No activity left to serve'));
    }

    return this.serve(activityId, null);
  }

  private serve(activityId: string, progress: ActivityProgress | null): Observable<ActivityModel> {
    this._status = 'loading';
    this._activity = null;

    return this.contentDb.getActivity(activityId, this.scope).pipe(
      map((activity) => createActivityModel(activity)),
      tap({
        next: (model) => {
          if (progress) {
            model.restore(progress);
          }
          this._activity = model;
          this._status = 'playing';
          this.persist();
        },
        error: () => {
          this._status = 'error';
          // The stored session points at content we can no longer load.
          this.clearSession();
        },
      }),
    );
  }

  private addCoins(activity: ActivityModel, amount: number): void {
    activity.coinsDelta += amount;
    this._coins += amount;
    this.persist();
  }

  private loseHealth(activity: ActivityModel, amount: number): void {
    const applied = Math.min(amount, this._health);
    activity.healthLost += applied;
    this._health -= applied;
    this.persist();
  }

  private persist(): void {
    if (!this._activity) {
      return;
    }

    const snapshot: ChapterSnapshot = {
      version: 1,
      chapterId: this.chapterId,
      difficulty: this.difficulty,
      domain: this.domain,
      random: this.randomMode,
      activityCount: this.activityCount,
      queue: [...this.queue],
      currentActivityId: this._activity.activityId,
      currentProgress: this._activity.toProgress(),
      coins: this._coins,
      health: this._health,
      completedActivities: this._completedActivities,
      outcomes: [...this._outcomes],
    };

    try {
      localStorage.setItem(ChapterService.STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // localStorage unavailable (e.g. private mode) - the session just won't survive a reload.
    }
  }

  private readSnapshot(): ChapterSnapshot | null {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(ChapterService.STORAGE_KEY);
    } catch {
      return null;
    }

    if (!raw) {
      return null;
    }

    try {
      const snapshot = JSON.parse(raw) as ChapterSnapshot;
      return snapshot.version === 1 && snapshot.currentActivityId ? snapshot : null;
    } catch {
      this.clearSession();
      return null;
    }
  }
}

/** Returns a copy in random order. */
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Resolves a 1-based index or an activity id into a position in the ordered list. */
function startIndexOf(ids: readonly string[], startFrom?: string | number): number {
  if (startFrom === undefined) {
    return 0;
  }

  if (typeof startFrom === 'number') {
    return clamp(startFrom - 1, ids.length);
  }

  const parsed = parseInt(startFrom.trim(), 10);
  if (!isNaN(parsed)) {
    return clamp(parsed - 1, ids.length);
  }

  const found = ids.indexOf(startFrom.trim());
  return found === -1 ? 0 : found;
}

function clamp(index: number, length: number): number {
  return Math.max(0, Math.min(index, Math.max(0, length - 1)));
}
