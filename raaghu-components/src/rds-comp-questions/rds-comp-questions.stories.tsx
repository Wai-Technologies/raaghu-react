import type { Meta, StoryObj } from '@storybook/react';
import RdsCompQuestions from './rds-comp-questions'


const meta: Meta = { 
    title: "Components/Questions",
    component: RdsCompQuestions,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompQuestions>;

export default meta;
type Story = StoryObj<typeof RdsCompQuestions>;

export const Default: Story = {
    args: {
        // questions: [
        //     { id: 1, question: 'Question 1' },
        //     { id: 2, question: 'Question 2' },
        //     // Add more questions as needed
        //   ],
    }
} satisfies Story;




