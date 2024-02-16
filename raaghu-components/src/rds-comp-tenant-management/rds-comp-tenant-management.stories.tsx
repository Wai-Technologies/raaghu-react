import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantManagement from "./rds-comp-tenant-management";


const meta: Meta = { 
  title: "Components/Tenant Management",
    component: RdsCompTenantManagement,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTenantManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantManagement>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




