
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompChangePassword from './rds-comp-change-password';


const meta: Meta = { 
    title: "Components/Change Password",
    component: RdsCompChangePassword,
    parameters: {
        layout: 'padded',

        docs: {
    description: {
        component: 
            'The **Change Password** component is a customizable UI element designed to facilitate secure password updates within your application. It provides a structured interface for users to input their current password, new password, and confirm the new password, ensuring a seamless and user-friendly experience. This component is ideal for account management systems, user settings pages, or any interface requiring secure password change functionality. Fully customizable, the Change Password component aligns with your design system and functional requirements while maintaining security best practices.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompChangePassword>;

export default meta;
type Story = StoryObj<typeof RdsCompChangePassword>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;




