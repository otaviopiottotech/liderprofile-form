import { useState } from "react";
import { answersProps } from "../../../quiz/quiz.interface";
import { QuizRangeContainer, QuizRangeItemContainer } from "./styles";

interface quizMultiSelectProps {
  answers: answersProps[];
  title: string;
  onChangeAnswer: (data: any) => void;
}

const QuizRange = ({
  answers,
  title,
  onChangeAnswer,
}: quizMultiSelectProps) => {
  const [selected, setItemSelected] = useState<answersProps>();

  const handleSelectItem = (data: answersProps) => {
    setItemSelected(data);
    onChangeAnswer([data]);
  };

  return (
    <>
      <QuizRangeContainer>
        <label>{title}</label>

        <ul>
          {answers?.map((a, i) => (
            <RangeItem
              key={title + i}
              title={a.title || ""}
              selected={a.id === selected?.id}
              index={i}
              onSelect={() => handleSelectItem(a)}
            />
          ))}
        </ul>
      </QuizRangeContainer>
    </>
  );
};

interface RangeItemProps {
  title: string;
  selected: boolean;
  index: number;
  onSelect: () => void;
}

const RangeItem = ({ title, onSelect, selected, index }: RangeItemProps) => {
  return (
    <QuizRangeItemContainer
      type="button"
      $index={index as 0 | 1 | 2 | 3 | 4}
      $selected={selected}
      onClick={onSelect}
    >
      <div className="range-check" />

      <h6>{title}</h6>
    </QuizRangeItemContainer>
  );
};

export default QuizRange;
