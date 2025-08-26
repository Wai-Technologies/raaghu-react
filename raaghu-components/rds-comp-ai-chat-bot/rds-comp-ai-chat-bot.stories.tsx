import React, { useState } from "react";
import RdsCompAiChatBot from "./rds-comp-ai-chat-bot";
import { I18nextProvider } from "react-i18next";
import i18n from 'i18next';
import { Message } from "./rds-comp-ai-chat-bot";
import { StoryObj, Meta } from "@storybook/react-vite";

const meta: Meta = {
  title: "Components/AI ChatBox/Ai Chat Bot",
  component: RdsCompAiChatBot,
  parameters:{
    docs:{
      description: {
  component: `The **AI Chat Bot** component provides an interactive chat interface for users to engage in conversations with an AI assistant. It supports customizable avatars for both the AI and the user via \`aiLogoUrl\` and \`userAvatarUrl\`, and allows dynamic interaction through the \`messages\` array and \`setMessages\` handler for real-time updates. The \`placeholderText\` guides user input, while the \`icon_name\` prop enables visual customization based on the bot's context or role (e.g., 'enhancer'). This component is ideal for integrating conversational AI features into applications, offering a clean and responsive design for seamless user experiences.`
}

    }
  },
  tags: ["autodocs"],
  argTypes: {
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
    icon_name: "enhancer"
  },
} satisfies Story;