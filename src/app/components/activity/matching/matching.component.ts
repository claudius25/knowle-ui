import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
  inject,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatchAttempt, MatchingActivityModel } from '../../../shared/models/activities';
import { ChapterService } from '../../../shared/services/chapter.service';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [AsyncPipe, CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './matching.component.html',
  styleUrl: './matching.component.css',
})
export class MatchingComponent implements OnChanges, AfterViewInit, OnDestroy {
  protected readonly uiText = inject(UiTextService);
  protected readonly chapter = inject(ChapterService);
  private readonly audioPlayer = inject(AudioPlayerService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @ViewChildren('leftCard') private leftCardRefs!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('rightCard') private rightCardRefs!: QueryList<ElementRef<HTMLElement>>;

  private static readonly CARD_HEIGHT_STEP = 4;
  private static readonly MAX_CARD_HEIGHT = 220;
  private static readonly MISMATCH_FEEDBACK_MS = 700;
  private resizeObserver?: ResizeObserver;
  private growTimer?: number;

  @Input({ required: true }) activity!: MatchingActivityModel;
  /** Raised once every pair has been matched. */
  @Output() completed = new EventEmitter<void>();

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;

  protected speak(): void {
    if (this.audioPlayer.isPlaying) {
      this.audioPlayer.stop();
      return;
    }

    const keys: string[] = [];
    // if (this.activity.data.descriptionKey) {
    //   keys.push(this.activity.data.descriptionKey);
    // }
    if (this.activity.data.questionKey) {
      keys.push(this.activity.data.questionKey);
    }

    if (keys.length > 0) {
      void this.audioPlayer.playKeys(keys);
    }
  }

  /** Pair shown in the mismatch style until the feedback delay elapses. */
  protected wrongPair: MatchAttempt | null = null;
  private mismatchTimeout: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity'] && this.activity) {
      this.clearMismatch();
      this.resetCardHeights();
      this.scheduleGrow();
    }
  }

  ngAfterViewInit(): void {
    const gameFooter = this.getGameFooter();
    if (gameFooter) {
      this.resizeObserver = new ResizeObserver(() => this.scheduleGrow());
      this.resizeObserver.observe(gameFooter);
    }
    window.addEventListener('resize', this.scheduleGrow);
    this.scheduleGrow();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.scheduleGrow);
    window.clearTimeout(this.growTimer);
    this.clearMismatch();
  }

  private clearMismatch(): void {
    if (this.mismatchTimeout !== null) {
      clearTimeout(this.mismatchTimeout);
      this.mismatchTimeout = null;
    }
    this.wrongPair = null;
  }

  protected handleImageLoad(): void {
    this.scheduleGrow();
  }

  private resetCardHeights(): void {
    const cards = [
      ...(this.leftCardRefs?.toArray().map((r) => r.nativeElement) ?? []),
      ...(this.rightCardRefs?.toArray().map((r) => r.nativeElement) ?? []),
    ];
    cards.forEach((card) => {
      card.style.removeProperty('height');
      card.style.removeProperty('min-height');
      const image = card.querySelector('.card-image') as HTMLImageElement | null;
      image?.style.removeProperty('width');
      image?.style.removeProperty('height');
    });
  }

  private readonly scheduleGrow = (): void => {
    window.clearTimeout(this.growTimer);
    this.growTimer = window.setTimeout(() => this.growLeftCardsUntilCollision());
  };

  /** Grows the left cards' height a step at a time until they'd overlap the footer, then mirrors the final height onto the right cards. */
  private growLeftCardsUntilCollision(): void {
    const activityShell = this.getActivityShell();
    const gameFooter = this.getGameFooter();
    const leftCards = this.leftCardRefs?.toArray().map((r) => r.nativeElement) ?? [];
    const rightCards = this.rightCardRefs?.toArray().map((r) => r.nativeElement) ?? [];

    if (!activityShell || !gameFooter || leftCards.length === 0) {
      return;
    }

    if (this.elementsOverlap(activityShell, gameFooter)) {
      return;
    }

    const currentHeight = leftCards[0].getBoundingClientRect().height;
    const nextHeight = Math.min(
      MatchingComponent.MAX_CARD_HEIGHT,
      currentHeight + MatchingComponent.CARD_HEIGHT_STEP,
    );

    leftCards.forEach((card) => {
      card.style.height = `${nextHeight}px`;
      card.style.minHeight = `${nextHeight}px`;
    });

    if (this.elementsOverlap(activityShell, gameFooter)) {
      // Grew one step too far: back off and stabilize, then apply the same height to the right column.
      const stableHeight = nextHeight - MatchingComponent.CARD_HEIGHT_STEP;
      leftCards.forEach((card) => {
        card.style.height = `${stableHeight}px`;
        card.style.minHeight = `${stableHeight}px`;
      });
      rightCards.forEach((card) => {
        card.style.height = `${stableHeight}px`;
        card.style.minHeight = `${stableHeight}px`;
      });
      this.growLeftCardImages(leftCards, stableHeight);
      return;
    }

    if (nextHeight >= MatchingComponent.MAX_CARD_HEIGHT) {
      rightCards.forEach((card) => {
        card.style.height = `${nextHeight}px`;
        card.style.minHeight = `${nextHeight}px`;
      });
      this.growLeftCardImages(leftCards, nextHeight);
      return;
    }

    this.scheduleGrow();
  }

  /** Enlarges each left card's image to fill the space left over after its text, without exceeding the card's stabilized height. */
  private growLeftCardImages(leftCards: HTMLElement[], cardHeight: number): void {
    const verticalPadding = 28; // .match-card padding: 14px top + 14px bottom
    const horizontalPadding = 32; // 16px left + 16px right
    const gap = 12; // .match-card gap between children

    leftCards.forEach((card) => {
      const image = card.querySelector('.card-image') as HTMLImageElement | null;
      const text = card.querySelector('.card-text') as HTMLElement | null;
      if (!image || !text) {
        return;
      }

      const textHeight = text.getBoundingClientRect().height;
      const cardWidth = card.getBoundingClientRect().width;
      const availableHeight = cardHeight - verticalPadding - gap - textHeight;
      const availableWidth = cardWidth - horizontalPadding;
      const size = Math.max(32, Math.min(availableHeight, availableWidth));

      image.style.width = `${size}px`;
      image.style.height = `${size}px`;
    });
  }

  private elementsOverlap(activityShell: HTMLElement, gameFooter: HTMLElement): boolean {
    const activityRect = activityShell.getBoundingClientRect();
    const footerRect = gameFooter.getBoundingClientRect();
    const progressBarHeight = 15;
    return (
      activityRect.bottom > footerRect.top - progressBarHeight &&
      activityRect.top < footerRect.bottom
    );
  }

  private getActivityShell(): HTMLElement | null {
    const host = this.elementRef.nativeElement as HTMLElement;
    const activityShell = host.closest('.activity-shell') as HTMLElement | null;
    return activityShell ? (activityShell.children[0] as HTMLElement) : null;
  }

  private getGameFooter(): HTMLElement | null {
    const host = this.elementRef.nativeElement as HTMLElement;
    const gamePage = host.closest('.game-page');
    return gamePage?.querySelector('app-game-footer .game-footer') as HTMLElement | null;
  }

  protected selectLeft(id: string): void {
    if (this.wrongPair) {
      return;
    }
    this.handleAttempt(this.activity.selectLeft(id));
  }

  protected selectRight(id: string): void {
    if (this.wrongPair) {
      return;
    }
    this.handleAttempt(this.activity.selectRight(id));
  }

  private handleAttempt(attempt: MatchAttempt | null): void {
    if (!attempt) {
      return;
    }

    if (attempt.matched) {
      if (this.activity.isComplete) {
        this.completed.emit();
      }
      return;
    }

    // Show the mismatch briefly, then deselect both so the player can try again.
    this.wrongPair = attempt;
    this.mismatchTimeout = window.setTimeout(() => {
      this.activity.clearSelection();
      this.clearMismatch();
    }, MatchingComponent.MISMATCH_FEEDBACK_MS);
  }

  protected isLeftWrong(id: string): boolean {
    return this.wrongPair?.leftId === id;
  }

  protected isRightWrong(id: string): boolean {
    return this.wrongPair?.rightId === id;
  }
}
