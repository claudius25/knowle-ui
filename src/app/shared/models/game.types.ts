export type ActivityType =
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'MATCHING'
  | 'ORDERING'
  | 'CLASSIFY'
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
  options: string[];
}

export interface TrueFalseActivityData {
  question: string;
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

export interface ClassifyActivityData {
  question: string;
  items: ClassifyItem[];
  categories: ClassifyCategory[];
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingActivityData {
  question: string;
  pairs: MatchingPair[];
}

export interface OrderingItem {
  id: string;
  text: string;
}

export interface OrderingActivityData {
  question: string;
  items: OrderingItem[];
}

export type ActivityData =
  | MultipleChoiceActivityData
  | TrueFalseActivityData
  | ClassifyActivityData
  | MatchingActivityData
  | OrderingActivityData;

export interface MultipleChoiceActivity {
  activityId: string;
  title: string;
  type: 'MULTIPLE_CHOICE';
  difficulty: Difficulty;
  data: MultipleChoiceActivityData;
}

export interface TrueFalseActivity {
  activityId: string;
  title: string;
  type: 'TRUE_FALSE';
  difficulty: Difficulty;
  data: TrueFalseActivityData;
}

export interface ClassifyActivity {
  activityId: string;
  title: string;
  type: 'CLASSIFY';
  difficulty: Difficulty;
  data: ClassifyActivityData;
}

export interface MatchingActivity {
  activityId: string;
  title: string;
  type: 'MATCHING';
  difficulty: Difficulty;
  data: MatchingActivityData;
}

export interface OrderingActivity {
  activityId: string;
  title: string;
  type: 'ORDERING';
  difficulty: Difficulty;
  data: OrderingActivityData;
}

export type Activity =
  | MultipleChoiceActivity
  | TrueFalseActivity
  | ClassifyActivity
  | MatchingActivity
  | OrderingActivity;

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
