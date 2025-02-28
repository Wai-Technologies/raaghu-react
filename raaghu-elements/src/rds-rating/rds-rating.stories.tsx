import React from "react";
import RdsRating, { ColorVariant, RatingStyle, RatingType } from "./rds-rating";
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
            options: ["default", "filled", "outline"],
            control: { type: "select" },
        },
        
        rating: {
            options: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, "left", "mid", "right"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsRating>;

export default meta;
type Story = StoryObj<typeof RdsRating>;

export const Default: Story = {
    args: {
        colorVariant: ColorVariant.Primary, 
        type: RatingType.Star,
        rating: 4.5,
        style: RatingStyle.Filled,
        //size: "medium",
        //dataTestId: "rating-test"
    }
} satisfies Story;
Default.parameters = { controls: { include: [ 'type', 'rating', 'style'] } };

// whatever code is commented in this file is needed in further reference - enhancement as per the figma design

// export const RatingWithCount: Story = {
//     args: {
//         rating: 3,
//         colorVariant: "primary",
//         noOfReviews: 123,
//         size: "small",
//         seeAllOption: true,
//         onSeeAll: () => console.log("See all clicked"),
//         dataTestId: "rating-test"
//     }
// } satisfies Story;
// RatingWithCount.parameters = { controls: { include: ['rating', 'colorVariant', 'noOfReviews', 'size'] } };

// export const Slider: Story = {
//     args: {
//         colorVariant: "primary",
//         defaultSlider: true,
//         size: "small",
//         dataTestId: "rating-test",
//         level: "mid"
//     }
// } satisfies Story;
// Slider.parameters = { controls: { include: ['colorVariant', 'level', 'size'] } };

// export const Outline: Story = {
//     args: {
//         colorVariant: "primary",
//         size: "small",
//         outline: true,
//         dataTestId: "rating-test",
//         type: "star",
//         style: "outline",
//         rating: 0.5
//     }
// } satisfies Story;
// Outline.parameters = { controls: { include: ['colorVariant', 'rating', 'size', 'style'] } };

// export const Filled: Story = {
//     args: {
//         colorVariant: "primary",
//         filled: true,
//         size: "small",
//         dataTestId: "rating-test",
//         type: "star",
//         style: "filled",
//         rating: 3
//     }
// } satisfies Story;
// Filled.parameters = { controls: { include: ['colorVariant', 'rating', 'size', 'style'] } };