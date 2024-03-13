import RdsReviewCategory from "./rds-review-category";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Review Category',
    component: RdsReviewCategory,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsReviewCategory>;

export default meta;
type Story = StoryObj<typeof RdsReviewCategory>;



export const Default: Story = {
    args: {
        display_type: "Basic",
        item: {
            name: "Jems Rock",
            date: new Date(),
            rating: 4,
            likes: 50,
            dislikes: 50,
            reviewTitle: "Very good and color also nice & fresh look",
            reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
            description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!"
        }
    }
} satisfies Story;



export const center_aligned: Story = {
    args: {
        display_type: "ReviewType_1",
        item: {
            name: "Jems Rock",
            date: new Date(),
            imageUrl: "https://t4.ftcdn.net/jpg/04/10/43/77/240_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
            rating: 4,
            likes: 50,
            dislikes: 50,
            reviewTitle: "Very good and color also nice & fresh look",
            reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
            description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable, yet look classy enough that I can wear them at work or even some formal events. Thank you! I have not worn anything else since that day! These shirts are so comfortable, yet look classy enough that I can wear them at work or even some formal events. Thank you!"
        }
    }
} satisfies Story;

export const left_aligned: Story = {
    args: {
        display_type: "ReviewType_2",
        item: {
            name: "Jems Rock",
            date: new Date(),
            rating: 4,
            likes: 50,
            dislikes: 50,
            imageUrl: "https://t4.ftcdn.net/jpg/04/10/43/77/240_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
            reviewTitle: "Very good and color also nice & fresh look",
            reviewSubTitle: "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
            description: "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable, yet look classy enough that I can wear them at work or even some formal events. Thank you! I have not worn anything else since that day! These shirts are so comfortable, yet look classy enough that I can wear them at work or even some formal events. Thank you!"
        }
    }
} satisfies Story;

