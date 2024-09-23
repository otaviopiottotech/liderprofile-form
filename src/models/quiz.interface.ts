export interface answersProps {
  title?: string;
  correct_answer?: boolean;
  max_value_set_manually?: boolean;
  value?: number;
  weight?: number;
  marked?: boolean;
  type?: "%" | "nota";
  _id: string;
  id?: string;
}

export type questionsType =
  | "multi_select"
  | "select"
  | "group"
  | "range"
  | "track";

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
  open?: boolean;
  questions?: questionInput[];
}

export interface rulesModel {
  grade?: number;
  compare: string;
  message?: string;
  title?: string;
}

export interface dimensionModel {
  title?: string;
  description?: string;
  total?: number;
  calc?: string;
  color: string;
  open?: boolean;
  _id: string;
  grade?: number;
  rules?: rulesModel[];
  questions?: questionInput[];
}
