import { FaX } from "react-icons/fa6";
import Input from "../../../../components/input";
import {
  ModalHeader,
  ModalTitle,
  ModalTriggerClose,
} from "../../../../components/modal";
import { rulesModel } from "../../../../models/quiz.interface";
import { sideHeaderProps } from "../sidebar";
import { GeneralConfigurationContainer } from "./styles";
import { useFieldArray } from "react-hook-form";
import TextArea from "../../../../components/textarea";
import ButtonComponent from "../../../../components/button";
import { AiOutlinePlus } from "react-icons/ai";
import { RuleComponent } from "../dimensions";

const QuizGenerealConfiguration = ({
  formMethods,
}: Omit<sideHeaderProps, "fieldsArray">) => {
  const { setValue, register, watch, control } = formMethods;

  const { fields, append, remove, update } = useFieldArray({
    name: `rules`,
    control,
  });

  const handleAddNewReference = () => {
    append({
      compare: "N >= 0 && N <= 100",
    });
  };

  const handleRemoveReference = (index: number) => {
    remove(index);
  };

  const handleUpdateReference = (index: number, data: rulesModel) => {
    update(index, data);
  };
  return (
    <>
      <ModalHeader>
        <ModalTitle>{watch("title")}</ModalTitle>
        <ModalTriggerClose>
          <FaX />
        </ModalTriggerClose>
      </ModalHeader>
      <GeneralConfigurationContainer>
        <Input
          label="Nome do questionário"
          placeholder="Nome do questionário"
          register={{ ...register("title") }}
        />
        <TextArea
          label="Descrição"
          placeholder="Descrição"
          containerStyle={{ gridColumn: "span 2" }}
          register={{ ...register("description") }}
        />

        <div className="divider" />

        <section className="rules-section">
          <div className="header">
            <h5>Referências</h5>
            {fields?.length > 0 && fields?.length < 5 && (
              <ButtonComponent
                buttonStyles="text"
                buttonSize="small"
                onClick={handleAddNewReference}
              >
                <AiOutlinePlus /> Adicionar referência
              </ButtonComponent>
            )}
          </div>

          {fields?.length > 0 ? (
            <ul className="rules-list">
              {fields.map((e, i) => (
                <RuleComponent
                  key={i}
                  data={e as any}
                  setValue={setValue}
                  rules={fields as any}
                  register={register}
                  child_key={`rules.${i}`}
                  watch={watch}
                  onUpdateRule={(data) =>
                    handleUpdateReference(i, { ...e, ...data })
                  }
                  onRemove={() => handleRemoveReference(i)}
                />
              ))}
            </ul>
          ) : (
            <ButtonComponent
              buttonStyles="text"
              className="add-new-rule-button"
              onClick={handleAddNewReference}
            >
              <AiOutlinePlus /> Adicionar referência
            </ButtonComponent>
          )}
        </section>
      </GeneralConfigurationContainer>
    </>
  );
};

export default QuizGenerealConfiguration;
