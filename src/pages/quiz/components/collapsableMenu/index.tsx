import { ReactNode, useState } from "react";
import { CollapsableContent, CollapsableMenuContainer } from "./styles";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CollapsableMenuProps {
  title: string;
  content: ReactNode;
  onOpenChange?: (val: boolean) => void;
}

const CollapsableMenu = ({
  title,
  content,
  onOpenChange,
}: CollapsableMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenCollapsable = () => {
    setOpen((old) => {
      if (!old) {
        setTimeout(() => {
          onOpenChange?.(!old);
          return !old;
        }, 300);
      }

      onOpenChange?.(!old);
      return !old;
    });
  };

  return (
    <CollapsableMenuContainer $open={open}>
      <div className="collapsable-menu-header">
        <button type="button" onClick={handleOpenCollapsable}>
          <FaAngleLeft className="left-icon" />
          <span>{title}</span>

          <FaAngleRight className="right-icon" />
        </button>
      </div>

      <CollapsableContent $closeAnimation={!open}>{content}</CollapsableContent>
    </CollapsableMenuContainer>
  );
};

export default CollapsableMenu;
