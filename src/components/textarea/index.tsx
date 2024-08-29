/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CSSProperties,
  ReactNode,
  TextareaHTMLAttributes,
  forwardRef,
  useMemo,
} from "react";
import { InputContainer } from "./styles";

export type inputStyle = "primary" | "secondary";

export interface TexAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  affix?: {
    prefix?: ReactNode;
    suffix?: ReactNode;
  };
  inputStyle?: inputStyle;
  label?: string;
  error?: string;
  register?: any;
  containerStyle?: CSSProperties;
}

const TextArea = forwardRef(
  (
    {
      affix,
      inputStyle = "secondary",
      label,
      required = false,
      error,
      register,
      containerStyle,
      ...props
    }: TexAreaProps,
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
        $inputStyle={inputStyle}
        $required={required}
        $error={error}
        style={containerStyle}
      >
        {label && <label className="input-label">{label}</label>}
        <div className="input-container">
          {prefix}
          <textarea rows={3} ref={ref} {...props} {...register} />
          {suffix}
        </div>
        {error && <div className="error-container">{error}</div>}
      </InputContainer>
    );
  }
);

export default TextArea;
