import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAdminDashboard from './rds-comp-admin-dashboard';




const meta: Meta = { 
    title: "Component/AdminDashboard",
    component: RdsCompAdminDashboard,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAdminDashboard>;

export default meta;
type Story = StoryObj<typeof RdsCompAdminDashboard>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;