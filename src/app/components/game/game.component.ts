import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TestProgressBarComponent } from '../test-progress-bar/test-progress-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassifyComponent } from '../activity/classify/classify.component';
import { MatchingComponent } from '../activity/matching/matching.component';
import { OrderingComponent } from '../activity/ordering/ordering.component';
import { MultipleChoiceComponent } from '../activity/multiple-choice/multiple-choice.component';
import { TrueFalseComponent } from '../activity/true-false/true-false.component';
import { PuzzleComponent } from '../activity/puzzle/puzzle.component';
import { ChapterService } from '../../shared/services/chapter.service';
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
  ClassifyActivityModel,
  MatchingActivityModel,
  MultipleChoiceActivityModel,
  OrderingActivityModel,
  PuzzleActivityModel,
  TrueFalseActivityModel,
} from '../../shared/models/activities';
import { GButtonComponent } from '../../shared/components/g-button/g-button.component';

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
    GameFooterComponent,
    TestProgressBarComponent,
    GButtonComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy {
  protected readonly chapter = inject(ChapterService);
  private readonly game = inject(GameService);
  protected readonly uiText = inject(UiTextService);
  private readonly audioPlayer = inject(AudioPlayerService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected errorMessage = '';
  protected characterSpeech = '';
  protected showExitConfirm = false;

  protected get activity() {
    return this.chapter.activity;
  }

  protected get characterPose(): TortiPose {
    if (this.activity?.answerState === 'correct') {
      return this.correctPose;
    }
    if (this.activity?.answerState === 'incorrect') {
      return 'sad';
    }
    return 'idle';
  }

  /** Random happy pose picked once per correct answer, so it doesn't re-randomize every change detection cycle. */
  private correctPose: TortiPose = 'happy';

  ngOnInit(): void {
    this.startSession();
  }

  protected get multipleChoice(): MultipleChoiceActivityModel | null {
    return this.activity instanceof MultipleChoiceActivityModel ? this.activity : null;
  }

  protected get trueFalse(): TrueFalseActivityModel | null {
    return this.activity instanceof TrueFalseActivityModel ? this.activity : null;
  }

  protected get classify(): ClassifyActivityModel | null {
    return this.activity instanceof ClassifyActivityModel ? this.activity : null;
  }

  protected get matching(): MatchingActivityModel | null {
    return this.activity instanceof MatchingActivityModel ? this.activity : null;
  }

  protected get ordering(): OrderingActivityModel | null {
    return this.activity instanceof OrderingActivityModel ? this.activity : null;
  }

  protected get puzzle(): PuzzleActivityModel | null {
    return this.activity instanceof PuzzleActivityModel ? this.activity : null;
  }

  protected get footerMode():
    | 'waiting'
    | 'checking'
    | 'correct'
    | 'incorrect'
    | 'classify'
    | 'matching'
    | 'ordering' {
    if (this.chapter.status === 'checking') {
      return 'checking';
    }
    if (this.activity?.answerState === 'correct') {
      return 'correct';
    }
    if (this.activity?.answerState === 'incorrect') {
      return 'incorrect';
    }
    switch (this.activity?.type) {
      case 'CLASSIFY':
        return 'classify';
      case 'MATCHING':
        return 'matching';
      case 'ORDERING':
        return 'ordering';
      default:
        return 'waiting';
    }
  }

  protected checkAnswer(): void {
    this.chapter.submitAnswer().subscribe({
      next: (correct) => {
        if (this.chapter.status !== 'answered') {
          return;
        }
        this.reactToAnswer(correct);
      },
      error: () => {
        this.errorMessage = this.text('activityError');
      },
    });
  }

  protected get isCheckDisabled(): boolean {
    return this.chapter.status === 'checking' || !this.activity?.isReadyToSubmit;
  }

  ngOnDestroy(): void {
    this.audioPlayer.stop();
  }

  protected continueGame(): void {
    this.audioPlayer.stop();
    this.characterSpeech = '';

    this.chapter.advance().subscribe({
      next: (activity) => {
        if (!activity) {
          this.game.completeCurrentChapter();
          this.router.navigate(['/chapter-done'], {
            state: {
              coins: this.chapter.coins,
              health: this.chapter.health,
            },
          });
        }
      },
      error: () => {
        this.errorMessage = this.text('activityError');
      },
    });
  }

  protected retry(): void {
    this.audioPlayer.stop();
    this.characterSpeech = '';
    this.chapter.retry();
  }

  protected reload(): void {
    this.startSession();
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

  private startSession(): void {
    this.audioPlayer.stop();
    this.errorMessage = '';
    this.characterSpeech = '';

    const chapterId = this.route.snapshot.queryParamMap.get('chapter');
    const random = this.route.snapshot.queryParamMap.get('mode') === 'random';
    // Debug helper: ?activity=3 (1-based index) or ?activity=<activityId>.
    const startFrom = this.route.snapshot.queryParamMap.get('activity') ?? undefined;

    // Re-entering the chapter that was left unfinished picks it back up; a random
    // run, an explicit activity or any other chapter begins from scratch.
    const canResume =
      !random &&
      !startFrom &&
      this.game.hasSavedChapter &&
      (!chapterId || chapterId === this.game.savedChapterId);

    const session = canResume
      ? this.game.resumeChapter()
      : this.game.startChapter(chapterId ?? '', {
          difficulty: 'EASY',
          domain: 'geography',
          random,
          startFrom,
        });

    session.subscribe({
      error: () => {
        this.errorMessage = this.text('backendError');
      },
    });
  }

  protected text(key: Parameters<UiTextService['text']>[0]): string {
    return this.uiText.text(key);
  }

  private reactToAnswer(correct: boolean): void {
    if (correct) {
      this.correctPose = TORTI_HAPPY_POSES[Math.floor(Math.random() * TORTI_HAPPY_POSES.length)];
      const speechKey = pickRandomLine(TORTI_HAPPY_LINES);
      this.characterSpeech = this.text(speechKey);
      void this.audioPlayer.playKey(speechKey, { global: true, characterSpeech: true });
      return;
    }

    const speechKey = pickRandomLine(TORTI_SAD_LINES);
    this.characterSpeech = this.text(speechKey);
    void this.audioPlayer.playKey(speechKey, { global: true, characterSpeech: true });
  }
}
