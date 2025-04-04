import React from "react";
import RdsSidebar from "./rds-side-bar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/AI ChatBox/Side Bar',
    component: RdsSidebar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
       
    },
} satisfies Meta<typeof RdsSidebar>;

export default meta;
type Story = StoryObj<typeof RdsSidebar>;
export const Default: Story = {
    args: {
        labels: [
            "New Chat",
            "Recent",
            "SAAS Dashboard",
            "Community",
            "Help",
            "Activity",
            "Settings"
        ],
        icons: [
            "new_chat",
            "recent",
            "saas_chat",
            "community",
            "chat_help",
            "activity",
            "chat_settings"
        ]
    },
} satisfies Story;

