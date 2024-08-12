export interface answersProps {
  title?: string;
  correct_answer?: boolean;
  value?: number;
  weight?: number;
  id: string;
}

export type questionsType = "multi_select" | "select";

export interface questionInput {
  code: string;
  title?: string;
  grade?: number;
  weight?: number;
  answers?: answersProps[];
  max_value?: number;
  max_value_set_manually?: boolean;
  color: string;
  type: questionsType;
  identifyer: string;
}

export interface dimensionModel {
  title: string;
  total: number;
  calc: string;
  questions: questionInput[];
}
