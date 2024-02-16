import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIdentityLdapManagement from './rds-comp-identity-ldap-management';


const meta: Meta = { 
    title: "Components/Identity Ldap Management",
    component: RdsCompIdentityLdapManagement,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentityLdapManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentityLdapManagement>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;