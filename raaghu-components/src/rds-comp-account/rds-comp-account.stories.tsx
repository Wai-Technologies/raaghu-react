import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
        docs: {
    description: {
        component: 
            'The **Account** component is a comprehensive and customizable UI element designed to manage various account-related settings within your application. It supports features such as **general settings** (`accountGeneralSettings`), **two-factor authentication settings** (`accountTwoFactorSettings`), **captcha settings** (`accountCaptchaSettings`), and **developer mode settings** (`developerModeSettings`). The component provides an `onSubmit` function to handle form submissions, a `reset` toggle to reset settings, and event handlers like `onShow` and `onShowDeveloperMode` for enhanced interactivity. Ideal for account management systems, this component simplifies the process of configuring and managing account settings while ensuring a seamless user experience. Fully customizable, it can be tailored to fit your application’s design system and functional requirements.'
    },
}
       
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAccount>;

export default meta;
type Story = StoryObj<typeof RdsCompAccount>;

export const Standard: Story = {
    args: {
        accountType: "resourceBasic",
    }
} satisfies Story;
Standard.parameters = { controls: { include: ["accountGeneralSettings", "accountTwoFactorSettings", "accountCaptchaSettings", "developerModeSettings", "onSubmit", "reset", "onShow", "onShowDeveloperMode"] } };

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
