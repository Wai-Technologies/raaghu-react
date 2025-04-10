import type { Meta, StoryObj } from '@storybook/react';
import RdsCompForgotPassword from "./rds-comp-forgot-password";


const meta: Meta = { 
    title: "Components/Forgot Password",
    component: RdsCompForgotPassword,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompForgotPassword>;

export default meta;
type Story = StoryObj<typeof RdsCompForgotPassword>;

export const Default: Story = {
    args: {
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