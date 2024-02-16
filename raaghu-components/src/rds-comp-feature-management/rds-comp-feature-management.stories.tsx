import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFeatureManagement from "./rds-comp-feature-management";


const meta: Meta = {
  title: "Components/Feature Management",
  component: RdsCompFeatureManagement,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompFeatureManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompFeatureManagement>;

export const Default: Story = {
  args: {
    label: "default",
    featureManagementData: {
      id: 0,
      name: "Identity",
      displayName: "Identity",
      features: [
        { id: 0, name: "Identity.TwoFactor", displayName: "Two factor behaviour", value: "Optional" },
        { id: 1, name: "Identity.TwoFactor", displayName: "Two factor behaviour", value: "Optional" },
        { id: 2, name: "Identity.MaxUserCount", displayName: "Maximum user count", value: "0" },
        { id: 3, name: "Account.EnableLdapLogin", displayName: "LDAP Login", value: "true" },
        { id: 4, name: "Identity.EnableOAuthLogin", displayName: "OAuth Login", value: "true" }
      ]
    }
  }
} satisfies Story;




