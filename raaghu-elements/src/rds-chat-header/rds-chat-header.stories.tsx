import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsChatHeader, { ChatHeaderSize } from "./rds-chat-header";

const meta: Meta<typeof RdsChatHeader> = {
  title: "Components/AI ChatBox/Chat Header",
  component: RdsChatHeader,
  argTypes: {
    logoUrl: {
      control: "text",
      description: "URL of the logo image",
      docs:{}
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
      description: {
  component: `The **Chat Header** component is a top-section UI element designed specifically for AI chat interfaces. It displays a logo and a title, making it ideal for branding and context-setting in conversational UIs. The \`logoUrl\` prop specifies the image source for the logo, while the \`title\` prop sets the header text. The \`size\` prop controls the overall visual scale of the header and supports three predefined sizes: \`small\`, \`medium\`, and \`large\` via the \`ChatHeaderSize\` enum. This component ensures consistent and responsive layout for AI-related workflows and can be reused across multiple chat-based modules to maintain visual uniformity.`
}
,
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
type Story = StoryObj<typeof RdsChatHeader>;

export const Default: Story = {
  args: {
    logoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
    title: "New Chat Started",
    size: ChatHeaderSize.Medium,
  },
};
