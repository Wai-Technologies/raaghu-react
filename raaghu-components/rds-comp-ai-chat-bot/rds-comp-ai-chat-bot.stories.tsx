import React, { useState } from "react";
import RdsCompAiChatBot from "./rds-comp-ai-chat-bot";
import { Message } from "./rds-comp-ai-chat-bot";
import { StoryObj, Meta } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
  title: "Components/AI ChatBox/AI Chat Bot",
  component: RdsCompAiChatBot,
  parameters: {
        status: { type: 'stable' },
    docs:{
    }
  },
  tags: ["autodocs", 'stable'],
  argTypes: {
    title: { control: "text", description: "Title shown in the chat header." },
    className: { control: "text", description: "CSS class applied to the chat container." },
    sx: { control: "object", description: "MUI system styles applied to the chat container." },
    ref: { control: false, description: "React ref to the chat container; assign it in code." },
    iconName: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof RdsCompAiChatBot>;

export default meta;

type Story = StoryObj<typeof RdsCompAiChatBot>;

export const Default: Story = {
  render: (args) => {
    const [messages, setMessages] = useState<Message[]>([]);
    return (
      <RdsCompAiChatBot
        {...args}
        messages={messages}
        setMessages={setMessages}
      />
    );
  },
  args: {
    assistantAvatar: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu_icon.png",
    userAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    placeholder: "Ask a followup",
    iconName: "enhancer"
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
  },
} satisfies Story;