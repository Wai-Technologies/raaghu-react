import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompThemeToggle from "./rds-comp-theme-toggle";

const meta: Meta =  {
  title: "Components/AI ChatBox/Theme Toggle",
  component: RdsCompThemeToggle,
  parameters:{
    docs:{
      description: {
  component: `The **Theme Toggle** component allows users to switch between different visual themes, such as light and dark modes. This component enhances user accessibility and personalization by providing a simple and intuitive toggle control. It is especially useful in applications where theme preferences improve readability or aesthetic experience. The component is typically integrated with global theme context or CSS variables to apply the selected theme across the entire user interface.`
}

    }
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompThemeToggle>

export default meta;
type Story = StoryObj<typeof RdsCompThemeToggle>;

export const Standard : Story = {
  args: {}
} satisfies Story;

Standard.parameters = { controls: { include: [] } };