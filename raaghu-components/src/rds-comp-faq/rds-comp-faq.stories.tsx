import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompFaq from "./rds-comp-faq";


const meta: Meta = {
    title: "Components/Faq",
    component: RdsCompFaq,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **FAQ** (Frequently Asked Questions) component is a customizable UI element designed to display a list of common questions and their corresponding answers in a structured and user-friendly format. It supports a `questionList` array to define questions and answers, with properties like `question` and `description`. Additionally, it includes a `QuestionHeading` object to display a heading and description for the FAQ section. This component is ideal for help centers, support pages, or any interface requiring an organized FAQ section. Fully customizable, the FAQ component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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