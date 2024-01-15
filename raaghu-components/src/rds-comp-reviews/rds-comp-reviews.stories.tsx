import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompReviews from "./rds-comp-reviews";

export default {
    title: "Components/Reviews",
    component: RdsCompReviews

} as ComponentMeta<typeof RdsCompReviews>;

const Template: ComponentStory<typeof RdsCompReviews> = (args) =>
    <RdsCompReviews {...args} />;

export const Default = Template.bind({});

Default.args = {
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
};


export const MultiColumn = Template.bind({});
MultiColumn.args = {
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
};

