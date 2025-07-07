import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantDashboard from "./rds-comp-tenant-dashboard";


const meta: Meta = { 
    title: "Components/Tenant Dashboard",
    component: RdsCompTenantDashboard,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Tenant Dashboard** component is a dynamic and interactive UI element designed to provide an overview of tenant-specific data and activities. It serves as a centralized hub for displaying key metrics, analytics, and actionable insights related to tenants. This component is ideal for multi-tenant applications, allowing administrators or users to monitor and manage tenant-related information efficiently. Fully customizable, the Tenant Dashboard component ensures seamless integration with your design system while offering a user-friendly interface for data visualization and management.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTenantDashboard>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantDashboard>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;




