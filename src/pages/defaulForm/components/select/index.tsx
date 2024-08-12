import { useEffect, useState } from "react";
import Input from "../../../../components/input";
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
import {
  MultiSelectContainer,
  ResponseOptionContainer,
} from "../multiSelect/styles";

interface multiSelectInput {
  id: string;
  title: string;
  grade: number;
  weight: number;
  answers: answersProps[];
  max_value?: number;
  max_value_set_manually?: boolean;
}

interface answersProps {
  id?: string;
  title?: string;
  correct_answer?: boolean;
  value?: number;
  weight?: number;
}

interface multiSelectProps {
  code: string;
  index: number;
  max_value: number;
  onUpdateQuestion(data: any): void;
  removeQuestion: () => void;
  max_to_set: number;
  child_key: string;
}

const SelectComponent = ({
  code,
  max_value,
  onUpdateQuestion,
  removeQuestion,
  child_key,
  max_to_set,
}: Partial<multiSelectProps>) => {
  const [minimize, setMinimize] = useState(false);
  const [removeElement, setRemoveElement] = useState(false);

  const { register, watch, control, getValues, setValue } = useFormContext<{
    [x: string]: multiSelectInput;
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
    append({});
  };

  const handleUpdateAnswer = (
    index: number,
    value: boolean,
    data: answersProps
  ) => {
    const answerWeight = watch(`${child_key}.max_value`);

    console.log({ fields });

    fields.forEach((e, i) => {
      if (i === index) {
        update(i, {
          ...data,
          weight: value ? answerWeight : undefined,
          correct_answer: value,
        });
      } else {
        const answerData = getValues(`${child_key}.answers.${i}`);
        update(i, {
          ...answerData,
          weight: undefined,
          correct_answer: false,
        });
      }
    });
  };

  const handleUpdateQuestionWeight = (data: multiSelectInput) => {
    updateAnswerWeight(Number(data.max_value));

    setValue(`${child_key}.max_value`, max_value);

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
    }, 200);
  };

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
            <h4>Caixa de seleção:</h4>

            <h2 className="question-title">{watch(`${child_key}.title`)}</h2>
            {!minimize && (
              <ChangeValueButton
                max_value={max_value as number}
                max_to_set={max_to_set as number}
                onUpdateQuestion={handleUpdateQuestionWeight}
              />
            )}
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
          {fields.map((e, i) => (
            <li key={i}>
              <ResponseOption
                id={e.id}
                index={i}
                watch={watch}
                register={register}
                remove={() => remove(i)}
                onUpdateValue={handleUpdateAnswer}
                child_key={`${child_key}.answers.${i}`}
              />
            </li>
          ))}
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
  id: string;
  index: number;
  onUpdateValue(index: number, value: boolean, data: answersProps): void;
  remove(): void;
  child_key: string;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

const ResponseOption = ({
  onUpdateValue,
  index,
  watch,
  register,
  remove,
  child_key,
}: responseProps) => {
  const correct_answer = watch(`${child_key}.correct_answer`) || false;

  const handleMarkAsCorrect = () => {
    onUpdateValue(index, !correct_answer, watch(`${child_key}`));
  };

  return (
    <ResponseOptionContainer>
      <span className="font-weight-span">{watch(`${child_key}.weight`)}</span>
      <Input
        placeholder="Opção"
        register={{ ...register(`${child_key}.title`) }}
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
}

const ChangeValueButton = ({
  max_value,
  max_to_set,
  onUpdateQuestion,
}: props) => {
  const [changeValue, setChangeValue] = useState(false);

  const { register, handleSubmit, setValue } = useForm<{ value: number }>();

  useEffect(() => {
    if (max_value) {
      setValue("value", max_value);
    }
  }, [max_value]);

  const sendNewValue = handleSubmit(({ value }) => {
    if (!value) {
      setChangeValue(false);
      return;
    }

    if (Number(value) > max_to_set) {
      window.alert("Naaaah");
      return;
    }
    onUpdateQuestion({ max_value: value });
    setChangeValue(false);
  });

  return (
    <div className="subHeader">
      <span>Peso da questão:</span>
      {!changeValue ? (
        <div>
          <span>{max_value}</span>

          <button
            type="button"
            className="edit"
            onClick={() => setChangeValue(!changeValue)}
          >
            <AiOutlineEdit />
          </button>
        </div>
      ) : (
        <div>
          <Input
            register={{ ...register("value") }}
            max={max_to_set}
            type="number"
          />

          <button type="button" onClick={sendNewValue}>
            <AiOutlineSave />
          </button>
          <button type="button" onClick={() => setChangeValue(!changeValue)}>
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
