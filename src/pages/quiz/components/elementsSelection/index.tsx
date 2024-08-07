import { MdCheckBox, MdLibraryAddCheck } from "react-icons/md";
import { ElementsSelectionContainer } from "./styles";
import { DragEvent } from "react";

type elementTypeOptions = "multi_select";

const elementsOptions = [
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

const ElementsSelection = () => {
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
