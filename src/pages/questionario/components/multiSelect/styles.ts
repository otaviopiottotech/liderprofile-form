import styled, { css } from "styled-components";

export const QuizMultiSelectContainer = styled.div`
  label {
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    ${({ theme }) => theme.font.p.normal_bold};
  }

  ul {
    display: grid;
    gap: 10px;
    margin-top: 1em;
  }
`;

interface quizItemProps {
  $selected: boolean;
}

export const QuizMultiSelectItemContainer = styled.button<quizItemProps>`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  border: solid 1px ${({ theme }) => theme.colors.grayscale.gray_10};
  transition: 100ms;

  h6 {
    color: ${({ theme }) => theme.colors.brand.black};
    ${({ theme }) => theme.font.p.small};
  }

  .select-span {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: solid 1px ${({ theme }) => theme.colors.grayscale.gray_30};
    transition: 300ms;
    position: relative;

    &::after {
      content: "";
      background-color: transparent;
      width: 10px;
      height: 10px;
      position: absolute;
      border-radius: 2px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: 300ms;
    }
  }

  ${({ $selected }) => {
    if ($selected) {
      return css`
        border: solid 2px ${({ theme }) => theme.colors.brand.blue};

        h6 {
          ${({ theme }) => theme.font.p.small_bold};
        }

        .select-span {
          border: solid 1px ${({ theme }) => theme.colors.brand.blue};
          &::after {
            background-color: ${({ theme }) => theme.colors.brand.blue};
          }
        }
      `;
    }
  }}
`;
