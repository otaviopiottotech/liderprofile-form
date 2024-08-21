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
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 8px;
    box-shadow: 0 4px 2em -10px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.brand.white};

    .header {
      h1 {
        color: ${({ theme }) => theme.colors.grayscale.gray_90};
        ${({ theme }) => theme.font.p.medium_bold};
      }
    }
  }
`;

export const QuizDock = styled.section`
  padding: 0.5em;
  display: flex;
  justify-content: flex-end;
  border-radius: 12px;
  position: sticky;
  bottom: 20px;
  left: 20px;
  right: 20px;
  box-shadow: 0 4px 2em -10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.brand.white};

  .save-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7em;
    background-color: ${({ theme }) => theme.colors.support.success};
    border-radius: 6px;
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.brand.white};

    &:hover {
      scale: 1.03;
    }
  }
`;
