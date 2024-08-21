import { UseFormReturn } from "react-hook-form";
import Input from "../../../../components/input";
import { GeneralConfigurationContainer } from "../general/styles";

interface quizDimentionConfigProps {
  formMethods: UseFormReturn<any>;
  child_key: string;
}

const QuizDimentionsConfig = ({
  formMethods,
  child_key,
}: quizDimentionConfigProps) => {
  const { setValue, register, watch } = formMethods;

  const handleChangeInput = (value: string) => {
    setValue(`${child_key}.calc`, value.toLocaleUpperCase());
  };

  return (
    <GeneralConfigurationContainer>
      <Input
        label="Nome do grupo"
        placeholder="Nome do grupo"
        register={{ ...register(`${child_key}.title`) }}
      />
      <Input
        label="Fórmula"
        placeholder="Fórmula"
        value={watch(`${child_key}.calc`)}
        onChange={({ target: { value } }) => handleChangeInput(value)}
      />
    </GeneralConfigurationContainer>
  );
};

export default QuizDimentionsConfig;
