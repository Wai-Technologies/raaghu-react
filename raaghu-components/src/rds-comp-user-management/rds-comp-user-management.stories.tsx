// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompUserManagement from "./rds-comp-user-management";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";

// export default {
//     title: "Components/User Management",
//     component: RdsCompUserManagement,
//     decorators: [
//         (StoryComponent) => (
//             <I18nextProvider i18n={i18n}>
//                 <StoryComponent />
//             </I18nextProvider>
//         ),
//     ],

// } as ComponentMeta<typeof RdsCompUserManagement>;


// const Template: ComponentStory<typeof RdsCompUserManagement> = (args) =>
//     <RdsCompUserManagement {...args} />;


// export const UserManagement = Template.bind({});

// UserManagement.args = {
//     Usermanagementsettings: [
//         {
//             "id": 1,
//             "label": "Email Confirmation Required For Login.",
//             "checked": false,
//         },
//         {
//             "id": 2,
//             "label": "Phone Number Verification Enabled (Via SMS)",
//             "checked": false,
//         },
//         {
//             "id": 3,
//             "label": "Use Security Image Question (Captcha) On Login.",
//             "checked": false,
//         },
//         {
//             "id": 4,
//             title: "Cookie Consent",
//             "label": "Cookie Consent Enabled",
//             "checked": false,
//         },
//         {
//             "id": 5,
//             title: "Session TimeOut Control",
//             "label": "Session Time Out Control Enabled",
//             "checked": false,
//         },
//         {
//             "id": 6,
//             title: "Profile",
//             "label": "Allow Using to use Gravatar Profile Picture",
//             "checked": false,
//         },


//     ]
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUserManagement from "./rds-comp-user-management";


const meta: Meta = {
    title: "Components/User Management",
    component: RdsCompUserManagement,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUserManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompUserManagement>;

export const Default: Story = {
    args: {
        Usermanagementsettings: [
            {
                "id": 1,
                "label": "Email Confirmation Required For Login.",
                "checked": false,
            },
            {
                "id": 2,
                "label": "Phone Number Verification Enabled (Via SMS)",
                "checked": false,
            },
            {
                "id": 3,
                "label": "Use Security Image Question (Captcha) On Login.",
                "checked": false,
            },
            {
                "id": 4,
                title: "Cookie Consent",
                "label": "Cookie Consent Enabled",
                "checked": false,
            },
            {
                "id": 5,
                title: "Session TimeOut Control",
                "label": "Session Time Out Control Enabled",
                "checked": false,
            },
            {
                "id": 6,
                title: "Profile",
                "label": "Allow Using to use Gravatar Profile Picture",
                "checked": false,
            },


        ]
    }
} satisfies Story;




