import React from "react";
import RdsCompSideNavigation from "../../rds-comp-side-navigation/rds-comp-side-navigation";

export const code_actual = () => {
    return (
        <RdsCompSideNavigation
            sideNavItems={[
                {
                    key: "0",
                    label: "Dashboard",
                    icon: "home",
                    path: "/dashboard",
                },
                {
                    key: "1",
                    label: "UI Components",
                    icon: "demo_ui",
                    path: "/demo-ui",
                },
                {
                    key: "2",
                    label: "Icons",
                    icon: "icons",
                    path: "/icons",
                },
                {
                    key: "3",
                    label: "Pages",
                    icon: "pages",
                    children: [
                        {
                            key: "3-0",
                            label: "Tenants",
                            icon: "tenant",
                            path: "/tenant",
                        },
                        {
                            key: "3-1",
                            label: "Editions",
                            icon: "editions",
                            path: "/edition",
                        },
                        {
                            key: "3-2",
                            label: "Administration",
                            icon: "administration",
                            children: [
                                {
                                    key: "3-2-0",
                                    label: "Organization Units",
                                    icon: "organization",
                                    path: "/organization-unit",
                                },
                                {
                                    key: "3-2-1",
                                    label: "Roles",
                                    icon: "roles",
                                    path: "/role",
                                },
                                {
                                    key: "3-2-2",
                                    label: "Users",
                                    icon: "users",
                                    path: "/user",
                                },
                                {
                                    key: "3-2-3",
                                    label: "Language",
                                    icon: "languages",
                                    path: "/language",
                                },
                                {
                                    key: "3-2-4",
                                    label: "Audit Logs",
                                    icon: "audit_logs",
                                    path: "/audit-logs",
                                },
                                {
                                    key: "3-2-5",
                                    label: "Webhook Subscriptions",
                                    icon: "webhook_subscription",
                                    path: "/webhook-subscription",
                                },
                                {
                                    key: "3-2-6",
                                    label: "Maintenance",
                                    icon: "maintenance",
                                    path: "/maintainance",
                                },
                                {
                                    key: "3-2-7",
                                    label: "Visual Settings",
                                    icon: "visual_settings",
                                    path: "/visual-setting",
                                },
                                {
                                    key: "3-2-8",
                                    label: "Settings",
                                    icon: "setting",
                                    path: "/settings",
                                },
                            ],
                        },
                    ],
                },
            ]}
        />
    );
};

export default code_actual;
