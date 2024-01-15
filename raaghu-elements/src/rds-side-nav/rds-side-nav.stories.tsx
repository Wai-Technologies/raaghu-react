import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsSideNav from "./rds-side-nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default {
    title: "Elements/Side Navigation",
    component: RdsSideNav,
} as ComponentMeta<typeof RdsSideNav>;

const Template: ComponentStory<typeof RdsSideNav> = (args) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

export const SideNavigation = Template.bind({});
SideNavigation.args = {
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
                    path:""
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
    ],
};
