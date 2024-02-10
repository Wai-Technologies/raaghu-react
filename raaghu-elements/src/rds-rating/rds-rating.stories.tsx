import React from "react";
import RdsRating from "./rds-rating";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Rating',
    component: RdsRating,
    parameters: {
        layout: '',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsRating>;

export default meta;
type Story = StoryObj<typeof RdsRating>;

export const Rating: Story = {
    args: {
        rating: 2,
        colorVariant: "warning",
        reviewPosition: "right",
        noOfReviews: 123,
        seeAllOption: false
    }
} satisfies Story;

