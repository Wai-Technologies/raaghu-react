import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantSettings from "./rds-comp-tenant-settings";


const meta: Meta = {
  title: "Components/Tenant Settings",
  component: RdsCompTenantSettings,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Tenant Settings** component is a configurable and interactive UI element designed to manage tenant-specific settings within a multi-tenant system. It allows administrators to view, edit, and validate tenant information efficiently. This component is ideal for applications requiring tenant configuration management, such as SaaS platforms or enterprise systems. Fully customizable, the Tenant Settings component ensures seamless integration with your design system while providing a user-friendly interface for managing tenant-related settings and preferences.'
    },
},
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompTenantSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantSettings>;

export const Standard: Story = {
  args: {
    tenantSettingInfo: {},
    isTenantInfoValid: false,
    showEditData: true
  }
} satisfies Story;






