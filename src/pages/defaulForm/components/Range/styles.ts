import styled, { css } from "styled-components";
import {
  MultiSelectContainer,
  ResponseOptionContainer,
} from "../multiSelect/styles";

export const RangeContainer = styled(MultiSelectContainer)`
  .response.response {
    ul {
      padding: 0 1em;
      align-items: flex-end;
      justify-content: space-between;
      flex-direction: row;
    }
  }
`;

export const rangeAnswerBorderColor = {
  0: css`
    ${({ theme }) => theme.colors.support.error_02}
  `,
  1: css`
    ${({ theme }) => theme.colors.support.error}
  `,
  2: css`
    ${({ theme }) => theme.colors.support.warning}
  `,
  3: css`
    ${({ theme }) => theme.colors.support.success_light}
  `,
  4: css`
    ${({ theme }) => theme.colors.support.success}
  `,
};

export interface rangeProps {
  $index: 0 | 1 | 2 | 3 | 4;
}

export const RangeAnswerContainer = styled(ResponseOptionContainer)<rangeProps>`
  flex-direction: column;
  gap: 12px;

  .answer-preview {
    padding: 1.2em;
    aspect-ratio: 1/1;
    border: solid 2px ${({ $index }) => rangeAnswerBorderColor[$index]};
    border-radius: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .answer-title {
    color: ${({ theme }) => theme.colors.brand.black};
    ${({ theme }) => theme.font.p.extra_small};
  }
`;
