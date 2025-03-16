
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id?: string;
  title: string;
  platform?: string;
  url?: string;
  link?: string;
  difficulty?: Difficulty;
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
