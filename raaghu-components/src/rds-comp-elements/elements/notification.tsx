import React from "react";
import { RdsNotification } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsNotification
            colorVariant="primary"
            footerText="2 days ago"
            notifications={[
                {
                    status: "success",
                    title: "Tenant added",
                    urlTitle: "hello",
                    // url:" " ,
                    time: "a month ago",
                    state: 1,
                    userNotificationId: 0,
                    selected: false,
                },

                {
                    status: "error",
                    title: "Tenant deleted",
                    urlTitle: "hello",
                    time: "a month ago",
                    state: 1,
                    userNotificationId: 1,
                    selected: false,
                },

                {
                    status: "warn",
                    title: "Tenant added  warn",
                    urlTitle: "hello",
                    time: "a month ago",
                    state: 1,
                    userNotificationId: 2,
                    selected: false,
                },

                {
                    status: "info",
                    title: "Tenant deleted info",
                    urlTitle: "hello",
                    time: "a month ago",
                    state: 1,
                    userNotificationId: 3,
                    selected: false,
                },
            ]}
        />
    );
};

export default code_actual;
