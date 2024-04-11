import type { Meta, StoryObj } from '@storybook/react';
import RdsCompNewRole from "./rds-comp-new-role";


const meta: Meta = { 
    title: "Components/New Role",
    component: RdsCompNewRole,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompNewRole>;

export default meta;
type Story = StoryObj<typeof RdsCompNewRole>;

export const Default: Story = {
    args: {
      
    }
} satisfies Story;




