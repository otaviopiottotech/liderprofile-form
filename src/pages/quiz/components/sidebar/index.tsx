import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { DimensionButton, QuizSideContainer } from "./styles";
import QuizGenerealConfiguration from "../general";
import { QuizModel } from "../..";
import QuizDimentionsConfig from "../dimensions";
import ElementsSelection from "../elementsSelection";
import { useMemo, useState } from "react";
import Modal from "../../../../components/modal";
import { dimensionModel } from "../../../../models/quiz.interface";
import {
  AiOutlineAppstoreAdd,
  AiOutlineBars,
  AiOutlineForm,
  AiOutlineSetting,
} from "react-icons/ai";
import TabComponent from "./components/tabs";

export interface sideHeaderProps {
  formMethods: UseFormReturn<QuizModel>;
  fieldsArray: UseFieldArrayReturn<QuizModel, "dimentions", "id">;
}

type tabState = "elements" | "config" | "topics";

const QuizSideBar = ({ formMethods, fieldsArray }: sideHeaderProps) => {
  const { fields } = fieldsArray;
  const [tabState, setTabState] = useState<tabState>("elements");
  const [open, setOpen] = useState(false);

  const tabs = useMemo(() => {
    return [
      {
        value: "elements",
        title: <AiOutlineAppstoreAdd />,
        optionTitle: "Elementos",
        content: (
          <ElementsSelection
            fieldsArray={fieldsArray}
            formMethods={formMethods}
          />
        ),
      },

      {
        value: "topics",
        optionTitle: "Tópicos",
        title: <AiOutlineBars />,
        content: (
          <div>
            {fields?.length > 0 && (
              <ul className="topic-list">
                {fields.map((e, i) => (
                  <DimensionButtonCaller
                    data={e}
                    index={i}
                    fieldsArray={fieldsArray}
                    formMethods={formMethods}
                    key={i}
                  />
                ))}
              </ul>
            )}
          </div>
        ),
      },
      {
        value: "config",
        title: <AiOutlineSetting />,
        optionTitle: "Configurações",
        content: <h1>aaaa</h1>,
      },
    ];
  }, [fieldsArray, formMethods]);

  const handleChangeTab = (value: tabState) => {
    if (value === "config") {
      setOpen(true);
      return;
    }
    setTabState(value);
  };

  return (
    <QuizSideContainer>
      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        <QuizGenerealConfiguration formMethods={formMethods} />
      </Modal>
      <TabComponent
        tabs={tabs}
        value={tabState}
        onValueChange={handleChangeTab}
      />
    </QuizSideContainer>
  );
};

interface dimensionButtonProps extends sideHeaderProps {
  data: dimensionModel;
  index: number;
}

const DimensionButtonCaller = ({
  formMethods,
  data,
  index,
}: dimensionButtonProps) => {
  const [open, setOpen] = useState(false);
  const { watch } = formMethods;

  return (
    <>
      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        <QuizDimentionsConfig
          formMethods={formMethods}
          data={data}
          child_key={`dimentions.${index}`}
        />
      </Modal>

      <DimensionButton
        $color={watch(`dimentions.${index}.color`)}
        buttonStyles="text"
        onClick={() => setOpen(true)}
      >
        {watch(`dimentions.${index}.title`)} <AiOutlineForm />
      </DimensionButton>
    </>
  );
};

export default QuizSideBar;
