import styled, { keyframes } from "styled-components";

import * as Tabs from "@radix-ui/react-tabs";

const entranceAnimation = keyframes`
from{
    transform:rotateX(120deg);
    opacity:0;    
}
to{
  transform:rotate(0deg);
    opacity:1;
}
`;

export const TabsRoot = styled(Tabs.Root)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 55px 1fr;
`;

export const TabTrigger = styled(Tabs.Trigger)`
  width: 100%;
  padding: 6px;
  ${({ theme }) => theme.font.p.normal};
  color: ${({ theme }) => theme.colors.grayscale.gray_40};
  border-width: 0px;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  aspect-ratio: 1/1;

  &[data-state="active"] {
    color: ${({ theme }) => theme.colors.brand.white};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.brand.orange};
  }
  &[disabled] {
    opacity: 0.3;
  }

  @media (max-width: 760px) {
    ${({ theme }) => theme.font.p.normal};

    &[data-state="active"] {
      ${({ theme }) => theme.font.p.normal_bold};
    }
  }
`;

export const TabList = styled(Tabs.List)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: auto;
  padding: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.grayscale.gray_80};
`;

export const TabContent = styled(Tabs.Content)`
  transform-origin: top;
  animation: 0.3s ${entranceAnimation} ease;
  padding: 2px;

  .content-header {
    padding: 10px;

    span {
      ${({ theme }) => theme.font.p.small_bold};
      color: ${({ theme }) => theme.colors.grayscale.gray_30};
    }
  }
`;
