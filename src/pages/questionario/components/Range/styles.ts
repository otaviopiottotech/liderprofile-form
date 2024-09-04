import styled, { css } from "styled-components";
import {
  rangeAnswerBorderColor,
  rangeProps,
} from "../../../defaulForm/components/Range/styles";

export const QuizRangeContainer = styled.div`
  label {
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    ${({ theme }) => theme.font.p.normal_bold};
  }

  ul {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 0 2em;
  }
`;

interface quizItemProps extends rangeProps {
  $selected: boolean;
}

export const QuizRangeItemContainer = styled.button<quizItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .range-check {
    padding: 1.8em;
    aspect-ratio: 1/1;
    border: solid 2px ${({ $index }) => rangeAnswerBorderColor[$index]};
    border-radius: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 300ms;
  }

  h6 {
    color: ${({ theme }) => theme.colors.brand.black};
    ${({ theme }) => theme.font.p.small};
  }

  ${({ $selected, $index }) => {
    if ($selected) {
      return css`
        .range-check {
          background-color: ${rangeAnswerBorderColor[$index]};
        }

        h6 {
          ${({ theme }) => theme.font.p.small_bold};
        }
      `;
    }
  }}
`;
