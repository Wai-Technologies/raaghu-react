import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompTenantManagement from "./rds-comp-tenant-management";


const meta: Meta = { 
  title: "Components/Tenant Management",
    component: RdsCompTenantManagement,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Tenant Management** component is a comprehensive and interactive UI element designed to facilitate the management of tenants within a multi-tenant system. It provides a centralized interface for administrators to perform actions such as creating, editing, and deleting tenants, as well as managing tenant-specific configurations and settings. This component is ideal for SaaS platforms or applications requiring robust tenant management capabilities. Fully customizable, the Tenant Management component ensures seamless integration with your design system while offering a user-friendly and efficient interface for managing tenant-related operations.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTenantManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantManagement>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;




