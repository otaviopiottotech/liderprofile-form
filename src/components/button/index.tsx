import { ButtonHTMLAttributes } from "react";
import { ButtonsLoginContainer } from "./styles";
import { AiOutlineLoading } from "react-icons/ai";

export type buttonStyles = "primary" | "text" | "delete" | "confirm";
export type buttonStylesType = "fill" | "outline";
export type buttonSize = "small" | "normal" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //tipos personalizados
  buttonSize?: buttonSize;
  buttonStyles?: buttonStyles;
  buttonStylesType?: buttonStylesType;
  isLoading?: boolean;
}

const ButtonComponent = ({
  buttonStyles = "primary",
  buttonStylesType = "fill",
  buttonSize = "normal",
  type = "button",
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <ButtonsLoginContainer
      $buttonSize={buttonSize}
      $buttonStyles={buttonStyles}
      $buttonStylesType={buttonStylesType}
      {...{ type, ...props }}
    >
      {props.children}

      {isLoading && (
        <div className="loading-button">
          <AiOutlineLoading className="load-icon" />
        </div>
      )}
    </ButtonsLoginContainer>
  );
};

export default ButtonComponent;
