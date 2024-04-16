import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIdentiyResourceBasic from "./rds-comp-identiy-resource-basic";


const meta: Meta = { 
  title: "Components/Identity Resource Basic",
    component: RdsCompIdentiyResourceBasic,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentiyResourceBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentiyResourceBasic>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
// Default.parameters = { controls: { include: [] } };