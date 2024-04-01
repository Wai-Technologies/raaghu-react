import type { Meta, StoryObj } from '@storybook/react';
import RdsCompMenuDirectory from './rds-comp-menus-directories';


const meta: Meta = { 
    title: "Components/Menus Directories",
    component: RdsCompMenuDirectory,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompMenuDirectory>;

export default meta;
type Story = StoryObj<typeof RdsCompMenuDirectory>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;



