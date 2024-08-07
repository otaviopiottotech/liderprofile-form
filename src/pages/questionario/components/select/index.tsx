import { Select, SelectItem } from "../../../../components/select";
import { answersProps } from "../../../quiz/quiz.interface";

interface quizSelectProps {
  answers: answersProps[];
  onChangeAnswer: (data: any) => void;
}

const QuizSelect = ({ answers, onChangeAnswer }: quizSelectProps) => {
  return (
    <>
      <Select onValueChange={onChangeAnswer}>
        {answers?.map((a, i) => (
          <SelectItem key={i} value={a.title as string}>
            {a.title}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default QuizSelect;
