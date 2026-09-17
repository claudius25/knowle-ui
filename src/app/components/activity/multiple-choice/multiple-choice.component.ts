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
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MultipleChoiceActivityData } from '../../../shared/models/game.types';
import { UiTextService } from '../../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

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

  protected readonly uiText = inject(UiTextService);
  private readonly audioPlayer = inject(AudioPlayerService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private resizeObserver?: ResizeObserver;
  private resizeFrame?: number;

  @Input({ required: true }) data!: MultipleChoiceActivityData;
  @Input() disabled = false;
  @Input() selectedAnswer: string | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  protected readonly isSpeaking$ = this.audioPlayer.isPlaying$;

  ngAfterViewInit(): void {
    const activityShell = this.getActivityShell();
    const gameFooter = this.getGameFooter();

    if (activityShell && gameFooter) {
      this.resizeObserver = new ResizeObserver(() => this.scheduleQuestionFit());
      this.resizeObserver.observe(activityShell);
      this.resizeObserver.observe(gameFooter);
    }

    window.addEventListener('resize', this.scheduleQuestionFit);
    void document.fonts.ready.then(() => this.scheduleQuestionFit());
    this.scheduleQuestionFit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.scheduleQuestionFit();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.scheduleQuestionFit);
    window.cancelAnimationFrame(this.resizeFrame ?? 0);
  }

  protected select(answer: string): void {
    if (!this.disabled) {
      this.answerSelected.emit(answer);
    }
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
    window.cancelAnimationFrame(this.resizeFrame ?? 0);
    this.resizeFrame = window.requestAnimationFrame(() => this.fitQuestionAboveFooter());
  };

  private fitQuestionAboveFooter(): void {
    const activityShell = this.getActivityShell();
    const gameFooter = this.getGameFooter();
    const description = this.questionDescription?.nativeElement;
    const title = this.questionTitle?.nativeElement;

    if (!activityShell || !gameFooter || !title) {
      return;
    }

    description?.style.removeProperty('font-size');
    title.style.removeProperty('font-size');
    activityShell.style.removeProperty('max-height');
    activityShell.style.removeProperty('overflow-y');

    let descriptionSize = description ? parseFloat(getComputedStyle(description).fontSize) : 0;
    let titleSize = parseFloat(getComputedStyle(title).fontSize);
    const minimumDescriptionSize = 10;
    const minimumTitleSize = 14;

    while (
      this.elementsOverlap(activityShell, gameFooter) &&
      (descriptionSize > minimumDescriptionSize || titleSize > minimumTitleSize)
    ) {
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
      const activityTop = activityShell.getBoundingClientRect().top;
      const footerTop = gameFooter.getBoundingClientRect().top;
      activityShell.style.maxHeight = `${Math.max(0, footerTop - activityTop - 8)}px`;
      activityShell.style.overflowY = 'auto';
    }
  }

  private elementsOverlap(activityShell: HTMLElement, gameFooter: HTMLElement): boolean {
    const activityRect = activityShell.getBoundingClientRect();
    const footerRect = gameFooter.getBoundingClientRect();
    return activityRect.bottom > footerRect.top && activityRect.top < footerRect.bottom;
  }

  private getActivityShell(): HTMLElement | null {
    const host = this.elementRef.nativeElement as HTMLElement;
    return host.closest('.activity-shell') as HTMLElement | null;
  }

  private getGameFooter(): HTMLElement | null {
    const host = this.elementRef.nativeElement as HTMLElement;
    const gamePage = host.closest('.game-page');
    return gamePage?.querySelector('app-game-footer .game-footer') as HTMLElement | null;
  }
}
