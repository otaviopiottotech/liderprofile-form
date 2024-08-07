import { useEffect, useState } from "react";
import Input from "../../../../components/input";
import { MultiSelectContainer, ResponseOptionContainer } from "./styles";
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

const MultiSelectComponent = ({
  code,
  max_value,
  onUpdateQuestion,
  removeQuestion,
  child_key,
  max_to_set,
}: Partial<multiSelectProps>) => {
  const [minimize, setMinimize] = useState(false);

  const { register, watch, control, getValues, setValue } = useFormContext<{
    [x: string]: multiSelectInput;
  }>();

  useEffect(() => {
    const { max_value_set_manually } = getValues(child_key as string);

    if (!max_value_set_manually) {
      setValue(`${child_key}.max_value`, max_value);
    }
  }, [max_value, child_key]);

  const { fields, append, remove, update } = useFieldArray({
    name: `${child_key}.answers`,
    control,
  });

  const handleAddNewAnswer = () => {
    append({});
  };

  const handleUpdateAnswer = (index: number, data: answersProps) => {
    update(index, data);
  };

  const handleUpdateQuestionWeight = (data: multiSelectInput) => {
    onUpdateQuestion?.({
      ...watch(child_key as string),
      max_value: Number(data.max_value),
      max_value_set_manually: true,
    });
  };

  return (
    <MultiSelectContainer
      $minimize={minimize}
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
              max_to_set={max_to_set as number}
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
            onClick={removeQuestion}
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
                register={register}
                watch={watch}
                child_key={`${child_key}.answers.${i}`}
                remove={() => remove(i)}
                onUpdateValue={handleUpdateAnswer}
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
  onUpdateValue(index: number, data: answersProps): void;
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
    onUpdateValue(index, {
      ...watch(child_key),
      correct_answer: !watch(`${child_key}.correct_answer`),
    });
  };

  return (
    <ResponseOptionContainer>
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

export default MultiSelectComponent;
