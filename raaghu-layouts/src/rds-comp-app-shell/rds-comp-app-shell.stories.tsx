import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompAppShell, { AppShellDisplayType } from "./rds-comp-app-shell";
import RdsCompSideNavigation from "../../../raaghu-components/src/rds-comp-side-navigation";
import RdsCompTopNavigation from "../../../raaghu-components/src/rds-comp-top-navigation/rds-comp-top-navigation";
import { BrowserRouter } from "react-router-dom";
import "./rds-comp-app-shell.css";

const meta: Meta<typeof RdsCompAppShell> = {
  title: "Application Shells",
  component: RdsCompAppShell,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RdsCompAppShell>;

export const Basic: Story = {
  args: {
    displayType: AppShellDisplayType.Default,
    sidebar: (
      <RdsCompSideNavigation
        sideNavItems={[
          {
            icon: "home",
            key: "0",
            label: "Dashboard",
            path: "/dashboard",
          },
          {
            icon: "demo_ui",
            key: "1",
            label: "UI Components",
            path: "/demo-ui",
          },
          {
            icon: "icons",
            key: "2",
            label: "Icons",
            path: "/icons",
          },
          {
            children: [
              {
                icon: "tenant",
                key: "3-0",
                label: "Tenants",
                path: "/tenant",
              },
              {
                icon: "editions",
                key: "3-1",
                label: "Editions",
                path: "/edition",
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
            ],
            icon: "pages",
            key: "3",
            label: "Pages",
          },
        ]}
      />
    ),
    topbar: (
      <RdsCompTopNavigation
        brandLogo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
        brandName="Raaghu Design System"
        languageItems={[
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
        ]}
        logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
        navbarSubTitle="Statistics and reports"
        navbarTitle="Dashboard"
        notifications={[
          {
            selected: false,
            state: 1,
            status: "success",
            time: "a month ago",
            title: "Tenant added",
            urlTitle: "hello",
            userNotificationId: 0,
          },
          {
            selected: false,
            state: 1,
            status: "error",
            time: "a month ago",
            title: "Tenant deleted",
            urlTitle: "hello",
            userNotificationId: 1,
          },
          {
            selected: false,
            state: 1,
            status: "warn",
            time: "a month ago",
            title: "Tenant added  warn",
            urlTitle: "hello",
            userNotificationId: 2,
          },
          {
            selected: false,
            state: 1,
            status: "info",
            time: "a month ago",
            title: "Tenant deleted info",
            urlTitle: "hello",
            userNotificationId: 3,
          },
        ]}
        profileTitle="John Doe"
        profileEmail="john.doe@raaghu.io"
        profileName="John Doe"
        themeItems={[
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
          },
        ]}
        toggleItems={[]}
        elementList={[]}
        componentsList={[]}
        languageLabel={""}
        themeLabel={""}
        onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
          console.log("Forgot password clicked:", isForgotPasswordClicked);
        }}
        onProfileLinkTopNav={function (
          id: string,
          navigateTo?: string,
          label?: string
        ): void {
          console.log("Profile link clicked:", id, navigateTo, label);
        }}
        style={"ABP"}
      />
    ),
  },
};

// Add more variants
export const HeaderOnly: Story = {
  args: {
    displayType: AppShellDisplayType.TopNav,
    topbar: (
      <RdsCompTopNavigation
        brandLogo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
        brandName="Raaghu Design System"
        languageItems={[
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
        ]}
        logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
        navbarSubTitle="Statistics and reports"
        navbarTitle="Dashboard"
        notifications={[
          {
            selected: false,
            state: 1,
            status: "success",
            time: "a month ago",
            title: "Tenant added",
            urlTitle: "hello",
            userNotificationId: 0,
          },
          {
            selected: false,
            state: 1,
            status: "error",
            time: "a month ago",
            title: "Tenant deleted",
            urlTitle: "hello",
            userNotificationId: 1,
          },
          {
            selected: false,
            state: 1,
            status: "warn",
            time: "a month ago",
            title: "Tenant added  warn",
            urlTitle: "hello",
            userNotificationId: 2,
          },
          {
            selected: false,
            state: 1,
            status: "info",
            time: "a month ago",
            title: "Tenant deleted info",
            urlTitle: "hello",
            userNotificationId: 3,
          },
        ]}
        profileTitle="John Doe"
        profileEmail="john.doe@raaghu.io"
        profileName="John Doe"
        themeItems={[
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
          },
        ]}
        toggleItems={[]}
        elementList={[]}
        componentsList={[]}
        languageLabel={""}
        themeLabel={""}
        onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
          console.log("Forgot password clicked:", isForgotPasswordClicked);
        }}
        onProfileLinkTopNav={function (
          id: string,
          navigateTo?: string,
          label?: string
        ): void {
          console.log("Profile link clicked:", id, navigateTo, label);
        }}
        style={undefined}
      />
    ),
  },
};

export const SidebarOnly: Story = {
  args: {
    displayType: AppShellDisplayType.SideNav,
    sidebar: (
      <RdsCompSideNavigation
        sideNavItems={[
          {
            icon: "home",
            key: "0",
            label: "Dashboard",
            path: "/dashboard",
          },
          {
            icon: "users",
            key: "1",
            label: "Users",
            path: "/users",
          },
          {
            icon: "setting",
            key: "2",
            label: "Settings",
            path: "/settings",
          },
        ]}
      />
    ),
  },
};
