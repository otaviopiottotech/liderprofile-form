import styled, { css, keyframes } from "styled-components";

interface multiSelectorProps {
  $color: string;
  $minimize: boolean;
  $remove: boolean;
}

const createNewAnimation = keyframes`

0%{
  transform: rotateX(90deg);
  opacity: 0;
}


100%{
  transform: rotateX(0deg);
  opacity: 1;
}

`;

const removeNewAnimation = keyframes`

0%{
  transform: scale(1);
  opacity: 1;
}

100%{
  max-height: 0px;
  margin: -1em 0;
  transform: scale(0);
  opacity: 0;
}
`;

export const MultiSelectContainer = styled.div<multiSelectorProps>`
  max-height: 300vh;
  border: ${({ $color }) => `2px solid ${$color}`};
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 8px;
  border-radius: 12px;
  transition: 0.3s;
  transform-origin: top;

  ${({ $remove, $minimize }) => {
    if ($remove) {
      return css`
        max-height: ${$minimize ? "44px" : "200px"};

        animation: 200ms ${removeNewAnimation} linear forwards;
      `;
    }
    return css`
      animation: 100ms ${createNewAnimation} linear forwards;
    `;
  }}

  ${({ $minimize }) => {
    if ($minimize) {
      return css`
        max-height: 44px;

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

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 1em;

    .left-side {
      display: flex;
      gap: 10px;
      align-items: flex-start;

      .mark {
        background-color: ${({ $color }) => $color};
        padding: 3px 6px;
        border-radius: 4px;

        p {
          color: white;
          font-size: 12px;
          font-weight: 900;
        }
      }

      .title {
        h4 {
          color: ${({ theme }) => theme.colors.brand.black};
          ${({ theme }) => theme.font.p.extra_small};
        }
        h2 {
          color: ${({ theme }) => theme.colors.brand.black};
          ${({ theme }) => theme.font.p.normal_bold};
        }
      }
    }

    .right-side {
      display: flex;
      align-items: center;
      gap: 10px;

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
  }

  .subHeader {
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      .edit {
        opacity: 1;
      }
    }

    .edit {
      opacity: 0;
      transition: 0.3s;
    }

    span {
      color: ${({ theme }) => theme.colors.brand.black};
      ${({ theme }) => theme.font.p.extra_small};
    }

    button {
      padding: 6px;
      border: solid 1px gray;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .response {
    margin-top: 20px;
    padding: 0 30px;

    ul {
      display: grid;
      gap: 0.8em;
    }

    .add-new-btn {
      width: 100%;
      margin-top: 10px;
      padding: 0.5em;
      border: 1px dashed ${({ theme }) => theme.colors.grayscale.gray_10};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.small};
      border-radius: 8px;
      transition: 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
      }
    }
  }
`;

export const ResponseOptionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 1em;

  > div {
    flex: 1;
  }

  .font-weight-span {
    position: absolute;
    left: -30px;
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
    ${({ theme }) => theme.font.p.extra_small};
  }

  .delete-button {
    display: flex;
    padding: 0.3em;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
    font-size: 1.2em;
    border-radius: 4px;
    transition: 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.grayscale.gray_05};
    }
  }

  .btn {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px ${({ theme }) => theme.colors.grayscale.gray_50};
    border-radius: 4px;
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.brand.white};

    &.correct {
      background-color: ${({ theme }) => theme.colors.support.success};
      border: solid 2px ${({ theme }) => theme.colors.support.success};
    }
  }
`;
