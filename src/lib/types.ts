
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: string;
  title: string;
  platform: string;
  url: string;
  difficulty: Difficulty;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  questionCount: number;
  questions: Question[];
}
