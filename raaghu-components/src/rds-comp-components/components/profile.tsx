import React from "react";
import RdsCompProfile from "../../rds-comp-profile/rds-comp-profile";

export const code_actual = () => {
    return (
        <RdsCompProfile
            navtabItems={[
                {
                    label: "Manage Linked Accounts",
                    icon: "manage_linked",
                    subText: "Manage accounts linked to your account",
                    id: "nav-LinkAccount",
                },
                {
                    label: "Manage Authority Delegation",
                    icon: "manage_authority",
                    subText: "Manage authority accounts",
                    id: "nav-Deligation",
                },
                {
                    label: "Login Attempts",
                    icon: "login_attempts",
                    subText: "See recent login attempts",
                    id: "nav-Attempts",
                },
                {
                    label: "My Settings",
                    icon: "my_settings",
                    subText: "Change your account settings",
                    id: "nav-Settings",
                },
                {
                    label: "Download Collected Data",
                    icon: "download_data",
                    subText: "Download data belongs to your account",
                    id: "nav-DownLoad",
                },
            ]}
            profilePic="https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png"
            userName="Host Admin"
            userRole=" Admin"
        />
    );
};

export default code_actual;
