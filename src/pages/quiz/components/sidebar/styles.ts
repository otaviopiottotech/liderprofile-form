import styled from "styled-components";

export const QuizSideContainer = styled.section`
  padding: 2px 10px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grayscale.gray_90};

  .sidebar-header {
    padding: 12px 8px;

    h5 {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.medium_bold};
    }
  }

  fieldset {
    border-radius: 8px;

    legend {
      padding: 0 10px;
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.small};
    }
  }
`;
