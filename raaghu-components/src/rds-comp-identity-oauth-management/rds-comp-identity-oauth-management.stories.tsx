import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIdentityOauthManagement from './rds-comp-identity-oauth-management';


const meta: Meta = { 
    title: "Components/Identity Oauth Management",
    component: RdsCompIdentityOauthManagement,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentityOauthManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentityOauthManagement>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




