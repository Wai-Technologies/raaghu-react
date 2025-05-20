import React, { useState } from "react";
import RdsAiChatBot from "./rds-comp-ai-chat-bot";
import { I18nextProvider } from "react-i18next";
import i18n from 'i18next';
import { Message } from "./rds-comp-ai-chat-bot";
import { StoryObj, Meta } from "@storybook/react";

const meta: Meta = {
  title: "Components/AI ChatBox/Ai Chat Bot",
  component: RdsAiChatBot,
  tags: ["autodocs"],
  argTypes: {
  },
} satisfies Meta<typeof RdsAiChatBot>;

export default meta;

type Story = StoryObj<typeof RdsAiChatBot>;

export const Default: Story = {
  render: (args) => {
    const [messages, setMessages] = useState<Message[]>([]);
    return (
      <RdsAiChatBot
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
    icon_name: "enhancer"
  },
} satisfies Story;
