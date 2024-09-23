import styled from "styled-components";
import ButtonComponent from "../../../../components/button";

export const QuizSideContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${({ theme }) => theme.colors.brand.dark_blue};

  .sidebar-header {
    background: ${({ theme }) => theme.colors.brand.dark_blue};
    margin: -2px -10px;
    padding: 12px 8px;

    img {
      max-width: 70px;
    }
  }

  .sidebar-subheader {
    padding: 12px 8px;

    h5 {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.medium_bold};
    }
  }

  fieldset {
    margin-top: 1em;
    border-radius: 8px;

    legend {
      padding: 0 10px;
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.small};
    }

    .topic-list {
      display: grid;
      gap: 3px;
    }
  }
`;
interface dimensionButtonProps {
  $color: string;
}

export const DimensionButton = styled(ButtonComponent)<dimensionButtonProps>`
  width: 100%;
  color: ${({ theme }) => theme.colors.brand.white};
  ${({ theme }) => theme.font.p.normal};
  justify-content: space-between;
  border-radius: 0;

  border-left: 2px solid ${({ $color }) => $color};

  & + button {
    border-top: 1px solid ${({ theme }) => theme.colors.grayscale.gray_80};
  }

  svg {
    color: ${({ theme }) => theme.colors.grayscale.gray_30};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gray_80};
  }
`;
