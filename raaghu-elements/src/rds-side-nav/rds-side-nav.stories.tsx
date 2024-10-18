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

export const SideNavigation: Story = (args: any) => (
    <BrowserRouter>
        <RdsSideNav {...args} />
    </BrowserRouter>
);

SideNavigation.args = {
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
    brandLogo:"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"

};
SideNavigation.parameters = { controls: { include: ['sideNavItems','brandLogo'] } };


