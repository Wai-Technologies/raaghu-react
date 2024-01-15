import React from "react";
import RdsCompUserManagement from "../../rds-comp-user-management/rds-comp-user-management";

export const code_actual = () => {
    return (
        <RdsCompUserManagement
            Usermanagementsettings={[
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
            ]}
        />
    );
};

export default code_actual;
