import * as SelectPrimitive from "@radix-ui/react-select";
import styled, { css, keyframes } from "styled-components";
import { selectStyles } from ".";

const openSelectAnimation = keyframes`

from{
transform: rotateX(90deg);
}

to{
    transform: rotateX(0deg);

}

`;

interface selectStyleProps {
  $selectStyle: selectStyles;
}

const loading = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SelectContainer = styled.div`
  .select-label {
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    ${({ theme }) => theme.font.p.normal_bold};
    margin-bottom: 0.2em;
    display: block;
  }
`;

export const SelectRoot = styled(SelectPrimitive.Root)``;

const primary = css`
  ${({ theme }) => {
    return css`
      background-color: transparent;
      border: 1px solid ${theme.colors.grayscale.gray_10};
      color: ${theme.colors.grayscale.gray_90};
    `;
  }}
`;
const secondary = css`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.brand.white};
      border: 1px solid ${theme.colors.grayscale.gray_30};
      color: ${theme.colors.grayscale.gray_90};
    `;
  }}
`;

const styles = {
  primary,
  secondary,
};

export const SelectTrigger = styled(SelectPrimitive.Trigger)<selectStyleProps>`
  width: 100%;
  padding: 0.8em;
  ${({ theme }) => theme.font.p.small};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  gap: 10px;
  ${({ $selectStyle }) => styles[$selectStyle]};

  .loading-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 0.5em;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .load-icon {
      width: 20px;
      color: ${({ theme }) => theme.colors.brand.white};
      animation: 1s ${loading} infinite linear;
    }
  }
`;

export const SelectValue = styled(SelectPrimitive.Value)``;

export const SelectContent = styled(SelectPrimitive.Content)`
  background-color: ${({ theme }) => theme.colors.brand.white};
  z-index: 999;
  border-radius: 8px;
  transform-origin: top;
  animation: 0.2s ${openSelectAnimation} ease-in;
  box-shadow: 0 2px 20px -2px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const SelectViewport = styled(SelectPrimitive.Viewport)``;

export const SelectItemContainer = styled(SelectPrimitive.Item)`
  padding: 0.8em;
  ${({ theme }) => theme.font.p.small};
  color: ${({ theme }) => theme.colors.grayscale.gray_70};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
  }
`;

export const SelectItemText = styled(SelectPrimitive.ItemText)`
  ${({ theme }) => theme.font.p.small};
  color: ${({ theme }) => theme.colors.grayscale.gray_70};
`;

export const SelectIcon = styled(SelectPrimitive.Icon)`
  display: flex;
  align-items: center;
`;

const scrollStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  color: ${({ theme }) => theme.colors.grayscale.gray_80};
`;

export const SelectScrollUp = styled(SelectPrimitive.ScrollUpButton)`
  ${scrollStyle}
`;
export const SelectScrollDown = styled(SelectPrimitive.ScrollDownButton)`
  ${scrollStyle}
`;
