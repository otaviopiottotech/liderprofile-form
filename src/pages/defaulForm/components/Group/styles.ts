import styled from "styled-components";

export const FormGroupContainer = styled.section`
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.brand.white};
  border-radius: 16px;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.15);

  .section-header {
    padding: 1em;
    background-color: ${({ theme }) => theme.colors.grayscale.gray_20};

    h4 {
      color: ${({ theme }) => theme.colors.brand.black};
      ${({ theme }) => theme.font.p.normal};
    }
    h3 {
      color: ${({ theme }) => theme.colors.brand.black};
      ${({ theme }) => theme.font.p.medium_bold};
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
  }

  .form-questions-container {
    height: 80vh;
    padding: 1em;
    overflow-y: auto;

    ul {
      display: flex;
      flex-direction: column;

      li + li {
        & > div {
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
  height: 80vh;

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
    display: flex;
    padding: 0 2em;
    gap: 1em;
    justify-content: center;
    flex-wrap: wrap;

    li {
      button {
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
