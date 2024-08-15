import {
  PopoverProps,
  Trigger,
  Anchor,
  PopoverContentProps,
} from "@radix-ui/react-popover";
import { ReactElement, useEffect, useState } from "react";
import {
  StyledPopOverArrow,
  StyledPopOverContent,
  StyledPopOverRoot,
} from "./styles";

interface PopOverRootProps extends PopoverProps {
  contentProps?: PopoverContentProps;
  trigger?: ReactElement;
}

export const PopOverRoot = ({ trigger, ...props }: PopOverRootProps) => {
  const [openModal, setOpenModal] = useState(props.open);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setOpenModal(props.open);
      }, 300);
    } else {
      setOpenModal(props.open);
    }
  }, [props.open, openModal]);

  return (
    <StyledPopOverRoot {...props} open={openModal}>
      {trigger && trigger}
      <StyledPopOverContent
        $closeAnimation={!props.open}
        {...props.contentProps}
      >
        <StyledPopOverArrow />
        {props.children}
      </StyledPopOverContent>
    </StyledPopOverRoot>
  );
};

export const PopOverTrigger = Trigger;
