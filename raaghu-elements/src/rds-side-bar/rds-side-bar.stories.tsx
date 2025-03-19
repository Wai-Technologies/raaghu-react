import React from "react";
import RdsSidebar from "./rds-side-bar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Side Bar",
    component: RdsSidebar,
    argTypes: {
       
    },
    parameters: {
        layout: 'padded',
        
    },
    tags: ['autodocs'],
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
            "home"
        ]
    },
}