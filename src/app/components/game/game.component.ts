import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { TestProgressBarComponent } from '../test-progress-bar/test-progress-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassifyComponent } from '../activity/classify/classify.component';
import { MatchingComponent } from '../activity/matching/matching.component';
import { OrderingComponent } from '../activity/ordering/ordering.component';
import { MultipleChoiceComponent } from '../activity/multiple-choice/multiple-choice.component';
import { TrueFalseComponent } from '../activity/true-false/true-false.component';
import { PuzzleComponent } from '../activity/puzzle/puzzle.component';
import { CoinDisplayComponent } from '../ui/coin-display/coin-display.component';
import { HealthDisplayComponent } from '../ui/health-display/health-display.component';
import { GameService } from '../../shared/services/game.service';
import { GameFooterComponent } from '../game-footer/game-footer.component';
import { UiTextService } from '../../shared/services/ui-text.service';
import { AudioPlayerService } from '../../shared/services/audio-player.service';
import { TortiPose } from '../../characters/torti/torti.types';
import { TORTI_HAPPY_POSES } from '../../characters/torti/torti.poses';
import {
  TORTI_HAPPY_LINES,
  TORTI_SAD_LINES,
  pickRandomLine,
} from '../../characters/torti/torti-speech.constants';
import {
  Activity,
  AnswerResponse,
  ClassifyActivityData,
  MatchingActivityData,
  MultipleChoiceActivityData,
  NextActivity,
  OrderingActivityData,
  PuzzleActivityData,
  TrueFalseActivityData,
} from '../../shared/models/game.types';
import { GButtonComponent } from '../../shared/components/g-button/g-button.component';

type GameState = 'loading' | 'error' | 'playing' | 'answering' | 'correct' | 'incorrect';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    MultipleChoiceComponent,
    TrueFalseComponent,
    ClassifyComponent,
    MatchingComponent,
    OrderingComponent,
    PuzzleComponent,
    CoinDisplayComponent,
    HealthDisplayComponent,
    GameFooterComponent,
    TestProgressBarComponent,
    GButtonComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);
  protected readonly uiText = inject(UiTextService);
  private readonly audioPlayer = inject(AudioPlayerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  @ViewChild(ClassifyComponent) private classifyComponent?: ClassifyComponent;
  @ViewChild(MatchingComponent) private matchingComponent?: MatchingComponent;
  @ViewChild(OrderingComponent) private orderingComponent?: OrderingComponent;

  private static readonly ACTIVITIES_PER_SESSION = 10;
  private static readonly COINS_PER_CORRECT_ANSWER = 10;
  private static readonly COINS_LOST_PER_RETRY = 20;
  private static readonly HEALTH_LOSS_PER_MISTAKE = 20;

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
    return this.completedActivities >= GameComponent.ACTIVITIES_PER_SESSION;
  }

  protected get characterPose(): TortiPose {
    if (this.state === 'correct') {
      return this.correctPose;
    }
    if (this.state === 'incorrect') {
      return 'sad';
    }
    return 'idle';
  }

  /** Random happy pose picked once per correct answer, so it doesn't re-randomize every change detection cycle. */
  private correctPose: TortiPose = 'happy';

  ngOnInit(): void {
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

  protected get matchingData(): MatchingActivityData | null {
    return this.activity?.type === 'MATCHING' ? this.activity.data : null;
  }

  protected get matchingComplete(): boolean {
    return this.matchingComponent?.isComplete ?? false;
  }

  protected get orderingData(): OrderingActivityData | null {
    return this.activity?.type === 'ORDERING' ? this.activity.data : null;
  }

  protected get orderingComplete(): boolean {
    return this.orderingComponent?.isComplete ?? false;
  }

  protected get puzzleData(): PuzzleActivityData | null {
    return this.activity?.type === 'PUZZLE' ? this.activity.data : null;
  }

  protected get footerMode():
    | 'waiting'
    | 'checking'
    | 'correct'
    | 'incorrect'
    | 'classify'
    | 'matching'
    | 'ordering' {
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
    if (this.matchingData) {
      return 'matching';
    }
    if (this.orderingData) {
      return 'ordering';
    }
    return 'waiting';
  }

  protected checkClassifyAnswer(): void {
    this.classifyComponent?.submit();
  }

  protected submitClassifyAnswer(answer: Record<string, string>): void {
    if (this.state !== 'playing' || !this.activity) {
      return;
    }

    this.selectedAnswer = answer;
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

  protected checkMatchingAnswer(): void {
    this.matchingComponent?.submit();
  }

  protected submitMatchingAnswer(answer: Record<string, string>): void {
    if (this.state !== 'playing' || !this.activity) {
      return;
    }

    this.selectedAnswer = answer;
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

  protected checkOrderingAnswer(): void {
    this.orderingComponent?.submit();
  }

  protected submitOrderingAnswer(answer: string[]): void {
    if (this.state !== 'playing' || !this.activity) {
      return;
    }

    this.selectedAnswer = answer;
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

  protected get isCheckDisabled(): boolean {
    if (this.state === 'answering') {
      return true;
    }
    if (this.classifyData) {
      return !this.classifyComplete;
    }
    if (this.matchingData) {
      return !this.matchingComplete;
    }
    if (this.orderingData) {
      return !this.orderingComplete;
    }
    return this.selectedAnswer === null;
  }

  ngOnDestroy(): void {
    this.audioPlayer.stop();
  }

  protected continueGame(): void {
    this.audioPlayer.stop();
    this.characterSpeech = '';

    this.completedActivities += 1;

    if (this.sessionComplete || !this.nextActivity) {
      this.router.navigate(['/chapter-done'], {
        state: {
          coins: this.coins,
          health: this.health,
        },
      });
      return;
    }

    this.loadActivity(this.nextActivity.activityId);
  }

  protected retry(): void {
    this.audioPlayer.stop();
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
    this.audioPlayer.stop();
    this.showExitConfirm = false;
    this.router.navigate(['/']);
  }

  private loadInitialActivity(): void {
    this.audioPlayer.stop();
    this.state = 'loading';
    this.errorMessage = '';
    this.coins = 0;
    this.health = 100;
    this.characterSpeech = '';

    const activityParam = this.route.snapshot.paramMap.get('activityIndex');
    if (activityParam) {
      const parsed = parseInt(activityParam, 10);
      if (!isNaN(parsed) && parsed > 0) {
        this.completedActivities = parsed - 1;
      } else {
        this.completedActivities = 0;
      }
    } else {
      this.completedActivities = 0;
    }

    this.gameService.startGame('EASY', 'geography', activityParam ?? undefined).subscribe({
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
      this.audioPlayer.stop();
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

  private handleAnswer(response: AnswerResponse): void {
    this.nextActivity = response.nextActivity;

    if (response.correct) {
      this.coins += GameComponent.COINS_PER_CORRECT_ANSWER;
      this.correctPose = TORTI_HAPPY_POSES[Math.floor(Math.random() * TORTI_HAPPY_POSES.length)];
      const speechKey = pickRandomLine(TORTI_HAPPY_LINES);
      this.characterSpeech = this.text(speechKey);
      void this.audioPlayer.playKey(speechKey, { global: true, characterSpeech: true });
      this.state = 'correct';
      return;
    }

    this.health = Math.max(0, this.health - GameComponent.HEALTH_LOSS_PER_MISTAKE);
    const speechKey = pickRandomLine(TORTI_SAD_LINES);
    this.characterSpeech = this.text(speechKey);
    void this.audioPlayer.playKey(speechKey, { global: true, characterSpeech: true });
    this.state = 'incorrect';
  }
}
