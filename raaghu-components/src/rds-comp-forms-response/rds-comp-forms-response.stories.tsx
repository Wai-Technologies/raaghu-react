import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsResponse from './rds-comp-forms-response';


const meta: Meta = { 
    title: "Components/Forms Response",
    component: RdsCompFormsResponse,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsResponse>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsResponse>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
