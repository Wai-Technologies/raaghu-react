import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompUserRoles from "./rds-comp-user-roles";


const meta: Meta = { 
  title: "Components/User Roles",
    component: RdsCompUserRoles,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **User Roles** component is a functional and interactive UI element designed to manage and display user roles within an application. It allows administrators to assign, view, and modify roles efficiently, providing a structured interface for role-based access control (RBAC). This component is ideal for applications requiring user role management workflows, such as enterprise systems or SaaS platforms. Fully customizable, the User Roles component ensures seamless integration with your design system while offering a user-friendly interface for managing user roles effectively.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUserRoles>;

export default meta;
type Story = StoryObj<typeof RdsCompUserRoles>;

export const Standard: Story = {
    args: {
      usersRole: [
        {
          id: 1,
          name: "Child Checkbox 1",
          checked: false,
          disabled: false,
        },
        {
          id: 2,
          name: "Child Checkbox 2",
          checked: false,
          disabled: false,
        },
        {
          id: 3,
          name: "Child Checkbox 3",
          checked: false,
          disabled: false,
        },
      ]
    }
} satisfies Story;




