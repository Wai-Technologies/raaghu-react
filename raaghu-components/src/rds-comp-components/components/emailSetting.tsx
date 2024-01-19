import React from "react";
import RdsCompEmailSettings from "../../rds-comp-email-settings/rds-comp-email-settings";

export const code_actual = () => {
    return (
        <RdsCompEmailSettings
            emailSettings={{
                currentEmail: "niphy.anto@waiin.com",
                newEmail: "abc@waiin.com",
                confirmEmail: "abc@waiin.com",
            }}
        />
    );
};

export default code_actual;
