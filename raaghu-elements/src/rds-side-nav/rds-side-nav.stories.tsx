import React from "react";
import { BrowserRouter } from "react-router-dom";
import RdsSideNav, { NavLayout, NavType, Platform } from "./rds-side-nav";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: "Elements/Side Navigation",
    component: RdsSideNav,
    parameters: {
        layout: "padded",
        docs:   {
            description: {
        component:
            'The **Side Navigation** element is a flexible and customizable navigation component for organizing and accessing different sections of your application. It supports multiple layouts (`Raaghu`, `List`, `Toolbar`), navigation types (`Collapsed`, `Expanded`, `Fixed`), and platform-specific menu structures. You can display navigation items with icons, nested menus, user profile, and a logo, and control the visibility of a lock icon for additional functionality. This element is ideal for dashboards, admin panels, and any interface requiring structured, easy-to-navigate side menus, and can be tailored to fit your design system needs.'
    },
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
} satisfies Meta<typeof RdsSideNav>;

export default meta;
type Story = StoryObj<typeof RdsSideNav>;

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
    <BrowserRouter>
        <RdsSideNav 
            {...args} 
            sideNavItems={getSideNavItems(args.platform, args.navLayout)} 
            layout={getLayout(args.navLayout)} 
            lockIconVisible={args.lockIconVisible} // Added lockIcon prop
        />
    </BrowserRouter>
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




// import React, { Children } from "react";
// import { BrowserRouter } from "react-router-dom";
// import RdsSideNav from "./rds-side-nav";
// import { Meta, StoryObj } from "@storybook/react-vite";

// const meta: Meta = {
//     title: "Elements/Side Navigation",
//     component: RdsSideNav,
//     parameters: {
//         layout: "padded",
//     },
//     tags: ["autodocs"],
//     argTypes: {
//     },
// } satisfies Meta<typeof RdsSideNav>;

// export default meta;
// type Story = StoryObj<typeof RdsSideNav>;

// export const CustomNavigationSidebar: Story = (args: any) => (
//     <BrowserRouter>
//         <RdsSideNav {...args} />
//     </BrowserRouter>
// );

// CustomNavigationSidebar.args = {
//     logo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
//     sideNavItems: [
//         {
//             key: "0",
//             label: "Home",
//             icon: "home",
//             path: "/dashboard",
//         },
//         {
//             key: "1",
//             label: "Dashboard",
//             icon: "dashboard",
//         },
//         {
//             key: "2",
//             label: "Saas",
//             icon: "tenant",
//             path: "",
//         },
//         {
//             key: "3",
//             label: "Administration",
//             icon: "administration",
//             path:"",
//         },
//         {
//             key: "4",
//             label: "File Management",
//             icon: "folder",
//             path: "",
//         },
//         {
//             key: "5",
//             label: "Forms",
//             icon: "forms",
//             path: "",
//         },
//         {
//             key: "5",
//             label: "Payments",
//             icon: "payment",
//             path: "",
//         },
//         {
//             key: "6",
//             label: "CMS",
//             icon: "cms",
//             path: "",
//         },
//     ],
//     layout : "LeftSideNav",
//     showUserProfile:false,
// };
// CustomNavigationSidebar.parameters = { controls: { include: ["logo", "sideNavItems"] } };


// export const CustomNavigationSidebarWithList: Story = (args: any) => (
//     <BrowserRouter>
//         <RdsSideNav {...args} />
//     </BrowserRouter>
// );

// CustomNavigationSidebarWithList.args = {
//     logo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
//     showUserProfile:true,
//     sideNavItems: [
//         {
//             key: "0",
//             label: "Dashboard",
//             icon: "home",
//             path: "/dashboard",
//         },
//         {
//             key: "1",
//             label: "Tenant",
//             icon: "tenant",
//             path: "",
//         },
//         {
//             key: "2",
//             label: "Administration",
//             icon: "administration",
//             children: [
//                 {
//                     key: "2-0",
//                     label: "Role",
//                     icon: "roles",
//                     path: ""
//                 },
//                 {
//                     key: "2-1",
//                     label: "Users",
//                     icon: "users",
//                     path: "",
//                 },
//             ],
//         },
//         {
//             key: "3",
//             label: "DEMO Components",
//             icon: "demo_ui",
//             children: [
//                 {
//                     key: "3-0",
//                     label: "Button",
//                     icon: "button",
//                 },
//                 {
//                     key: "3-1",
//                     label: "Input",
//                     icon: "input",
//                 }
//             ],
//         },
//     ],
//     layout : "LeftSideNavList",
// };
// CustomNavigationSidebarWithList.parameters = { controls: { include: ["logo", "showUserProfile", "sideNavItems"] } };



// export const CustomNavigationSidebarRight: Story = (args: any) => (
//     <BrowserRouter>
//         <RdsSideNav {...args} />
//     </BrowserRouter>
// );

// CustomNavigationSidebarRight.args = {
//     showUserProfile:true,
//     sideNavItems: [
//         {
//             key: "0",
//             label: "Chat",
//             icon: "chat",
//             path: "",
//         },
//         {
//             key: "1",
//             label: "Language",
//             icon: "language",
//             path: "",
//         },
//         {
//             key: "2",
//             label: "Mode",
//             icon: "sun",
//             path: "",
//         },
//     ],
//     layout : "RightSideNav",
//     logo:"",
//     collapse: false,
// };
// CustomNavigationSidebarRight.parameters = { controls: { include: ["showUserProfile", "sideNavItems"] } };
