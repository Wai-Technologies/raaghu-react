import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RdsScrollBar, { ScrollBarType, ScrollPosition } from "./rds-scroll-bar";
 
 
export default {
    title: "Elements/Scrollbar",
    component: RdsScrollBar,
    parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
    argTypes: {
        type: {
          control: "select",
          options: ["Mac", "Simple"],
        },
        position: {
          control: "select",
          options: ["Start", "Middle", "End"],
        },
        showButtons: {
          control: "boolean",
        },
      },
    } as Meta<typeof RdsScrollBar>;
 
    const Template: StoryFn<typeof RdsScrollBar> = (args) => <RdsScrollBar {...args} />;

    export const Default = Template.bind({});
    Default.args = {
      type: ScrollBarType.Mac, 
      position: ScrollPosition.Start, 
      showButtons: true,
    };
   Default.parameters = { controls: { include: ['type', 'position', 'showButtons'] } };
    