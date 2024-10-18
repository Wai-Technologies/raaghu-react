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
        layoutType: {
            options: ['basic-expanded','basic-collapsed','list-expanded','list-collapsed','right-collapsed'],
            control: { type: 'select' }
        },
    },
} satisfies Meta<typeof RdsSideNav>;

export default meta;
type Story = StoryObj<typeof RdsSideNav>;

export const Basic: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

Basic.args = {
    sideNavItems:[
        {
          icon: "home",
          key: "0",
          label: "Home",
          path: "/home",
        },
        {
          icon: "dashboard_new",
          key: "1",
          label: "Dashboard",
          path: "/dashboard",
        },
        {
        children: [
          {
            icon: "tenant",
            key: "2-0",
            label: "Tenants",
            path: "/tenant",
          },
          {
            icon: "editions",
            key: "2-1",
            label: "Editions",
            path: "/edition",
          },
        ],
          icon: "saas",
          key: "2",
          label: "Saas",
        },
        {
              children: [
                {
                  icon: "organization",
                  key: "3-2-0",
                  label: "Organization Units",
                  path: "/organization-unit",
                },
                {
                  icon: "roles",
                  key: "3-2-1",
                  label: "Roles",
                  path: "/role",
                },
                {
                  icon: "users",
                  key: "3-2-2",
                  label: "Users",
                  path: "/user",
                },
                {
                  icon: "languages",
                  key: "3-2-3",
                  label: "Language",
                  path: "/language",
                },
                {
                  icon: "audit_logs",
                  key: "3-2-4",
                  label: "Audit Logs",
                  path: "/audit-logs",
                },
                {
                  icon: "webhook_subscription",
                  key: "3-2-5",
                  label: "Webhook Subscriptions",
                  path: "/webhook-subscription",
                },
                {
                  icon: "maintenance",
                  key: "3-2-6",
                  label: "Maintenance",
                  path: "/maintainance",
                },
                {
                  icon: "visual_settings",
                  key: "3-2-7",
                  label: "Visual Settings",
                  path: "/visual-setting",
                },
                {
                  icon: "setting",
                  key: "3-2-8",
                  label: "Settings",
                  path: "/settings",
                },
              ],
              icon: "administration",
              key: "3-2",
              label: "Administration",
        },
     
        {
          icon: "file",
          key: "4",
          label: "File Management",
          path: "/file-management",
        },
        {
          icon: "forms",
          key: "5",
          label: "Forms",
          path: "/file-management",
        },
        {
          icon: "payment",
          key: "7",
          label: "Payment",
          path: "/payment",
        },
        {
          icon: "cms",
          key: "8",
          label: "CMS",
          path: "/cms",
        }
      ],
    brandLogo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    layoutType: "basic-expanded",

};
Basic.parameters = { controls: { include: ['sideNavItems','brandLogo','layoutType'] } };

export const Collapase: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

Collapase.args = {
    sideNavItems:[
        {
          icon: "home",
          key: "0",
          label: "Home",
          path: "/home",
        },
        {
          icon: "dashboard_new",
          key: "1",
          label: "Dashboard",
          path: "/dashboard",
        },
        {
        children: [
          {
            icon: "tenant",
            key: "2-0",
            label: "Tenants",
            path: "/tenant",
          },
          {
            icon: "editions",
            key: "2-1",
            label: "Editions",
            path: "/edition",
          },
        ],
          icon: "saas",
          key: "2",
          label: "Saas",
        },
        {
              children: [
                {
                  icon: "organization",
                  key: "3-2-0",
                  label: "Organization Units",
                  path: "/organization-unit",
                },
                {
                  icon: "roles",
                  key: "3-2-1",
                  label: "Roles",
                  path: "/role",
                },
                {
                  icon: "users",
                  key: "3-2-2",
                  label: "Users",
                  path: "/user",
                },
                {
                  icon: "languages",
                  key: "3-2-3",
                  label: "Language",
                  path: "/language",
                },
                {
                  icon: "audit_logs",
                  key: "3-2-4",
                  label: "Audit Logs",
                  path: "/audit-logs",
                },
                {
                  icon: "webhook_subscription",
                  key: "3-2-5",
                  label: "Webhook Subscriptions",
                  path: "/webhook-subscription",
                },
                {
                  icon: "maintenance",
                  key: "3-2-6",
                  label: "Maintenance",
                  path: "/maintainance",
                },
                {
                  icon: "visual_settings",
                  key: "3-2-7",
                  label: "Visual Settings",
                  path: "/visual-setting",
                },
                {
                  icon: "setting",
                  key: "3-2-8",
                  label: "Settings",
                  path: "/settings",
                },
              ],
              icon: "administration",
              key: "3-2",
              label: "Administration",
        },
     
        {
          icon: "file",
          key: "4",
          label: "File Management",
          path: "/file-management",
        },
        {
          icon: "forms",
          key: "5",
          label: "Forms",
          path: "/file-management",
        },
        {
          icon: "payment",
          key: "7",
          label: "Payment",
          path: "/payment",
        },
        {
          icon: "cms",
          key: "8",
          label: "CMS",
          path: "/cms",
        }
      ],
    brandLogo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    layoutType: "basic-collapsed",

};
Collapase.parameters = { controls: { include: ['sideNavItems','brandLogo','layoutType'] } };

export const List_Exapand: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

List_Exapand.args = {
    sideNavFirstListTitle:"Overview",
    sideNavItemsFirstList: [
       
        {
          icon: "dashboard_new",
          key: "0",
          label: "Dashboard",
          path: "/dashboard",
        },
     
        {
          icon: "workspace",
          key: "1",
          label: "Workspace",
          path: "/workspace",
        },
        {
          icon: "message",
          key: "2",
          label: "Messages",
          path: "/messages",
        },
        {
          icon: "calendar",
          key: "3",
          label: "Calendar",
          path: "/calendar",
        },
        {
          icon: "activity",
          key: "4",
          label: "Activity",
          path: "/activity",
        },
        {
            icon: "library",
            key: "5",
            label: "Library",
            path: "/library",
          },
        {
            icon: "community",
            key: "6",
            label: "Community",
            path: "/community",
        },
        {
            icon: "favorite",
            key: "7",
            label: "Favorites",
            path: "/favorites",
        }
      ],
    sideNavSecondListTitle:"Account",
    sideNavItemsSecondList:[
        {
          icon: "chat",
          key: "0",
          label: "Chat",
          path: "/chat",
        },
        {
          icon: "setting",
          key: "1",
          label: "Settings",
          path: "/settings",
        },
        {
          icon: "logout",
          key: "5",
          label: "Logout",
          path: "/logout",
        },
      ],
    brandLogo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    layoutType: "list-expanded",

};
List_Exapand.parameters = { controls: { include: ['sideNavFirstListTitle','sideNavItemsFirstList','sideNavSecondListTitle', 'sideNavItemsSecondList','brandLogo','layoutType'] } };

export const List_Collapse: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

List_Collapse.args = {
    sideNavFirstListTitle:"Overview",
    sideNavItemsFirstList: [
       
        {
          icon: "dashboard_new",
          key: "0",
          label: "Dashboard",
          path: "/dashboard",
        },
     
        {
          icon: "workspace",
          key: "1",
          label: "Workspace",
          path: "/workspace",
        },
        {
          icon: "message",
          key: "2",
          label: "Messages",
          path: "/messages",
        },
        {
          icon: "calendar",
          key: "3",
          label: "Calendar",
          path: "/calendar",
        },
        {
          icon: "activity",
          key: "4",
          label: "Activity",
          path: "/activity",
        },
        {
            icon: "library",
            key: "5",
            label: "Library",
            path: "/library",
          },
        {
            icon: "community",
            key: "6",
            label: "Community",
            path: "/community",
        },
        {
            icon: "favorite",
            key: "7",
            label: "Favorites",
            path: "/favorites",
        }
      ],
    sideNavSecondListTitle:"Account",
    sideNavItemsSecondList:[
        {
          icon: "chat",
          key: "0",
          label: "Chat",
          path: "/chat",
        },
        {
          icon: "setting",
          key: "1",
          label: "Settings",
          path: "/settings",
        },
        {
          icon: "logout",
          key: "5",
          label: "Logout",
          path: "/logout",
        },
      ],
    brandLogo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    layoutType: "list-collapsed",

};
List_Collapse.parameters = { controls: { include: ['sideNavFirstListTitle','sideNavItemsFirstList','sideNavSecondListTitle', 'sideNavItemsSecondList','brandLogo','layoutType'] } };

export const Right_Collapse: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

Right_Collapse.args = {
    langaugeItems:[
        {
          icon: "us",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "EN(US)",
          val: "en",
        },
        {
          icon: "in",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "English(IND)",
          val: "en",
        },
        {
          icon: "us",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "French",
          val: "fr",
        },
      ],
    profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    brandLogo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png",
    brandName:"Raaghu Design System",
    layoutType: "right-collapsed",
    themeItems:[
        {
          icon: "sun",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "Light",
          val: "light",
        },
        {
          icon: "moon",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "Dark",
          val: "dark",
        }
    ],
};
Right_Collapse.parameters = { controls: { include: ['langaugeItems','profilePic','brandName','themeItems','brandLogo','layoutType'] } };