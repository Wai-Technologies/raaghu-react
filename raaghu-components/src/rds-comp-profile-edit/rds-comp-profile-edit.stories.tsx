import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProfileEdit from "./rds-comp-profile-edit";


const meta: Meta = { 
    title: "Components/Profile Edit",
    component: RdsCompProfileEdit,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompProfileEdit>;

export default meta;
type Story = StoryObj<typeof RdsCompProfileEdit>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




