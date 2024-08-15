export interface answersProps {
  title?: string;
  correct_answer?: boolean;
  max_value_set_manually?: boolean;
  value?: number;
  weight?: number;
  _id: string;
  id?: string;
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
  _id: string;
}

export interface dimensionModel {
  title: string;
  total: number;
  calc: string;
  questions: questionInput[];
}
