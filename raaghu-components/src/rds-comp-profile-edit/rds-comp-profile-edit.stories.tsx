import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProfileEdit from "./rds-comp-profile-edit";


const meta: Meta = { 
    title: "Components/Profile Edit",
    component: RdsCompProfileEdit,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Profile Edit** component is a customizable UI element designed to allow users to update and manage their profile information within your application. It provides a structured interface for editing details such as name, email, contact information, and other personal data. This component is ideal for user account management, profile customization, or any application requiring a user-friendly profile editing interface. Fully customizable, the Profile Edit component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompProfileEdit>;

export default meta;
type Story = StoryObj<typeof RdsCompProfileEdit>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;




