export type ActivityType =
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'MATCHING'
  | 'ORDERING'
  | 'CLASSIFY'
  | 'PUZZLE'
  | 'DRAG_DROP'
  | 'FILL_BLANK'
  | 'MAP';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface GameStartResponse {
  activityId: string;
  title: string;
  type: ActivityType;
  difficulty: Difficulty;
}

/** Fields every activity renders, regardless of its type. */
export interface ActivityPresentationData {
  question: string;
  title?: string;
  description?: string;
  pictures?: string[];
  titleKey?: string;
  descriptionKey?: string;
  questionKey?: string;
}

/** Activity types that can offer the player a hint. */
export interface HintableActivityData extends ActivityPresentationData {
  hint?: string;
  hintKey?: string;
}

export interface MultipleChoiceActivityData extends HintableActivityData {
  options: string[];
}

export interface TrueFalseActivityData extends HintableActivityData {
  options: [boolean, boolean];
}

export interface ClassifyItem {
  id: string;
  label: string;
}

export interface ClassifyCategory {
  id: string;
  label: string;
}

export interface ClassifyActivityData extends HintableActivityData {
  items: ClassifyItem[];
  categories: ClassifyCategory[];
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
  image?: string;
}

export interface MatchingActivityData extends ActivityPresentationData {
  pairs: MatchingPair[];
}

export interface OrderingItem {
  id: string;
  text: string;
}

export interface OrderingActivityData extends HintableActivityData {
  items: OrderingItem[];
}

export interface PuzzleActivityData extends ActivityPresentationData {
  /** Image to be split into pieces and reassembled by the player. */
  image: string;
  /** Question unlocked once the puzzle is solved. */
  question: string;
  options: string[];
}

export type ActivityData =
  | MultipleChoiceActivityData
  | TrueFalseActivityData
  | ClassifyActivityData
  | MatchingActivityData
  | OrderingActivityData
  | PuzzleActivityData;

interface ActivityBase {
  activityId: string;
  title: string;
  difficulty: Difficulty;
  /** Graded activity: a wrong answer costs health. */
  isPractical?: boolean;
}

export interface MultipleChoiceActivity extends ActivityBase {
  type: 'MULTIPLE_CHOICE';
  data: MultipleChoiceActivityData;
}

export interface TrueFalseActivity extends ActivityBase {
  type: 'TRUE_FALSE';
  data: TrueFalseActivityData;
}

export interface ClassifyActivity extends ActivityBase {
  type: 'CLASSIFY';
  data: ClassifyActivityData;
}

export interface MatchingActivity extends ActivityBase {
  type: 'MATCHING';
  data: MatchingActivityData;
}

export interface OrderingActivity extends ActivityBase {
  type: 'ORDERING';
  data: OrderingActivityData;
}

export interface PuzzleActivity extends ActivityBase {
  type: 'PUZZLE';
  data: PuzzleActivityData;
}

export type Activity =
  | MultipleChoiceActivity
  | TrueFalseActivity
  | ClassifyActivity
  | MatchingActivity
  | OrderingActivity
  | PuzzleActivity;

export interface NextActivity {
  activityId: string;
  title: string;
  type: ActivityType;
  difficulty: Difficulty;
}

export interface AnswerResponse {
  correct: boolean;
  nextActivity: NextActivity | null;
  retry?: boolean;
  message?: string;
}
