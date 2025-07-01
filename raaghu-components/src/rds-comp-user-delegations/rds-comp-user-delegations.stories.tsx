import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsUserDelegations from './rds-comp-user-delegations';


const meta: Meta = { 
    title: "Components/User Delegations",
    component: RdsUserDelegations,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **User Delegations** component is a functional UI element designed to manage and display user delegation settings within an application. It allows administrators to assign, view, and manage delegations efficiently, enabling users to delegate their responsibilities or permissions to others. This component is ideal for applications requiring delegation workflows, such as task management systems or enterprise applications. Fully customizable, the User Delegations component ensures seamless integration with your design system while providing a user-friendly interface for managing delegation processes effectively.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsUserDelegations>;

export default meta;
type Story = StoryObj<typeof RdsUserDelegations>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




