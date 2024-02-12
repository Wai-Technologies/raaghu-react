import type { Meta, StoryObj } from '@storybook/react';
import RdsCompNewMenu from './rds-comp-new-menu';


const meta: Meta = { 
  title: "Components/ New Menu",
    component: RdsCompNewMenu,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompNewMenu>;

export default meta;
type Story = StoryObj<typeof RdsCompNewMenu>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




