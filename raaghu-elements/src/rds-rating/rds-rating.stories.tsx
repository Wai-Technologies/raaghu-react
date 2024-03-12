import React from "react";
import RdsRating from "./rds-rating";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Rating',
    component: RdsRating,
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
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
          },
    },
} satisfies Meta<typeof RdsRating>;

export default meta;
type Story = StoryObj<typeof RdsRating>;

export const Rating: Story = {
    args: {
        rating: 3,
        colorVariant: "primary",
        noOfReviews: 123,
        size: "small",
        seeAllOption: true,
        onSeeAll: () => console.log("See all clicked"),
        dataTestId: "rating-test"
    }
} satisfies Story;
Rating.parameters = { controls: { include: ['rating', 'colorVariant', 'noOfReviews', 'size'] } };

