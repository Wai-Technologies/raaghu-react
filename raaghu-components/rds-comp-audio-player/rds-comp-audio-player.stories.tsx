import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompAudioPlayer from './rds-comp-audio-player';

const meta: Meta<typeof RdsCompAudioPlayer> = {
    title: "Components/Audio Player",
    component: RdsCompAudioPlayer,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Chatbot** component is a customizable UI element designed to facilitate interactive communication within your application. It supports features such as `comments` to display a list of user messages, `currentUser` to define the active user, and options like `allowDelete` to enable message deletion, `isEmojiPicker` for emoji support, and `isFilepload` for file uploads. The component also allows customization of message appearance with properties like `currentUserCommentBgColor`, `currentUserCommentTextColor`, `otherUserCommentBgColor`, and `OtherUserCommentTextColor`. Additionally, it supports configurable `dateFormat` for message timestamps and a `deleteIconTimeout` to control the visibility of the delete icon. Ideal for chat interfaces, feedback systems, or collaborative tools, the Chatbot component ensures a seamless and engaging user experience while maintaining consistency with your design system.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
            type: {
                control: 'select',
                options: ['Audio Edition', 'Audio Player', 'Collapsed'],
                description: 'Select the audio player type',
            },
    },
} satisfies Meta<typeof RdsCompAudioPlayer>;

export default meta;

type Story = StoryObj<typeof RdsCompAudioPlayer>;

export const Standard: Story = {
    args: {
        type: 'Audio Player',
        showSettings: true,
        showTranscript: true,
        showExport: true,
        showMoreOptions: true,
    } 
};
