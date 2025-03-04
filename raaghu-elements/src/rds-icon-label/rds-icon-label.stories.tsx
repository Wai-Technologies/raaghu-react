import React from "react";
import RdsIconLabel from "./rds-icon-label";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: 'Components/Icon Label',
  component: RdsIconLabel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    colorVariant: {
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "dark",
        "light",
      ],
      control: { type: "select" },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    },
  },
} satisfies Meta<typeof RdsIconLabel>;

export default meta;
type Story = StoryObj<typeof RdsIconLabel>;

export const Default: Story = {
  args: {
    label: "User Name",
    icon: "users",
    size: "medium",
    colorVariant: "primary",
  }
} satisfies Story;
Default.parameters = { controls: { include: ['label', 'icon', 'colorVariant', 'size'] } };

export const WithPosition: Story = {
  args: {
    label: "User Name",
    icon: "users",
    size: "medium",
    iconposition: "left",
    colorVariant: "primary",
  },
  argTypes: {
    iconposition: {
      options: [
        "left",
        "right"
      ],
      control: { type: "radio" },
    },
  }
} satisfies Story;
WithPosition.parameters = { controls: { include: ['label', 'icon', 'colorVariant', 'size', 'iconposition'] } };

