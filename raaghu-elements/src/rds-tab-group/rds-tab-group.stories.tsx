import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsTabGroup, { TabType, TabState } from "./rds-tab-group";

const meta: Meta =  {
  title: "Elements/Tab",
  component: RdsTabGroup,
  parameters: { 
    docs: {
   description: {
        component: `The **Tab** element is a flexible and customizable navigation component that enables users to switch between different views or sections within your application. It supports multiple **orientations** (\`Horizontal\`, \`Vertical\`) and various **layouts** such as \`Filled\`, \`Flap\`, \`Pill\`, \`Line Bottom\`, and more. The tab's interaction states include \`Default\`, \`Hover\`, \`Selected\`, and \`Disabled\`. Additional customization options allow setting the **accessibility heading level**, **tab title**, and toggling icons on the left and right sides. This component is ideal for organizing content in dashboards, forms, and complex interfaces, and can be tailored to fit your design system’s visual and functional requirements.`,
      },
      source: {
        transform: (code: string) => {
          // Transform type enum - remove spaces and transform
          code = code.replace(/type="([^"]+)"/g, (match, p1) => `type={TabType.${p1.replace(/\s+/g, "")}}`);
          code = code.replace(/type:\s*"([^"]+)"/g, (match, p1) => `type:TabType${p1.replace(/\s+/g, "")}`);
          //Transform state enum - remove spaces and transform
          code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={TabState.${p1.replace(/\s+/g, "")}}`);
          code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state:TabState${p1.replace(/\s+/g, "")}`);
          return code;
        },
      },
    },
  },
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
      options: ["user_tab","plus_new","pencil","edit"],
      control: { type: "select" },
    },
    rightIcon :{
      options: ["user_tab","plus_new","pencil","edit"],
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
    rightIcon: "plus_new",
    icon: "cancel",
  }
} satisfies Story;

Default.parameters = { controls: { include: ['level', 'type', 'layout', 'state', 'showLeftIcon', 'showRightIcon', 'title', 'leftIcon', 'rightIcon'] } };