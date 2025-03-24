import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsChatHeader from "./rds-chat-header";

const meta: Meta = {
    title: "Components/Automate/Chat Header",
    component: RdsChatHeader,
    argTypes: {},
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsChatHeader>;

export default meta;
type Story = StoryObj<typeof RdsChatHeader>;

export const Default: Story = {
    args: {
       logoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
       title: "New Chat Started"
    },
};
