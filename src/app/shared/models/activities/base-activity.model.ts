import {
  Activity,
  ActivityPresentationData,
  ActivityType,
  Difficulty,
  HintableActivityData,
} from '../game.types';

export type AnswerState = 'correct' | 'incorrect' | null;

/**
 * Runtime state of a single activity: what the player picked, which helps were
 * spent and how the attempt was judged. Components bind to the instance and
 * mutate it, so the whole game logic for an activity lives in one place.
 */
export abstract class BaseActivityModel<TAnswer = unknown> {
  readonly activityId: string;
  readonly title: string;
  readonly type: ActivityType;
  readonly difficulty: Difficulty;
  readonly data: ActivityPresentationData;
  /** Graded activity: a wrong answer costs health. */
  readonly isPractical: boolean;

  /** Answer staged for the next submission. */
  selectedAnswer: TAnswer | null = null;
  answerState: AnswerState = null;
  /** True while the answer is being verified. */
  submitting = false;
  /** Every answer that was already submitted and rejected. */
  readonly rejectedAnswers: TAnswer[] = [];
  retryCount = 0;
  hintUsed = false;
  fiftyFiftyUsed = false;
  /** Coins gained (positive) or spent (negative) on this activity. */
  coinsDelta = 0;
  /** Health lost on this activity. */
  healthLost = 0;

  protected constructor(activity: Activity) {
    this.activityId = activity.activityId;
    this.title = activity.title;
    this.type = activity.type;
    this.difficulty = activity.difficulty;
    this.data = activity.data;
    this.isPractical = activity.isPractical ?? false;
  }

  get hint(): string {
    return (this.data as HintableActivityData).hint ?? '';
  }

  get hasHint(): boolean {
    return this.hint.length > 0;
  }

  get canUseHint(): boolean {
    return this.hasHint && !this.hintUsed && !this.isLocked;
  }

  useHint(): string {
    if (!this.hasHint) {
      return '';
    }
    this.hintUsed = true;
    return this.hint;
  }

  get supportsFiftyFifty(): boolean {
    return false;
  }

  get canUseFiftyFifty(): boolean {
    return this.supportsFiftyFifty && !this.fiftyFiftyUsed && !this.isLocked;
  }

  get isAnswered(): boolean {
    return this.answerState !== null;
  }

  get isCorrect(): boolean {
    return this.answerState === 'correct';
  }

  /** No further interaction allowed: the answer is being checked or was already won. */
  get isLocked(): boolean {
    return this.submitting || this.isCorrect;
  }

  get hasBeenRetried(): boolean {
    return this.retryCount > 0;
  }

  /** Whether the player provided enough input for the Check button to be enabled. */
  get isReadyToSubmit(): boolean {
    return this.selectedAnswer !== null;
  }

  select(answer: TAnswer | null): void {
    if (this.isLocked) {
      return;
    }
    this.selectedAnswer = answer;
  }

  /** Freezes the current input as the answer to verify; returns null when nothing is ready. */
  prepareSubmission(): TAnswer | null {
    if (this.isLocked || !this.isReadyToSubmit) {
      return null;
    }

    const answer = this.buildAnswer();
    if (answer === null) {
      return null;
    }

    this.selectedAnswer = answer;
    this.submitting = true;
    return answer;
  }

  markAnswered(correct: boolean): void {
    this.submitting = false;
    this.answerState = correct ? 'correct' : 'incorrect';
    if (!correct && this.selectedAnswer !== null) {
      this.rejectedAnswers.push(this.selectedAnswer);
    }
  }

  /** Clears the last attempt; spent helps and rejected answers are kept. */
  retry(): void {
    this.retryCount += 1;
    this.answerState = null;
    this.submitting = false;
    this.selectedAnswer = null;
  }

  wasRejected(answer: TAnswer): boolean {
    return this.rejectedAnswers.some((rejected) => this.isSameAnswer(rejected, answer));
  }

  protected buildAnswer(): TAnswer | null {
    return this.selectedAnswer;
  }

  protected isSameAnswer(a: TAnswer, b: TAnswer): boolean {
    return a === b;
  }
}

/**
 * Activities answered by picking one of a list of labelled options.
 * Labels are what the player sees; the answer is what the backend expects.
 */
export abstract class ChoiceActivityModel<TAnswer = unknown> extends BaseActivityModel<TAnswer> {
  /** Options removed by the fifty-fifty help. */
  readonly eliminatedLabels = new Set<string>();

  abstract get optionLabels(): readonly string[];

  get selectedLabel(): string | null {
    return this.selectedAnswer === null ? null : this.labelForAnswer(this.selectedAnswer);
  }

  selectLabel(label: string): void {
    if (this.isLabelDisabled(label)) {
      return;
    }
    this.select(this.answerForLabel(label));
  }

  /** An option is dead once it was eliminated by a help or already tried and rejected. */
  isLabelDisabled(label: string): boolean {
    return (
      this.isLocked ||
      this.eliminatedLabels.has(label) ||
      this.wasRejected(this.answerForLabel(label))
    );
  }

  useFiftyFifty(labelsToRemove: readonly string[]): void {
    if (!this.canUseFiftyFifty) {
      return;
    }

    this.fiftyFiftyUsed = true;
    for (const label of labelsToRemove) {
      this.eliminatedLabels.add(label);
    }

    const selected = this.selectedLabel;
    if (selected !== null && this.eliminatedLabels.has(selected)) {
      this.selectedAnswer = null;
    }
  }

  protected abstract answerForLabel(label: string): TAnswer;
  protected abstract labelForAnswer(answer: TAnswer): string;
}
