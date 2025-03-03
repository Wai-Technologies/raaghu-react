import React from "react";
import RdsFeed from "./rds-feed";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Feed',
    component: RdsFeed,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'radio' }
          },
    },
} satisfies Meta<typeof RdsFeed>;

export default meta;
type Story = StoryObj<typeof RdsFeed>;

export const ReviewFeed: Story = {
    args: {
        size: "medium", // Added size parameter for the avatar
        itemList: [
            {
                id: "1",
                name: "Jijo Fleshman",
                username: "@jijolife123",
                date: "15 hours ago",
                feedIcon: "person",
                description:
                    "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside as the zipper can be opened in either side.",
                reviews: "See all 123 reviews",
                rating: 1,
                fill: false,
                stroke: false,
                profilePic: "profile-pic-url",
                withNoOfReviews: false,
               
            }
        ],
    }
} satisfies Story;
ReviewFeed.parameters = { controls: { include: ['itemList' , 'size'] } };


