import React from "react";
import RdsIcon from "./rds-icon";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Icon',
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

export const UserIcon: Story = {
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
UserIcon.parameters = { controls: { include: ['name', 'width', 'height', 'fill', 'stroke', 'colorVariant', 'isCursorPointer'] } };

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

export const WithImage: Story = {
    args: {
        imageUrl: "https://picsum.photos/seed/picsum/1200/600",
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
        isContinueAnimate: { table: { disable: true } },
        colorVariant:{ table: { disable: true } },
        name:{ table: { disable: true } },
        opacity:{ table: { disable: true } },
        type:{ table: { disable: true } },
        isAnimate:{ table: { disable: true } },
        iconPath:{ table: { disable: true } },
        hovered:{ table: { disable: true } },
        isHovered:{ table: { disable: true } },
        stroke:{ table: { disable: true } },
        strokeWidth:{ table: { disable: true } },
        borderRadius:{ table: { disable: true } },
    },
} satisfies Story;
Tooltip.parameters = { controls: { include: ['imageUrl', 'width', 'height', 'databstoggle', 'tooltip', 'tooltipPlacement', 'tooltipTitle', 'isCursorPointer'] } };
