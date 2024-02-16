import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantDashboard from "./rds-comp-tenant-dashboard";


const meta: Meta = { 
    title: "Components/Tenant Dashboard",
    component: RdsCompTenantDashboard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTenantDashboard>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantDashboard>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




