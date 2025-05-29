import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Meta, StoryObj } from "@storybook/react";
import RdsCompSideNavigation1, { NavLayout, NavType, Platform } from "./rds-comp-side-navigation1";

const meta: Meta = {
    title: "Components/Left Side Nav",
    component: RdsCompSideNavigation1,
    parameters: {
        layout: "padded",
        docs:   {
            source :{
                transform: (code: string) => {
                // Transform navLayout enum - remove spaces and transform
                code = code.replace(/navLayout="([^"]+)"/g, (match, p1) => `navLayout={NavLayout.${p1.replace(/\s+/g, '')}}`);
                code = code.replace(/navLayout:\s*"([^"]+)"/g, (match, p1) => `navLayout: NavLayout.${p1.replace(/\s+/g, '')}`);
                // Transform navType enum - remove spaces and transform
                code = code.replace(/navType="([^"]+)"/g, (match, p1) => `navType={NavType.${p1.replace(/\s+/g, '')}}`);
                code = code.replace(/navType:\s*"([^"]+)"/g, (match, p1) => `navType: NavType.${p1.replace(/\s+/g, '')}`);
                // Transform platform enum - remove spaces and transform
                code = code.replace(/platform="([^"]+)"/g, (match, p1) => `platform={Platform.${p1.replace(/\s+/g, '')}}`);
                code = code.replace(/platform:\s*"([^"]+)"/g, (match, p1) => `platform: Platform.${p1.replace(/\s+/g, '')}`);
                return code;
                }
            }
        }
    },
    tags: ["autodocs"],
    argTypes: {
        navLayout: {
            control: { type: 'select' },
            options: ['Raaghu', 'List', 'Toolbar'],
        },
        navType: {
            control: { type: 'select' },
            options: ['Collapsed', 'Expanded', 'Fixed'],
        },
        platform: {
            control: { type: 'check' },
            options: ['Side Navigation-ABP List', 'Side Navigation-ANZ List'],
        },
    },
} satisfies Meta<typeof RdsCompSideNavigation1>;

export default meta;
type Story = StoryObj<typeof RdsCompSideNavigation1>;

const getSideNavItems = (platform: string[], navLayout: string) => {
    if (platform.length === 0 && navLayout === 'Toolbar') {
        return [
            {
                key: "0",
                label: "Language",
                icon: "language",
                path: "",
            },
            {
                key: "1",
                label: "Chat",
                icon: "chat",
                path: "",
            },
            {
                key: "2",
                label: "Payments",
                icon: "sun",
                path: "",
            },
        ];
    }

    if (platform.includes('Side Navigation-ANZ List')) {
        return [
            {
                key: "0",
                label: "Dashboard",
                icon: "home",
                path: "/dashboard",
            },
            {
                key: "1",
                label: "Saas",
                icon: "saas",
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
                label: "DEMO UI Components",
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
        ];
    } else {
        return [
            {
                key: "0",
                label: "Home",
                icon: "home",
                path: "/dashboard",
            },
            {
                key: "1",
                label: "Dashboard",
                icon: "dashboard_meter",
            },
            {
                key: "2",
                label: "Saas",
                icon: "saas",
                path: "",
            },
            {
                key: "3",
                label: "Administration",
                icon: "administration_new",
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
                icon: "payment_new",
                path: "",
            },
            {
                key: "6",
                label: "CMS",
                icon: "cms",
                path: "",
            },
        ];
    }
};

const getLayout = (navLayout: string) => {
    if (navLayout === 'Toolbar') {
        return 'RightSideNav';
    } else if (navLayout === 'List') {
        return 'LeftSideNavList';
    } else {
        return 'LeftSideNav';
    }
};

export const Default: Story = (args: any) => (
    <MemoryRouter>
        <RdsCompSideNavigation1 
            {...args} 
            sideNavItems={getSideNavItems(args.platform, args.navLayout)} 
            layout={getLayout(args.navLayout)} 
            lockIconVisible={args.lockIconVisible} // Added lockIcon prop
        />
    </MemoryRouter>
);

Default.args = {
    logo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    showUserProfile:true,
    navLayout: NavLayout.Raaghu, 
    navType: NavType.Collapsed, 
    platform: Platform.SideNavigationABPList, 
    lockIconVisible: true, // Default value for lockIcon
};

Default.parameters = { controls: { include: ["navLayout", "navType", "platform", "lockIconVisible"] } };

