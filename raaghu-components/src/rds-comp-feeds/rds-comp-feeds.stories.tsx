import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFeeds from "./rds-comp-feeds";

const meta: Meta = {
  title: "Components/Feeds",
  component: RdsCompFeeds,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variantType: { control: "select", options: ["Basic", "Advanced"] },
  },
} satisfies Meta<typeof RdsCompFeeds>;

export default meta;
type Story = StoryObj<typeof RdsCompFeeds>;

export const Default: Story = {
    args: {
        variantType: "Basic",
    itemList: [
        {
            name: "Jijo Fleshman",
            username: "@jijolife123",
            date: new Date(),
            feedIcon: "person",
            imageUrl:
                "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
            description:
                "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
            hashtags: "#newbag #fancybag #designerbag",
            reviews: "See all 125 reviews",
            replies: "Show replies (3)",
            rating: 1,
        },
        {
            name: "Jijo Fleshman",
            username: "@jijolife123",
            date: new Date(),
            feedIcon: "person",
            imageUrl:
                "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
            description:
                "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
            hashtags: "#newbag #fancybag #designerbag",
            reviews: "See all 125 reviews",
            replies: "Show replies (3)",
            rating: 1,
        },
        {
            name: "Jijo Fleshman",
            username: "@jijolife123",
            date: new Date(),
            feedIcon: "person",
            imageUrl:
                "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
            description:
                "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
            hashtags: "#newbag #fancybag #designerbag",
            reviews: "See all 125 reviews",
            replies: "Show replies (3)",
            rating: 1,
        },
    ],
    }
  } satisfies Story;

  export const LongFeed: Story = {
    args: {
        variantType: "Advanced",
    itemList: [
        {
            name: "Jijo Fleshman",
            username: "@jijolife123",
            date: new Date(),
            feedIcon: "person",
            imageUrl:
                "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
            description:
                "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
            hashtags: "#newbag #fancybag #designerbag",
            reviews: "See all 125 reviews",
            rating: 1,
        },
        {
            name: "Jijo Fleshman",
            username: "@jijolife123",
            date: new Date(),
            feedIcon: "person",
            imageUrl:
                "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
            description:
                "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
            reviews: "See all 125 reviews",
            replies: "Show replies (3)",
            rating: 1,
        },
        {
            name: "Jijo Fleshman",
            username: "@jijolife123",
            date: new Date(),
            feedIcon: "person",
            imageUrl:
                "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
            description:
                "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
            reviews: "See all 125 reviews",
            rating: 1,
        },
    ],
    }
  } satisfies Story;
