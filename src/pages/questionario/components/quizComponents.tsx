import QuizRange from "./Range";
import QuizMultiSelect from "./multiSelect";
import QuizSelect from "./select";
import QuizTrack from "./track";

const defaultProps = {
  answers: [],
  title: "",
  onChangeAnswer: (data: any) => console.log(data),
  child_key: "",
};

export const QuizComponentsList = {
  multi_select: <QuizMultiSelect {...defaultProps} />,
  select: <QuizSelect {...defaultProps} />,
  range: <QuizRange {...defaultProps} />,
  track: <QuizTrack {...defaultProps} />,
  group: <QuizTrack {...defaultProps} />,
};
