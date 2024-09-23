/** @format */

import { ReactNode } from "react";
import { TabsRoot, TabTrigger, TabList, TabContent } from "./styles";

interface TabProps {
  tabs: {
    value: string;
    title: string | ReactNode;
    content: ReactNode;
    disabled?: boolean;
    buttonTitle?: string;
    optionTitle: string;
  }[];
  onValueChange?(value: string): void;
  value?: string;
}

const TabComponent = ({ tabs, onValueChange, value }: TabProps) => {
  return (
    <TabsRoot
      defaultValue={tabs[0].value}
      value={value}
      orientation="vertical"
      onValueChange={onValueChange}
    >
      <TabList className="tab-list-tiempo">
        {tabs.map((item, index) => (
          <TabTrigger
            value={item.value}
            key={index}
            title={item?.buttonTitle}
            disabled={item?.disabled}
            className="tab-trigger-tiempo"
          >
            {item.title}
          </TabTrigger>
        ))}
      </TabList>
      {tabs.map((item, index) => (
        <TabContent value={item.value} key={index}>
          <div className="content-header">
            <span>{item.optionTitle}</span>
          </div>
          <div className="content">{item.content}</div>
        </TabContent>
      ))}
    </TabsRoot>
  );
};

export default TabComponent;
