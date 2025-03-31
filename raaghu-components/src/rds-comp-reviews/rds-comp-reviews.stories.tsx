
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompReviews, { RevieweStyle, VariantType } from "./rds-comp-reviews";

const meta: Meta = { 
    title: "Components/Reviews",
    component: RdsCompReviews,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        style: {
            options: [ "style1", "style2", "style3","style4", "style5", "style6", "style7", "style8", "style9", "style10", "style11", "style12"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompReviews>;

export default meta;
type Story = StoryObj<typeof RdsCompReviews>;

export const Default: Story = {
    args: {
        variantType: VariantType.Default,
        style: RevieweStyle.Style1,
        itemList: [
            {
                name: "Jane Doe",
                username: "Software Developer",
                date: new Date(),
                feedIcon: "person",
                imageUrl:
                    "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
                description:"Awesome website and funnel for your business",               
                hashtags: "#newbag #fancybag #designerbag",
                reviews: "4.75",
                rating: 1,
            },
        ],
    }
} satisfies Story;
Default.parameters = { controls: { include: ['itemList','style','variantType'] } };

// whatever code is commented in this file is needed in further reference - enhancement as per the figma design

// export const SummaryChart: Story = { 
//     args: {
//         variantType: "with-summary-chart",
//         itemList: [
//             {
//                 name: "Jijo Fleshman",
//                 username: "@jijolife123",
//                 date: new Date(),
//                 feedIcon: "person",
//                 imageUrl:
//                     "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
//                 description:
//                     "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
//                 hashtags: "#newbag #fancybag #designerbag",
//                 reviews: "See all 125 reviews",
//                 rating: 1,
//             },
//             {
//                 name: "Jijo Fleshman",
//                 username: "@jijolife123",
//                 date: new Date(),
//                 feedIcon: "person",
//                 imageUrl:
//                     "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
//                 description:
//                     "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
//                 reviews: "See all 125 reviews",
//                 replies: "Show replies (3)",
//                 rating: 1,
//             },
//             {
//                 name: "Jijo Fleshman",
//                 username: "@jijolife123",
//                 date: new Date(),
//                 feedIcon: "person",
//                 imageUrl:
//                     "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?pid=ImgDet&rs=1",
//                 description:
//                     "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
//                 reviews: "See all 125 reviews",
//                 rating: 1,
//             },
//         ],
//     }
// } satisfies Story;
// SummaryChart.parameters = { controls: { include: ['itemList'] } };

// export const MultiColumn: Story = {
//     args: {
//         variantType: "multi-column",
//         itemList: [
//             {
//                 name: "Jems Rock",
//                 date: new Date(),
//                 rating: 4,
//                 likes: 50,
//                 dislikes: 50,
//                 reviewTitle: "Very good and color also nice & fresh look",
//                 reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
//                 description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
//             },
//             {
//                 name: "Jems Rock",
//                 date: new Date(),
//                 rating: 4,
//                 likes: 50,
//                 dislikes: 50,
//                 reviewTitle: "Very good and color also nice & fresh look",
//                 reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
//                 description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
//             },
//             {
//                 name: "Jems Rock",
//                 date: new Date(),
//                 rating: 4,
//                 likes: 50,
//                 dislikes: 50,
//                 reviewTitle: "Very good and color also nice & fresh look",
//                 reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
//                 description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
//             },
//             {
//                 name: "Jems Rock",
//                 date: new Date(),
//                 rating: 4,
//                 likes: 50,
//                 dislikes: 50,
//                 reviewTitle: "Very good and color also nice & fresh look",
//                 reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
//                 description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
//             }
//         ]
//     }
// } satisfies Story;
// MultiColumn.parameters = { controls: { include: ['itemList'] } };