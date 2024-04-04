
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompReviews from "./rds-comp-reviews";


const meta: Meta = { 
    title: "Components/Reviews",
    component: RdsCompReviews,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompReviews>;

export default meta;
type Story = StoryObj<typeof RdsCompReviews>;

export const Default: Story = {
    args: {
        variantType: "with-summary-chart",
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
Default.parameters = { controls: { include: ['variantType', 'itemList'] } };

export const MultiColumn: Story = {
    args: {
        variantType: "multi-column",
        itemList: [
            {
                name: "Jems Rock",
                date: new Date(),
                rating: 4,
                likes: 50,
                dislikes: 50,
                reviewTitle: "Very good and color also nice & fresh look",
                reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
                description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
            },
            {
                name: "Jems Rock",
                date: new Date(),
                rating: 4,
                likes: 50,
                dislikes: 50,
                reviewTitle: "Very good and color also nice & fresh look",
                reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
                description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
            },
            {
                name: "Jems Rock",
                date: new Date(),
                rating: 4,
                likes: 50,
                dislikes: 50,
                reviewTitle: "Very good and color also nice & fresh look",
                reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
                description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
            },
            {
                name: "Jems Rock",
                date: new Date(),
                rating: 4,
                likes: 50,
                dislikes: 50,
                reviewTitle: "Very good and color also nice & fresh look",
                reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
                description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
            }
        ]
    }
} satisfies Story;
MultiColumn.parameters = { controls: { include: ['variantType', 'itemList'] } };