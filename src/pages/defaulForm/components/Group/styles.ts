import styled, { css } from "styled-components";
import {
  createNewAnimation,
  multiSelectorProps,
  removeNewAnimation,
} from "../multiSelect/styles";

export const FormGroupContainer = styled.section<multiSelectorProps>`
  width: 100%;
  max-height: 300vh;
  background-color: ${({ theme }) => theme.colors.brand.white};
  border-radius: 4px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
  transition: 300ms;
  border-left: 3px solid ${({ $color }) => $color};
  position: relative;

  ${({ $remove, $minimize, $isOpen }) => {
    if ($remove) {
      return css`
        max-height: ${$minimize ? "44px" : "200px"};

        animation: 200ms ${removeNewAnimation} linear forwards;
      `;
    }

    if ($isOpen) {
      return css``;
    }
    return css`
      animation: 100ms ${createNewAnimation} linear forwards;
    `;
  }}

  ${({ $minimize }) => {
    if ($minimize) {
      return css`
        max-height: 60px;

        .element-content.element-content {
          max-height: 60px;
        }

        .header {
          .left-side {
            .title {
              display: flex;
              align-items: center;
              gap: 10px;
            }
          }

          .minimize-button {
            rotate: 90deg;
          }
        }

        .subHeader {
          display: none !important;
        }
      `;
    }
  }}


.element-content {
    max-height: 300vh;
    transition: 0.3s;
    overflow: hidden;
  }

  .section-header {
    padding: 1em;
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    h4 {
      color: ${({ theme }) => theme.colors.brand.black};
      ${({ theme }) => theme.font.p.extra_small};
    }
    h3 {
      color: ${({ theme }) => theme.colors.brand.black};
      ${({ theme }) => theme.font.p.normal_bold};
    }

    .formula {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      align-items: center;
      ${({ theme }) => theme.font.p.small};

      h6 {
        color: ${({ theme }) => theme.colors.brand.black};
        ${({ theme }) => theme.font.p.small};
      }

      > div {
        display: flex;
        gap: 4px;
        align-items: center;
        flex-wrap: wrap;
      }

      .calc-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 6px;
        border-radius: 4px;
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.p.extra_small};
      }
    }

    .right-side {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 6px;
      margin-left: auto;
      transition: 0.2s;
      background-color: ${({ theme }) => theme.colors.grayscale.gray_05};
      color: ${({ theme }) => theme.colors.grayscale.gray_50};
    }

    .minimize-button {
      &:hover {
        background-color: ${({ theme }) => theme.colors.brand.blue};
        color: ${({ theme }) => theme.colors.brand.white};
      }
    }

    .remove-button {
      &:hover {
        background-color: ${({ theme }) => theme.colors.support.error};
        color: ${({ theme }) => theme.colors.brand.white};
      }
    }
  }

  .form-questions-container {
    padding: 1em;
    overflow-y: auto;

    ul {
      display: flex;
      flex-direction: column;

      li + li {
        & > div,
        & > section {
          margin-top: 1em;
        }
      }
    }
  }
  .add-new-question {
    width: 100%;
    padding: 1em;
    text-align: center;
    border: 1px solid gray;
    margin-top: 10px;
  }
`;

export const EmptyQuizContainer = styled.section`
  .title {
    width: 100%;
    padding: 2em;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      max-width: 400px;
      text-align: center;
      color: ${({ theme }) => theme.colors.grayscale.gray_60};
      ${({ theme }) => theme.font.p.small};
    }
  }

  .button-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    padding: 0 2em;
    gap: 1em;
    justify-content: center;
    flex-wrap: wrap;

    li {
      width: 100%;
      button {
        width: 100%;
        background-color: ${({ theme }) => theme.colors.brand.white};
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
        border-radius: 12px;
        gap: 8px;
        color: ${({ theme }) => theme.colors.grayscale.gray_70};
        transition: 300ms;

        &:hover {
          scale: 1.08;
        }

        svg {
          font-size: 2em;
        }

        > span {
          ${({ theme }) => theme.font.p.small};
        }
      }
    }
  }
`;
