import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAccountExternalProvider from './rds-comp-account-external-provider';

const meta: Meta = { 
    title: "Components/Account External Provider",
    component: RdsCompAccountExternalProvider,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Account External Provider** component is a flexible and customizable UI element designed to manage and configure external authentication providers within your application. It supports displaying and handling multiple providers, such as Google, Microsoft, and Twitter, with properties like `name`, `enabled`, `properties`, and `secretProperties`. Each provider can include details such as `ClientId` and `ClientSecret` for secure integration. The component also supports an `onSubmit` function to handle form submissions or configuration updates. Ideal for account management systems, this component simplifies the process of integrating and managing external authentication providers while ensuring a seamless user experience. Fully customizable, it can be tailored to fit your application’s design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAccountExternalProvider>;

export default meta;
type Story = StoryObj<typeof RdsCompAccountExternalProvider>;

export const Default: Story = {
    args: {
        accountExternalProvider: [
            {
                "name": "Google",
                "enabled": false,
                "properties": [
                    {
                        "name": "ClientId",
                        "value": null
                    }
                ],
                "secretProperties": [
                    {
                        "name": "ClientSecret",
                        "value": null
                    }
                ]
            },
            {
                "name": "Microsoft",
                "enabled": false,
                "properties": [
                    {
                        "name": "ClientId",
                        "value": null
                    }
                ],
                "secretProperties": [
                    {
                        "name": "ClientSecret",
                        "value": null
                    }
                ]
            },
            {
                "name": "Twitter",
                "enabled": false,
                "properties": [
                    {
                        "name": "ConsumerKey",
                        "value": null
                    }
                ],
                "secretProperties": [
                    {
                        "name": "ConsumerSecret",
                        "value": null
                    }
                ]
            }
        ]
    }
} satisfies Story;