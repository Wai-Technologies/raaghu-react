import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsEmail from "./rds-comp-forms-email";


const meta: Meta = { 
    title: "Components/Forms Email",
    component: RdsCompFormsEmail,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsEmail>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsEmail>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




