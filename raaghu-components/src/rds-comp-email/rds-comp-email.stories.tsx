import React from "react";
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompEmail from "./rds-comp-email";


const meta: Meta = { 
    title: "Components/Email",
    component: RdsCompEmail,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Email** component is a simple and customizable UI element designed to handle email-related functionality within your application. It provides a flexible interface that can be extended to include features such as email input fields, validation, and sending email actions. This component is ideal for forms, user account settings, or any interface requiring email-related interactions. Fully customizable, the Email component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEmail>;

export default meta;
type Story = StoryObj<typeof RdsCompEmail>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




