import React from "react";
import RdsCompAiFabMenu from "./rds-comp-ai-fab-menu";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/AI ChatBox/Fab Menu',
    component: RdsCompAiFabMenu,
    parameters: {
            status: { type: 'stable' },
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
        sx: {
            control: 'object',
            description: 'MUI system styles applied to the menu root.',
        },
        color: {
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
        placement: {
            options: ["left", "right"],
            control: { type: "select" },
        },
        icon: {
            options: ["list", "users", "person-outline", "refresh", "export", "delete", "download"],
            control: { type: "select" },
            description: "Icon for the fab menu button (icons registered by this component)"
        },
        variant: {
            options: ["circular", "rounded", "text"],
            control: { type: "select" },
            description: "Shape of the menu button"
        },
    },
} satisfies Meta<typeof RdsCompAiFabMenu>;

export default meta;
type Story = StoryObj<typeof RdsCompAiFabMenu>;

export const Default: Story = {
    args: {
        color: "light",
        size: "medium",
        icon: "list",
        placement: "left",
        variant: "circular",
        items: [
            { label: "New Role", key: "new", icon: "users", iconWidth: "24px", iconHeight: "24px" },
            { label: "Refresh", key: "refresh", icon: "refresh", iconWidth: "24px", iconHeight: "24px" },
            { label: "Export to excel", key: "export", icon: "export", iconWidth: "24px", iconHeight: "24px" },
            { label: "Delete", key: "delete", icon: "delete", iconWidth: "24px", iconHeight: "24px" },
            { label: "Download", key: "download", icon: "download", iconWidth: "24px", iconHeight: "24px" },
        ]
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.firstChild).toBeTruthy();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['color', 'icon', 'size', 'variant', 'placement', 'items', 'sx'] } };
