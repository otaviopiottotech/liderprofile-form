import { useFormContext, useFieldArray } from "react-hook-form";
import { TrackGroupContainer } from "./styles";
import { DragEvent, cloneElement, useEffect, useMemo, useState } from "react";
import {
  dimensionModel,
  questionInput,
  questionsType,
} from "../../../../models/quiz.interface";
import { getRandomColor } from "../../../../utils/randomColor";
import { extractPatterns } from "../../../../utils/extractPattern";
import { elementsOptions } from "../../../quiz/components/elementsSelection";
import { AiOutlineClose, AiOutlineEdit, AiOutlineRight } from "react-icons/ai";
import { toast } from "sonner";
import { EmptyQuizContainer } from "../Group/styles";
import { ComponentsList, elementsProps } from "../Group";
import Modal from "../../../../components/modal";
import QuizDimentionsConfig from "../../../quiz/components/dimensions";
import { getValueFromPath } from "../../../quiz";

const handleRemoveQuestion = (expression: string, nodeToRemove: string) => {
  const regex = new RegExp(
    `(\\+|\\-|\\*|\\/)?\\s*${nodeToRemove}\\s*(\\+|\\-|\\*|\\/)?`,
    "g"
  );

  let sanitized = expression.replace(regex, (_, p1, p2) => {
    if (p1 && p2) {
      return p2;
    } else {
      return "";
    }
  });

  sanitized = sanitized.replace(/(\+|\-|\*|\/)\s*(\+|\-|\*|\/)/g, "$1");
  sanitized = sanitized.replace(/(\+|\-|\*|\/)\s*\)/g, ")");
  sanitized = sanitized.replace(/\(\s*(\+|\-|\*|\/)/g, "(");
  sanitized = sanitized.replace(/^\s*(\+|\-|\*|\/)/, "");
  sanitized = sanitized.replace(/(\+|\-|\*|\/)\s*$/, "");

  const newPattern = extractPatterns(sanitized.trim());

  for (let i = 0; i < newPattern.length; i++) {
    const nodeToCompare = "P" + (i + 1);
    const currentNode = newPattern[i];

    if (nodeToCompare !== currentNode) {
      const nodePosition = Number(currentNode.replace("P", ""));
      const nodeToReplace = "P" + (nodePosition - 1);
      sanitized = sanitized.replaceAll(currentNode, nodeToReplace);
    }
  }

  return sanitized;
};

interface formGroupProps {
  child_key: string;
  removeQuestion: () => void;
}

const TrackComponent = ({
  child_key,
  removeQuestion,
  max_value,
  code,
}: Partial<formGroupProps & elementsProps>) => {
  const [open, setOpen] = useState(false);
  const [removeElement, setRemoveElement] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [dragOverClassName, setDragOverClassName] = useState("");

  const formContext = useFormContext<{
    [x: string]: dimensionModel;
  }>();

  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = formContext;

  const { fields, append, remove, update } = useFieldArray({
    name: `${child_key}.questions`,
    control,
  });

  useMemo(() => {
    setTimeout(() => {
      setValue(`${child_key}.open`, true);
    }, 100);
  }, []);

  const handleAddNewQuestion = (type: questionsType) => {
    let calculationString = watch(`${child_key}.calc`);

    const code = `P${fields.length + 1}`;
    const _id = window.crypto.randomUUID();

    append({
      color: getRandomColor(),
      code,
      _id,
      type,
    });

    if (!calculationString) {
      calculationString = code;
    } else {
      calculationString = `${calculationString}+${code}`;
    }
    setValue(`${child_key}.calc`, calculationString);
  };

  const handleUpdateQuestion = (index: number, data: questionInput) => {
    update(index, data);
  };

  useEffect(() => {
    const fieldsLength = fields.length;

    let calculationString = watch(`${child_key}.calc`);

    const pattern = extractPatterns(watch(`${child_key}.calc`) as string);

    //Verify on the calculation string if the fields has some deleted nodes
    if (fieldsLength !== pattern.length) {
      const fieldsPattern = fields.map((e) => e.code);

      const differenceBetween = pattern.filter(
        (e) => !fieldsPattern.some((f) => e === f)
      );

      //Has found an removed field
      if (differenceBetween.length) {
        //Loop through the removed fields to remove them from the 'calc' field
        for (let index = 0; index < differenceBetween.length; index++) {
          const currentArg = differenceBetween[index];

          calculationString = handleRemoveQuestion(
            calculationString as string,
            currentArg
          );

          fields.forEach((e, fieldIndex) => {
            update(fieldIndex, {
              ...e,
              code: "P" + (fieldIndex + 1),
            });
          });
        }
      }
    }

    setValue(`${child_key}.calc`, calculationString);
  }, [fields]);

  const questionsMaxValue = useMemo(() => {
    let divideBy = fields.length;
    let calcMaxValue = max_value;

    const aFieldHasMaxValue = fields.filter(
      (filter) => filter.max_value_set_manually
    );

    if (aFieldHasMaxValue.length) {
      divideBy = fields.length - aFieldHasMaxValue.length;

      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.max_value as number),
        0
      );

      calcMaxValue = (max_value as number) - maxFieldsValue;
    }

    return Math.trunc((calcMaxValue as number) / divideBy);
  }, [fields, max_value]);

  const formulaVisualizer = useMemo(() => {
    let calculationString = watch(`${child_key}.calc`);

    if (calculationString) {
      for (let i = 0; i < fields.length; i++) {
        const currentField = fields[i];

        const regex = new RegExp(`\\b${currentField.code}\\b`, "g");

        calculationString = calculationString.replaceAll(
          regex,
          `<span class="calc-item" style="background:${currentField.color}">${currentField.code}</span>`
        );
      }

      return calculationString;
    }
    return "";
  }, [watch(`${child_key}.calc`)]);

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    let eventData = event.dataTransfer.getData("new-element");
    handleAddNewQuestion(eventData as questionsType);
    setDragOverClassName("");
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOverClassName("dragging-over");
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  };

  const onDragExit = () => {
    setDragOverClassName("");
  };

  const handleRemoveDimension = () => {
    setRemoveElement(true);

    setTimeout(() => {
      removeQuestion?.();
    }, 300);
  };

  useEffect(() => {
    const questionErrors = getValueFromPath(errors, child_key as string) || {};

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
    <TrackGroupContainer
      $minimize={minimize}
      $remove={removeElement}
      $color={watch(`${child_key}.color`)}
      $isOpen={watch(`${child_key}.open`)}
      onDragOver={onDragOver}
      onDragLeave={onDragExit}
      className={dragOverClassName + " track-container"}
      onDrop={onDrop}
    >
      <section className="element-content">
        <Modal open={open} onOpenChange={() => setOpen(!open)}>
          <QuizDimentionsConfig
            formMethods={formContext}
            data={watch("")}
            child_key={child_key as string}
          />
        </Modal>
        <section className="section-header">
          <div className="left-side">
            <section>
              <p className="mark">{code}</p>
            </section>
            <section>
              <div className="group-info">
                <h4>Nome</h4>
                <h3> {watch(`${child_key}.title`)}</h3>
              </div>

              <div className="formula">
                <h6>Fórmula:</h6>

                <div dangerouslySetInnerHTML={{ __html: formulaVisualizer }} />
              </div>
            </section>
          </div>

          <div className="right-side">
            <button
              type="button"
              className="minimize-button"
              onClick={() => setOpen(true)}
            >
              <AiOutlineEdit />
            </button>
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
              onClick={handleRemoveDimension}
            >
              <AiOutlineClose />
            </button>
          </div>
        </section>

        {fields.length ? (
          <div className="form-questions-container">
            <ul>
              {fields.map((e, i) => {
                const answerMaxValue = e.max_value_set_manually
                  ? (e?.weight as number)
                  : questionsMaxValue;

                return (
                  <li key={e._id + answerMaxValue}>
                    {cloneElement(ComponentsList[e.type], {
                      code: "P" + (i + 1),
                      index: i,
                      max_value: e.max_value_set_manually
                        ? (e?.max_value as number)
                        : questionsMaxValue,
                      removeQuestion: () => remove(i),
                      child_key: `${child_key}.questions.${i}`,
                      onUpdateQuestion: (data: any) =>
                        handleUpdateQuestion(i, data),
                    })}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="form-questions-container">
            <EmptyQuiz onSelectNewElement={handleAddNewQuestion} />
          </div>
        )}
      </section>
    </TrackGroupContainer>
  );
};

interface emptyQuizProps {
  onSelectNewElement(data: questionsType): void;
}

const EmptyQuiz = ({ onSelectNewElement }: emptyQuizProps) => {
  return (
    <EmptyQuizContainer>
      <div className="title">
        <p>
          Nenhum elemento adicionado, arraste ou selecione um elemento para
          começar a editar
        </p>
      </div>

      <div className="button-list">
        {elementsOptions
          .filter((e) => e.type !== "group" && e.type !== "track")
          .map((e, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => onSelectNewElement(e.type as questionsType)}
              >
                {e.icon}
                <span>{e.title}</span>
              </button>
            </li>
          ))}
      </div>
    </EmptyQuizContainer>
  );
};

export default TrackComponent;
