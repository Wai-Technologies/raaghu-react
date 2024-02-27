import React from "react";
import { BrowserRouter } from "react-router-dom";
import RdsSideNav from "./rds-side-nav";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Side Navigation',
    component: RdsSideNav,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsSideNav>;

export default meta;
type Story = StoryObj<typeof RdsSideNav>;

export const SideNavigation: Story = (args) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

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
};
SideNavigation.parameters = { controls: { include: ['sideNavItems'] } };


