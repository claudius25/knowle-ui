import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClassifyComponent } from '../classify/classify.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { MultipleChoiceComponent } from '../multiple-choice/multiple-choice.component';
import { TrueFalseComponent } from '../true-false/true-false.component';
import { GameService } from '../../shared/services/game.service';
import { LanguageService } from '../../shared/services/language.service';
import { UiTextService } from '../../shared/services/ui-text.service';
import { Activity, AnswerResponse, ClassifyActivityData, MultipleChoiceActivityData, NextActivity, TrueFalseActivityData } from '../../shared/models/game.types';

type GameState = 'loading' | 'error' | 'playing' | 'answering' | 'correct' | 'incorrect';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MultipleChoiceComponent, TrueFalseComponent, ClassifyComponent, LanguageSelectorComponent, MatButtonModule, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);
  private readonly languageService = inject(LanguageService);
  protected readonly uiText = inject(UiTextService);
  private languageSubscription?: Subscription;

  protected state: GameState = 'loading';
  protected activity: Activity | null = null;
  protected selectedAnswer: unknown = null;
  protected nextActivity: NextActivity | null = null;
  protected errorMessage = '';

  ngOnInit(): void {
    this.loadInitialActivity();
    this.languageSubscription = this.languageService.languageChanged$.subscribe(() => {
      if (this.activity) {
        this.loadActivity(this.activity.activityId, true);
      }
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  protected chooseAnswer(answer: unknown): void {
    if (this.state !== 'playing' || !this.activity) {
      return;
    }

    this.selectedAnswer = answer;
    this.state = 'answering';
    this.gameService.submitAnswer(this.activity.activityId, answer, this.activity.difficulty).subscribe({
      next: (response) => this.handleAnswer(response),
      error: () => {
        this.state = 'error';
        this.errorMessage = this.text('activityError');
      },
    });
  }

  protected get multipleChoiceData(): MultipleChoiceActivityData | null {
    return this.activity?.type === 'MULTIPLE_CHOICE' ? this.activity.data : null;
  }

  protected get selectedMultipleChoiceAnswer(): string | null {
    return typeof this.selectedAnswer === 'string' ? this.selectedAnswer : null;
  }

  protected get trueFalseData(): TrueFalseActivityData | null {
    return this.activity?.type === 'TRUE_FALSE' ? this.activity.data : null;
  }

  protected get selectedTrueFalseAnswer(): boolean | null {
    return typeof this.selectedAnswer === 'boolean' ? this.selectedAnswer : null;
  }

  protected get classifyData(): ClassifyActivityData | null {
    return this.activity?.type === 'CLASSIFY' ? this.activity.data : null;
  }

  protected continueGame(): void {
    if (!this.nextActivity) {
      this.loadInitialActivity();
      return;
    }

    this.loadActivity(this.nextActivity.activityId);
  }

  protected retry(): void {
    this.selectedAnswer = null;
    this.state = 'playing';
  }

  protected reload(): void {
    this.loadInitialActivity();
  }

  private loadInitialActivity(): void {
    this.state = 'loading';
    this.errorMessage = '';
    this.gameService.startGame().subscribe({
      next: (start) => this.loadActivity(start.activityId),
      error: () => {
        this.state = 'error';
        this.errorMessage = this.text('backendError');
      },
    });
  }

  private loadActivity(activityId: string, preserveState = false): void {
    const previousState = this.state;
    const previousAnswer = this.selectedAnswer;
    const previousNextActivity = this.nextActivity;
    this.state = 'loading';
    this.activity = null;
    this.selectedAnswer = preserveState ? previousAnswer : null;
    this.nextActivity = preserveState ? previousNextActivity : null;
    this.errorMessage = '';
    this.gameService.getActivity(activityId).subscribe({
      next: (activity) => {
        this.activity = activity;
        this.state = preserveState ? previousState : 'playing';
      },
      error: () => {
        this.state = 'error';
        this.errorMessage = this.text('activityError');
      },
    });
  }

  protected text(key: Parameters<UiTextService['text']>[0]): string {
    return this.uiText.text(key);
  }

  private handleAnswer(response: AnswerResponse): void {
    if (response.correct) {
      this.nextActivity = response.nextActivity;
      this.state = 'correct';
      return;
    }

    this.state = 'incorrect';
  }
}
