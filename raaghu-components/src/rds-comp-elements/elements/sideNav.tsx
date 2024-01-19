import React from "react";
import { RdsSideNav } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsSideNav
            sideNavItems={[
                {
                    id: "0",
                    label: "Dashboard",
                    icon: "dashboard",
                    path: "/dashboard",
                },
                {
                    id: "1",
                    label: "Tenant",
                    icon: "tenant",
                    path: "",
                },
                {
                    id: "2",
                    label: "Administration",
                    icon: "administration",
                    children: [
                        {
                            id: "2-0",
                            label: "Role",
                            icon: "roles",
                            path: "",
                        },
                        {
                            id: "2-1",
                            label: "Users",
                            icon: "users",
                            path: "",
                        },
                    ],
                },
                {
                    id: "3",
                    label: "DEMO Components",
                    icon: "demo_ui",
                    path: "",
                },
            ]}
        />
    );
};

export default code_actual;
