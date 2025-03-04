import RdsStat from "./rds-stat";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Stat',
    component: RdsStat,
    parameters: {
        layout: 'padded',
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
                title: "Downloads",
                value: "2370",
                icon: "cloud_download",
                iconHeight: "80px",
                iconWidth: "80px",
                iconFill: false,
                iconStroke: true
            },
        ],
    }
} satisfies Story;
Default.parameters = { controls: { include: ['displayType', 'colorVariant', 'items'] } };

export const Advanced: Story = {
    args: {
        displayType: "advanced",
        colorVariant: "primary",
        items: [
            {
                title: "Downloads",
                value: "2370"
            },
        ],
    }
} satisfies Story;
Advanced.parameters = { controls: { include: ['displayType', 'colorVariant', 'items'] } };