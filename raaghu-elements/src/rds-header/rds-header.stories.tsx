import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsHeader from "./rds-header";
const meta: Meta = {
  title: "Components/Header",
  component: RdsHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    colorVariant: {
      options: [
        "primary",
        "success",
        "danger",
        "warning",
        "light",
        "info",
        "secondary",
        "dark",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "select" },
    },
    iconPosition: {
      options: ["left", "right", "top", "bottom"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsHeader>;

export default meta;
type Story = StoryObj<typeof RdsHeader>;

export const OnlyHeader: Story = {
  args: {
    headerText: "Header",
    size: "h1",
  },
} satisfies Story;
OnlyHeader.parameters = {
  controls: { include: ["headerText", "colorVariant", "size"] },
};

export const WithIcon: Story = {
  args: {
    headerText: "Header",
    size: "h1",
    icon: "information",
    iconFill: false,
    iconStroke: true,
    iconHeight: "20px",
    iconWidth: "20px",
    iconShow: true,
    iconPosition: "left",
  },
} satisfies Story;
WithIcon.parameters = {
  controls: {
    include: [
      "headerText",
      "colorVariant",
      "size",
      "icon",
      "iconShow",
      "iconPosition",
    ],
  },
};
