import {
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import Input from "../../../../components/input";
import { DimensionConfigContainer, RuleContainer } from "./styles";
import {
  ModalHeader,
  ModalTitle,
  ModalTriggerClose,
} from "../../../../components/modal";
import { dimensionModel, rulesModel } from "../../quiz.interface";
import TextArea from "../../../../components/textarea";
import ButtonComponent from "../../../../components/button";
import { Select, SelectItem } from "../../../../components/select";
import { FaX } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { useMemo } from "react";

interface quizDimentionConfigProps {
  formMethods: UseFormReturn<any>;
  child_key: string;
  data: dimensionModel;
}

const QuizDimentionsConfig = ({
  formMethods,
  child_key,
}: quizDimentionConfigProps) => {
  const { setValue, register, watch, control } = formMethods;

  const { fields, append, remove, update } = useFieldArray({
    name: `${child_key}.rules`,
    control,
  });

  const handleChangeInput = (value: string) => {
    setValue(`${child_key}.calc`, value.toLocaleUpperCase());
  };

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
        <ModalTitle>{watch(`${child_key}.title`)}</ModalTitle>
        <ModalTriggerClose>
          <FaX />
        </ModalTriggerClose>
      </ModalHeader>
      <DimensionConfigContainer>
        <Input
          label="Nome do Tópico"
          placeholder="Nome do Tópico"
          register={{ ...register(`${child_key}.title`) }}
        />
        <Input
          label="Fórmula"
          placeholder="Fórmula"
          value={watch(`${child_key}.calc`)}
          onChange={({ target: { value } }) => handleChangeInput(value)}
        />
        <TextArea
          label="Descrição"
          placeholder="Descrição"
          containerStyle={{ gridColumn: "span 2" }}
          register={{ ...register(`${child_key}.description`) }}
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
                  child_key={`${child_key}.rules.${i}`}
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

        <div className="buttons-container"></div>
      </DimensionConfigContainer>
    </>
  );
};

interface ruleProps {
  onRemove(): void;
  onUpdateRule(data: rulesModel): void;
  setValue: UseFormSetValue<any>;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  rules: rulesModel[];
  child_key: string;
  data: rulesModel;
}

const RuleComponent = ({
  onRemove,
  setValue,
  register,
  child_key,
  watch,
}: ruleProps) => {
  const reference_values = useMemo(() => {
    const compare = watch(`${child_key}.compare`);

    if (compare) {
      const [
        _n,
        selectValueOne,
        numberInputOne,
        _and,
        _n2,
        selectValueTwo,
        numberInputTwo,
      ] = compare.split(" ");

      return [selectValueOne, numberInputOne, selectValueTwo, numberInputTwo];
    }

    return ["", "", "", ""];
  }, [watch(`${child_key}.compare`)]);

  const handleChangeCompare = (index: number, value: string) => {
    let compare_ref = reference_values;

    compare_ref[index] = value;

    const [selectValueOne, numberInputOne, selectValueTwo, numberInputTwo] =
      compare_ref;

    const buildCompare = `N ${selectValueOne} ${numberInputOne} && N ${selectValueTwo} ${numberInputTwo}`;

    setValue(`${child_key}.compare`, buildCompare);
  };

  return (
    <RuleContainer>
      <div className="reference-inputs-container">
        <h5>Nota</h5>
        <Select
          defaultValue={reference_values[0]}
          onValueChange={(value) => handleChangeCompare(0, value)}
        >
          <SelectItem value="<=">{"<="}</SelectItem>
          <SelectItem value=">=">{">="}</SelectItem>
        </Select>
        <Input
          type="number"
          affix={{
            suffix: "pts",
          }}
          step={1}
          onChange={({ target }) => handleChangeCompare(1, target.value)}
          value={reference_values[1]}
        />

        <h5 style={{ textAlign: "center" }}>E</h5>
        <Select
          defaultValue={reference_values[2]}
          onValueChange={(value) => handleChangeCompare(2, value)}
        >
          <SelectItem value="<=">{"<="}</SelectItem>
          <SelectItem value=">=">{">="}</SelectItem>
        </Select>
        <Input
          type="number"
          affix={{
            suffix: "pts",
          }}
          onChange={({ target }) => handleChangeCompare(3, target.value)}
          step={1}
          value={reference_values[3]}
        />
        <ButtonComponent
          buttonStyles="text"
          className="delete-button"
          onClick={onRemove}
        >
          <FaX />
        </ButtonComponent>
      </div>
      <Input
        label="Descrição"
        placeholder="Descrição"
        register={{ ...register(`${child_key}.message`) }}
      />
    </RuleContainer>
  );
};

export default QuizDimentionsConfig;
