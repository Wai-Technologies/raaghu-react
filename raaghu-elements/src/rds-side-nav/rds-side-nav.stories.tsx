import React from "react";
import RdsSideNav from "./rds-side-nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Side Navigation',
    component: RdsSideNav,
    parameters: {
        layout: '',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsSideNav>;

export default meta;
type Story = StoryObj<typeof RdsSideNav>;



export const SideNavigation: Story = {
    args: {
        sideNavItems: [
            {
                id: "0",
                label: "Dashboard",
                icon: "home",
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
                        path: ""
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
        ]
    }
} satisfies Story;
