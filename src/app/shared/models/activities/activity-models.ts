import {
  ClassifyActivity,
  ClassifyActivityData,
  ClassifyItem,
  MatchingActivity,
  MatchingActivityData,
  MultipleChoiceActivity,
  MultipleChoiceActivityData,
  OrderingActivity,
  OrderingActivityData,
  OrderingItem,
  PuzzleActivity,
  PuzzleActivityData,
  TrueFalseActivity,
  TrueFalseActivityData,
  Activity,
} from '../game.types';
import { BaseActivityModel, ChoiceActivityModel } from './base-activity.model';

/** Returns a copy in random order; never the original order when more than one element. */
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  if (result.length <= 1) {
    return result;
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  if (result.every((item, index) => item === items[index])) {
    result.push(result.shift()!);
  }

  return result;
}

export class MultipleChoiceActivityModel extends ChoiceActivityModel<string> {
  declare readonly type: 'MULTIPLE_CHOICE';
  declare readonly data: MultipleChoiceActivityData;

  constructor(activity: MultipleChoiceActivity) {
    super(activity);
  }

  override get supportsFiftyFifty(): boolean {
    return true;
  }

  override get optionLabels(): readonly string[] {
    return this.data.options;
  }

  protected override answerForLabel(label: string): string {
    return label;
  }

  protected override labelForAnswer(answer: string): string {
    return answer;
  }
}

export class TrueFalseActivityModel extends ChoiceActivityModel<boolean> {
  declare readonly type: 'TRUE_FALSE';
  declare readonly data: TrueFalseActivityData;

  private labels: [string, string] = ['True', 'False'];

  constructor(activity: TrueFalseActivity) {
    super(activity);
  }

  /** The localized labels are resolved by the component that renders the activity. */
  setLabels(trueLabel: string, falseLabel: string): void {
    this.labels = [trueLabel, falseLabel];
  }

  override get optionLabels(): readonly string[] {
    return this.labels;
  }

  protected override answerForLabel(label: string): boolean {
    return label === this.labels[0];
  }

  protected override labelForAnswer(answer: boolean): string {
    return answer ? this.labels[0] : this.labels[1];
  }
}

export class PuzzleActivityModel extends ChoiceActivityModel<string> {
  declare readonly type: 'PUZZLE';
  declare readonly data: PuzzleActivityData;

  /** The question is only answerable once the picture has been reassembled. */
  solved = false;

  constructor(activity: PuzzleActivity) {
    super(activity);
  }

  override get optionLabels(): readonly string[] {
    return this.data.options;
  }

  override get isReadyToSubmit(): boolean {
    return this.solved && this.selectedAnswer !== null;
  }

  protected override answerForLabel(label: string): string {
    return label;
  }

  protected override labelForAnswer(answer: string): string {
    return answer;
  }
}

export class ClassifyActivityModel extends BaseActivityModel<Record<string, string>> {
  declare readonly type: 'CLASSIFY';
  declare readonly data: ClassifyActivityData;

  /** Items not placed in a category yet. */
  pool: ClassifyItem[] = [];
  /** Items dropped in each category, keyed by category id. */
  categoryItems: Record<string, ClassifyItem[]> = {};

  constructor(activity: ClassifyActivity) {
    super(activity);
    this.resetPlacement();
  }

  resetPlacement(): void {
    this.pool = [...this.data.items];
    this.categoryItems = Object.fromEntries(
      this.data.categories.map((category) => [category.id, [] as ClassifyItem[]]),
    );
  }

  get isComplete(): boolean {
    return this.pool.length === 0;
  }

  override get isReadyToSubmit(): boolean {
    return this.isComplete;
  }

  protected override buildAnswer(): Record<string, string> {
    const selections: Record<string, string> = {};
    for (const [categoryId, items] of Object.entries(this.categoryItems)) {
      for (const item of items) {
        selections[item.id] = categoryId;
      }
    }
    return selections;
  }

  protected override isSameAnswer(a: Record<string, string>, b: Record<string, string>): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}

export class OrderingActivityModel extends BaseActivityModel<string[]> {
  declare readonly type: 'ORDERING';
  declare readonly data: OrderingActivityData;

  /** Items in the order currently shown to the player. */
  items: OrderingItem[] = [];

  constructor(activity: OrderingActivity) {
    super(activity);
    this.items = shuffle(this.data.items);
  }

  override get isReadyToSubmit(): boolean {
    return this.items.length > 0;
  }

  protected override buildAnswer(): string[] {
    return this.items.map((item) => item.id);
  }

  protected override isSameAnswer(a: string[], b: string[]): boolean {
    return a.length === b.length && a.every((id, index) => id === b[index]);
  }
}

export interface MatchingColumnItem {
  id: string;
  text: string;
  image?: string;
}

/** Outcome of clicking a card while a card from the other column was already picked. */
export interface MatchAttempt {
  leftId: string;
  rightId: string;
  matched: boolean;
}

export class MatchingActivityModel extends BaseActivityModel<Record<string, string>> {
  declare readonly type: 'MATCHING';
  declare readonly data: MatchingActivityData;

  leftItems: MatchingColumnItem[] = [];
  rightItems: MatchingColumnItem[] = [];
  /** Ids of the pairs already matched; both columns share the pair id. */
  readonly matchedPairIds = new Set<string>();
  selectedLeftId: string | null = null;
  selectedRightId: string | null = null;

  constructor(activity: MatchingActivity) {
    super(activity);
    this.leftItems = this.data.pairs.map((pair) => ({
      id: pair.id,
      text: pair.left,
      image: pair.image,
    }));
    this.rightItems = shuffle(this.data.pairs.map((pair) => ({ id: pair.id, text: pair.right })));
  }

  get isComplete(): boolean {
    return this.data.pairs.length > 0 && this.matchedPairIds.size === this.data.pairs.length;
  }

  override get isReadyToSubmit(): boolean {
    return this.isComplete;
  }

  isMatched(id: string): boolean {
    return this.matchedPairIds.has(id);
  }

  selectLeft(id: string): MatchAttempt | null {
    if (this.isLocked || this.isMatched(id)) {
      return null;
    }

    if (this.selectedLeftId === id) {
      this.selectedLeftId = null;
      return null;
    }

    this.selectedLeftId = id;
    return this.selectedRightId === null ? null : this.resolvePair(id, this.selectedRightId);
  }

  selectRight(id: string): MatchAttempt | null {
    if (this.isLocked || this.isMatched(id)) {
      return null;
    }

    if (this.selectedRightId === id) {
      this.selectedRightId = null;
      return null;
    }

    this.selectedRightId = id;
    return this.selectedLeftId === null ? null : this.resolvePair(this.selectedLeftId, id);
  }

  clearSelection(): void {
    this.selectedLeftId = null;
    this.selectedRightId = null;
  }

  protected override buildAnswer(): Record<string, string> {
    const matches: Record<string, string> = {};
    for (const id of this.matchedPairIds) {
      matches[id] = id;
    }
    return matches;
  }

  private resolvePair(leftId: string, rightId: string): MatchAttempt {
    const matched = leftId === rightId;
    if (matched) {
      this.matchedPairIds.add(leftId);
      this.clearSelection();
    }
    return { leftId, rightId, matched };
  }
}

export type ActivityModel =
  | MultipleChoiceActivityModel
  | TrueFalseActivityModel
  | ClassifyActivityModel
  | MatchingActivityModel
  | OrderingActivityModel
  | PuzzleActivityModel;

export function createActivityModel(activity: Activity): ActivityModel {
  switch (activity.type) {
    case 'MULTIPLE_CHOICE':
      return new MultipleChoiceActivityModel(activity);
    case 'TRUE_FALSE':
      return new TrueFalseActivityModel(activity);
    case 'CLASSIFY':
      return new ClassifyActivityModel(activity);
    case 'MATCHING':
      return new MatchingActivityModel(activity);
    case 'ORDERING':
      return new OrderingActivityModel(activity);
    case 'PUZZLE':
      return new PuzzleActivityModel(activity);
  }
}
