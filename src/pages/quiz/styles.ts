import styled from "styled-components";

export const QuizContainer = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;

  .quiz-form-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2em;
    position: relative;
  }

  .dimensionsList {
    flex: 1;
    width: 100%;
    max-width: 1000px;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 3px;
    box-shadow: 0 4px 2em -10px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.brand.white};

    .header {
      h1 {
        color: ${({ theme }) => theme.colors.grayscale.gray_90};
        ${({ theme }) => theme.font.p.large_bold};
      }
    }
  }
`;

export const QuizDock = styled.section`
  padding: 0.5em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  border-radius: 12px;
  position: sticky;
  bottom: 20px;
  left: 20px;
  right: 20px;
  box-shadow: 0 4px 2em -10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.brand.white};

  button {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    gap: 10px;
    padding: 8px 12px;
    transition: 0.2s;
  }

  .save-button {
    justify-self: flex-end;
    background-color: ${({ theme }) => theme.colors.support.success};
    color: ${({ theme }) => theme.colors.brand.white};
  }

  .topic-button {
    justify-self: center;
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
    color: ${({ theme }) => theme.colors.grayscale.gray_60};
  }
`;
