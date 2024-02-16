import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsQuestions from './rds-comp-forms-questions';


const meta: Meta = { 
    title: "Components/Forms Questions",
    component: RdsCompFormsQuestions,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsQuestions>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsQuestions>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




