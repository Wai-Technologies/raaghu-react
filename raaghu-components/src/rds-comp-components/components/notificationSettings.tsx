import React from "react";
import RdsCompNotificationSettings from "../../rds-comp-notification-settings/rds-comp-notification-settings";

export const code_actual = () => {
    return (
        <RdsCompNotificationSettings
            default={[{ enabled: false, NewUser: false, NewTenant: false }]}
        />
    );
};

export default code_actual;
