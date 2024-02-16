import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUserClaim from "./rds-comp-user-claims";


const meta: Meta = { 
    title: "Components/User Claim",
    component: RdsCompUserClaim,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUserClaim>;

export default meta;
type Story = StoryObj<typeof RdsCompUserClaim>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




