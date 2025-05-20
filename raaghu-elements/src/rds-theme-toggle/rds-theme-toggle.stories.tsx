import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsThemeToggle from "./rds-theme-toggle";

const meta: Meta =  {
  title: "Components/AI ChatBox/Theme Toggle",
  component: RdsThemeToggle,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsThemeToggle>

export default meta;
type Story = StoryObj<typeof RdsThemeToggle>;

export const Default : Story = {
  args: {}
} satisfies Story;

Default.parameters = { controls: { include: [] } };