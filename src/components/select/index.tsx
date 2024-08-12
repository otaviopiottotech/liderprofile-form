import React, { CSSProperties, ForwardedRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { SelectItemProps, SelectProps } from "@radix-ui/react-select";
import {
  SelectContainer,
  SelectContent,
  SelectItemContainer,
  SelectItemText,
  SelectRoot,
  SelectScrollDown,
  SelectScrollUp,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "./styles";
import { AiOutlineLoading } from "react-icons/ai";

export type selectStyles = "primary" | "secondary";

interface SelectComponentProps extends SelectProps {
  triggerStyle?: CSSProperties;
  label?: string;
  selectStyle?: selectStyles;
  isLoading?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef(
  (
    {
      children,
      triggerStyle,
      selectStyle = "primary",
      label,
      isLoading,
      placeholder,
      ...props
    }: SelectComponentProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <SelectContainer>
        {label && <span className="select-label">{label}</span>}
        <SelectRoot {...props}>
          <SelectTrigger
            ref={forwardedRef}
            style={triggerStyle}
            $selectStyle={selectStyle}
          >
            {isLoading && (
              <div className="loading-button">
                <AiOutlineLoading className="load-icon" />
              </div>
            )}
            <SelectValue placeholder={placeholder} />
            <SelectPrimitive.Icon>
              <FaAngleDown />
            </SelectPrimitive.Icon>
          </SelectTrigger>
          <SelectPrimitive.Portal>
            <SelectContent>
              <SelectScrollUp>
                <FaAngleUp />
              </SelectScrollUp>
              <SelectViewport>{children}</SelectViewport>
              <SelectScrollDown>
                <FaAngleDown />
              </SelectScrollDown>
            </SelectContent>
          </SelectPrimitive.Portal>
        </SelectRoot>
      </SelectContainer>
    );
  }
);

export const SelectItem = React.forwardRef(
  (
    { children, ...props }: SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <SelectItemContainer {...props} ref={forwardedRef}>
        <SelectItemText>{children}</SelectItemText>
      </SelectItemContainer>
    );
  }
);
