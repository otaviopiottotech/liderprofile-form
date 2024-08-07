import styled, { css, keyframes } from "styled-components";

const entranceAnimation = keyframes`
from{
    transform: translateX(-300px);
    opacity: 0;
}
to{
    transform: translateX(0px);
    opacity: 1;
}
`;

const leaveAnimation = keyframes`
0%{
    transform: translateX(0px);
    opacity: 1;
}
99%{
    transform: translateX(-300px);
    opacity: 0;
}

100%{
    display: none;
}

`;

interface collapsableMenuProps {
  $open: boolean;
}

export const CollapsableMenuContainer = styled.section<collapsableMenuProps>`
  overflow: hidden;

  .collapsable-menu-header {
    button {
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.normal};

      span {
        padding: 1em 10px;
        transition: 0.3s;
      }

      .right-icon,
      .left-icon {
        transition: 0.3s;
      }

      ${({ $open }) => {
        if ($open) {
          return css`
            padding: 0 0 0 10px;

            span {
              margin-left: auto;
            }

            .right-icon {
              width: 0px;
            }
          `;
        }
        return css`
          padding: 0 10px 0 0;

          span {
            margin-right: auto;
          }

          .left-icon {
            width: 0px;
          }
        `;
      }}
    }
  }
`;

interface collapsableContentProps {
  $closeAnimation: boolean;
}

export const CollapsableContent = styled.div<collapsableContentProps>`
  padding: 1em;

  ${({ $closeAnimation }) => {
    if (!$closeAnimation) {
      return css`
        animation: 0.2s ${entranceAnimation} linear;
      `;
    }
    return css`
      animation: 0.2s ${leaveAnimation} linear forwards;
    `;
  }}
`;
