import styled from "styled-components";

export const ElementsSelectionContainer = styled.section`
  flex: 1;
  padding: 6px;
  position: relative;

  .elements-list {
    display: grid;
    gap: 10px;
    top: 2.3em;
    position: sticky;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));

    button {
      width: 100%;
      background-color: ${({ theme }) => theme.colors.grayscale.gray_90};
      padding: 1em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid ${({ theme }) => theme.colors.grayscale.gray_80};
      border-radius: 7px;
      gap: 8px;
      color: ${({ theme }) => theme.colors.brand.white};
      transition: 300ms;

      &:hover {
        background-color: ${({ theme }) => theme.colors.grayscale.gray_80};
      }

      svg {
        font-size: 2em;
      }

      > span {
        ${({ theme }) => theme.font.p.small};
      }
    }
  }
`;

export const SelectGroupContainer = styled.div`
  padding: 1em 0.6em;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.brand.black};

  .header {
    h6 {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.small};
    }
  }

  .buttons-list {
    display: grid;
    margin-top: 1em;
    gap: 2px;

    button {
      border-radius: 8px;
      align-items: flex-start;
    }
  }
`;
