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
  description?: string;
  options: string[];
  pictures?: string[];
  descriptionKey?: string;
  questionKey?: string;
}

export interface TrueFalseActivityData {
  question: string;
  description?: string;
  options: [boolean, boolean];
  pictures?: string[];
  descriptionKey?: string;
  questionKey?: string;
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
  description?: string;
  items: ClassifyItem[];
  categories: ClassifyCategory[];
  descriptionKey?: string;
  questionKey?: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
  image?: string;
}

export interface MatchingActivityData {
  question: string;
  description?: string;
  pairs: MatchingPair[];
  descriptionKey?: string;
  questionKey?: string;
}

export interface OrderingItem {
  id: string;
  text: string;
}

export interface OrderingActivityData {
  question: string;
  description?: string;
  items: OrderingItem[];
  descriptionKey?: string;
  questionKey?: string;
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
