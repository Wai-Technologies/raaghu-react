import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsChatHeader, { ChatHeaderSize } from "./rds-chat-header";

const meta: Meta<typeof RdsChatHeader> = {
  title: "Components/AI ChatBox/Chat Header",
  component: RdsChatHeader,
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
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RdsChatHeader>;

export const Default: Story = {
  args: {
    logoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
    title: "New Chat Started",
    size: ChatHeaderSize.Medium,
  },
};
