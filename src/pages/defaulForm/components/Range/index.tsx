import { useEffect, useMemo, useState } from "react";
import Input from "../../../../components/input";
import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { answersProps, questionInput } from "../../../../models/quiz.interface";
import { elementsProps, quizValue } from "../Group";
import { toast } from "sonner";
import { ChangeValueButton } from "../multiSelect";
import { RangeAnswerContainer, RangeContainer } from "./styles";
import ButtonComponent from "../../../../components/button";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const quizOptions = [
  "Discordo Totalmente",
  "Discordo",
  "Neutro",
  "Concordo",
  "Concordo Totalmente",
];

const QuizRangeComponent = ({
  code,
  max_value = 0,
  onUpdateQuestion,
  removeQuestion,
  child_key,
  questions,
}: Partial<elementsProps>) => {
  const [minimize, setMinimize] = useState(false);
  const [removeElement, setRemoveElement] = useState(false);
  const [invertOrder, setIvertOrder] = useState(false);

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

  useEffect(() => {
    const { max_value_set_manually } = getValues(child_key as string);

    if (!max_value_set_manually) {
      setValue(`${child_key}.max_value`, max_value);
    }
  }, [max_value, child_key]);

  const handleAddNewAnswer = (title?: string) => {
    const _id = window.crypto.randomUUID();

    append({
      _id,
      title,
      correct_answer: true,
    });
  };

  useMemo(() => {
    if (fields.length < 5) {
      quizOptions.forEach((e) => {
        handleAddNewAnswer(e);
      });
    }
  }, []);

  const handleUpdateAnswer = (index: number, data: answersProps) => {
    const value = ((data.weight as number) * max_value) / 100;

    update(index, { ...data, weight: value });
  };

  const handleUpdateQuestionWeight = (data: questionInput) => {
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
    let divideBy = fields.filter((e) => e?.correct_answer).length;
    let calcMaxValue = 100;

    const aFieldHasMaxValue = fields.filter(
      (filter) => filter.max_value_set_manually
    );

    if (aFieldHasMaxValue.length) {
      divideBy = fields.length - aFieldHasMaxValue.length;

      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.weight as number),
        0
      );

      calcMaxValue = 100 - maxFieldsValue;
    }

    const value = calcMaxValue;

    return parseFloat(value.toFixed(2));
  }, [fields, max_value]);

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
    <RangeContainer
      $minimize={minimize}
      $remove={removeElement}
      $isOpen={watch(`${child_key}.open`)}
      $color={watch(`${child_key}.color`)}
    >
      <div className="header">
        <div className="left-side">
          <div className="mark">
            <p>{code}</p>
          </div>

          <div className="title">
            <h4>Range:</h4>

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
        error={
          (errors as any)?.dimentions?.[dimensionIndex]?.questions?.[
            questionIndex
          ]?.title?.message
        }
      />

      <div className="response">
        <ul>
          {fields.map((e, i) => {
            let index = i;

            if (invertOrder) {
              index = fields.length - (i + 1);
            }

            const answerMaxValue = e.max_value_set_manually
              ? (e?.weight as number)
              : questionsMaxValue / (index + 1);

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
                  data={e}
                  onUpdateValue={handleUpdateAnswer}
                  max_value={parseFloat(answerMaxValue.toFixed(2))}
                  errors={
                    (errors as any)?.dimentions?.[dimensionIndex]?.questions?.[
                      questionIndex
                    ]?.answers?.[i]
                  }
                />
              </li>
            );
          })}
        </ul>

        <div className="button-container">
          <ButtonComponent
            buttonStyles="primary"
            buttonStylesType="outline"
            buttonSize="small"
            onClick={() => setIvertOrder(!invertOrder)}
          >
            <FaArrowRightArrowLeft />
            Inverter
          </ButtonComponent>
        </div>
      </div>
    </RangeContainer>
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
  errors: FieldErrors<answersProps>;
  data: answersProps;
}

const ResponseOption = ({
  onUpdateValue,
  index,
  watch,
  child_key,
  answers,
  max_value,
  question_value,
  data,
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

  useEffect(() => {
    if (max_value) {
      onUpdateValue(index, {
        ...data,
        weight: max_value,
      });
    } else {
      onUpdateValue(index, {
        ...data,
        weight: 0,
      });
    }
  }, [max_value]);

  const handleUpdateQuestionWeight = (value: questionInput) => {
    const data = watch(`${child_key}`);

    onUpdateValue?.(index, {
      ...data,
      weight: Number(value.max_value),
      max_value_set_manually: true,
    });
  };

  return (
    <RangeAnswerContainer $index={index as 0 | 1 | 2 | 3 | 4}>
      <div className="answer-preview">
        <ChangeValueButton
          max_value={answerValue}
          max_to_set={maxToSet}
          has_manually_set={watch(`${child_key}.max_value_set_manually`)}
          title={false}
          onUpdateQuestion={handleUpdateQuestionWeight}
        />
      </div>

      <p className="answer-title">{data?.title}</p>
    </RangeAnswerContainer>
  );
};

export default QuizRangeComponent;
