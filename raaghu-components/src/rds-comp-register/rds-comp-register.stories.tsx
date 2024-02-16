import type { Meta, StoryObj } from '@storybook/react';
import RdsCompRegister from './rds-comp-register';


const meta: Meta = { 
    title: "Components/Register",
    component: RdsCompRegister,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompRegister>;

export default meta;
type Story = StoryObj<typeof RdsCompRegister>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




