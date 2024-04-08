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
                "enabled": true,
                "properties": [
                    {
                        "name": "ClientId",
                        "value": "1056034749020-pdfg5750dr6stj4utlqtn42jn2nfbt3h"
                    }
                ],
                "secretProperties": [
                    {
                        "name": "ClientSecret",
                        "value": "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"
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