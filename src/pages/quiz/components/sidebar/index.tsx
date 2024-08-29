import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { DimensionButton, QuizSideContainer } from "./styles";
import CollapsableMenu from "../collapsableMenu";
import QuizGenerealConfiguration from "../general";
import { teste } from "../..";
import QuizDimentionsConfig from "../dimensions";
import ElementsSelection from "../elementsSelection";
import { useState } from "react";
import Modal from "../../../../components/modal";
import { dimensionModel } from "../../quiz.interface";

export interface sideHeaderProps {
  formMethods: UseFormReturn<teste>;
  fieldsArray: UseFieldArrayReturn<teste, "dimentions", "id">;
}

const QuizSideBar = ({ formMethods, fieldsArray }: sideHeaderProps) => {
  const { fields } = fieldsArray;
  return (
    <QuizSideContainer>
      <section className="sidebar-header">
        <h5>Novo Questionário</h5>
      </section>
      <CollapsableMenu
        title="Configuração Geral"
        content={<QuizGenerealConfiguration formMethods={formMethods} />}
      />

      {fields?.length > 0 && (
        <fieldset>
          <legend>Tópicos</legend>

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
        </fieldset>
      )}

      <ElementsSelection fieldsArray={fieldsArray} formMethods={formMethods} />
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

      <DimensionButton buttonStyles="text" onClick={() => setOpen(true)}>
        {watch(`dimentions.${index}.title`)}
      </DimensionButton>
    </>
  );
};

export default QuizSideBar;
