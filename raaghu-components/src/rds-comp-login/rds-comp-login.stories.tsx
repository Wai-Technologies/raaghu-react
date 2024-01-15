import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompLogin from "./rds-comp-login";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Login",
    component: RdsCompLogin,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompLogin>;


const Template: ComponentStory<typeof RdsCompLogin> = (args) =>
    <RdsCompLogin {...args} />;


export const Login = Template.bind({});

Login.args = {
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
};

