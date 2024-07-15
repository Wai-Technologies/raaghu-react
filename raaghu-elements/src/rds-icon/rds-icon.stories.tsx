import React from "react";
import RdsIcon from "./rds-icon";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Icon',
    component: RdsIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: ["primary", "success", "danger", "warning", "light", "info", "secondary", "dark"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsIcon>;

export default meta;
type Story = StoryObj<typeof RdsIcon>;

export const Icon: Story = {
    args: {
        name: "users",
        width: "20px",
        height: "20px",
        fill: false,
        stroke: true,
        colorVariant: "primary",
        isCursorPointer: true,
    }
} satisfies Story;
Icon.parameters = { controls: { include: ['name', 'width', 'height', 'fill', 'stroke', 'colorVariant', 'isCursorPointer'] } };

export const Tooltip: Story = {
    args: {
        colorVariant: "primary",
        name: "plus",
        width: "20px",
        height: "20px",
        databstoggle: "tooltip",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
        isCursorPointer: true,
    },
    argTypes: {
        tooltipPlacement: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
        },
    },
} satisfies Story;
Tooltip.parameters = { controls: { include: ['name', 'width', 'height', 'databstoggle', 'tooltip', 'tooltipPlacement', 'tooltipTitle', 'colorVariant', 'isCursorPointer'] } };
