import React from "react";
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompFeeds from "./rds-comp-feeds";

const meta: Meta = {
  title: "Components/Feeds",
  component: RdsCompFeeds,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Feeds** component is a versatile and customizable UI element designed to display a list of user-generated content or activity feeds in a structured and visually appealing format. It supports two variants: `Basic` and `Advanced`, allowing developers to choose the level of detail and interactivity. The component uses an `itemList` array to define feed items, with properties such as `name`, `username`, `date`, `feedIcon`, `imageUrl`, `description`, `hashtags`, `reviews`, `replies`, and `rating`. This component is ideal for social media platforms, dashboards, or any interface requiring dynamic and interactive feed displays. Fully customizable, the Feeds component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
    variantType: { control: "select", options: ["Basic", "Advanced"] },
  },
} satisfies Meta<typeof RdsCompFeeds>;

export default meta;
type Story = StoryObj<typeof RdsCompFeeds>;

export const Standard: Story = {
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
