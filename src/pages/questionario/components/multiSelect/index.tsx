import { useEffect, useState } from "react";
import { answersProps } from "../../../quiz/quiz.interface";
import {
  QuizMultiSelectContainer,
  QuizMultiSelectItemContainer,
} from "./styles";

interface quizMultiSelectProps {
  answers: answersProps[];
  title: string;
  onChangeAnswer: (data: any) => void;
}

const QuizMultiSelect = ({
  answers,
  title,
  onChangeAnswer,
}: quizMultiSelectProps) => {
  const [selected, setSelected] = useState<answersProps[]>([]);

  const handleSelectAnswer = (value: boolean, item: answersProps) => {
    if (value) {
      setSelected((old) => [...old, item]);
    } else {
      setSelected((old) => {
        return old.filter((e) => e.id !== item.id);
      });
    }
  };

  useEffect(() => {
    onChangeAnswer(selected);
  }, [selected]);

  return (
    <>
      <QuizMultiSelectContainer>
        <label>{title}</label>

        <ul>
          {answers?.map((a, i) => (
            <MultiSelectItem
              key={title + i}
              title={a.title || ""}
              onSelect={(value) => handleSelectAnswer(value, a)}
            />
          ))}
        </ul>
      </QuizMultiSelectContainer>
    </>
  );
};

interface multiSelectItemProps {
  title: string;
  onSelect: (value: boolean) => void;
}

const MultiSelectItem = ({ title, onSelect }: multiSelectItemProps) => {
  const [select, setSelect] = useState(false);

  const handleSelect = () => {
    setSelect(!select);
    onSelect(!select);
  };

  return (
    <QuizMultiSelectItemContainer
      type="button"
      $selected={select}
      onClick={handleSelect}
    >
      <h6>{title}</h6>

      <span className="select-span" />
    </QuizMultiSelectItemContainer>
  );
};

export default QuizMultiSelect;
