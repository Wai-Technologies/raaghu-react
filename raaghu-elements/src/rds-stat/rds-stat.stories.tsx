import React from "react";
import RdsStat from "./rds-stat";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Stat',
    component: RdsStat,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
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
        displayType: {
            options: ["basic", "advanced"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsStat>;

export default meta;
type Story = StoryObj<typeof RdsStat>;



export const Default: Story = {
    args: {
        displayType: "basic",
        colorVariant: "primary",
        items: [
            {
                title: "SAM SMITH",
                value: "2370",
                icon: "star",
                iconHeight: "80px",
                iconWidth: "80px",
                iconFill: true,
            },
        ],
    }
} satisfies Story;



export const Advanced: Story = {
    args: {
        displayType: "advanced",
        colorVariant: "primary",
        items: [
            {
                title: "SAM SMITH",
                value: "2370",
                icon: "star",
                iconHeight: "80px",
                iconWidth: "80px",
                iconFill: true,
            },
        ],
    }
} satisfies Story;


