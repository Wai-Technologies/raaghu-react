import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIdentityClientBasic from './rds-comp-identity-client-basic';


const meta: Meta = { 
    title: "Components/Identity Client Basic",
    component: RdsCompIdentityClientBasic,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentityClientBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentityClientBasic>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;