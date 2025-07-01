import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsResponse from './rds-comp-forms-response';


const meta: Meta = { 
    title: "Components/Forms Response",
    component: RdsCompFormsResponse,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Forms Response** component is a customizable UI element designed to display and manage responses submitted through forms within your application. It provides a structured interface for viewing, organizing, and interacting with form responses, making it ideal for use cases such as surveys, feedback forms, or data collection workflows. Fully customizable, the Forms Response component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsResponse>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsResponse>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;
