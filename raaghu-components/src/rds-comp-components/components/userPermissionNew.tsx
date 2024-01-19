import React from "react";
import RdsCompUrlForwardings from "../../rds-comp-url-forwardings/rds-comp-url-forwardings";
import RdsCompUserPermission from "../../rds-comp-user-permission-new/rds-comp-user-permission-new";

export const code_actual = () => {
    return (
        <RdsCompUserPermission
            tableHeaders={[
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
                {
                    displayName: "Roles",
                    key: "roles",
                    datatype: "text",
                    sortable: true,
                },
                {
                    displayName: "Status",
                    key: "status",
                    datatype: "text",
                    sortable: true,
                },
            ]}
            tableData={[
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
                    status: "qwerty",
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
                    status: "qwerty",
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
            ]}
            actions={[
                { id: "delete", displayName: "Delete" },
                { id: "edit", displayName: "Edit" },
                { id: "lock", displayName: "Lock" },
                { id: "pass", displayName: "Set Password" },
            ]}
            onActionSelection={() => {}}
        />
    );
};

export default code_actual;
