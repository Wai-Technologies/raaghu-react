import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantSettings from "./rds-comp-tenant-settings";


const meta: Meta = {
  title: "Components/Tenant Settings",
  component: RdsCompTenantSettings,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompTenantSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantSettings>;

export const Default: Story = {
  args: {
    tenantSettingInfo: {},
    isTenantInfoValid: false,
    showEditData: true
  }
} satisfies Story;






