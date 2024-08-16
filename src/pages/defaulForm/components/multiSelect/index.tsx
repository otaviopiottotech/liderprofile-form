import { useEffect, useMemo, useState } from "react";
import Input from "../../../../components/input";
import {
  EditValueModalContainer,
  MultiSelectContainer,
  ResponseOptionContainer,
} from "./styles";
import {
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineRight,
  AiOutlineSave,
} from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { answersProps, questionInput } from "../../../quiz/quiz.interface";
import { PopOverRoot, PopOverTrigger } from "../../../../components/popOver";
import { elementsProps, quizValue } from "../Group";

const MultiSelectComponent = ({
  code,
  max_value = 0,
  onUpdateQuestion,
  removeQuestion,
  child_key,
  questions,
  max_to_set,
}: Partial<elementsProps>) => {
  const [minimize, setMinimize] = useState(false);
  const [removeElement, setRemoveElement] = useState(false);

  const { register, watch, control, getValues, setValue } = useFormContext<{
    [x: string]: questionInput;
  }>();

  const { fields, append, remove, update } = useFieldArray({
    name: `${child_key}.answers`,
    control,
  });

  const updateAnswerWeight = (weight: number) => {
    const answersIfWeight = fields.filter((e) => !!e.weight);

    if (answersIfWeight.length) {
      const currentAnswer = answersIfWeight[0];
      const answerIndex = fields.findIndex((e) => e.id === currentAnswer.id);

      update(answerIndex, {
        ...currentAnswer,
        weight,
      });
    }
  };

  useEffect(() => {
    const { max_value_set_manually } = getValues(child_key as string);

    if (!max_value_set_manually) {
      updateAnswerWeight(max_value as number);

      setValue(`${child_key}.max_value`, max_value);
    }
  }, [max_value, child_key]);

  const handleAddNewAnswer = () => {
    const _id = window.crypto.randomUUID();

    append({
      _id,
    });
  };

  const handleUpdateAnswer = (index: number, data: answersProps) => {
    update(index, data);
  };

  const handleUpdateQuestionWeight = (data: questionInput) => {
    updateAnswerWeight(Number(data.max_value));

    onUpdateQuestion?.({
      ...watch(child_key as string),
      max_value: Number(data.max_value),
      max_value_set_manually: true,
    });
  };

  const handleRemoveQuestion = () => {
    setRemoveElement(true);

    setTimeout(() => {
      removeQuestion?.();
    }, 300);
  };

  const maxToSet = useMemo(() => {
    let calcMaxValue = quizValue;
    const _id = watch(`${child_key}._id`);

    if (!questions?.length) return quizValue;

    const aFieldHasMaxValue = questions?.filter(
      (filter) => filter.max_value_set_manually && filter._id !== _id
    );

    if (aFieldHasMaxValue.length) {
      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.weight as number),
        0
      );

      calcMaxValue = quizValue - maxFieldsValue;
    }
    return calcMaxValue;
  }, [questions, quizValue]);

  const questionsMaxValue = useMemo(() => {
    let divideBy = fields.length;
    let calcMaxValue = max_value;

    const aFieldHasMaxValue = fields.filter(
      (filter) => filter.max_value_set_manually
    );

    if (aFieldHasMaxValue.length) {
      divideBy = fields.length - aFieldHasMaxValue.length;

      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.weight as number),
        0
      );

      calcMaxValue = max_value - maxFieldsValue;
    }

    const value = calcMaxValue / divideBy;

    return parseFloat(value.toFixed(2));
  }, [fields, max_value]);

  return (
    <MultiSelectContainer
      $minimize={minimize}
      $remove={removeElement}
      $color={watch(`${child_key}.color`)}
    >
      <div className="header">
        <div className="left-side">
          <div className="mark">
            <p>{code}</p>
          </div>

          <div className="title">
            <h4>Múltipla Escolha:</h4>

            <h2 className="question-title">{watch(`${child_key}.title`)}</h2>
            <ChangeValueButton
              max_value={max_value as number}
              max_to_set={maxToSet}
              onUpdateQuestion={handleUpdateQuestionWeight}
            />
          </div>
        </div>

        <div className="right-side">
          <button
            type="button"
            className="minimize-button"
            onClick={() => setMinimize(!minimize)}
          >
            <AiOutlineRight />
          </button>

          <button
            type="button"
            className="remove-button"
            onClick={handleRemoveQuestion}
          >
            <AiOutlineClose />
          </button>
        </div>
      </div>

      <Input
        label="Pergunta"
        register={{ ...register(`${child_key}.title`) }}
      />

      <div className="response">
        <ul>
          {fields.map((e, i) => {
            const answerMaxValue = e.max_value_set_manually
              ? (e?.weight as number)
              : questionsMaxValue;

            return (
              <li key={e._id + answerMaxValue}>
                <ResponseOption
                  index={i}
                  answers={fields}
                  register={register}
                  watch={watch}
                  child_key={`${child_key}.answers.${i}`}
                  remove={() => remove(i)}
                  question_value={max_value}
                  onUpdateValue={handleUpdateAnswer}
                  max_value={answerMaxValue}
                />
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="add-new-btn"
          onClick={handleAddNewAnswer}
        >
          Adicionar Resposta
        </button>
      </div>
    </MultiSelectContainer>
  );
};

interface responseProps {
  index: number;
  answers: answersProps[];
  onUpdateValue(index: number, data: answersProps): void;
  remove(): void;
  child_key: string;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  max_value: number;
  question_value: number;
}

const ResponseOption = ({
  onUpdateValue,
  index,
  watch,
  register,
  remove,
  child_key,
  answers,
  max_value,
  question_value,
}: responseProps) => {
  const correct_answer = watch(`${child_key}.correct_answer`) || false;

  const maxToSet = useMemo(() => {
    let calcMaxValue = question_value;
    const _id = watch(`${child_key}._id`);

    const aFieldHasMaxValue = answers.filter(
      (filter) => filter.max_value_set_manually && filter._id !== _id
    );

    if (aFieldHasMaxValue.length) {
      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.weight as number),
        0
      );

      calcMaxValue = question_value - maxFieldsValue;
    }
    return calcMaxValue;
  }, [answers, question_value]);

  const handleMarkAsCorrect = () => {
    onUpdateValue(index, {
      ...watch(child_key),
      correct_answer: !watch(`${child_key}.correct_answer`),
    });
  };

  useEffect(() => {
    const max_value_set_manually = watch(`${child_key}.max_value_set_manually`);

    if (!max_value_set_manually) {
      onUpdateValue(index, {
        ...watch(child_key),
        weight: max_value,
      });
    }
  }, [max_value, child_key]);

  const handleUpdateQuestionWeight = (data: questionInput) => {
    onUpdateValue?.(index, {
      ...watch(child_key),
      weight: Number(data.max_value),
      max_value_set_manually: true,
    });
  };

  return (
    <ResponseOptionContainer>
      <Input
        placeholder="Opção"
        register={{ ...register(`${child_key}.title`) }}
      />
      <ChangeValueButton
        max_value={max_value as number}
        max_to_set={maxToSet}
        title={false}
        onUpdateQuestion={handleUpdateQuestionWeight}
      />
      <button
        type="button"
        className={correct_answer ? "correct btn" : "btn"}
        onClick={handleMarkAsCorrect}
        title="Marcar resposta como correta"
      >
        {correct_answer && <FaCheck />}
      </button>
      <button type="button" className="delete-button" onClick={remove}>
        <AiOutlineDelete />
      </button>
    </ResponseOptionContainer>
  );
};

interface props {
  onUpdateQuestion(data: any): void;
  max_value: number;
  max_to_set: number;
  title?: boolean;
}

export const ChangeValueButton = ({
  max_value,
  max_to_set,
  title = true,
  onUpdateQuestion,
}: props) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm<{ value: number }>();

  useEffect(() => {
    if (max_value) {
      setValue("value", max_value);
    }
  }, [max_value]);

  const sendNewValue = handleSubmit(({ value }) => {
    if (!value) {
      return;
    }
    if (Number(value) > max_to_set) {
      window.alert("Não é possível adicionar esse valor");
      return;
    }
    onUpdateQuestion({ max_value: value });
    setOpen(false);
  });

  return (
    <>
      <div className="subHeader">
        {title && <span>Peso da questão:</span>}

        <div>
          <span>{max_value}</span>
          <PopOverRoot
            open={open}
            onOpenChange={() => setOpen(!open)}
            trigger={
              <PopOverTrigger className={open ? "" : "edit"}>
                <AiOutlineEdit />
              </PopOverTrigger>
            }
          >
            <EditValueModalContainer>
              <Input
                register={{ ...register("value") }}
                max={max_to_set}
                type="number"
              />

              <button type="button" onClick={sendNewValue}>
                <AiOutlineSave />
              </button>
              <button type="button" onClick={() => setOpen(false)}>
                <AiOutlineClose />
              </button>
            </EditValueModalContainer>
          </PopOverRoot>
        </div>
      </div>
    </>
  );
};

export default MultiSelectComponent;
