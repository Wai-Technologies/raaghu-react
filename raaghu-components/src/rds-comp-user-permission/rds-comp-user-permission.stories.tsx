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
    },
} satisfies Meta<typeof RdsCompUserPermission>;

export default meta;
type Story = StoryObj<typeof RdsCompUserPermission>;

export const Default: Story = {
    args: {
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




