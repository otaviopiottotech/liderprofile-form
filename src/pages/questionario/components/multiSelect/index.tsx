import { useEffect, useState } from "react";
import {
  answersProps,
  dimensionModel,
  questionInput,
} from "../../../../models/quiz.interface";
import {
  QuizMultiSelectContainer,
  QuizMultiSelectItemContainer,
} from "./styles";

export interface quizMultiSelectProps {
  answers: answersProps[];
  title: string;
  data?: questionInput & dimensionModel;
  child_key: string;
  onChangeAnswer: (data: any, code?: string, key?: string) => void;
}

const QuizMultiSelect = ({
  answers,
  title,
  onChangeAnswer,
}: quizMultiSelectProps) => {
  const [selected, setSelected] = useState<answersProps[]>([]);

  const handleSelectAnswer = (value: boolean, item: answersProps) => {
    if (value) {
      setSelected(() => [...selected, item]);
    } else {
      setSelected(() => {
        console.log({ selected });
        return selected.filter((e) => e._id !== item._id);
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
