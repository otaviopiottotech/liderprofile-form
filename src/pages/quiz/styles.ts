import styled from "styled-components";

export const QuizContainer = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;

  .quiz-form-content {
    padding: 2em;
    position: relative;
  }
`;

export const QuizDock = styled.section`
  padding: 0.5em;
  display: flex;
  justify-content: flex-end;
  border-radius: 12px;
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
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
