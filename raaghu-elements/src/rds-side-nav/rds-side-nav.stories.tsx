import React from "react";
import { BrowserRouter } from "react-router-dom";
import RdsSideNav from "./rds-side-nav";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Side Navigation",
    component: RdsSideNav,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
    },
} satisfies Meta<typeof RdsSideNav>;

export default meta;
type Story = StoryObj<typeof RdsSideNav>;

export const SideNavigation: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

SideNavigation.args = {
    logo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    sideNavItems: [
        {
            id: "0",
            label: "Home",
            icon: "home",
            path: "/dashboard",
        },
        {
            id: "1",
            label: "Dashboard",
            icon: "dashboard",
        },
        {
            id: "2",
            label: "Saas",
            icon: "tenant",
            path: "",
        },
        {
            id: "3",
            label: "Administration",
            icon: "administration",
            path:"",
        },
        {
            id: "4",
            label: "File Management",
            icon: "folder",
            path: "",
        },
        {
            id: "5",
            label: "Forms",
            icon: "forms",
            path: "",
        },
        {
            id: "5",
            label: "Payments",
            icon: "payment",
            path: "",
        },
        {
            id: "6",
            label: "CMS",
            icon: "cms",
            path: "",
        },
    ],
    layout : "LeftSideNav",
    showUserProfile:false,
};
SideNavigation.parameters = { controls: { include: ["logo", "sideNavItems"] } };


export const SideNavigationWithList: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

SideNavigationWithList.args = {
    logo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    showUserProfile:true,
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
    ],
    layout : "LeftSideNavList",
};
SideNavigationWithList.parameters = { controls: { include: ["logo", "showUserProfile", "sideNavItems"] } };



export const SideNavigationRight: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

SideNavigationRight.args = {
    showUserProfile:true,
    sideNavItems: [
        {
            id: "0",
            label: "Chat",
            icon: "chat",
            path: "",
        },
        {
            id: "1",
            label: "Language",
            icon: "language",
            path: "",
        },
        {
            id: "2",
            label: "Mode",
            icon: "sun",
            path: "",
        },
    ],
    layout : "RightSideNav",
    logo:"",
    collapse: false,
};
SideNavigationRight.parameters = { controls: { include: ["showUserProfile", "sideNavItems"] } };
