import styled, { css } from "styled-components";
import { FormGroupContainer } from "../Group/styles";

export const TrackGroupContainer = styled(FormGroupContainer)`
  width: unset;
  border: ${({ $color }) => `2px solid ${$color}`};
  border-radius: 10px;
  position: relative;
  margin-left: 2em;
  z-index: 3;

  &.dragging-over {
    &::after {
      content: "";
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  &::before {
    content: "╰";
    width: 1px;
    font-size: 1.5em;
    display: flex;
    align-items: flex-end;
    line-height: 0px;
    justify-content: center;
    background: linear-gradient(
      180deg,
      rgba(211, 213, 213, 1) 0%,
      rgba(211, 213, 213, 1) 99%,
      rgba(255, 255, 255, 0) 0%
    );
    color: ${({ theme }) => theme.colors.grayscale.gray_20};
    position: absolute;
    left: -20px;
    top: -100vh;
    bottom: 70%;
  }

  ${({ $minimize }) => {
    if ($minimize) {
      return css`
        max-height: unset !important;
        .element-content.element-content {
          border-radius: 10px;
        }
      `;
    }
  }}
  .section-header {
    border-radius: 10px 10px 0 0;
    .left-side {
      display: flex;
      align-items: flex-start;
      gap: 10px;

      .mark {
        background-color: ${({ $color }) => $color};
        padding: 3px 6px;
        border-radius: 4px;

        color: white;
        font-size: 12px;
        font-weight: 900;
      }
    }
  }
`;
