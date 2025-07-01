import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompIdentityLdapManagement from './rds-comp-identity-ldap-management';


const meta: Meta = { 
    title: "Components/Identity Ldap Management",
    component: RdsCompIdentityLdapManagement,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Identity LDAP Management** component is a customizable UI element designed to manage LDAP (Lightweight Directory Access Protocol) configurations and settings within your application. It provides a structured interface for configuring LDAP connections, managing user synchronization, and handling authentication workflows. This component is ideal for administrative dashboards, identity management systems, or any application requiring LDAP integration. Fully customizable, the Identity LDAP Management component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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