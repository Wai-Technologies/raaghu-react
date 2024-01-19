import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCollapse from "./rds-collapse";

export default {
    title: "Elements/Collapse",
    component: RdsCollapse,
    argTypes: {
    
    },
} as ComponentMeta<typeof RdsCollapse>;

const Template: ComponentStory<typeof RdsCollapse> = (args) => (
    <RdsCollapse {...args} />
);

export const Collapse = Template.bind({});
Collapse.args = {
    buttonList:
  [
      {
          "colorVariant": "primary",
          "label": "Toggle Element",
          "id": "collapseExample"
      }
  ],
};


