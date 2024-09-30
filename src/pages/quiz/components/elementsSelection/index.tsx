import { MdCheckBox, MdLibraryAddCheck } from "react-icons/md";
import { ElementsSelectionContainer, SelectGroupContainer } from "./styles";
import { DragEvent, ReactNode, useState } from "react";
import { questionsType } from "../../../../models/quiz.interface";
import { sideHeaderProps } from "../sidebar";
import { PopOverRoot, PopOverTrigger } from "../../../../components/popOver";
import { getRandomColor } from "../../../../utils/randomColor";
import { RxSlider } from "react-icons/rx";
import { FaIndent } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";

interface elementsType {
  title: string;
  icon: ReactNode;
  type: questionsType;
}

export const elementsOptions: elementsType[] = [
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
  {
    title: "Range",
    icon: <RxSlider />,
    type: "range",
  },
  {
    title: "SubTópico",
    icon: <FaIndent />,
    type: "track",
  },
  {
    title: "Tópico",
    icon: <AiOutlineBars />,
    type: "group",
  },
];

const ElementsSelection = ({ fieldsArray, formMethods }: sideHeaderProps) => {
  return (
    <ElementsSelectionContainer>
      <ul className="elements-list">
        {elementsOptions.map((e, i) => (
          <li key={i}>
            <ElementComponent
              formMethods={formMethods}
              item={e}
              fieldsArray={fieldsArray}
            />
          </li>
        ))}
      </ul>
    </ElementsSelectionContainer>
  );
};

interface elementsProps extends sideHeaderProps {
  item: {
    title: string;
    icon: ReactNode;
    type: questionsType;
  };
}

const ElementComponent = ({
  formMethods,
  item,
  fieldsArray,
}: elementsProps) => {
  const [open, setOpen] = useState(false);

  const { watch, setValue } = formMethods;

  const { fields: dimensionFields, append } = fieldsArray;

  const handleAddNewQuestion = (type: questionsType, i: number) => {
    if (!dimensionFields.length) {
      const _id = window.crypto.randomUUID();

      append({
        _id,
        color: getRandomColor(),
        title: "Tópico " + (dimensionFields.length + 1),
      });
    }

    if (type === "group") {
      const _id = window.crypto.randomUUID();

      append({
        _id,
        color: getRandomColor(),
        title: "Tópico " + (dimensionFields.length + 1),
      });
      setOpen(false);
      return;
    }

    const questionList = watch(`dimentions.${i}.questions`) || [];

    let calculationString = watch(`dimentions.${i}.calc`);
    const code = `P${questionList.length + 1}`;
    const _id = window.crypto.randomUUID();
    let title = "";

    if (type === "track") {
      title = "SubTópico " + (questionList.length + 1);
    }

    if (!calculationString) {
      calculationString = code;
    } else {
      calculationString = `${calculationString}+${code}`;
    }

    setValue(`dimentions.${i}.questions` as any, [
      ...questionList,
      {
        color: getRandomColor(),
        code,
        _id,
        type,
        title,
      },
    ]);
    setValue(`dimentions.${i}.calc`, calculationString);
    setOpen(false);
  };

  const handleDragData = (
    event: DragEvent<HTMLButtonElement>,
    type: questionsType
  ) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData("new-element", type);
    }
  };

  if (item.type === "group") {
    return (
      <button
        type="button"
        draggable
        onDragStart={(event) =>
          handleDragData(event, item.type as questionsType)
        }
        onClick={() => handleAddNewQuestion(item.type as questionsType, 0)}
      >
        {item.icon}
        <span>{item.title}</span>
      </button>
    );
  }

  if (dimensionFields.length <= 1) {
    return (
      <button
        type="button"
        draggable
        onDragStart={(event) =>
          handleDragData(event, item.type as questionsType)
        }
        onClick={() => handleAddNewQuestion(item.type as questionsType, 0)}
      >
        {item.icon}
        <span>{item.title}</span>
      </button>
    );
  }

  return (
    <PopOverRoot
      open={open}
      onOpenChange={() => setOpen(!open)}
      trigger={
        <PopOverTrigger
          draggable
          onDragStart={(event) =>
            handleDragData(event, item.type as questionsType)
          }
        >
          {item.icon}
          <span>{item.title}</span>
        </PopOverTrigger>
      }
    >
      <SelectGroupContainer>
        <div className="header">
          <h6>Selecione um Grupo</h6>
        </div>

        <div className="buttons-list">
          {dimensionFields.map((e, i) => (
            <button
              key={i}
              type="button"
              onClick={() =>
                handleAddNewQuestion(item.type as questionsType, i)
              }
            >
              {e.title}
            </button>
          ))}
        </div>
      </SelectGroupContainer>
    </PopOverRoot>
  );
};

export default ElementsSelection;
