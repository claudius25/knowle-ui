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

export interface MultipleChoiceActivityData {
  question: string;
  title?: string;
  description?: string;
  options: string[];
  pictures?: string[];
  hint?: string;
  titleKey?: string;
  descriptionKey?: string;
  questionKey?: string;
  hintKey?: string;
}

export interface TrueFalseActivityData {
  question: string;
  title?: string;
  description?: string;
  options: [boolean, boolean];
  pictures?: string[];
  hint?: string;
  titleKey?: string;
  descriptionKey?: string;
  questionKey?: string;
  hintKey?: string;
}

export interface ClassifyItem {
  id: string;
  label: string;
}

export interface ClassifyCategory {
  id: string;
  label: string;
}

export interface ClassifyActivityData {
  question: string;
  title?: string;
  description?: string;
  items: ClassifyItem[];
  categories: ClassifyCategory[];
  hint?: string;
  titleKey?: string;
  descriptionKey?: string;
  questionKey?: string;
  hintKey?: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
  image?: string;
}

export interface MatchingActivityData {
  question: string;
  title?: string;
  description?: string;
  pairs: MatchingPair[];
  titleKey?: string;
  descriptionKey?: string;
  questionKey?: string;
}

export interface OrderingItem {
  id: string;
  text: string;
}

export interface OrderingActivityData {
  question: string;
  title?: string;
  description?: string;
  items: OrderingItem[];
  hint?: string;
  titleKey?: string;
  descriptionKey?: string;
  questionKey?: string;
  hintKey?: string;
}

export interface PuzzleActivityData {
  /** Image to be split into pieces and reassembled by the player. */
  image: string;
  /** Question unlocked once the puzzle is solved. */
  question: string;
  options: string[];
  title?: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
  questionKey?: string;
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
  /** Practice activity: a wrong answer does not cost health. */
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
