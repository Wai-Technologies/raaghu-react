import type { Meta, StoryObj } from '@storybook/react';
import RdsCompLogin from "./rds-comp-login";

const meta: Meta = { 
    title: "Components/Login",
    component: RdsCompLogin,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompLogin>;

export default meta;
type Story = StoryObj<typeof RdsCompLogin>;

export const Default: Story = {
    args: {
        languageData: [
            {
                label: "EN(US)",
                val: "en",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "English(IND)",
                val: "en",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Français",
                val: "fr",
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
                label: "Português (Brasil)",
                val: "pt-BR",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Türkçe",
                val: "tr",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Italiano",
                val: "it",
                iconWidth: "20px",
                iconHeight: "20px",
            },
        ],
    }
} satisfies Story;