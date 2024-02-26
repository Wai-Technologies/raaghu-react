import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApplicationWorkflows from './rds-comp-application-workflows';


const meta: Meta = { 
    title: "Components/Application Work flows",
    component: RdsCompApplicationWorkflows,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApplicationWorkflows>;

export default meta;
type Story = StoryObj<typeof RdsCompApplicationWorkflows>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
Default.parameters = { controls: { include: [] } };