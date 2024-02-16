import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAdminDashboard from './rds-comp-admin-dashboard';




const meta: Meta = { 
    title: "Components/Admin Dashboard",
    component: RdsCompAdminDashboard,
    parameters: {
        layout: 'padded',
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