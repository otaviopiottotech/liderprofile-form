import styled from "styled-components";

export const QuestionarioContainer = styled.section`
  width: 100%;
  max-width: 800px;
  background-color: ${({ theme }) => theme.colors.brand.white};
  margin: 20px auto;
  border-radius: 16px;
  padding: 1em;

  .header {
    padding: 0 0 20px 0;
    border-bottom: solid 1px ${({ theme }) => theme.colors.grayscale.gray_05};

    h1 {
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.h3};
      font-weight: 600;
    }
  }

  form {
    display: grid;
    gap: 3em;
    margin-top: 40px;

    .group-section {
      h4 {
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
        ${({ theme }) => theme.font.h3};
        font-weight: 600;

        margin-bottom: 1em;
      }

      & + .group-section {
        margin-top: 2em;
      }
    }

    .question-container {
      margin-top: 1em;
    }

    .buttons-section {
      margin-top: 1em;
      display: flex;
      justify-content: flex-end;

      button {
        padding: 8px 12px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.colors.support.success};
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.p.small_bold};
        transition: 300ms;

        &:hover {
          scale: 1.03;
        }
      }
    }
  }
`;
