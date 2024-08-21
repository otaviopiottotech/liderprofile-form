import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { QuizSideContainer } from "./styles";
import CollapsableMenu from "../collapsableMenu";
import QuizGenerealConfiguration from "../general";
import { teste } from "../..";
import QuizDimentionsConfig from "../dimensions";
import ElementsSelection from "../elementsSelection";

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

      <fieldset>
        <legend>Grupos</legend>

        {fields.map((e, i) => (
          <CollapsableMenu
            key={e._id}
            title={formMethods.watch(`dimentions.${i}.title`) + ""}
            content={
              <QuizDimentionsConfig
                formMethods={formMethods}
                child_key={`dimentions.${i}`}
              />
            }
          />
        ))}
      </fieldset>

      <ElementsSelection fieldsArray={fieldsArray} formMethods={formMethods} />
    </QuizSideContainer>
  );
};

export default QuizSideBar;
