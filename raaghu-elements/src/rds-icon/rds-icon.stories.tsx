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
        },
        tooltipPlacement: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
        },

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
        isAnimate: true,
    }
} satisfies Story;

export const Tooltip: Story = {
    args: {
        colorVariant: "primary",
        name: "plus",
        databstoggle: "tooltip",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
    }
} satisfies Story;
