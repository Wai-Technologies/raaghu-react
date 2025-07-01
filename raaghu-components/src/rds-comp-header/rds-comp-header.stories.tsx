import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsCompHeader from "./rds-comp-header";
const meta: Meta = {
  title: "Components/Header",
  component: RdsCompHeader,
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
} satisfies Meta<typeof RdsCompHeader>;

export default meta;
type Story = StoryObj<typeof RdsCompHeader>;

export const Standard: Story = {
  args: {
    headerText: "Header",
    size: "h1",
  },
} satisfies Story;
Standard.parameters = {
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
