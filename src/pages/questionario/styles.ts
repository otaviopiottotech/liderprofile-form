import styled from "styled-components";

export const QuestionarioContainer = styled.section`
  .header-container {
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.brand.orange};
  }

  .header {
    width: 100%;
    max-width: 800px;
    padding: 5em 0 10em 0;

    h1 {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.h2};
      font-weight: 600;
    }

    p {
      margin-top: 1em;
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.small};
    }
  }

  form {
    width: 100%;
    max-width: 800px;
    display: grid;
    background-color: ${({ theme }) => theme.colors.brand.white};
    margin: 20px auto;
    border-radius: 16px;
    padding: 2em;
    gap: 3em;
    margin-top: -60px;

    .group-section {
      .group-header-container {
        margin-bottom: 1em;

        h4 {
          color: ${({ theme }) => theme.colors.grayscale.gray_80};
          ${({ theme }) => theme.font.h3};
          font-weight: 600;
          margin-bottom: 10px;
        }

        p {
          color: ${({ theme }) => theme.colors.grayscale.gray_80};
          ${({ theme }) => theme.font.p.extra_small};
        }
      }

      & + .group-section {
        margin-top: 2em;
      }
    }

    .question-container {
      margin-top: 4em;
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
