import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import RdsCompTimePicker from "./rds-comp-time-picker";

const meta: Meta = {
  title: "Components/Time Picker",
  component: RdsCompTimePicker,
  parameters: {
    layout: "padded",
    controls: {
    exclude: ['onChange', 'value'],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    colorVariant: {
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
    state: {
      options: ["default", "expanded", "selected"],
      control: { type: "select" },
      defaultValue: "default",
      description: "State of the time picker",
    },
  },
} satisfies Meta<typeof RdsCompTimePicker>;

export default meta;
type Story = StoryObj<typeof RdsCompTimePicker>;

export const Default: Story = {
  args: {
    colorVariant: "primary",
    style: "default",
    state: "default",
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('input');
    expect(el).toBeInTheDocument();
  },
};