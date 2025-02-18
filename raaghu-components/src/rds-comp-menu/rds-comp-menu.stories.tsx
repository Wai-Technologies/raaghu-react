import type { Meta, StoryObj } from '@storybook/react';
import RdsCompMenu from './rds-comp-menu';


const meta: Meta = { 
  title: "Components/Menu",
    component: RdsCompMenu,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompMenu>;

export default meta;
type Story = StoryObj<typeof RdsCompMenu>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




