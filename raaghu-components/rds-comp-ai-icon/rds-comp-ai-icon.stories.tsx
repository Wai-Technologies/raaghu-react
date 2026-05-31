import React from "react";
import RdsCompAiIcon, { registerMaterialIcon, registerMaterialIcons } from "./rds-comp-ai-icon";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';

const meta: Meta = {
    title: 'Components/AI ChatBox/Icon',
    component: RdsCompAiIcon,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs', 'beta'],
    argTypes: {
        colorVariant: {
            options: ["primary", "success", "danger", "warning", "light", "info", "secondary", "dark"],
            control: { type: "select" },
        },
        name: {
            options: ["person-outline","users"],
            control: { type: "select" },
            description: "Material-UI icon name (can be extended using registerMaterialIcon)",
        }
    },
} satisfies Meta<typeof RdsCompAiIcon>;

export default meta;
type Story = StoryObj<typeof RdsCompAiIcon>;

export const Default: Story = {
    args: {
        name: "person-outline",
        width: "24px",
        height: "24px",
        fill: false,
        stroke: true,
        colorVariant: "primary",
        isCursorPointer: true,
    },
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['name', 'width', 'height','colorVariant', 'isCursorPointer'] } };
