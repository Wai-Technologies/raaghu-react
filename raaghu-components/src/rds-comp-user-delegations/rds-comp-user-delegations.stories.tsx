import type { Meta, StoryObj } from '@storybook/react';
import RdsUserDelegations from './rds-comp-user-delegations';


const meta: Meta = { 
    title: "Components/User Delegations",
    component: RdsUserDelegations,
    parameters: {
        layout: 'padded',
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




