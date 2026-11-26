import { useState } from "react";
import RdsCompAiChatBot from "./rds-comp-ai-chat-bot";
import { Message } from "./rds-comp-ai-chat-bot";
import { StoryObj, Meta } from "@storybook/react-vite";
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
    aiLogoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu_icon.png",
    userAvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    placeholderText: "Ask a followup",
    iconName: "enhancer"
  },
} satisfies Story;