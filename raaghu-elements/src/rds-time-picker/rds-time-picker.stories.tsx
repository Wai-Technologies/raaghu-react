import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TimePicker from "./rds-time-picker";
import RdsTimePicker from "./rds-time-picker";

const meta: Meta = {
  title: "Elements/Time Picker",
  component: TimePicker,
  parameters: {
    layout: "padded",
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
        "white",
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

export const Default: Story = {
  args: {
    colorVariant: "primary",
    style: "default",
    state: "default",
  },
} satisfies Story;

Default.parameters = {
  controls: { include: ["colorVariant", "style", "state"] },
};
