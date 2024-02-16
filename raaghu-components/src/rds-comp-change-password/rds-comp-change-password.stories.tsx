
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompChangePassword from './rds-comp-change-password';


const meta: Meta = { 
    title: "Components/Change Password",
    component: RdsCompChangePassword,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompChangePassword>;

export default meta;
type Story = StoryObj<typeof RdsCompChangePassword>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




