import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompAiChatHeader, { ChatHeaderSize } from "./rds-comp-ai-chat-header";

const meta: Meta<typeof RdsCompAiChatHeader> = {
  title: "Components/AI ChatBox/Chat Header",
  component: RdsCompAiChatHeader,
  argTypes: {
    logoUrl: {
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
    layout: "padded",
    docs: {
      source: {
          transform: (code: string) => {
              code = code.replace(/"(small|medium|large)"/g, '{ChatHeaderSize.$1}');
              return code;
          },
      },
  },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RdsCompAiChatHeader>;

export const Default: Story = {
  args: {
    logoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
    title: "New Chat Started",
    size: ChatHeaderSize.Medium,
  },
};