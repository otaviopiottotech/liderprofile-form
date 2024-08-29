import styled, { css } from "styled-components";
import { inputStyle } from ".";

const primary = css`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.brand.white};
      ${theme.font.p.normal};
      color: ${theme.colors.grayscale.gray_50};

      textarea {
        border: 1px solid ${theme.colors.grayscale.gray_20};
      }
    `;
  }}
`;
const secondary = css`
  ${({ theme }) => {
    return css`
      background-color: transparent;
      ${theme.font.p.normal};
      color: ${theme.colors.grayscale.gray_30};

      textarea {
        border: 1px solid ${theme.colors.grayscale.gray_20};
        ${({ theme }) => theme.font.p.extra_small};
      }
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
};

interface inputStyleProps {
  $inputStyle: inputStyle;
  $required?: boolean;
  $error?: string;
}

export const InputContainer = styled.div<inputStyleProps>`
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.8em 0.8em;
    text-align: left;
    cursor: pointer;
    justify-content: flex-start;
    color: ${({ theme }) => theme.colors.grayscale.gray_90};
    ${({ theme }) => theme.font.p.normal};
    border-radius: 0.5em;
    border: 0;
    background-color: ${({ theme }) => theme.colors.brand.white};
  }

  .input-label {
    ${({ theme }) => theme.font.p.small};
    color: ${({ $inputStyle, theme }) =>
      $inputStyle === "secondary"
        ? theme.colors.brand.dark_blue
        : theme.colors.grayscale.gray_70};
    margin-bottom: 0.4em;
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

  ${({ $error }) => $error && errorStyle}
`;
