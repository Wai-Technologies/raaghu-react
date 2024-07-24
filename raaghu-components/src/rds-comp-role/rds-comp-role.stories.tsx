import type { Meta, StoryObj } from '@storybook/react';
import RdsCompRole from "./rds-comp-role";


const meta: Meta = { 
    title: "Components/Role",
    component: RdsCompRole,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompRole>;

export default meta;
type Story = StoryObj<typeof RdsCompRole>;

export const Default: Story = {
    args: {
      
    }
} satisfies Story;




