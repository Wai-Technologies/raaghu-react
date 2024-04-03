import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPageLanguageText from "./languageText";

export default {
    title: "Pages/Language",
    component: RdsPageLanguageText,
} as ComponentMeta<typeof RdsPageLanguageText>;

const Template: ComponentStory<typeof RdsPageLanguageText> = (args) => (
    <RdsPageLanguageText {...args} />
);

export const Default = Template.bind({});

Default.args = {
    languagetableHeaders: [
        {
            displayName: "Language Name",
            key: "languageName",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: "Code",
            key: "code",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: "Is Enabled",
            key: "isenabled",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: "Creation Time",
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
