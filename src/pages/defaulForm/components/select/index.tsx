import { useEffect, useMemo, useState } from "react";
import Input from "../../../../components/input";
import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineRight,
} from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import {
  MultiSelectContainer,
  ResponseOptionContainer,
} from "../multiSelect/styles";
import { answersProps, questionInput } from "../../../../models/quiz.interface";
import { ChangeValueButton } from "../multiSelect";
import { elementsProps, quizValue } from "../Group";
import { toast } from "sonner";
import { MdCheckBox } from "react-icons/md";

const SelectComponent = ({
  code,
  max_value = 0,
  onUpdateQuestion,
  removeQuestion,
  child_key,
  questions,
}: Partial<elementsProps>) => {
  const [minimize, setMinimize] = useState(false);
  const [removeElement, setRemoveElement] = useState(false);
  const [_a, dimensionIndex, _b, questionIndex] = (child_key as string)?.split(
    "."
  );

  const {
    register,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<{
    [x: string]: questionInput;
  }>();

  const { fields, append, remove, update } = useFieldArray({
    name: `${child_key}.answers`,
    control,
  });

  useMemo(() => {
    setTimeout(() => {
      setValue(`${child_key}.open`, true);
    }, 100);
  }, []);

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
    fields.forEach((_, i) => {
      const answerData = getValues(`${child_key}.answers.${i}`);

      if (i === index) {
        update(i, data);
      } else {
        update(i, {
          ...answerData,
          weight: 0,
          correct_answer: false,
        });
      }
    });
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
    }, 200);
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
    let divideBy = fields.filter((e) => e?.correct_answer).length;
    let calcMaxValue = watch(`${child_key}.max_value`) || 0;

    const aFieldHasMaxValue = fields.filter(
      (filter) => filter.max_value_set_manually
    );

    if (aFieldHasMaxValue.length) {
      divideBy = fields.length - aFieldHasMaxValue.length;

      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.weight as number),
        0
      );

      calcMaxValue = (watch(`${child_key}.max_value`) || 0) - maxFieldsValue;
    }

    const value = calcMaxValue / (divideBy || 1);

    return parseFloat(value.toFixed(2));
  }, [fields, watch(`${child_key}.max_value`)]);

  useEffect(() => {
    const questionErrors =
      (errors as any)?.dimentions?.[dimensionIndex]?.questions?.[
        questionIndex
      ] || {};

    if (Object.keys(questionErrors)?.length) {
      for (const key in questionErrors) {
        const currentError = questionErrors[key];

        if (currentError?.message) {
          toast.error(currentError?.message);
        }
      }
    }
  }, [errors]);

  return (
    <MultiSelectContainer
      $minimize={minimize}
      $remove={removeElement}
      $isOpen={watch(`${child_key}.open`)}
      $color={watch(`${child_key}.color`)}
    >
      <section className="element-content">
        <div className="header">
          <div className="left-side">
            <div className="mark">
              <p>{code}</p>
              <div className="type-container">
                <MdCheckBox />
                <h4>Caixa de seleção</h4>
              </div>
            </div>

            <div className="title">
              {/* <h2 className="question-title">{watch(`${child_key}.title`)}</h2> */}

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
          inputSize="l"
          style={{ fontWeight: 600 }}
          register={{ ...register(`${child_key}.title`) }}
          error={
            (errors as any)?.dimentions?.[dimensionIndex]?.questions?.[
              questionIndex
            ]?.title?.message
          }
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
                    register={register}
                    answers={fields}
                    watch={watch}
                    data={e}
                    child_key={`${child_key}.answers.${i}`}
                    remove={() => remove(i)}
                    question_value={max_value}
                    onUpdateValue={handleUpdateAnswer}
                    max_value={answerMaxValue}
                    errors={
                      (errors as any)?.dimentions?.[dimensionIndex]
                        ?.questions?.[questionIndex]?.answers?.[i]
                    }
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
      </section>
    </MultiSelectContainer>
  );
};

interface responseProps {
  index: number;
  data: answersProps;
  onUpdateValue(index: number, data: answersProps): void;
  remove(): void;
  child_key: string;
  answers: answersProps[];
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  max_value: number;
  question_value: number;
  errors: FieldErrors<answersProps>;
}

const ResponseOption = ({
  onUpdateValue,
  index,
  watch,
  register,
  remove,
  child_key,
  max_value,
  answers,
  data,
  question_value,
  errors,
}: responseProps) => {
  const answerValue = data?.correct_answer ? max_value : 0;

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
      weight: max_value,
      correct_answer: !data?.correct_answer,
    });
  };

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
        error={errors?.title?.message}
      />
      <ChangeValueButton
        max_value={answerValue}
        max_to_set={maxToSet}
        has_manually_set={watch(`${child_key}.max_value_set_manually`)}
        title={false}
        onUpdateQuestion={handleUpdateQuestionWeight}
      />
      <button
        type="button"
        className={data?.correct_answer ? "correct btn" : "btn"}
        onClick={handleMarkAsCorrect}
        title="Marcar resposta como correta"
      >
        {data?.correct_answer && <FaCheck />}
      </button>
      <button type="button" className="delete-button" onClick={remove}>
        <AiOutlineDelete />
      </button>
    </ResponseOptionContainer>
  );
};

export default SelectComponent;
