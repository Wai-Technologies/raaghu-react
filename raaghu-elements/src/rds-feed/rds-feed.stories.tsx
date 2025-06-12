import React from "react";
import RdsFeed, { Size } from "./rds-feed";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Feed',
    component: RdsFeed,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
  component: `The **Feed** component displays a list of user-generated content or updates such as reviews, comments, or activity feeds. It supports configurable \`size\` options ("small", "medium", "large") to adjust avatar dimensions and overall feed item size for better visual hierarchy. The \`itemList\` prop accepts an array of feed items, each containing details like \`id\`, \`name\`, \`username\`, \`date\`, \`feedIcon\`, \`description\`, \`reviews\`, \`rating\`, and \`profilePic\`. This makes it ideal for showing user feedback, social activity, or content updates in a compact, readable format with customizable styling and icons.`
}
,
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(small|medium|large)"/g, '{Size.$1}');
                    return code;
                },
            },
        },
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

export const Default: Story = {
    args: {
        size: Size.Medium, // Added size parameter for the avatar
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
Default.parameters = { controls: { include: ['itemList' , 'size'] } };


