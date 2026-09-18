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
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { OrderingActivityData, OrderingItem } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

@Component({
  selector: 'app-ordering',
  standalone: true,
  imports: [AsyncPipe, CommonModule, CdkDropList, CdkDrag, MatIconModule],
  templateUrl: './ordering.component.html',
  styleUrl: './ordering.component.css',
})
export class OrderingComponent implements OnChanges, AfterViewInit, OnDestroy {
  protected readonly uiText = inject(UiTextService);
  private readonly audioPlayer = inject(AudioPlayerService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @ViewChildren('orderingCard') private cardRefs!: QueryList<ElementRef<HTMLElement>>;

  private static readonly CARD_HEIGHT_STEP = 4;
  private static readonly MAX_CARD_HEIGHT = 220;
  private resizeObserver?: ResizeObserver;
  private growTimer?: number;

  @Input({ required: true }) data!: OrderingActivityData;
  @Input() disabled = false;
  @Output() answerSubmitted = new EventEmitter<string[]>();

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;

  protected items: OrderingItem[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.initItems();
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
  }

  private initItems(): void {
    if (!this.data?.items) {
      this.items = [];
      return;
    }

    const rawList = [...this.data.items];
    this.items = this.shuffle(rawList);
    this.resetCardHeights();
  }

  private resetCardHeights(): void {
    const cards = this.cardRefs?.toArray().map((r) => r.nativeElement) ?? [];
    cards.forEach((card) => {
      card.style.removeProperty('height');
      card.style.removeProperty('min-height');
    });
  }

  private readonly scheduleGrow = (): void => {
    window.clearTimeout(this.growTimer);
    this.growTimer = window.setTimeout(() => this.growCardsUntilCollision());
  };

  /** Grows the cards' height a step at a time until they'd overlap the footer. */
  private growCardsUntilCollision(): void {
    const activityShell = this.getActivityShell();
    const gameFooter = this.getGameFooter();
    const cards = this.cardRefs?.toArray().map((r) => r.nativeElement) ?? [];

    if (!activityShell || !gameFooter || cards.length === 0) {
      return;
    }

    if (this.elementsOverlap(activityShell, gameFooter)) {
      return;
    }

    const currentHeight = cards[0].getBoundingClientRect().height;
    const nextHeight = Math.min(
      OrderingComponent.MAX_CARD_HEIGHT,
      currentHeight + OrderingComponent.CARD_HEIGHT_STEP,
    );

    cards.forEach((card) => {
      card.style.height = `${nextHeight}px`;
      card.style.minHeight = `${nextHeight}px`;
    });

    if (this.elementsOverlap(activityShell, gameFooter)) {
      // Grew one step too far: back off and stabilize.
      const stableHeight = nextHeight - OrderingComponent.CARD_HEIGHT_STEP;
      cards.forEach((card) => {
        card.style.height = `${stableHeight}px`;
        card.style.minHeight = `${stableHeight}px`;
      });
      return;
    }

    if (nextHeight >= OrderingComponent.MAX_CARD_HEIGHT) {
      return;
    }

    this.scheduleGrow();
  }

  private elementsOverlap(activityShell: HTMLElement, gameFooter: HTMLElement): boolean {
    const activityRect = activityShell.getBoundingClientRect();
    const footerRect = gameFooter.getBoundingClientRect();
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

  private shuffle(array: OrderingItem[]): OrderingItem[] {
    const arr = [...array];
    if (arr.length <= 1) return arr;

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Ensure it's not accidentally in the initial order if length > 1
    const allSame = arr.every((item, idx) => item.id === array[idx].id);
    if (allSame && arr.length > 1) {
      arr.push(arr.shift()!);
    }

    return arr;
  }

  protected drop(event: CdkDragDrop<OrderingItem[]>): void {
    if (this.disabled) return;

    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  get isComplete(): boolean {
    return this.items.length > 0;
  }

  submit(): void {
    if (this.disabled || !this.isComplete) {
      return;
    }

    const currentOrderIds = this.items.map((item) => item.id);
    this.answerSubmitted.emit(currentOrderIds);
  }
}
