import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompUserPermission from "./rds-comp-user-permission";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/User Permission",
    component: RdsCompUserPermission,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],

} as ComponentMeta<typeof RdsCompUserPermission>;


const Template: ComponentStory<typeof RdsCompUserPermission> = (args) => (
    <RdsCompUserPermission {...args} />
);


export const UserPermission = Template.bind({});

UserPermission.args = {

    tableHeaders: [
        { displayName: "Name", key: "name", datatype: "avatarTitleInfo", sortable: true, },
        { displayName: "User ID", key: "userid", datatype: "text", sortable: true, },
        { displayName: "Roles", key: "roles", datatype: "text", sortable: true, },
        { displayName: "Status", key: "status", datatype: "text", sortable: true, },
    ],

    tableData: [
        { id: 1, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 60, roles: 5, status: "qwerty" },
        { id: 2, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 120, roles: 10, status: "qwerty" },
        { id: 3, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 250, roles: 5, status: "qwerty" },
        { id: 4, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 60, roles: 7, status: "qwerty" },
        { id: 5, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 100, roles: 15, status: "qwerty" },
        { id: 6, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 60, roles: 5, status: "qwerty" },
        { id: 7, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 100, roles: 47, status: "qwerty" },
    ],

    actions: [
        { id: "delete", displayName: "Delete" },
        { id: "edit", displayName: "Edit" },
        { id: "lock", displayName: "Lock" },
        { id: "pass", displayName: "Set Password" }

    ],
    enablecheckboxselection: false
};