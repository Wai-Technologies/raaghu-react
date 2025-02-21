import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RdsScrollBar from "./rds-scroll-bar";
 
 
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
        showScrollButton: {
          control: "boolean",
        },
      },
    } as Meta<typeof RdsScrollBar>;
 
    const Template: StoryFn<typeof RdsScrollBar> = (args) => <RdsScrollBar {...args} />;

    export const Default = Template.bind({});
    Default.args = {
      type: "Mac",
      position: "Start",
      showScrollButton: true,
    };
   Default.parameters = { controls: { include: ['type', 'position', 'showScrollButton'] } };
    