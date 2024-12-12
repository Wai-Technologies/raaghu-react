
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSideNavigation from "./rds-comp-side-navigation";
import { BrowserRouter } from 'react-router-dom';
import React from 'react';


const meta: Meta = {
    title: "Components/Side Navigation",
    component: RdsCompSideNavigation,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSideNavigation>;

export default meta;
type Story = StoryObj<typeof RdsCompSideNavigation>;

export const Default: Story = (args: any) => (
    <BrowserRouter>
        <RdsCompSideNavigation {...args} />
    </BrowserRouter>
);

Default.args = {
    logo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    sideNavItems: [
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
            children: [
                {
                    key: "1-0",
                    label: "Buttons",
                    icon: "buttons",
                },
                {
                    key: "1-1",
                    label: "Form Elements",
                    icon: "form_elements",
                },
                {
                    key: "1-2",
                    label: "Modals",
                    icon: "modals",
                },
                {
                    key: "1-3",
                    label: "Tables",
                    icon: "tables",
                    children: [
                        {
                            key: "1-3-0",
                            label: "Basic Table",
                            icon: "basic_table",
                        },
                        {
                            key: "1-3-1",
                            label: "Data Table",
                            icon: "data_table",
                        },
                    ],
                },
                {
                    key: "1-4",
                    label: "Typography",
                    icon: "typography",
                }
            ],
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
    ]
};
Default.parameters = { controls: { include: ['sideNavItems','logo'] } };





