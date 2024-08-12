import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { QuizSideContainer } from "./styles";
import { dimensionModel } from "../../quiz.interface";
import { useState } from "react";
import CollapsableMenu from "../collapsableMenu";
import QuizGenerealConfiguration from "../general";
import ElementsSelection from "../elementsSelection";

export interface sideHeaderProps {
  formMethods: UseFormReturn<dimensionModel>;
  fieldsArray: UseFieldArrayReturn<dimensionModel, "questions", "id">;
}

type tabs = "genereal" | undefined;

const QuizSideBar = ({ formMethods, fieldsArray }: sideHeaderProps) => {
  const [tabs, setTabs] = useState<tabs>();

  return (
    <QuizSideContainer>
      <section className="sidebar-header">
        <h5>Novo Questionário</h5>
      </section>
      <CollapsableMenu
        title="Configuração Geral"
        content={<QuizGenerealConfiguration formMethods={formMethods} />}
      />

      <ElementsSelection fieldsArray={fieldsArray} formMethods={formMethods} />
    </QuizSideContainer>
  );
};

export default QuizSideBar;
