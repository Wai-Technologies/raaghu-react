import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAccount from './rds-comp-account';

const meta: Meta = { 
    title: "Components/Account",
    component: RdsCompAccount,
    decorators: [
        (Story) => (
          <div>
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <Story />
          </div>
        ),
      ],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAccount>;

export default meta;
type Story = StoryObj<typeof RdsCompAccount>;

export const Default: Story = {
    args: {
        accountType: "resourceBasic",
    }
} satisfies Story;
Default.parameters = { controls: { include: ["accountGeneralSettings", "accountTwoFactorSettings", "accountCaptchaSettings", "developerModeSettings", "onSubmit", "reset", "onShow", "onShowDeveloperMode"] } };

export const ExternalProvider: Story = {
    args: {
        accountType: "externalProvider",
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
ExternalProvider.parameters = { controls: { include: ["accountExternalProvider", "onSubmit"] } };

export const Linked: Story = {
    args: {
      accountType: "linked",
    }
} satisfies Story;
Linked.parameters = { controls: { include: ["linkedAccountData", "onSaveHandler", "reset"] } };
