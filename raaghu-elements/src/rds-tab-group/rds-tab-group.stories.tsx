import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsTabGroup, { TabType, TabState } from "./rds-tab-group";

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
    type: {
      options: [TabType.Horizontal, TabType.Vertical],
      control: { type: "select" },
      defaultValue: TabType.Horizontal,
    },
    layout: {
      options: ["Filled","Flap","Pill","Line Bottom","Line Bottom Solid","Line Top","Line Top Solid",  "Vertical-Flap","Vertical-Pill","Vertical-Left Line","Vertical Line-Left Solid","Vertical-Right Line","Vertical Line-Right Solid"],
      control: { type: "select" },
    },
    leftIcon :{
      options: ["user_tab","plus","pencil","edit"],
      control: { type: "select" },
    },
    rightIcon :{
      options: ["user_tab","plus","pencil","edit"],
      control: { type: "select" },
    },
    state: {
      options: [TabState.Default, TabState.Hover, TabState.Selected, TabState.Disabled],
      control: { type: "select" },
      defaultValue: TabState.Default,
    },
    showLeftIcon: {
      control: { type: "boolean" },
      defaultValue: true,
    },
    showRightIcon: {
      control: { type: "boolean" },
      defaultValue: true,
    },
    title: {
      control: { type: "text" },
      defaultValue: "Tab",
    },
  },
} satisfies Meta<typeof RdsTabGroup>

export default meta;
type Story = StoryObj<typeof RdsTabGroup>;

export const Default : Story = {
  args: {
    level: 1,
    type: TabType.Horizontal,
    layout: "",
    state: TabState.Default,
    title: "Tab",
    showLeftIcon: true,
    leftIcon: "user_tab",
    showRightIcon: true,
    rightIcon: "plus",
    icon: "cancel",
  }
} satisfies Story;

Default.parameters = { controls: { include: ['level', 'type', 'layout', 'state', 'showLeftIcon', 'showRightIcon', 'title', 'leftIcon', 'rightIcon'] } };