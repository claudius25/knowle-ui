import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  QueryList,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MultipleChoiceActivityData } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';
import { ImageUtils } from '../../../shared/utils/image-utils';

@Component({
  selector: 'app-multiple-choice',
  standalone: true,
  imports: [AsyncPipe, MatIconModule],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.css',
})
export class MultipleChoiceComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('questionDescription') private questionDescription?: ElementRef<HTMLElement>;
  @ViewChild('questionTitle') private questionTitle?: ElementRef<HTMLElement>;
  @ViewChildren('activityImageWrapper')
  private activityImageWrappers!: QueryList<ElementRef<HTMLElement>>;

  protected readonly uiText = inject(UiTextService);
  private readonly audioPlayer = inject(AudioPlayerService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private resizeObserver?: ResizeObserver;
  private fitTimer?: number;

  @Input({ required: true }) data!: MultipleChoiceActivityData;
  @Input() disabled = false;
  @Input() selectedAnswer: string | null = null;
  /** Result of the checked answer, used to color the selected option. */
  @Input() answerState: 'correct' | 'incorrect' | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;
  protected hasLightImage = false;
  protected imageBackgroundColor: string | null = null;

  ngAfterViewInit(): void {
    const activityShell = this.getActivityShell();
    const gameFooter = this.getGameFooter();

    if (activityShell && gameFooter) {
      this.resizeObserver = new ResizeObserver(() => this.scheduleQuestionFit());
      this.resizeObserver.observe(gameFooter);
    }

    window.addEventListener('resize', this.scheduleQuestionFit);
    void document.fonts.ready.then(() => this.scheduleQuestionFit());
    const images = Array.from(
      this.elementRef.nativeElement.querySelectorAll('img'),
    ) as HTMLImageElement[];
    void Promise.all(images.map((image) => image.decode().catch(() => undefined))).then(() => {
      this.scheduleQuestionFit();
    });
    this.scheduleQuestionFit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.hasLightImage = false;
      this.imageBackgroundColor = null;
      this.scheduleQuestionFit();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.scheduleQuestionFit);
    window.clearTimeout(this.fitTimer);
  }

  protected select(answer: string): void {
    if (!this.disabled) {
      this.answerSelected.emit(answer);
    }
  }

  protected handleImageLoad(event: Event): void {
    this.scheduleQuestionFit();

    const image = event.target as HTMLImageElement;
    Promise.all([ImageUtils.getBackgroundColor(image), ImageUtils.getBackgroundBrightness(image)])
      .then(([color, brightness]) => {
        // The first loaded picture defines the shared background color.
        this.imageBackgroundColor ??= color;
        if (brightness === 'light') {
          this.hasLightImage = true;
        }
      })
      .catch(() => undefined);
  }

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

  private readonly scheduleQuestionFit = (): void => {
    window.clearTimeout(this.fitTimer);
    this.fitTimer = window.setTimeout(() => this.fitQuestionAboveFooter());
  };

  private fitQuestionAboveFooter(): void {
    const activityShell = this.getActivityShell();
    const gameFooter = this.getGameFooter();
    const description = this.questionDescription?.nativeElement;
    const title = this.questionTitle?.nativeElement;
    const imageWrappers = this.activityImageWrappers
      .toArray()
      .map(({ nativeElement }) => nativeElement);

    if (!activityShell || !gameFooter || !title) {
      return;
    }

    // description?.style.removeProperty('font-size');
    // title.style.removeProperty('font-size');
    // imageWrappers.forEach((wrapper) => {
    //   wrapper.style.removeProperty('height');
    //   wrapper.style.removeProperty('min-height');
    //   wrapper.style.removeProperty('max-height');
    // });
    // activityShell.style.removeProperty('max-height');
    // activityShell.style.removeProperty('overflow-y');

    let descriptionSize = description ? parseFloat(getComputedStyle(description).fontSize) : 0;
    let titleSize = parseFloat(getComputedStyle(title).fontSize);
    let imageHeights = imageWrappers.map((wrapper) => wrapper.getBoundingClientRect().height);
    const minimumDescriptionSize = 8;
    const minimumTitleSize = 12;
    const minimumImageHeight = 50;

    if (
      this.elementsOverlap(activityShell, gameFooter) &&
      imageHeights.some((height) => height > minimumImageHeight)
    ) {
      console.log('Adjusting image heights due to overlap with footer');
      imageHeights = imageHeights.map((height, index) => {
        const nextHeight = Math.max(minimumImageHeight, height - 5);
        const wrapper = imageWrappers[index];
        wrapper.style.height = `${nextHeight}px`;
        wrapper.style.minHeight = `${nextHeight}px`;
        wrapper.style.maxHeight = `${nextHeight}px`;
        return nextHeight;
      });
    }

    if (
      this.elementsOverlap(activityShell, gameFooter) &&
      (descriptionSize > minimumDescriptionSize || titleSize > minimumTitleSize)
    ) {
      console.log('Adjusting text sizes due to overlap with footer');
      if (description && descriptionSize > minimumDescriptionSize) {
        descriptionSize = Math.max(minimumDescriptionSize, descriptionSize - 1);
        description.style.fontSize = `${descriptionSize}px`;
      }

      if (titleSize > minimumTitleSize) {
        titleSize = Math.max(minimumTitleSize, titleSize - 1);
        title.style.fontSize = `${titleSize}px`;
      }
    }

    if (this.elementsOverlap(activityShell, gameFooter)) {
      console.log('Adjusting activity shell max height due to overlap with footer');
      const activityTop = activityShell.getBoundingClientRect().top;
      const footerTop = gameFooter.getBoundingClientRect().top;
      // activityShell.style.maxHeight = `${Math.max(0, footerTop - activityTop - 8)}px`;
      // activityShell.style.overflowY = 'auto';
      this.scheduleQuestionFit();
    }
  }

  private elementsOverlap(activityShell: HTMLElement, gameFooter: HTMLElement): boolean {
    const activityRect = activityShell.getBoundingClientRect();
    const footerRect = gameFooter.getBoundingClientRect();
    console.log('Activity Rect:', activityRect, 'Footer Rect:', footerRect);
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
    console.log('Game Page:', gamePage);
    return gamePage?.querySelector('app-test-progress-bar .game-header') as HTMLElement | null;
  }
}
