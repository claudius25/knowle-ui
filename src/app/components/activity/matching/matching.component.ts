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
import { MatchingActivityData } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

interface MatchingColumnItem {
  id: string;
  text: string;
  image?: string;
}

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [AsyncPipe, CommonModule, MatIconModule],
  templateUrl: './matching.component.html',
  styleUrl: './matching.component.css',
})
export class MatchingComponent implements OnChanges, AfterViewInit, OnDestroy {
  protected readonly uiText = inject(UiTextService);
  private readonly audioPlayer = inject(AudioPlayerService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @ViewChildren('leftCard') private leftCardRefs!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('rightCard') private rightCardRefs!: QueryList<ElementRef<HTMLElement>>;

  private static readonly CARD_HEIGHT_STEP = 4;
  private static readonly MAX_CARD_HEIGHT = 220;
  private resizeObserver?: ResizeObserver;
  private growTimer?: number;

  @Input({ required: true }) data!: MatchingActivityData;
  @Input() disabled = false;
  @Output() answerSubmitted = new EventEmitter<Record<string, string>>();

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;

  protected leftItems: MatchingColumnItem[] = [];
  protected rightItems: MatchingColumnItem[] = [];

  protected speak(): void {
    if (this.audioPlayer.isPlaying) {
      this.audioPlayer.stop();
      return;
    }

    const keys: string[] = [];
    if (this.data.descriptionKey) {
      keys.push(this.data.descriptionKey);
    }
    if (this.data.questionKey) {
      keys.push(this.data.questionKey);
    }

    if (keys.length > 0) {
      void this.audioPlayer.playKeys(keys);
    }
  }

  protected selectedLeftId: string | null = null;
  protected selectedRightId: string | null = null;

  /**
   * Set of matched item IDs (since left and right have the same pair.id,
   * a matched pair's id is stored here).
   */
  protected matchedPairIds = new Set<string>();

  /**
   * Temporary wrong pair indication for animation before deselection.
   */
  protected wrongPair: { leftId: string; rightId: string } | null = null;
  private mismatchTimeout: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.resetState();
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
    if (this.mismatchTimeout) {
      clearTimeout(this.mismatchTimeout);
    }
  }

  private resetState(): void {
    if (this.mismatchTimeout) {
      clearTimeout(this.mismatchTimeout);
      this.mismatchTimeout = null;
    }
    this.matchedPairIds.clear();
    this.selectedLeftId = null;
    this.selectedRightId = null;
    this.wrongPair = null;

    if (!this.data?.pairs) {
      this.leftItems = [];
      this.rightItems = [];
      return;
    }

    this.leftItems = this.data.pairs.map((p) => ({
      id: p.id,
      text: p.left,
      image: p.image,
    }));

    const rightList = this.data.pairs.map((p) => ({
      id: p.id,
      text: p.right,
    }));

    this.rightItems = this.shuffle(rightList);
    this.resetCardHeights();
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
    console.log('Activity Shell Rect:', activityRect);
    return activityRect.bottom > footerRect.top && activityRect.top < footerRect.bottom;
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

  private shuffle(array: MatchingColumnItem[]): MatchingColumnItem[] {
    const arr = [...array];
    if (arr.length <= 1) return arr;

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // If accidentally in the exact same order and length > 1, rotate by 1
    const allSame = arr.every((item, idx) => item.id === array[idx].id);
    if (allSame && arr.length > 1) {
      arr.push(arr.shift()!);
    }

    return arr;
  }

  protected selectLeft(id: string): void {
    if (this.disabled || this.matchedPairIds.has(id) || this.wrongPair) return;

    if (this.selectedLeftId === id) {
      this.selectedLeftId = null;
      return;
    }

    this.selectedLeftId = id;

    if (this.selectedRightId !== null) {
      this.checkPair(this.selectedLeftId, this.selectedRightId);
    }
  }

  protected selectRight(id: string): void {
    if (this.disabled || this.matchedPairIds.has(id) || this.wrongPair) return;

    if (this.selectedRightId === id) {
      this.selectedRightId = null;
      return;
    }

    this.selectedRightId = id;

    if (this.selectedLeftId !== null) {
      this.checkPair(this.selectedLeftId, this.selectedRightId);
    }
  }

  private checkPair(leftId: string, rightId: string): void {
    if (leftId === rightId) {
      // Correct Match!
      this.matchedPairIds.add(leftId);
      this.selectedLeftId = null;
      this.selectedRightId = null;

      if (this.isComplete) {
        this.submit();
      }
    } else {
      // Mismatch: show error style briefly, then deselect both so user can try again
      this.wrongPair = { leftId, rightId };
      this.mismatchTimeout = window.setTimeout(() => {
        this.selectedLeftId = null;
        this.selectedRightId = null;
        this.wrongPair = null;
        this.mismatchTimeout = null;
      }, 700);
    }
  }

  protected isMatched(id: string): boolean {
    return this.matchedPairIds.has(id);
  }

  protected isLeftSelected(id: string): boolean {
    return this.selectedLeftId === id;
  }

  protected isRightSelected(id: string): boolean {
    return this.selectedRightId === id;
  }

  protected isLeftWrong(id: string): boolean {
    return this.wrongPair?.leftId === id;
  }

  protected isRightWrong(id: string): boolean {
    return this.wrongPair?.rightId === id;
  }

  get isComplete(): boolean {
    const totalPairs = this.data?.pairs?.length ?? 0;
    return totalPairs > 0 && this.matchedPairIds.size === totalPairs;
  }

  submit(): void {
    if (this.disabled || !this.isComplete) {
      return;
    }

    // Build the matches record for verification: { [pairId]: pairId }
    const result: Record<string, string> = {};
    for (const id of this.matchedPairIds) {
      result[id] = id;
    }

    this.answerSubmitted.emit(result);
  }
}
