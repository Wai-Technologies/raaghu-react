import React from "react";
import RdsFabMenu from "./rds-fab-menu";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Fab Menu',
    component: RdsFabMenu,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsFabMenu>;

export default meta;
type Story = StoryObj<typeof RdsFabMenu>;


export const FabMenu: Story = {
    args: {
        colorVariant: "primary",
        listItems: [
            { value: "New Role", some: "value", key: "new", icon: "users", iconWidth: "20px", iconHeight: "20px" },
            { value: "Refresh", some: "value", key: "refresh", icon: "refresh", iconWidth: "20px", iconHeight: "20px" },
            { value: "Export to excel", some: "value", key: "export", icon: "export", iconWidth: "20px", iconHeight: "20px" },
            { value: "Delete", some: "value", key: "delete", icon: "delete", iconWidth: "20px", iconHeight: "20px" },
            { value: "Click here download sample import file.", some: "value", key: "download", icon: "download", iconWidth: "20px", iconHeight: "20px" },
        ]
    }
} satisfies Story;

