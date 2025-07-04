import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompIdentityOauthManagement from './rds-comp-identity-oauth-management';


const meta: Meta = { 
    title: "Components/Identity Oauth Management",
    component: RdsCompIdentityOauthManagement,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Identity OAuth Management** component is a customizable UI element designed to manage OAuth configurations and settings within your application. It provides a structured interface for configuring OAuth providers, managing client credentials, and handling authentication workflows. This component is ideal for administrative dashboards, identity management systems, or any application requiring OAuth integration. Fully customizable, the Identity OAuth Management component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentityOauthManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentityOauthManagement>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;




