import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUserPermission from "./rds-comp-user-permission-new";


const meta: Meta = { 
    title: "Components/User Permission New",
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
    
        ]
    }
} satisfies Story;
Default.parameters = { controls : { include : ['tableHeaders', 'tableData', 'actions']}};




