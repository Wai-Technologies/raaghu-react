import type { Meta, StoryObj } from '@storybook/react';
import RdsCompChangeUserPassword from "./rds-comp-change-user-password"


const meta: Meta = { 
    title: "Components/Change User Password",
    component: RdsCompChangeUserPassword,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Change User Password** component is a customizable UI element designed to facilitate secure password updates for users within your application. It provides an interface for administrators or users to reset or update passwords, ensuring a seamless and secure experience. This component is ideal for account management systems, administrative dashboards, or any interface requiring password management functionality. Fully customizable, the Change User Password component aligns with your design system and functional requirements while adhering to security best practices.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompChangeUserPassword>;

export default meta;
type Story = StoryObj<typeof RdsCompChangeUserPassword>;

export const Standard: Story = {
    args: {
        
    },
} satisfies Story;