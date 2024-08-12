import styled from "styled-components";

export const DefaultContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  padding: 0 20px;

  .page-default {
    max-width: 1200px;
    margin: 4em auto 0;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 760px) {
    .menu-default-container {
      display: none;
    }
  }
`;
