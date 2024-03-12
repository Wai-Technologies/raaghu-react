import React from "react";
import RdsLikeDislike from "./rds-like-dislike";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Like-Dislike',
    component: RdsLikeDislike,
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
    },
} satisfies Meta<typeof RdsLikeDislike>;

export default meta;
type Story = StoryObj<typeof RdsLikeDislike>;


export const LikeDislike: Story = {
    args: {
        like: 0,
        dislike: 0,
        colorVariant: "primary",
    }
} satisfies Story;
LikeDislike.parameters = { controls: { include: ['like', 'dislike', 'colorVariant'] } };

