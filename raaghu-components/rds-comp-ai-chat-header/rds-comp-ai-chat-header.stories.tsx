import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';
import RdsCompAiChatHeader from "./rds-comp-ai-chat-header";

const meta: Meta<typeof RdsCompAiChatHeader> = {
  title: "Components/AI ChatBox/Chat Header",
  component: RdsCompAiChatHeader,
  argTypes: {
    className: { control: "text", description: "CSS class applied to the header container." },
    sx: { control: "object", description: "MUI system styles applied to the header container." },
    ref: { control: false, description: "React ref to the header container; assign it in code." },
    avatarSrc: {
      control: "text",
      description: "URL of the logo image",
    },
    title: {
      control: "text",
      description: "Header title text",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Controls the size of the header text and logo",
    },
  },
  parameters: {
        status: { type: 'stable' },
    layout: "padded",
  },
  tags: ["autodocs", 'stable'],
};

export default meta;
type Story = StoryObj<typeof RdsCompAiChatHeader>;

export const Default: Story = {
  args: {
    avatarSrc: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu_icon.png",
    title: "New Chat Started",
    size: "medium",
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
  },
};