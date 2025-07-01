import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TimePicker from "./rds-time-picker";
import RdsTimePicker from "./rds-time-picker";

const meta: Meta = {
  title: "Elements/Time Picker",
  component: TimePicker,
  parameters: {
    layout: "padded",
    docs:{
      description: {
  component: `The **Time Picker** element is a user-friendly input component designed for selecting time values in your applications. It supports multiple **color variants** such as \`primary\`, \`secondary\`, \`success\`, and more, allowing seamless integration with your design system’s color palette. The component offers different **styles** like \`default\` and \`compact\` to adapt to various UI layouts and space constraints. Interaction **states** including \`default\`, \`expanded\`, and \`selected\` provide clear visual feedback during user interaction. This versatile component is ideal for forms, scheduling interfaces, and any feature requiring precise time input, enhancing both usability and accessibility.`
}

    }
  },
  tags: ["autodocs"],
  argTypes: {
    colorVariant: {
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ],
      control: { type: "select" },
    },
    style: {
      options: ["default", "compact"],
      control: { type: "select" },
    },
    state: {
      options: ["default", "expanded", "selected"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsTimePicker>;

export default meta;
type Story = StoryObj<typeof RdsTimePicker>;

export const Standard: Story = {
  args: {
    colorVariant: "primary",
    style: "default",
    state: "default",
  },
} satisfies Story;

Standard.parameters = {
  controls: { include: ["colorVariant", "style", "state"] },
};
