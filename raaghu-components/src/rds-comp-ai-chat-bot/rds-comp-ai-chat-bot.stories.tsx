import React, { useState } from "react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};
import RdsAiChatBot from "./rds-comp-ai-chat-bot";
import { I18nextProvider } from "react-i18next";
import i18n from 'i18next';
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
    title: "Component/Ai Chat Bot",
    component: RdsAiChatBot,
    tags: ['autodocs'],
    decorators: [
        (StoryComponent: React.FC) => (
            <I18nextProvider i18n={i18n}>
            <StoryComponent />
          </I18nextProvider>
        ),
      ],
} as ComponentMeta<typeof RdsAiChatBot>;

const Template: ComponentStory<typeof RdsAiChatBot> = (args: any) => {
    const [messages, setMessages] = useState<Message[]>([]);
    return <RdsAiChatBot {...args} messages={messages} setMessages={setMessages} />;
};

export const Default = Template.bind({});

Default.args = {
  aiLogoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
  userAvatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
  placeholderText: "Ask a followup",
  icon_name: "enhancer"
};