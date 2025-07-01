import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompIdentiyResourceBasic from "./rds-comp-identiy-resource-basic";


const meta: Meta = { 
  title: "Components/Identity",
    component: RdsCompIdentiyResourceBasic,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Identity Resource Basic** component is a foundational UI element designed to manage and display identity resource configurations within your application. It provides a simple and structured interface, making it ideal for use cases such as identity management systems, resource configuration dashboards, or any application requiring basic identity resource functionality. Fully customizable, the Identity Resource Basic component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentiyResourceBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentiyResourceBasic>;

export const ResourceBasic: Story = {
    args: {
        identity: "resourceBasic"
    }
} satisfies Story;
ResourceBasic.parameters = { controls: { include: ["identityResourceBasicData", "onSaveHandler", "reset"] } };

export const ClientBasic: Story = {
    args: {
        identity: "clientBasic"
    }
} satisfies Story;
ClientBasic.parameters = { controls: { include: ["clientData", "onSaveHandler"] } };

export const LdapManagement: Story = {
    args: {
        identity: "ldapManagement"
    }
} satisfies Story;
LdapManagement.parameters = { controls: { include: ["ldapData", "onLdapSettingsSubmit", "onSaveHandler", "reset"] } };

export const Management: Story = {
    args: {
        identity: "management"
    }
} satisfies Story;
Management.parameters = { controls: { include: ["onIdentitySettingsSubmit", "lockoutSettings", "passwordSettings", "onSaveHandler", "signSettings", "userSettings"] } };

export const OauthManagement: Story = {
    args: {
        identity: "oauthManagement"
    }
} satisfies Story;
OauthManagement.parameters = { controls: { include: ["oauthData", "onOauthDataSubmit", "reset"] } };