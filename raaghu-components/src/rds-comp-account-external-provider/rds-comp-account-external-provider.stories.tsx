import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAccountExternalProvider from './rds-comp-account-external-provider';

const meta: Meta = { 
    title: "Components/Account External Provider",
    component: RdsCompAccountExternalProvider,
    parameters: {
        layout: 'padded',
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