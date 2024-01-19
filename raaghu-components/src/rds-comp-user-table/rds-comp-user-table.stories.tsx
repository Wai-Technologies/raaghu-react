import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompUserTable from "./rds-comp-user-table";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/User Table",
    component: RdsCompUserTable,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompUserTable>;

const Template: ComponentStory<typeof RdsCompUserTable> = (args) => (
    <RdsCompUserTable {...args} />
);

export const UserTable = Template.bind({});

UserTable.args = {

    pagination: true,
    recordsPerPage: 5,
    recordsPerPageSelectListOption: true,
    tableHeaders: [
        {
            displayName: "User Name",
            key: "userName",
            datatype: "iconAvatarTitle",
            sortable: true,
        },
        { displayName: "Name", key: "name", datatype: "text", sortable: true },
        { displayName: "Roles", key: "roles", datatype: "text", sortable: true },
        { displayName: "Email Address", key: "email", datatype: "text", sortable: true },
        { displayName: "Email Confirm", key: "confirmEmail", datatype: "badge", sortable: true },
        { displayName: "Status", key: "status", datatype: "badge", sortable: true },
        { displayName: "Creation Time", key: "time", datatype: "text", sortable: true },
    ],

    tableData: [
        {
            id: 1,
            userName: {
                avatar:
                    "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
                title: "barbara",
                iconName: "lock",
                iconFill: false,
                iconStroke: false,
                iconColor: "danger",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            roles: "Admin",
            status: { badgeColorVariant: "primary", content: "active" },
            name: "Barbara Garrett",
            email: "barbara.garrett@gmail.com",
            confirmEmail: { badgeColorVariant: "danger", content: "No" },
            time: "11/15/2021, 2:44:52 PM",

        },
        {
            id: 2,
            userName: {
                avatar:
                    "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
                title: "brandon",
                iconName: "lock",
                iconFill: false,
                iconStroke: false,
                iconColor: "danger",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            roles: "Team Lead",
            status: { badgeColorVariant: "primary", content: "inactive" },
            name: "Brandon Carrol",
            email: "brandon.carrol@gmail.com",
            confirmEmail: { badgeColorVariant: "danger", content: "No" },
            time: "12/15/2021, 2:44:52 PM",
        },
        {
            id: 3,
            userName: {
                avatar:
                    "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
                title: "sandra",
                iconName: "lock",
                iconFill: false,
                iconStroke: false,
                iconColor: "danger",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            roles: "Associate",
            status: { badgeColorVariant: "primary", content: "active" },
            name: "Sandra Garrett",
            email: "sandra.garrett@gmail.com",
            confirmEmail: { badgeColorVariant: "primary", content: "yes" },
            time: "11/15/2021, 2:44:52 PM",
        },
        {
            id: 4,
            userName: {
                avatar:
                    "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
                title: "anthony",
                iconName: "lock",
                iconFill: false,
                iconStroke: false,
                iconColor: "danger",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            roles: "Team Lead",
            status: { badgeColorVariant: "primary", content: "active" },
            name: "Anthony Grand",
            email: "anthony.grand@gmail.com",
            confirmEmail: { badgeColorVariant: "primary", content: "yes" },
            time: "12/15/2021, 2:44:52 PM",
        },
        {
            id: 5,
            userName: {
                avatar:
                    "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
                title: "barbara",
                iconName: "lock",
                iconFill: false,
                iconStroke: true,
                iconColor: "danger",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            roles: "Admin",
            status: { badgeColorVariant: "primary", content: "inactive" },
            name: "Barbara Garrett",
            email: "barbara.garrett@gmail.com",
            confirmEmail: { badgeColorVariant: "danger", content: "No" },
            time: "11/15/2021, 2:44:52 PM",
        },
        {
            id: 6,
            userName: {
                avatar:
                    "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
                title: "brandon",
                iconName: "lock",
                iconFill: false,
                iconStroke: false,
                iconColor: "danger",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            roles: "Team Lead",
            status: { badgeColorVariant: "primary", content: "inactive" },
            name: "Brandon Carrol",
            email: "brandon.carrol@gmail.com",
            confirmEmail: { badgeColorVariant: "danger", content: "No" },
            time: "12/15/2021, 2:44:52 PM",
        },
        {
            id: 7,
            userName: {
                avatar:
                    "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
                title: "barbara",
                iconName: "lock",
                iconFill: false,
                iconStroke: false,
                iconColor: "danger",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            roles: "Admin",
            status: { badgeColorVariant: "primary", content: "inactive" },
            name: "Barbara Garrett",
            email: "barbara.garrett@gmail.com",
            confirmEmail: { badgeColorVariant: "primary", content: "yes" },
            time: "11/15/2021, 2:44:52 PM",
        },
        {
            id: 8,
            userName: {
                avatar:
                    "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
                title: "brandon",
                iconName: "lock",
                iconFill: false,
                iconStroke: true,
                iconColor: "danger",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            roles: "Team Lead",
            status: { badgeColorVariant: "primary", content: "inactive" },
            name: "Brandon Carrol",
            email: "brandon.carrol@gmail.com",
            confirmEmail: { badgeColorVariant: "primary", content: "yes" },
            time: "12/15/2021, 2:44:52 PM",
        },
    ],

    actions: [
        { id: "delete", displayName: "Delete" },
        { id: "edit", displayName: "Edit" },
        { id: "unlock", displayName: "Unlock" },
    ],
};
