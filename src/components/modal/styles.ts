import styled, { css, keyframes } from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export interface modalProps {
  position?: "left" | "right";
  $closeAnimation: boolean;
}

export const entranceAnimation = keyframes`
from{
    transform: scale(0);
    opacity:0;    
  }
  to{
    transform: scale(1);

    opacity:1;
}
`;

export const closeModalAnimation = keyframes`
from{
  transform: scale(1);

  }
  to{
    transform: scale(0);
}
`;

export const closeOverlayAnimation = keyframes`
from{
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);

  }
  to{
    background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);

}
`;

export const ModalRoot = styled(Dialog.Root)``;
export const ModalPortal = styled(Dialog.Portal)``;

export const ModalHeaderContainer = styled.section`
  padding: 0.9em 1em;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  .left-side {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    ${({ theme }) => theme.font.p.extra_small};

    button {
      padding: 0.4em;
    }

    h3 {
      max-width: 400px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.brand.dark_blue};
    }
  }

  @media screen and (max-width: 1000px) {
    padding: 7px 1.2em;
  }
`;

export const ModalTriggerCloseStyle = styled(Dialog.Close)`
  padding: 0.4em;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: 0.3s;
  ${({ theme }) => theme.font.p.small};
  color: ${({ theme }) => theme.colors.grayscale.gray_80};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
  }
`;

export const ModalOverlay = styled(Dialog.Overlay)<modalProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: 0.3s;

  ${({ $closeAnimation }) => {
    if ($closeAnimation) {
      return css`
        animation: 0.4s ${closeOverlayAnimation} ease forwards;
        pointer-events: none;
      `;
    }
  }}
`;

export const StyledModalContent = styled(Dialog.Content)<modalProps>`
  /* min-width: 500px; */
  top: 0.7em;
  bottom: 0.7em;
  background: ${({ theme }) => theme.colors.brand.white};
  transition: 0.3s;
  overflow: hidden;
  box-shadow: 0px 0.4em 1.4em -0.7em rgba(22, 23, 24, 0.35),
    0px 0.7em 20px -15px rgba(22, 23, 24, 0.2);
  display: flex;
  flex-direction: column;
  border-radius: 0.8em;

  ${({ $closeAnimation }) => {
    if ($closeAnimation) {
      return css`
        animation: 0.3s ${closeModalAnimation} ease forwards;
      `;
    }
    return css`
      animation: 0.4s ${entranceAnimation} ease;
    `;
  }}

  @media screen and (max-width: 760px) {
    max-width: 100vw;
    min-width: 50px;
  }
`;

export const StyledModalTitle = styled(Dialog.Title)`
  overflow: hidden;
  ${({ theme }) => theme.font.h4};
  color: ${({ theme }) => theme.colors.brand.dark_blue};
  font-weight: 700;
`;
