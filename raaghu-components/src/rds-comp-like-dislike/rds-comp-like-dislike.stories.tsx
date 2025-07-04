import React from "react";
import RdsCompLikeDislike from "./rds-comp-like-dislike";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Like-Dislike',
    component: RdsCompLikeDislike,
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
} satisfies Meta<typeof RdsCompLikeDislike>;

export default meta;
type Story = StoryObj<typeof RdsCompLikeDislike>;


export const Standard: Story = {
    args: {
        like: 0,
        dislike: 0,
        colorVariant: "primary",
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['like', 'dislike', 'colorVariant'] } };

