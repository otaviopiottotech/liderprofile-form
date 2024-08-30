import styled from "styled-components";

export const HomeContainer = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 3em auto 0;
  padding: 1em;

  .quizes-section {
    .section-header {
      display: flex;
      align-items: center;
      gap: 3em;

      h3 {
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
        ${({ theme }) => theme.font.h2};
        font-weight: 600;
      }

      .create-quiz-button {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        padding: 8px 12px;
        background-color: ${({ theme }) => theme.colors.brand.orange};
        color: ${({ theme }) => theme.colors.brand.white};
        border-radius: 8px;
        ${({ theme }) => theme.font.p.small};
      }
    }

    .not-found {
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.small};
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      margin-top: 3em;
    }
  }
`;

export const QuizButtonContainer = styled.div`
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.brand.white};
  border-radius: 10px;
  padding: 1.2em;
  box-shadow: -4px 0 20px -5px rgba(0, 0, 0, 0.2);

  .top-side {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.normal_bold};
    }
  }

  .buttons-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.small};
      border-radius: 8px;
      padding: 8px 12px;
      border: solid 1px ${({ theme }) => theme.colors.grayscale.gray_10};
      transition: 300ms;

      &:hover {
        background-color: ${({ theme }) => theme.colors.brand.orange};
        color: ${({ theme }) => theme.colors.brand.white};
      }
    }
  }
`;
