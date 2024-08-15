import { Select, SelectItem } from "../../../../components/select";
import { answersProps } from "../../../quiz/quiz.interface";

interface quizSelectProps {
  title: string;
  answers: answersProps[];
  onChangeAnswer: (data: any) => void;
}

const QuizSelect = ({ answers, onChangeAnswer, title }: quizSelectProps) => {
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
