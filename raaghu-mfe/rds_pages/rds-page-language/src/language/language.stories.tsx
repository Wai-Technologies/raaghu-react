import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPageLanguage from "./language";
import { useTranslation } from "react-i18next";

export default {
    title: "Pages/Language",
    component: RdsPageLanguage,
} as ComponentMeta<typeof RdsPageLanguage>;

const Template: ComponentStory<typeof RdsPageLanguage> = (args) => (
    <RdsPageLanguage {...args} />
);

export const Default = Template.bind({});

const { t } = useTranslation();

Default.args = {
    languagetableHeaders: [
        {
            displayName: t("Display Name"),
            key: "displayName",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("Code"),
            key: "code",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("Is Enabled"),
            key: "isenabled",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("Creation Time"),
            key: "creationTime",
            datatype: "text",
            sortable: true,
        },
    ],

    languagetableData: [{ id: 1, languageName: "India", code: "IND", isenabled: "true", creationTime: "12-10-1992" },
    { id: 2, languageName: "India", code: "IND", isenabled: "true", creationTime: "12-10-1992" },
    { id: 3, languageName: "India", code: "IND", isenabled: "true", creationTime: "12-10-1992" },
    { id: 4, languageName: "India", code: "IND", isenabled: "false", creationTime: "12-10-1992" },
    { id: 5, languageName: "India", code: "IND", isenabled: "false", creationTime: "12-10-1992" },
    { id: 6, languageName: "India", code: "IND", isenabled: "false", creationTime: "12-10-1992" },
    { id: 7, languageName: "India", code: "IND", isenabled: "true", creationTime: "12-10-1992" }],

    actions: [
        { id: "edit", displayName: "Edit" },
        { id: "changeText", displayName: "Change Texts" },
        { id: "setDefaultLanguage", displayName: "Set as default language" },
        { id: "delete", displayName: "Delete" },
    ],
};
