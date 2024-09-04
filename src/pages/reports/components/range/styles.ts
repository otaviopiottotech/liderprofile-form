import styled from "styled-components";

interface reportRangeProps {
  $distance: number;
}

export const ReportRangeContainer = styled.section<reportRangeProps>`
  ul {
    display: flex;
    border-width: 0 1px;
    border-color: ${({ theme }) => theme.colors.grayscale.gray_10};
    border-style: solid;
    position: relative;

    &::after {
      content: "";
      width: ${({ $distance }) => $distance}%;
      height: 100%;
      position: absolute;
      z-index: 0;
      border-radius: 0px 10px 10px 0px;
      background-color: ${({ theme }) => theme.colors.support.success_light};
    }

    li {
      position: relative;
      z-index: 1;
      flex: 1;
      padding: 0 10px;

      span {
        color: ${({ theme }) => theme.colors.grayscale.gray_90};
        ${({ theme }) => theme.font.p.small};
      }
    }

    .marked-answer {
      width: 2px;
      height: 110%;
      display: block;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
    }
  }
`;
