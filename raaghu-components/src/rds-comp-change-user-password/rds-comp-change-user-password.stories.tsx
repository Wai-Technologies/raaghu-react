import type { Meta, StoryObj } from '@storybook/react';
import RdsCompChangeUserPassword from "./rds-comp-change-user-password"


const meta: Meta = { 
    title: "Components/Change User Password",
    component: RdsCompChangeUserPassword,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompChangeUserPassword>;

export default meta;
type Story = StoryObj<typeof RdsCompChangeUserPassword>;

export const Default: Story = {
    args: {
        
    },
} satisfies Story;