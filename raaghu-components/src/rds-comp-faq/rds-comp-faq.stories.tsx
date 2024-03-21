import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFaq from "./rds-comp-faq";


const meta: Meta = {
    title: "Components/Faq",
    component: RdsCompFaq,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFaq>;

export default meta;
type Story = StoryObj<typeof RdsCompFaq>;

export const Default: Story = {
    args: {
        questionList:
            [
                {
                    question: "What's the best thing about Switzerland?",
                    description: "The flag has a with plus on it and red for the background here is an explanation about it-The flag of Switzerland displays a white cross in the centre of a square red field."
                },
                {
                    question: "Where is the Niagara waterfall?",
                    description: "Niagara Falls is a group of three waterfalls at the southern end of Niagara Gorge, spanning the border between the province of Ontario in Canada and the New York."
                },
                {
                    question: "Which is the best part of Himalayas?",
                    description: "The snow-capped mountains set against the backdrop of wide-open skies, Nubra Valley, is among the most beautiful Himalaya places to visit."
                },

                {
                    question: "Why Elephant size is too big?",
                    description: "Being so large puts elephants at a survival advantage. Their size has helped them defend themselves, store fats and water better, digest more efficiently and develop a larger brain."
                },
                {
                    question: "Where is the Niagara waterfall?",
                    description: "Niagara Falls is a group of three waterfalls at the southern end of Niagara Gorge, spanning the border between the province of Ontario in Canada and the New York."
                },
                {
                    question: "Which is the best part of Himalayas?",
                    description: "The snow-capped mountains set against the backdrop of wide-open skies, Nubra Valley, is among the most beautiful Himalaya places to visit."
                },

                {
                    question: "Why Elephant size is too big?",
                    description: "Being so large puts elephants at a survival advantage. Their size has helped them defend themselves, store fats and water better, digest more efficiently and develop a larger brain."
                }
            ],
        QuestionHeading:
        {
            question: "Frequently asked questions",
            description: "Can't find the answer you're looking for? Reach out to our customer support team."
        }
    }
} satisfies Story;