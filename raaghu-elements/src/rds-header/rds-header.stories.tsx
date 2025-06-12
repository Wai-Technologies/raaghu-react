import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsHeader from "./rds-header";
const meta: Meta = {
  title: "Components/Header",
  component: RdsHeader,
  parameters: {
    layout: "padded",
    docs:{
      description: {
  component: `The **Header** component renders a customizable heading element with support for six heading sizes (h1–h6) to control semantic importance and typography scale. It offers multiple color variants such as \`primary\`, \`success\`, \`danger\`, and others for consistent theming across your app. Additionally, the component can display an optional icon with configurable visibility, position (left, right, top, bottom), size, and styling options (fill and stroke), making it ideal for enhanced headers with visual context or status indicators.`
}

    }
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

export const Default: Story = {
  args: {
    headerText: "Header",
    size: "h1",
  },
} satisfies Story;
Default.parameters = {
  controls: { include: ["headerText", "colorVariant", "size"] },
};

export const Advanced: Story = {
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
Advanced.parameters = {
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
