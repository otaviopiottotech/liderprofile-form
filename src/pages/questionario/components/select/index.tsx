import { Select, SelectItem } from "../../../../components/select";
import { quizMultiSelectProps } from "../multiSelect";

const QuizSelect = ({
  answers,
  onChangeAnswer,
  title,
}: quizMultiSelectProps) => {
  const handleSelectAnswer = (value: string) => {
    const findAnswer = answers.filter((e) => e.title === value);
    onChangeAnswer(findAnswer);
  };

  return (
    <Select
      label={title}
      onValueChange={handleSelectAnswer}
      placeholder="Selecione"
    >
      {answers?.map((a, i) => (
        <SelectItem key={title + i} value={a.title as string}>
          {a.title}
        </SelectItem>
      ))}
    </Select>
  );
};

export default QuizSelect;
