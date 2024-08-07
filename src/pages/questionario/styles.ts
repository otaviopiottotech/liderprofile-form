import styled from "styled-components";

export const QuestionarioContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 16px;
  padding: 1em;

  form {
    display: grid;
    gap: 1em;
    margin-top: 40px;
  }

  .question-container {
    display: grid;

    label {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12px;
    }
  }
`;
