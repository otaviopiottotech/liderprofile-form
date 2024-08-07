import Input from "../../../../components/input";
import { sideHeaderProps } from "../sidebar";
import { GeneralConfigurationContainer } from "./styles";

const QuizGenerealConfiguration = ({ formMethods }: sideHeaderProps) => {
  const { setValue, register, watch } = formMethods;

  const handleChangeInput = (value: string) => {
    setValue("calc", value.toLocaleUpperCase());
  };

  return (
    <GeneralConfigurationContainer>
      <Input
        label="Nome do questionário"
        placeholder="Nome do questionário"
        register={{ ...register("title") }}
      />
      <Input
        label="Fórmula"
        placeholder="Fórmula"
        value={watch("calc")}
        onChange={({ target: { value } }) => handleChangeInput(value)}
      />
    </GeneralConfigurationContainer>
  );
};

export default QuizGenerealConfiguration;
