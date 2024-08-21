import { useFormContext, useFieldArray } from "react-hook-form";
import { EmptyQuizContainer, FormGroupContainer } from "./styles";
import { DragEvent, cloneElement, useEffect, useMemo, useState } from "react";
import MultiSelectComponent from "../multiSelect";
import {
  dimensionModel,
  questionInput,
  questionsType,
} from "../../../quiz/quiz.interface";
import { getRandomColor } from "../../../../utils/randomColor";
import { extractPatterns } from "../../../../utils/extractPattern";
import SelectComponent from "../select";
import { elementsOptions } from "../../../quiz/components/elementsSelection";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";

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

const ElementList = {
  multi_select: <MultiSelectComponent />,
  select: <SelectComponent />,
};

export const quizValue = 100;

export interface formGroupProps {
  child_key: string;
  removeQuestion: () => void;
}

export interface elementsProps {
  code: string;
  index: number;
  max_value: number;
  onUpdateQuestion(data: any): void;
  removeQuestion: () => void;
  max_to_set: number;
  child_key: string;
  questions: questionInput[];
}

const FormGroup = ({ child_key, removeQuestion }: formGroupProps) => {
  const [removeElement, setRemoveElement] = useState(false);
  const [minimize, setMinimize] = useState(false);

  const { watch, control, setValue } = useFormContext<{
    [x: string]: dimensionModel;
  }>();

  const { fields, append, remove, update } = useFieldArray({
    name: `${child_key}.questions`,
    control,
  });

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
    let calcMaxValue = quizValue;

    const aFieldHasMaxValue = fields.filter(
      (filter) => filter.max_value_set_manually
    );

    if (aFieldHasMaxValue.length) {
      divideBy = fields.length - aFieldHasMaxValue.length;

      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.max_value as number),
        0
      );

      calcMaxValue = quizValue - maxFieldsValue;
    }

    return Math.trunc(calcMaxValue / divideBy);
  }, [fields]);

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
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  };

  const handleRemoveDimension = () => {
    setRemoveElement(true);

    setTimeout(() => {
      removeQuestion?.();
    }, 300);
  };

  return (
    <FormGroupContainer
      $minimize={minimize}
      $remove={removeElement}
      $color={watch(`${child_key}.color`)}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <section className="section-header">
        <div className="left-side">
          <div className="group-info">
            <h4>Nome</h4>
            <h3> {watch(`${child_key}.title`)}</h3>
          </div>

          <div className="formula">
            <h6>Fórmula:</h6>

            <div dangerouslySetInnerHTML={{ __html: formulaVisualizer }} />
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
            onClick={handleRemoveDimension}
          >
            <AiOutlineClose />
          </button>
        </div>
      </section>

      {fields.length ? (
        <div className="form-questions-container">
          <ul>
            {fields.map((e, i) => (
              <li key={e._id}>
                {cloneElement(ElementList[e.type], {
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
            ))}
          </ul>
        </div>
      ) : (
        <div className="form-questions-container">
          <EmptyQuiz onSelectNewElement={handleAddNewQuestion} />
        </div>
      )}
    </FormGroupContainer>
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
          .filter((e) => e.type !== "group")
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

export default FormGroup;
