import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import RdsCompTimePicker from "./rds-comp-time-picker";

const meta: Meta = {
  title: "Components/Time Picker",
  component: RdsCompTimePicker,
  parameters: {
        status: { type: 'stable' },
    layout: "padded",
    controls: {
    exclude: ['onChange', 'value'],
    },
  },
  tags: ["autodocs", 'stable'],
  argTypes: {
    className: { control: 'text', description: 'CSS class applied to the time picker root.' },
    sx: { control: 'object', description: 'MUI system styles applied to the time picker root.' },
    ref: { control: false, description: 'React ref to the time picker root; assign it in code.' },
    color: {
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info"
      ],
      control: { type: "select" },
      defaultValue: "primary",
      description: "Color variant of the time picker",
    },
    style: {
      options: ["default", "compact"],
      control: { type: "select" },
      defaultValue: "default",
      description: "Style variant of the time picker",
    },
    open: {
      control: { type: "boolean" },
      description: "Controls whether the time picker popup is open",
    },
    selected: {
      control: { type: "boolean" },
      description: "Applies the selected appearance to the input",
    },
  },
} satisfies Meta<typeof RdsCompTimePicker>;

export default meta;
type Story = StoryObj<typeof RdsCompTimePicker>;

export const Default: Story = {
  args: {
    color: "primary",
    style: "default",
    selected: false,
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('input');
    expect(el).toBeInTheDocument();
  },
};