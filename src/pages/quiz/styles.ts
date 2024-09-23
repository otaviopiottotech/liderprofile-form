import styled from "styled-components";

export const QuizContainer = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: max-content;

  .quiz-form-content {
    display: flex;
    height: 100%;
    max-height: calc(100vh - 60px);
    flex-direction: column;
    padding: 2em;
    position: relative;
    overflow-y: auto;
  }

  .dimensionsList {
    flex: 1;
    border-radius: 3px;
    box-shadow: 0 4px 2em -10px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.brand.white};
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
    padding: 1em;

    .header {
      margin-bottom: 1em;
      h1 {
        color: ${({ theme }) => theme.colors.grayscale.gray_90};
        ${({ theme }) => theme.font.p.large_bold};
      }
    }

    .topic-list {
      display: flex;
      flex-direction: column;
      gap: 3em;
      margin-bottom: 1em;
    }
  }
`;
