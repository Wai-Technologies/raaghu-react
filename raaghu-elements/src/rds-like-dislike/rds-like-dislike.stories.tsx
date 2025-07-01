import React from "react";
import RdsLikeDislike from "./rds-like-dislike";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Like-Dislike',
    component: RdsLikeDislike,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Like-Dislike** component provides a simple interactive UI element that allows users to express positive or negative feedback through like and dislike buttons. It displays counters for both likes and dislikes, updating dynamically based on user interaction. The \`colorVariant\` prop applies different color themes from the design system to ensure visual consistency and emphasis. This component is ideal for feedback mechanisms in social features, comments, reviews, or content rating, promoting user engagement while maintaining an accessible and cohesive look.`
}

        }
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


export const LikeDislikeWithCounter: Story = {
    args: {
        like: 0,
        dislike: 0,
        colorVariant: "primary",
    }
} satisfies Story;
LikeDislikeWithCounter.parameters = { controls: { include: ['like', 'dislike', 'colorVariant'] } };

