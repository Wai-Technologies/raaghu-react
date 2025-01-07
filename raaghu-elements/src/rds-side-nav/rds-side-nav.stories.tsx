import React, { Children } from "react";
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
            key: "0",
            label: "Home",
            icon: "home",
            path: "/dashboard",
        },
        {
            key: "1",
            label: "Dashboard",
            icon: "dashboard",
        },
        {
            key: "2",
            label: "Saas",
            icon: "tenant",
            path: "",
        },
        {
            key: "3",
            label: "Administration",
            icon: "administration",
            path:"",
        },
        {
            key: "4",
            label: "File Management",
            icon: "folder",
            path: "",
        },
        {
            key: "5",
            label: "Forms",
            icon: "forms",
            path: "",
        },
        {
            key: "5",
            label: "Payments",
            icon: "payment",
            path: "",
        },
        {
            key: "6",
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
            key: "0",
            label: "Dashboard",
            icon: "home",
            path: "/dashboard",
        },
        {
            key: "1",
            label: "Tenant",
            icon: "tenant",
            path: "",
        },
        {
            key: "2",
            label: "Administration",
            icon: "administration",
            children: [
                {
                    key: "2-0",
                    label: "Role",
                    icon: "roles",
                    path: ""
                },
                {
                    key: "2-1",
                    label: "Users",
                    icon: "users",
                    path: "",
                },
            ],
        },
        {
            key: "3",
            label: "DEMO Components",
            icon: "demo_ui",
            children: [
                {
                    key: "3-0",
                    label: "Button",
                    icon: "button",
                },
                {
                    key: "3-1",
                    label: "Input",
                    icon: "input",
                }
            ],
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
            key: "0",
            label: "Chat",
            icon: "chat",
            path: "",
        },
        {
            key: "1",
            label: "Language",
            icon: "language",
            path: "",
        },
        {
            key: "2",
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
