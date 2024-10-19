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
        type: {
            options: ["star", "slider"],
            control: { type: "select" },
        },
        style: {
            options: [ "filled", "outline"],
            control: { type: "select" },
        },
        level: {
            options: ["left", "mid", "right"],
            control: { type: "select" },
        },
        rating: {
            control: { type: "number", min: 0, max: 5, step: 0.5 },
        }
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

export const Slider: Story = {
    args: {
        colorVariant: "primary",
        defaultSlider: true,
        size: "small",
        dataTestId: "rating-test",
        level: "mid"
    }
} satisfies Story;
Slider.parameters = { controls: { include: ['colorVariant', 'level', 'size'] } };

export const Outline: Story = {
    args: {
        colorVariant: "primary",
        size: "small",
        outline: true,
        dataTestId: "rating-test",
        type: "star",
        style: "outline",
        rating: 0.5
    }
} satisfies Story;
Outline.parameters = { controls: { include: ['colorVariant', 'rating', 'size', 'style'] } };

export const Filled: Story = {
    args: {
        colorVariant: "primary",
        filled: true,
        size: "small",
        dataTestId: "rating-test",
        type: "star",
        style: "filled",
        rating: 3
    }
} satisfies Story;
Filled.parameters = { controls: { include: ['colorVariant', 'rating', 'size', 'style'] } };