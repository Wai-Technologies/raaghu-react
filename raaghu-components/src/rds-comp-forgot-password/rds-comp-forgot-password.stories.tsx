
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompForgotPassword from "./rds-comp-forgot-password";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Forgot Password",
    component: RdsCompForgotPassword,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],

} as ComponentMeta<typeof RdsCompForgotPassword>;


const Template: ComponentStory<typeof RdsCompForgotPassword> = (args) => (
    <RdsCompForgotPassword {...args} />
);

export const ForgetPassword = Template.bind({});

ForgetPassword.args = {
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
};

