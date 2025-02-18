import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUserPermission from "./rds-comp-user-permission";


const meta: Meta = { 
    title: "Components/User Permission",
    component: RdsCompUserPermission,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        displayType: {
            options: ["basic", "advanced"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompUserPermission>;

export default meta;
type Story = StoryObj<typeof RdsCompUserPermission>;

export const Default: Story = {
    args: {
        displayType: "basic",
    tableHeaders: [
        { displayName: "Name", key: "name", datatype: "avatarTitleInfo", sortable: true, },
        { displayName: "User ID", key: "userid", datatype: "text", sortable: true, },
        { displayName: "Roles", key: "roles", datatype: "text", sortable: true, },
        { displayName: "Status", key: "status", datatype: "text", sortable: true, },
    ],
    tableData: [
        { id: 1, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 60, roles: 5, status: "qwerty" },
        { id: 2, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 120, roles: 10, status: "qwerty" },
        { id: 3, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 250, roles: 5, status: "Qwerty" },
        { id: 4, name: { avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png", title: "Amc Corporation", info: "support@amc.com" }, userid: 60, roles: 7, status: "Qwerty" },
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
    }
} satisfies Story;
Default.parameters = { controls : { include : ['tableHeaders', 'tableData', 'actions', 'enablecheckboxselection']}};

export const Advanced: Story = {
    args: {
        displayType: "advanced",
        tableHeaders: [
            { displayName: "Name", key: "name", datatype: "avatarTitleInfo", sortable: true, },
            { displayName: "User ID", key: "userid", datatype: "text", sortable: true, },
            { displayName: "Roles", key: "roles", datatype: "text", sortable: true, },
            { displayName: "Status", key: "status", datatype: "badge", sortable: false,},
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
    
        ]
    }
} satisfies Story;
Advanced.parameters = { controls : { include : ['tableHeaders', 'tableData', 'actions']}};



