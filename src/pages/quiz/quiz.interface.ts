export interface answersProps {
  title?: string;
  correct_answer?: boolean;
  max_value_set_manually?: boolean;
  value?: number;
  weight?: number;
  type?: "%" | "nota";
  _id: string;
  id?: string;
}

export type questionsType = "multi_select" | "select" | "group";

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
  title?: string;
  total?: number;
  calc?: string;
  color: string;
  _id: string;
  questions?: questionInput[];
}
