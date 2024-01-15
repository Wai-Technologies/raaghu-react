import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompTopNavigation from "./rds-comp-top-navigation";
import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";
export default {
    title: "Components/Top Navigation",
    component: RdsCompTopNavigation,
    decorators: [
        // (StoryComponent) => (
        //     // <I18nextProvider i18n={i18n}>
        //     //     <StoryComponent />
        //     // </I18nextProvider>
        // ),
    ],
} as ComponentMeta<typeof RdsCompTopNavigation>;

const Template: ComponentStory<typeof RdsCompTopNavigation> = (args) => (
    <RdsCompTopNavigation {...args} />
);

export const TopNavigation = Template.bind({});
TopNavigation.args = {
    navbarTitle: "Dashboard",
    navbarSubTitle: "Statistics and reports",
    brandName: "Raaghu",
    profileTitle: "Host Admin",
    profileName: "Keanu Foster",
    logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
    notifications: [
        {
            status: "success",
            title: "Tenant added",
            urlTitle: "hello",
            time: "a month ago",
            state: 1,
            userNotificationId: 0,
            selected: false,
        },

        {
            status: "error",
            title: "Tenant deleted",
            urlTitle: "hello",
            time: "a month ago",
            state: 1,
            userNotificationId: 1,
            selected: false,
        },

        {
            status: "warn",
            title: "Tenant added  warn",
            urlTitle: "hello",
            time: "a month ago",
            state: 1,
            userNotificationId: 2,
            selected: false,
        },

        {
            status: "info",
            title: "Tenant deleted info",
            urlTitle: "hello",
            time: "a month ago",
            state: 1,
            userNotificationId: 3,
            selected: false,
        },
    ],

    languageItems: [
        {
            label: "EN(US)",
            val: "en",
            icon: "us",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "English(IND)",
            val: "en",
            icon: "in",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "French",
            val: "fr",
            icon: "us",
            iconWidth: "20px",
            iconHeight: "20px",
        },
    ],
    themeItems: [
        {
            label: "Light",
            val: "light",
            icon: "sun",
            iconWidth: "20px",
            iconHeight: "20px",
        },
        {
            label: "Dark",
            val: "dark",
            icon: "moon",
            iconWidth: "20px",
            iconHeight: "20px",
        }
    ]
};