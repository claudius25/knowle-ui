import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClassifyComponent } from '../activity/classify/classify.component';
import { MultipleChoiceComponent } from '../activity/multiple-choice/multiple-choice.component';
import { TrueFalseComponent } from '../activity/true-false/true-false.component';
import { ProgressBarComponent } from '../ui/progress-bar/progress-bar.component';
import { CoinDisplayComponent } from '../ui/coin-display/coin-display.component';
import { HealthDisplayComponent } from '../ui/health-display/health-display.component';
import { GameService } from '../../shared/services/game.service';
import { GameFooterComponent } from '../game-footer/game-footer.component';
import { UiTextService } from '../../shared/services/ui-text.service';
import { TtsService } from '../../shared/tts/tts.service';
import { TortiPose } from '../../characters/torti/torti.types';
import {
  TORTI_HAPPY_LINES,
  TORTI_SAD_LINES,
  pickRandomLine,
} from '../../characters/torti/torti-speech.constants';
import {
  Activity,
  AnswerResponse,
  ClassifyActivityData,
  MultipleChoiceActivityData,
  NextActivity,
  TrueFalseActivityData,
} from '../../shared/models/game.types';

type GameState = 'loading' | 'error' | 'playing' | 'answering' | 'correct' | 'incorrect';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    MultipleChoiceComponent,
    TrueFalseComponent,
    ClassifyComponent,
    ProgressBarComponent,
    CoinDisplayComponent,
    HealthDisplayComponent,
    GameFooterComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  private readonly gameService = inject(GameService);
  protected readonly uiText = inject(UiTextService);
  private readonly tts = inject(TtsService);
  private readonly router = inject(Router);

  @ViewChild(ClassifyComponent) private classifyComponent?: ClassifyComponent;

  private static readonly ACTIVITIES_PER_SESSION = 10;
  private static readonly COINS_PER_CORRECT_ANSWER = 10;
  private static readonly COINS_LOST_PER_RETRY = 20;
  private static readonly HEALTH_LOSS_PER_MISTAKE = 20;
  private static readonly CHARACTER_VOICE = 'M1';

  protected state: GameState = 'loading';
  protected activity: Activity | null = null;
  protected selectedAnswer: unknown = null;
  protected nextActivity: NextActivity | null = null;
  protected errorMessage = '';
  protected completedActivities = 0;
  protected coins = 0;
  protected health = 100;
  protected characterSpeech = '';
  protected showExitConfirm = false;

  protected get progress(): number {
    return (this.completedActivities / GameComponent.ACTIVITIES_PER_SESSION) * 100;
  }

  protected get sessionComplete(): boolean {
    console.log('Completed activities:', this.completedActivities);
    return this.completedActivities >= GameComponent.ACTIVITIES_PER_SESSION;
  }

  protected get characterPose(): TortiPose {
    if (this.state === 'correct') {
      return 'happy';
    }
    if (this.state === 'incorrect') {
      return 'sad';
    }
    return 'idle';
  }

  ngOnInit(): void {
    this.tts.loadVoice(GameComponent.CHARACTER_VOICE).catch(() => {});
    this.loadInitialActivity();
  }

  protected selectAnswer(answer: unknown): void {
    if (this.state !== 'playing' || !this.activity) {
      return;
    }

    this.selectedAnswer = answer;
  }

  protected checkSelectedAnswer(): void {
    if (this.state !== 'playing' || !this.activity || this.selectedAnswer === null) {
      return;
    }

    const answer = this.selectedAnswer;
    this.state = 'answering';
    this.gameService
      .submitAnswer(this.activity.activityId, answer, this.activity.difficulty)
      .subscribe({
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

  protected get classifyComplete(): boolean {
    return this.classifyComponent?.isComplete ?? false;
  }

  protected get footerMode(): 'waiting' | 'checking' | 'correct' | 'incorrect' | 'classify' {
    if (this.state === 'answering') {
      return 'checking';
    }
    if (this.state === 'correct') {
      return 'correct';
    }
    if (this.state === 'incorrect') {
      return 'incorrect';
    }
    if (this.classifyData) {
      return 'classify';
    }
    return 'waiting';
  }

  protected checkClassifyAnswer(): void {
    this.classifyComponent?.submit();
  }

  protected continueGame(): void {
    console.log('Continuing game...');
    console.log('Next activity:', this.nextActivity);
    if (!this.nextActivity) {
      this.loadInitialActivity();
      return;
    }

    this.loadActivity(this.nextActivity.activityId);
  }

  protected retry(): void {
    this.coins = this.coins - GameComponent.COINS_LOST_PER_RETRY;
    this.selectedAnswer = null;
    this.characterSpeech = '';
    this.state = 'playing';
  }

  protected reload(): void {
    this.loadInitialActivity();
  }

  protected confirmExit(): void {
    this.showExitConfirm = true;
  }

  protected cancelExit(): void {
    this.showExitConfirm = false;
  }

  protected exitToHome(): void {
    this.showExitConfirm = false;
    this.router.navigate(['/']);
  }

  private loadInitialActivity(): void {
    this.state = 'loading';
    this.errorMessage = '';
    this.completedActivities = 0;
    this.coins = 0;
    this.health = 100;
    this.characterSpeech = '';
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
    if (!preserveState) {
      this.characterSpeech = '';
    }
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

  private speakCharacterLine(): void {
    if (!this.characterSpeech) {
      return;
    }
    this.tts
      .speak(this.characterSpeech, { lang: 'en', voice: GameComponent.CHARACTER_VOICE })
      .catch(() => {});
  }

  private handleAnswer(response: AnswerResponse): void {
    if (response.correct) {
      this.completedActivities += 1;
      this.coins += GameComponent.COINS_PER_CORRECT_ANSWER;
      this.nextActivity = response.nextActivity;
      this.characterSpeech = pickRandomLine(TORTI_HAPPY_LINES);
      this.speakCharacterLine();
      this.state = 'correct';
      return;
    }

    this.health = Math.max(0, this.health - GameComponent.HEALTH_LOSS_PER_MISTAKE);
    this.characterSpeech = pickRandomLine(TORTI_SAD_LINES);
    this.speakCharacterLine();
    this.state = 'incorrect';
  }
}
