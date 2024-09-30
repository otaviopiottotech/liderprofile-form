import styled, { css } from "styled-components";
import { inputSize, inputStyle, inputTheme } from ".";

const primary = css`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.brand.white};
      border: 1px solid ${theme.colors.grayscale.gray_30};
      ${theme.font.p.normal};
      color: ${theme.colors.grayscale.gray_80};
    `;
  }}
`;
const secondary = css`
  ${({ theme }) => {
    return css`
      background-color: transparent;
      border: 1px solid ${theme.colors.grayscale.gray_90};
      ${theme.font.p.normal};
      color: ${theme.colors.grayscale.gray_60};
    `;
  }}
`;
const text = css`
  ${({ theme }) => {
    return css`
      background-color: transparent;
      border: 0;
      padding: 4px;
      ${theme.font.p.normal};
      color: ${theme.colors.grayscale.gray_60};
    `;
  }}
`;

export const errorStyle = css`
  ${({ theme }) => {
    return css`
      input {
        color: ${theme.colors.support.error};
      }
      .input-container {
        background-color: transparent;
        border: 1px solid;
        ${theme.font.p.normal};
        color: ${theme.colors.support.error};
      }
    `;
  }}
`;

const styles = {
  primary,
  secondary,
  text,
};

export const inputDark = css`
  ${({ theme }) => {
    return css`
      .input-label {
        color: ${theme.colors.brand.white};
      }
    `;
  }}
`;
export const inputLight = css`
  ${({ theme }) => {
    return css`
      .input-label {
        color: ${theme.colors.grayscale.gray_70};
      }
    `;
  }}
`;

const inputThemeStyle = {
  dark: inputDark,
  light: inputLight,
};

const sm_Size = css`
  input {
    ${({ theme }) => theme.font.p.extra_small};
    padding: 0.3em 0.7em;
  }
`;
const normal_Size = css`
  input {
    ${({ theme }) => theme.font.p.small};
    padding: 0.4em 0.8em;
  }
`;
const l_Size = css`
  input {
    ${({ theme }) => theme.font.p.large};
    padding: 0.3em 0.6em;
  }
`;

const inputSizes = {
  sm: sm_Size,
  normal: normal_Size,
  l: l_Size,
};

interface inputStyleProps {
  $inputStyle: inputStyle;
  $inputTheme: inputTheme;
  $inputSize: inputSize;
  $required?: boolean;
  $disabled?: boolean;
  $error?: string;
}

export const InputContainer = styled.div<inputStyleProps>`
  transition: 0.3s;

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.4em 0.8em;
    text-align: left;
    cursor: pointer;
    justify-content: flex-start;
    color: ${({ theme }) => theme.colors.grayscale.gray_90};
    ${({ theme }) => theme.font.p.small};
    border-radius: 0.5em;
  }

  .input-label {
    ${({ theme }) => theme.font.p.small};

    margin-bottom: 0.2em;
    display: block;
  }
  .error-container {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.support.error};
    margin-top: 0.5em;
  }

  .affix-container {
    padding: 0 15px;
  }

  .input-container {
    display: flex;
    align-items: center;
    border-radius: 0.5em;
    position: relative;
    ${({ $inputStyle }) => styles[$inputStyle]}

    ${({ $required, theme }) => {
      if ($required) {
        return css`
          &:after {
            content: attr(data-required-text);
            color: ${theme.colors.grayscale.gray_60};
            background-color: ${({ theme }) => theme.colors.brand.white};
            padding: 0.2em 0.5em;
            border-radius: 0.2em;
            ${({ theme }) => theme.font.p.extra_small};
            position: absolute;
            top: -13px;
            right: 0.9em;
          }
        `;
      }
    }}
  }

  ${({ $disabled }) => {
    if ($disabled) {
      return css`
        opacity: 0.5;

        input {
          background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
        }
      `;
    }
  }}

  ${({ $inputTheme }) => inputThemeStyle[$inputTheme]};

  ${({ $inputSize }) => inputSizes[$inputSize]};

  ${({ $error }) => $error && errorStyle}
`;
