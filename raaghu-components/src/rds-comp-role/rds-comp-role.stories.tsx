import type { Meta, StoryObj } from '@storybook/react';
import RdsCompRole from "./rds-comp-role";


const meta: Meta = { 
    title: "Components/Role",
    component: RdsCompRole,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Role** component is a customizable UI element designed to manage and display user roles within your application. It provides a structured interface for creating, editing, and assigning roles, making it ideal for administrative dashboards, role-based access control systems, or any application requiring role management functionality. Fully customizable, the Role component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompRole>;

export default meta;
type Story = StoryObj<typeof RdsCompRole>;

export const Standard: Story = {
    args: {
      
    }
} satisfies Story;




