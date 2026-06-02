import React from "react";
import RdsCompAiFabMenu from "./rds-comp-ai-fab-menu";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/AI ChatBox/Fab Menu',
    component: RdsCompAiFabMenu,
    parameters: {
        layout: 'padded',
    },
    decorators: [
        (Story) => (
            <div className="rds-fab-menu-offset">
                <Story />
            </div>
        )
    ],
    tags: ['autodocs', 'stable'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        alignment: {
            options: ["left", "right"],
            control: { type: "select" },
        },
        menuIcon: {
            options: ["list", "users", "person-outline", "refresh", "export", "delete", "download"],
            control: { type: "select" },
            description: "Icon for the fab menu button (icons registered by this component)"
        },
        backgroundType: {
            options: ["circular", "rectangular", "none"],
            control: { type: "select" },
            description: "Background type for the menu button"
        },
    },
} satisfies Meta<typeof RdsCompAiFabMenu>;

export default meta;
type Story = StoryObj<typeof RdsCompAiFabMenu>;

export const Default: Story = {
    args: {
        colorVariant: "light",
        size: "medium",
        menuIcon: "list",
        alignment: "left",
        backgroundType: "circular",
        listItems: [
            { value: "New Role", key: "new", icon: "users", iconWidth: "24px", iconHeight: "24px" },
            { value: "Refresh", key: "refresh", icon: "refresh", iconWidth: "24px", iconHeight: "24px" },
            { value: "Export to excel", key: "export", icon: "export", iconWidth: "24px", iconHeight: "24px" },
            { value: "Delete", key: "delete", icon: "delete", iconWidth: "24px", iconHeight: "24px" },
            { value: "Download", key: "download", icon: "download", iconWidth: "24px", iconHeight: "24px" },
        ]
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.firstChild).toBeTruthy();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['colorVariant', 'menuIcon', 'size', 'backgroundType', 'alignment', 'listItems'] } };
