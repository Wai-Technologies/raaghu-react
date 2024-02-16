
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsSettings from './rds-comp-forms-setting';


const meta: Meta = { 
    title: "Components/Forms Settings",
    component: RdsCompFormsSettings,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsSettings>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;