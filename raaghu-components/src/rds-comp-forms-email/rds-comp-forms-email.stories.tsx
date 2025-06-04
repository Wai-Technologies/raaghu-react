import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsEmail from "./rds-comp-forms-email";


const meta: Meta = { 
    title: "Components/Forms Email",
    component: RdsCompFormsEmail,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Forms Email** component is a customizable UI element designed to handle email-related form functionality within your application. It provides a structured interface for collecting and validating email input, ensuring accuracy and ease of use. This component is ideal for scenarios such as user registration, login forms, password recovery, or email subscription workflows. Fully customizable, the Forms Email component ensures a seamless and user-friendly experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsEmail>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsEmail>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




