import React from "react";
import RdsIconLabel from "./rds-icon-label";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: 'Components/Icon Label',
  component: RdsIconLabel,
  parameters: {
    layout: 'padded',
    docs:{
      description: {
  component: `The **Icon Label** component displays a text label combined with an icon, allowing for clear and visually appealing UI elements. It supports various \`colorVariant\` options to match different themes and provides three \`size\` options ("small", "medium", "large") to adjust the icon and label dimensions accordingly. Additionally, the component offers flexible icon positioning, enabling the icon to appear either on the left or right side of the label. This makes it perfect for use in buttons, tags, badges, or any interface element that requires an icon paired with descriptive text for enhanced usability and aesthetics.`
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

