import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompUserPermission from "./rds-comp-user-permission-new";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/User Permission New",
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
        { displayName: "Status", key: "status", datatype: "badge", sortable: true, },
    ],

    tableData: [
        { id: 1, name: { avatar: "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg", title: "Amc Corporation", info: "support@amc.com" }, userid: 1260, roles: "Admin", status: { badgeColorVariant: "success", content: "active" }, },
        { id: 2, name: { avatar: "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg", title: "Cupic System", info: "support@amc.com" }, userid: 1220, roles: "Team Lead", status: { badgeColorVariant: "success", content: "active" }, },
        { id: 3, name: { avatar: "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg", title: "Wai Technologies", info: "support@amc.com" }, userid: 1250, roles: "manager", status: { badgeColorVariant: "primary", content: "inactive" }, },
    ],

    actions: [
        { id: "edit", displayName: "Edit" },
        { id: "lock", displayName: "Lock" },
        { id: "pass", displayName: "Set Password" },
        { id: "delete", displayName: "Delete" },

    ],
};