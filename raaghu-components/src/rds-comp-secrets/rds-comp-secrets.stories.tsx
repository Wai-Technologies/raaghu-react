import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSecrets from "./rds-comp-secrets";


const meta: Meta = { 
    title: "Components/Secrets",
    component: RdsCompSecrets,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSecrets>;

export default meta;
type Story = StoryObj<typeof RdsCompSecrets>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
// Default.parameters = { controls: { include: [] } };




