import React from "react";
import RdsCompIconLabel from "./rds-comp-icon-label";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: 'Components/Icon Label',
  component: RdsCompIconLabel,
  parameters: {
    layout: 'padded',
    docs:{
      description: {
  component: `The **Icon Label** component displays a text label with or without an icon, allowing for clear and visually appealing UI elements. It supports various \`colorVariant\` options to match different themes and provides three \`size\` options ("small", "medium", "large") to adjust the icon and label dimensions accordingly. Additionally, the component offers flexible icon positioning, enabling the icon to appear either on the left or right side of the label. It also supports all label features like \`fontWeight\` options, \`italic\` styling, and \`required\` flag. This makes it perfect for use in buttons, tags, badges, form labels, or any interface element that requires an icon paired with descriptive text for enhanced usability and aesthetics.`
}

    }
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
    fontWeight: {
      options: [
        "black",
        "bold",
        "bolder",
        "extrabold",
        "light",
        "lighter",
        "medium",
        "normal",
        "semibold",
      ],
      control: { type: "select" },
    }
  },
} satisfies Meta<typeof RdsCompIconLabel>;

export default meta;
type Story = StoryObj<typeof RdsCompIconLabel>;

export const Standard: Story = {
  args: {
    label: "User Name",
    icon: "users",
    size: "medium",
    colorVariant: "primary",
    withIcon: true,
  }
} satisfies Story;
Standard.parameters = { controls: { include: ['label', 'icon', 'colorVariant', 'size'] } };

export const WithPosition: Story = {
  args: {
    label: "User Name",
    icon: "users",
    size: "medium",
    iconposition: "left",
    colorVariant: "primary",
    withIcon: true,
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

export const CustomLabel: Story = {
  args: {
    label: "Label",
    fontWeight: "bold",
    italic: false,
    required: false,
    custom: true,
  }
} satisfies Story;
CustomLabel.parameters = { controls: { include: ['label', 'fontWeight', 'italic', 'required'] } };

