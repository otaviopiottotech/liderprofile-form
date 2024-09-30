/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useMemo,
} from "react";
import { InputContainer } from "./styles";

export type inputStyle = "primary" | "secondary" | "text";
export type inputTheme = "dark" | "light";
export type inputSize = "sm" | "normal" | "l";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  affix?: {
    prefix?: ReactNode;
    suffix?: ReactNode;
  };
  inputStyle?: inputStyle;
  inputSize?: inputSize;
  label?: string;
  error?: string;
  register?: any;
  inputTheme?: inputTheme;
  containerStyle?: CSSProperties;
}

const Input = forwardRef(
  (
    {
      affix,
      inputStyle = "primary",
      inputSize = "normal",
      label,
      required = false,
      error,
      register,
      inputTheme = "light",
      containerStyle,
      ...props
    }: InputProps,
    ref
  ) => {
    const prefix = useMemo(() => {
      if (affix?.prefix) {
        return (
          <div className="affix-container prefix-container">{affix.prefix}</div>
        );
      }
      return null;
    }, [affix?.prefix]);

    const suffix = useMemo(() => {
      if (affix?.suffix) {
        return (
          <div className="affix-container suffix-container">{affix.suffix}</div>
        );
      }
      return null;
    }, [affix?.suffix]);

    return (
      <InputContainer
        $error={error}
        $required={required}
        style={containerStyle}
        $inputSize={inputSize}
        $inputTheme={inputTheme}
        $inputStyle={inputStyle}
        $disabled={props.disabled}
        className="input-component-container"
      >
        {label && <label className="input-label">{label}</label>}
        <div className="input-container">
          {prefix}
          <input type="text" ref={ref} {...props} {...register} />
          {suffix}
        </div>
        {error && <div className="error-container">{error}</div>}
      </InputContainer>
    );
  }
);

export default Input;
