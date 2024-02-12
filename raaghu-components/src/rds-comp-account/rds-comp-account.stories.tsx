import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAccount from './rds-comp-account';


const meta: Meta = { 
    title: "Components/Account",
    component: RdsCompAccount,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAccount>;

export default meta;
type Story = StoryObj<typeof RdsCompAccount>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




