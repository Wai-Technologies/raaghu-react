import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIconList from "./rds-comp-icon-list";


const meta: Meta = { 
    title: "Components/Icon List",
    component: RdsCompIconList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIconList>;

export default meta;
type Story = StoryObj<typeof RdsCompIconList>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




