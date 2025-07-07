import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUserClaim from "./rds-comp-user-claims";


const meta: Meta = { 
    title: "Components/User Claim",
    component: RdsCompUserClaim,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **User Claim** component is a functional UI element designed to manage and display user claims or permissions within an application. It provides a structured interface for administrators to view, assign, or modify user claims efficiently. This component is ideal for applications requiring role-based access control (RBAC) or user permission management. Fully customizable, the User Claim component ensures seamless integration with your design system while offering a user-friendly interface for managing user claims effectively.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUserClaim>;

export default meta;
type Story = StoryObj<typeof RdsCompUserClaim>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;




