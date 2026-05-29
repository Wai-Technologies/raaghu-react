import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import React, { useState } from "react";
import RdsCompAiChatBot from "./rds-comp-ai-chat-bot";
import { Message } from "./rds-comp-ai-chat-bot";
import { StoryObj, Meta } from "@storybook/react-vite";

const meta: Meta = {
  title: "Components/AI ChatBox/AI Chat Bot",
  component: RdsCompAiChatBot,
  parameters:{
    docs:{
    }
  },
  tags: ["autodocs"],
  argTypes: {
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
    aiLogoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
    userAvatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    placeholderText: "Ask a followup",
    iconName: "enhancer"
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
} satisfies Story;