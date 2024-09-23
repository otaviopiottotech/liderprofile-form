import { QuizHeaderContainer } from "./styles";
import LiderProfileLogo from "../../../../assets/logotipo.png";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { QuizModel } from "../..";
import ButtonComponent from "../../../../components/button";
import { NavLink } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

interface quizHeaderProps {
  onSubmit(): void;
  fieldMethod: UseFieldArrayReturn<QuizModel, "dimentions", "id">;
  formMethods: UseFormReturn<QuizModel>;
}

const QuizHeader = ({
  fieldMethod,
  formMethods,
  onSubmit,
}: quizHeaderProps) => {
  const { watch } = formMethods;
  return (
    <QuizHeaderContainer>
      <div className="left-side">
        <img src={LiderProfileLogo} alt="liderprofileLogo" />
        <div className="vertical-divider" />
        <h5>{watch("title")}</h5>
      </div>

      <div className="right-side">
        <NavLink className="go-back-nav" to={"/"}>
          <AiOutlineLeft /> Voltar
        </NavLink>

        <ButtonComponent
          style={{ justifySelf: "flex-end" }}
          onClick={onSubmit}
          buttonSize="small"
          buttonStyles="confirm"
          disabled={!fieldMethod?.fields?.length}
        >
          Publicar
        </ButtonComponent>
      </div>
    </QuizHeaderContainer>
  );
};

export default QuizHeader;
