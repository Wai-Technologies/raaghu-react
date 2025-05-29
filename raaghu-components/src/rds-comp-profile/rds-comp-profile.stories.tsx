// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompProfile from "./rds-comp-profile";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";

// export default {
//     title: "Components/Profile",
//     component: RdsCompProfile,
//     decorators: [
//         (StoryComponent) => (
//             <I18nextProvider i18n={i18n}>
//                 <StoryComponent />
//             </I18nextProvider>
//         ),
//     ],
// } as ComponentMeta<typeof RdsCompProfile>;

// const Template: ComponentStory<typeof RdsCompProfile> = (args) => (
//     <RdsCompProfile {...args} />
// );

// export const Profile = Template.bind({});

// Profile.args = {
//     navtabItems: [
//         {
//             "label": "My Account",
//             "iconPath": "profile_picture_square",
//             "subText": "Manage accounts linked to your account",
//             "id": "nav-LinkAccount",
//         },
//         {
//             "label": "Security logs",
//             "iconPath": "setting",
//             "subText": "Manage authority accounts",
//             "id": "nav-Deligation",
//         },
//         {
//             "label": "Personal Data",
//             "iconPath": "login_attempts",
//             "subText": "See recent login attempts for your account",
//             "id": "nav-Attempts",
//         }
//     ],
//     profilePic: "https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png",
//     userName: "User Name",
//     userRole: " Admin",
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProfile from "./rds-comp-profile";


const meta: Meta = { 
    title: "Components/Profile",
    component: RdsCompProfile,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Profile** component is a customizable UI element designed to display and manage user profile information within your application. It supports features such as displaying a profile picture, user name, and role, along with navigation tabs for accessing related sections like "My Account," "Security Logs," and "Personal Data." This component is ideal for user account management, profile customization, or any application requiring a structured and user-friendly profile interface. Fully customizable, the Profile component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompProfile>;

export default meta;
type Story = StoryObj<typeof RdsCompProfile>;

export const Default: Story = {
    args: {
        navtabItems: [
            {
                "label": "My Account",
                "iconPath": "profile_picture_square",
                "subText": "Manage accounts linked to your account",
                "id": "nav-MyAccount",
            },
            {
                "label": "Security logs",
                "iconPath": "setting",
                "subText": "Manage authority accounts",
                "id": "nav-SecurityLogs",
            },
            {
                "label": "Personal Data",
                "iconPath": "login_attempts",
                "subText": "See recent login attempts for your account",
                "id": "nav-PersonalData",
            }
        ],
        profilePic: "https://abpstagereact12.raaghu.io/assets/profile-picture-circle.svg",
        userName: "User Name",
        userRole: " Admin",
        showUserName: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['navtabItems', 'profilePic', 'userName', 'userRole'] } };
