import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsBasic from "./rds-comp-forms-basic";


const meta: Meta = { 
    title: "Components/Forms Basic",
    component: RdsCompFormsBasic,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsBasic>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




