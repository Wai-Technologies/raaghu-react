import React from "react";
import RdsAiChatBot from "./rds-comp-ai-chat-bot";
import { I18nextProvider } from "react-i18next";
import i18n from 'i18next';
import { ComponentMeta, ComponentStory } from "@storybook/react";
 
 
export default {
    title: "Elements/Ai Chat Bot",
    component: RdsAiChatBot,
    decorators: [
        (StoryComponent: React.FC) => (
            <I18nextProvider i18n={i18n}>
            <StoryComponent />
          </I18nextProvider>
        ),
      ],
} as ComponentMeta<typeof RdsAiChatBot>;
 
const Template: ComponentStory<typeof RdsAiChatBot> = (args: any) => (
    <RdsAiChatBot {...args} />
);
 
export const Default = Template.bind({});
 
Default.args = {
};