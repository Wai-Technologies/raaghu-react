// /* eslint-disable */
// import React from 'react';
// import { I18nextProvider } from 'react-i18next';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSetPassword from './rds-comp-set-password';

const meta: Meta = { 
    title: "Components/Password",
    component: RdsCompSetPassword,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Set Password** component is a customizable UI element designed to facilitate the process of setting or updating passwords within your application. It provides a structured interface for users to input and confirm their passwords, ensuring compliance with security requirements. This component is ideal for user account management, onboarding workflows, or any application requiring a secure and user-friendly password setup interface. Fully customizable, the Set Password component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSetPassword>;

export default meta;
type Story = StoryObj<typeof RdsCompSetPassword>;

export const Set: Story = {
    args: {
        passwordType:"set"
    }
} satisfies Story;
Set.parameters = { controls: { include: ['reset', 'setPasswordField', 'onSaveHandler'] } };

export const Setting: Story = {
  args: {
        passwordType:"setting"
  }
} satisfies Story;
Setting.parameters = { controls: { include: ['reset', 'passwordSettingData', 'onSaveHandler'] } };

export const Change: Story = {
    args: {
        passwordType:"change"
    }
} satisfies Story;
Change.parameters = { controls: { include: ['reset', 'changePasswordData', 'onChangeSaveHandler'] } };

export const Forgot: Story = {
    args: {
        passwordType:"forgot",
        languageData: [
                    {
                        label: "Select Language",
                    },
                    {
                        label: "العربية",
                        val: "AR",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Čeština",
                        val: "CS",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "English",
                        val: "EN",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "English (UK)",
                        val: "EN-GB",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Magyar",
                        val: "HU",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Hindi",
                        val: "HI",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Finnish",
                        val: "FI",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Italiano",
                        val: "it",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Slovak",
                        val: "SK",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Português",
                        val: "PT-BR",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Français",
                        val: "FR",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Русский",
                        val: "RU",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Español",
                        val: "ES",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "简体中文",
                        val: "ZH-HANS",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Deutsch",
                        val: "de",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "Türkçe",
                        val: "TR",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "繁體中文",
                        val: "ZH-HANT",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                ],
    }
} satisfies Story;
Forgot.parameters = { controls: { include: ['reset', 'languageData', 'onForgotPassword', 'onResend', 'onLogin', 'languageLabel', 'registerFields'] } };

export const ChangeUser: Story = {
    args: {
        passwordType:"changeUser"
    },
} satisfies Story;
ChangeUser.parameters = { controls: { include: ['reset', 'changeUserPasswordData', 'onUserSaveHandler'] } };