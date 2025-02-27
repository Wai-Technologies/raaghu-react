import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsTabGroup, { TabLayout } from "./rds-tab-group";

const meta: Meta =  {
  title: "Elements/Tab",
  component: RdsTabGroup,
  tags: ['autodocs'],
  argTypes: {
    level: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: "select" },
      defaultValue: 3,
    },
    style: {
      options: ["Bottom Select","Top Select","Bottom Select Alt","Top Select Alt","Background Filled","Pill","Select Tabs","Vertical-Alt Right Line","Vertical-Alt Left Line","Vertical-Left Line","Vertical-Right Line","Vertical-Left Filled","Vertical-Pointer","Vertical-Flap"],
      control: { type: "select" },
    },
    iconName :{
      options: ["user","plus","pencil","edit"],
      control: { type: "select" },
    },
    iconSelect :{
      options: ["user","plus","pencil","edit"],
      control: { type: "select" },
    },

  },
} satisfies Meta<typeof RdsTabGroup>

export default meta;
type Story = StoryObj<typeof RdsTabGroup>;

export const Default : Story = {
args :{
  level: 3,
  layout: TabLayout.Horizontal,
  style: "",
  iconName: "user",
  iconSelect: "plus",
  icon : "cancel",
}
} satisfies Story;
Default.parameters = { controls: { include: ['level', 'layout', 'style'] } };
