import {
  FormProvider,
  UseFormReturn,
  UseFieldArrayReturn,
} from "react-hook-form";
import { FormGroupContainer } from "./styles";
import { DragEvent, cloneElement, useEffect, useMemo } from "react";
import MultiSelectComponent from "../multiSelect";
import {
  dimensionModel,
  questionInput,
  questionsType,
} from "../../../quiz/quiz.interface";
import { getRandomColor } from "../../../../utils/randomColor";
import { extractPatterns } from "../../../../utils/extractPattern";
import SelectComponent from "../select";

const handleRemoveQuestion = (expression: string, nodeToRemove: string) => {
  const regex = new RegExp(
    `(\\+|\\-|\\*|\\/)?\\s*${nodeToRemove}\\s*(\\+|\\-|\\*|\\/)?`,
    "g"
  );

  let sanitized = expression.replace(regex, (match, p1, p2) => {
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

  return sanitized.trim();
};

const ElementList = {
  multi_select: <MultiSelectComponent />,
  select: <SelectComponent />,
};

const maxValue = 100;

interface formGroupProps {
  formMethods: UseFormReturn<dimensionModel>;
  fieldsArray: UseFieldArrayReturn<dimensionModel, "questions", "id">;
}

const FormGroup = ({ formMethods, fieldsArray }: formGroupProps) => {
  const { setValue, watch } = formMethods;
  const { fields, append, remove, update } = fieldsArray;

  const handleAddNewQuestion = (type: questionsType) => {
    append({
      code: `P${fields.length + 1}`,
      color: getRandomColor(),
      type,
    });
  };

  const handleUpdateQuestion = (index: number, data: questionInput) => {
    update(index, data);
  };

  useEffect(() => {
    const fieldsLength = fields.length;

    let calculationString = watch("calc");

    const pattern = extractPatterns(watch("calc"));

    for (let i = 0; i < fieldsLength; i++) {
      const currentField = fields[i];

      //Verify if the field is already included on the calculation
      if (!calculationString?.includes?.(currentField?.code)) {
        if (!calculationString) {
          calculationString = currentField.code;
        } else {
          calculationString = `${calculationString}+${currentField.code}`;
        }
      }
    }

    //Verifyon the calculation string if the fields has some deleted nodes
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
          const findCurrentArgNumber = Number(currentArg.replace("P", ""));
          const newNode = "P" + (findCurrentArgNumber + 1);

          console.log({ currentArg, newNode });

          const findFieldIndex = fields.findIndex((e) => e.code === newNode);

          calculationString = handleRemoveQuestion(
            calculationString,
            currentArg
          );

          calculationString = calculationString.replaceAll(newNode, currentArg);

          fields.forEach((e, fieldIndex) => {
            update(fieldIndex, {
              ...e,
              code: "P" + (fieldIndex + 1),
            });
          });

          // update(findFieldIndex, {
          //   ...fields[findFieldIndex],
          //   code: currentArg,
          // });
        }
      }
    }

    setValue("calc", calculationString);
  }, [fields]);

  const questionsMaxValue = useMemo(() => {
    let divideBy = fields.length;
    let calcMaxValue = maxValue;

    const aFieldHasMaxValue = fields.filter(
      (filter) => filter.max_value_set_manually
    );

    if (aFieldHasMaxValue.length) {
      divideBy = fields.length - aFieldHasMaxValue.length;

      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.max_value as number),
        0
      );

      calcMaxValue = maxValue - maxFieldsValue;
    }

    return Math.trunc(calcMaxValue / divideBy);
  }, [fields]);

  const maxToSet = useMemo(() => {
    let calcMaxValue = maxValue;

    const aFieldHasMaxValue = fields.filter(
      (filter) => filter.max_value_set_manually
    );

    if (aFieldHasMaxValue.length) {
      const maxFieldsValue = aFieldHasMaxValue.reduce(
        (a, b) => a + Number(b.max_value as number),
        0
      );

      calcMaxValue = maxValue - maxFieldsValue;
    }
    return calcMaxValue;
  }, [fields]);

  const formulaVisualizer = useMemo(() => {
    let calculationString = watch("calc");

    if (calculationString) {
      for (let i = 0; i < fields.length; i++) {
        const currentField = fields[i];

        calculationString = calculationString.replaceAll(
          currentField.code,
          `<span class="calc-item" style="background:${currentField.color}">${currentField.code}</span>`
        );
      }

      return calculationString;
    }
    return "";
  }, [watch("calc")]);

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    let eventData = event.dataTransfer.getData("new-element");
    handleAddNewQuestion(eventData as questionsType);
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  };

  return (
    <FormGroupContainer onDragOver={onDragOver} onDrop={onDrop}>
      <FormProvider {...formMethods}>
        <section className="section-header">
          <div className="group-info">
            <h4>Nome</h4>
            <h3> {watch("title")}</h3>
          </div>

          <div className="formula">
            <h6>Fórmula:</h6>

            <div dangerouslySetInnerHTML={{ __html: formulaVisualizer }} />
          </div>
        </section>

        <div className="form-questions-container">
          <ul>
            {fields.map((e, i) => (
              <li key={i}>
                {cloneElement(ElementList[e.type], {
                  code: "P" + (i + 1),
                  index: i,
                  max_to_set: maxToSet,
                  max_value: e.max_value_set_manually
                    ? (e?.max_value as number)
                    : questionsMaxValue,
                  removeQuestion: () => remove(i),
                  child_key: `questions.${i}`,
                  onUpdateQuestion: (data: any) =>
                    handleUpdateQuestion(i, data),
                })}
              </li>
            ))}
          </ul>
        </div>
      </FormProvider>
    </FormGroupContainer>
  );
};

export default FormGroup;
