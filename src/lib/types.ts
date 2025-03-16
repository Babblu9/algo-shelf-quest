
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id?: string;
  title: string;
  platform?: string;
  url?: string;
  link?: string;
  difficulty?: Difficulty;
  topicName?: string;
  topicSlug?: string;
}

export interface Topic {
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  questionCount?: number;
  questions: Question[];
}

export interface SearchResult {
  topics: Topic[];
  questions: Question[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
