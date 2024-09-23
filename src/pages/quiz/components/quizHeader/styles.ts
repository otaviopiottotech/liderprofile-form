import styled from "styled-components";

export const QuizHeaderContainer = styled.section`
  grid-column: span 2;
  height: max-content;
  background: ${({ theme }) => theme.colors.brand.dark_blue};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.gray_80};
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .vertical-divider {
    width: 1px;
    height: 100%;
    min-height: 53px;
    display: flex;
    margin: -8px 0;
    background: ${({ theme }) => theme.colors.grayscale.gray_80};
  }

  .left-side {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      max-width: 30px;
    }

    h5 {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.small_bold};
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    gap: 12px;

    .go-back-nav {
      display: flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      padding: 7px 11px;
      background: ${({ theme }) => theme.colors.grayscale.gray_90};
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.small};
      border-radius: 8px;
    }
  }
`;
