import type { Meta, StoryObj } from '@storybook/react';
import RdsCompForgotPassword from "./rds-comp-forgot-password";


const meta: Meta = { 
    title: "Components/Forgot Password",
    component: RdsCompForgotPassword,
    parameters: {
        layout: "",
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
                        label: "Fran�ais",
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
                        label: "Portugu�s (Brasil)",
                        val: "pt-BR",
                        iconWidth: "20px",
                        iconHeight: "20px",
                    },
                    {
                        label: "T�rk�e",
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