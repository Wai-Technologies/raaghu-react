import type { Meta, StoryObj } from "@storybook/react";
import RdsCompUserBasics from "./rds-comp-user-basics";

const meta: Meta = {
  title: "Components/User",
  component: RdsCompUserBasics,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompUserBasics>;

export default meta;
type Story = StoryObj<typeof RdsCompUserBasics>;

export const Basics: Story = {
  args: {
    user: "basics",
  },
} satisfies Story;

export const Claim: Story = {
  args: {
    user: "claim",
  },
} satisfies Story;

export const Delegations: Story = {
  args: {
    user: "delegations",
  },
} satisfies Story;

export const Management: Story = {
  args: {
    user: "management",
    Usermanagementsettings: [
      {
        id: 1,
        label: "Email Confirmation Required For Login.",
        checked: false,
      },
      {
        id: 2,
        label: "Phone Number Verification Enabled (Via SMS)",
        checked: false,
      },
      {
        id: 3,
        label: "Use Security Image Question (Captcha) On Login.",
        checked: false,
      },
      {
        id: 4,
        title: "Cookie Consent",
        label: "Cookie Consent Enabled",
        checked: false,
      },
      {
        id: 5,
        title: "Session TimeOut Control",
        label: "Session Time Out Control Enabled",
        checked: false,
      },
      {
        id: 6,
        title: "Profile",
        label: "Allow Using to use Gravatar Profile Picture",
        checked: false,
      },
    ],
  },
} satisfies Story;

export const DefaultPermission: Story = {
  args: {
    user: "permission",
    displayType: "basic",
    tableHeaders: [
      {
        displayName: "Name",
        key: "name",
        datatype: "avatarTitleInfo",
        sortable: true,
      },
      {
        displayName: "User ID",
        key: "userid",
        datatype: "text",
        sortable: true,
      },
      { displayName: "Roles", key: "roles", datatype: "text", sortable: true },
      {
        displayName: "Status",
        key: "status",
        datatype: "text",
        sortable: true,
      },
    ],
    tableData: [
      {
        id: 1,
        name: {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png",
          title: "Amc Corporation",
          info: "support@amc.com",
        },
        userid: 60,
        roles: 5,
        status: "qwerty",
      },
      {
        id: 2,
        name: {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png",
          title: "Amc Corporation",
          info: "support@amc.com",
        },
        userid: 120,
        roles: 10,
        status: "qwerty",
      },
      {
        id: 3,
        name: {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png",
          title: "Amc Corporation",
          info: "support@amc.com",
        },
        userid: 250,
        roles: 5,
        status: "Qwerty",
      },
      {
        id: 4,
        name: {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png",
          title: "Amc Corporation",
          info: "support@amc.com",
        },
        userid: 60,
        roles: 7,
        status: "Qwerty",
      },
      {
        id: 5,
        name: {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png",
          title: "Amc Corporation",
          info: "support@amc.com",
        },
        userid: 100,
        roles: 15,
        status: "qwerty",
      },
      {
        id: 6,
        name: {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png",
          title: "Amc Corporation",
          info: "support@amc.com",
        },
        userid: 60,
        roles: 5,
        status: "qwerty",
      },
      {
        id: 7,
        name: {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/4/4a/AMC%2B_logo.png",
          title: "Amc Corporation",
          info: "support@amc.com",
        },
        userid: 100,
        roles: 47,
        status: "qwerty",
      },
    ],
    actions: [
      { id: "delete", displayName: "Delete" },
      { id: "edit", displayName: "Edit" },
      { id: "lock", displayName: "Lock" },
      { id: "pass", displayName: "Set Password" },
    ],
    enablecheckboxselection: false,
  },
} satisfies Story;
DefaultPermission.parameters = { controls: { include: [ "tableHeaders", "tableData", "actions", "enablecheckboxselection"]},};

export const AdvancedPermission: Story = {
  args: {
    user: "permission",
    displayType: "advanced",
    tableHeaders: [
      {
        displayName: "Name",
        key: "name",
        datatype: "avatarTitleInfo",
        sortable: true,
      },
      {
        displayName: "User ID",
        key: "userid",
        datatype: "text",
        sortable: true,
      },
      { displayName: "Roles", key: "roles", datatype: "text", sortable: true },
      {
        displayName: "Status",
        key: "status",
        datatype: "badge",
        sortable: false,
      },
    ],
    tableData: [
      {
        id: 1,
        name: {
          avatar:
            "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
          title: "Amc Corporation",
          info: "support@amc.com",
        },
        userid: 1260,
        roles: "Admin",
        status: { badgeColorVariant: "success", content: "active" },
      },
      {
        id: 2,
        name: {
          avatar:
            "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
          title: "Cupic System",
          info: "support@amc.com",
        },
        userid: 1220,
        roles: "Team Lead",
        status: { badgeColorVariant: "success", content: "active" },
      },
      {
        id: 3,
        name: {
          avatar:
            "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
          title: "Wai Technologies",
          info: "support@amc.com",
        },
        userid: 1250,
        roles: "manager",
        status: { badgeColorVariant: "primary", content: "inactive" },
      },
    ],
    actions: [
      { id: "edit", displayName: "Edit" },
      { id: "lock", displayName: "Lock" },
      { id: "pass", displayName: "Set Password" },
      { id: "delete", displayName: "Delete" },
    ],
  },
} satisfies Story;
AdvancedPermission.parameters = { controls: { include: ["tableHeaders", "tableData", "actions"] },};

export const Roles: Story = {
  args: {
    user: "roles",
    usersRole: [
      {
        id: 1,
        name: "Child Checkbox 1",
        checked: false,
        disabled: false,
      },
      {
        id: 2,
        name: "Child Checkbox 2",
        checked: false,
        disabled: false,
      },
      {
        id: 3,
        name: "Child Checkbox 3",
        checked: false,
        disabled: false,
      },
    ],
  },
} satisfies Story;

export const Table: Story = {
  args: {
    user: "table",
    pagination: true,
    recordsPerPage: 10,
    recordsPerPageSelectListOption: false,
    tableHeaders: [
      {
        displayName: "User Name",
        key: "userName",
        datatype: "iconAvatarTitle",
        sortable: true,
      },
      { displayName: "Name", key: "name", datatype: "text", sortable: true },
      { displayName: "Roles", key: "roles", datatype: "text", sortable: true },
      {
        displayName: "Email Address",
        key: "email",
        datatype: "text",
        sortable: true,
      },
      {
        displayName: "Email Confirm",
        key: "confirmEmail",
        datatype: "badge",
        sortable: false,
      },
      {
        displayName: "Status",
        key: "status",
        datatype: "badge",
        sortable: false,
      },
      {
        displayName: "Creation Time",
        key: "time",
        datatype: "text",
        sortable: true,
      },
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
          iconStroke: true,
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
          iconStroke: true,
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
          iconStroke: true,
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
          iconStroke: true,
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
          iconStroke: true,
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
          iconStroke: true,
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

      {
        id: 9,
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
        id: 10,
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
        confirmEmail: { badgeColorVariant: "danger", content: "No" },
        time: "12/15/2021, 2:44:52 PM",
      },
      {
        id: 11,
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
        confirmEmail: { badgeColorVariant: "primary", content: "yes" },
        time: "11/15/2021, 2:44:52 PM",
      },
      {
        id: 12,
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
  },
} satisfies Story;
