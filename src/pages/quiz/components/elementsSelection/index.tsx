import { MdCheckBox, MdLibraryAddCheck } from "react-icons/md";
import { ElementsSelectionContainer } from "./styles";
import { DragEvent } from "react";
import { formGroupProps } from "../../../defaulForm/components/Group";
import { getRandomColor } from "../../../../utils/randomColor";
import { questionsType } from "../../quiz.interface";

type elementTypeOptions = "multi_select";

export const elementsOptions = [
  {
    title: "Mútipla escolha",
    icon: <MdLibraryAddCheck />,
    type: "multi_select",
  },
  {
    title: "Caixa de seleção",
    icon: <MdCheckBox />,
    type: "select",
  },
];

const ElementsSelection = ({ fieldsArray, formMethods }: formGroupProps) => {
  const { setValue, watch } = formMethods;
  const { fields, append } = fieldsArray;

  const handleAddNewQuestion = (type: questionsType) => {
    let calculationString = watch("calc");

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
    setValue("calc", calculationString);
  };

  const handleDragData = (
    event: DragEvent<HTMLButtonElement>,
    type: elementTypeOptions
  ) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData("new-element", type);
    }
  };

  return (
    <ElementsSelectionContainer>
      <div className="elements-header">
        <span>Elementos:</span>
      </div>

      <ul className="elements-list">
        {elementsOptions.map((e, i) => (
          <li key={i}>
            <button
              type="button"
              draggable
              onClick={() => handleAddNewQuestion(e.type as elementTypeOptions)}
              onDragStart={(event) =>
                handleDragData(event, e.type as elementTypeOptions)
              }
            >
              {e.icon}
              <span>{e.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </ElementsSelectionContainer>
  );
};

export default ElementsSelection;
