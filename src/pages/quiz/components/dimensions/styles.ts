import styled from "styled-components";

export const DimensionConfigContainer = styled.section`
  min-width: 600px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;

  .divider {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
    grid-column: span 2;
  }

  .rules-section {
    grid-column: span 2;
    .header {
      margin-bottom: 1em;
      display: flex;
      align-items: center;
      gap: 1em;

      h5 {
        color: ${({ theme }) => theme.colors.grayscale.gray_90};
        ${({ theme }) => theme.font.p.small};
      }
    }
    .add-new-rule-button {
      width: 100%;
    }

    .rules-list {
      max-height: 300px;
      padding: 0 10px 0 0;
      overflow-y: auto;
      display: grid;
      gap: 16px;
    }
  }

  .buttons-container {
    grid-column: span 2;
  }
`;

export const RuleContainer = styled.div`
  padding: 12px 10px;
  background: ${({ theme }) => theme.colors.grayscale.gray_05};
  border-radius: 8px;

  .reference-inputs-container {
    display: grid;
    grid-template-columns: 50px 80px 100px 20px 80px 100px 40px;
    gap: 10px;
    align-items: center;
    margin-bottom: 16px;

    h5 {
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.small_bold};
    }
    h6 {
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.small};
    }

    .affix-container {
      ${({ theme }) => theme.font.p.extra_small};
      padding: 0 2px;
    }
  }

  div > button {
    padding: 5px 10px;
    ${({ theme }) => theme.font.p.small};
    background: ${({ theme }) => theme.colors.brand.white};
    border: 1px solid ${({ theme }) => theme.colors.grayscale.gray_20};
  }

  .select-label.select-label {
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    ${({ theme }) => theme.font.p.small};
  }

  .delete-button {
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
    font-size: 10px;
    padding: 10px;
    align-self: flex-end;
  }
`;
