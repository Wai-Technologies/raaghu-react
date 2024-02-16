import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEditionList from './rds-comp-tenant-list';


const meta: Meta = { 
    title: "Components/Tenant List",
    component: RdsCompEditionList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEditionList>;

export default meta;
type Story = StoryObj<typeof RdsCompEditionList>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




