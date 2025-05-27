import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompAppShell, {
  AppShellDisplayType,
  RdsSideNav,
} from "./rds-comp-app-shell";
import RdsCompSideNavigation from "../../../raaghu-components/src/rds-comp-side-navigation";
import RdsCompTopNavigation from "../../../raaghu-components/src/rds-comp-top-navigation/rds-comp-top-navigation";
import { BrowserRouter } from "react-router-dom";
import "./rds-comp-app-shell.css";
import {
  NavLayout,
  NavType,
  Platform,
} from "../../../raaghu-elements/src/rds-side-nav/rds-side-nav";

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


//Default story
export const Default: Story = {
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

//Relaxing Story
export const Relaxing: Story = {
  args: {
    displayType: AppShellDisplayType.TopNav,
    topbar: (
      <div className="fixed-top">
        <RdsCompTopNavigation
          brandLogo="assets/Raaghu-logo-mfe-black.png"
          brandName="Raaghu"
          firstName="John"
          icons={[
            {
              id: "star",
              name: "star",
            },
            {
              id: "notification_new",
              name: "notification_new",
            },
            {
              id: "help_question_circle",
              name: "help_question_circle",
            },
          ]}
          lastName="Doe"
          logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
          navbarSubTitle="Statistics and reports"
          navbarTitle="Home"
          professional5
          profileEmail="john.doe@raaghu.io"
          profileName="John Doe"
          profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
          profileTitle="John Doe"
          role="Admin"
          showLogo
          showSearch
          style="Professional_5"
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
            {
              icon: "semidark",
              iconHeight: "20px",
              iconWidth: "20px",
              label: "SemiDark",
              val: "semiDark",
            },
          ]}
          top_nav_logo="raaghu logo"
          toggleItems={[]}
          elementList={[]}
          componentsList={[]}
          languageLabel={""}
          themeLabel={""}
          onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
            throw new Error("Function not implemented.");
          }}
          onProfileLinkTopNav={function (
            id: string,
            navigateTo?: string,
            label?: string
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    ),

    sidebar: (
      <div className="mt-5">
        <RdsSideNav
          lockIconVisible={true}
          layout="LeftSideNav"
          logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
          navLayout={NavLayout.Raaghu}
          navType={NavType.Expanded}
          platform={Platform.SideNavigationABPList}
          showUserProfile
          sideNavItems={[
            {
              icon: "home",
              key: "0",
              label: "Home",
              path: "/dashboard",
            },
            {
              icon: "dashboard_meter",
              key: "1",
              label: "Dashboard",
            },
            {
              icon: "saas",
              key: "2",
              label: "Saas",
              path: "",
            },
            {
              icon: "administration_new",
              key: "3",
              label: "Administration",
              path: "",
            },
            {
              icon: "folder",
              key: "4",
              label: "File Management",
              path: "",
            },
            {
              icon: "forms",
              key: "5",
              label: "Forms",
              path: "",
            },
            {
              icon: "payment_new",
              key: "6",
              label: "Payments",
              path: "",
            },
            {
              icon: "cms",
              key: "7",
              label: "CMS",
              path: "",
            },
          ]}
        />
      </div>
    ),
  },
};

//TopNav Story
export const TopNav: Story = {
  args: {
    displayType: AppShellDisplayType.Default,

    topbar: (
      <RdsCompTopNavigation
        appshell3
        brandLogo="assets/Raaghu-logo-mfe-black.png"
        brandName="Raaghu"
        breadcrumItem={[
          {
            active: true,
            disabled: false,
            icon: "home",
            iconColor: "primary",
            iconFill: false,
            iconHeight: "15px",
            iconWidth: "15px",
            iconstroke: true,
            id: 0,
            label: "Home",
            route: "#",
          },
          {
            active: false,
            disabled: false,
            icon: "dashboard_new",
            iconColor: "primary",
            iconFill: false,
            iconHeight: "15px",
            iconWidth: "15px",
            iconstroke: true,
            id: 1,
            label: "Dashboard",
            route: "#",
          },
          {
            active: false,
            disabled: false,
            icon: "saas",
            iconColor: "primary",
            iconFill: false,
            iconHeight: "15px",
            iconWidth: "15px",
            iconstroke: true,
            id: 2,
            label: "Saas",
            route: "#",
          },
          {
            active: false,
            disabled: true,
            icon: "administration",
            iconColor: "primary",
            iconFill: false,
            iconHeight: "15px",
            iconWidth: "15px",
            iconstroke: true,
            id: 3,
            label: "Administration",
          },
          {
            active: false,
            disabled: true,
            icon: "file_management",
            iconColor: "primary",
            iconFill: false,
            iconHeight: "14px",
            iconWidth: "14px",
            iconstroke: true,
            id: 4,
            label: "File Management",
          },
          {
            active: false,
            disabled: true,
            icon: "forms",
            iconColor: "primary",
            iconFill: false,
            iconHeight: "14px",
            iconWidth: "14px",
            iconstroke: true,
            id: 5,
            label: "Forms",
          },
          {
            active: false,
            disabled: true,
            icon: "payment",
            iconColor: "primary",
            iconFill: false,
            iconHeight: "14px",
            iconWidth: "14px",
            iconstroke: true,
            id: 6,
            label: "Payment",
          },
          {
            active: false,
            disabled: true,
            icon: "cms",
            iconColor: "primary",
            iconFill: false,
            iconHeight: "14px",
            iconWidth: "14px",
            iconstroke: true,
            id: 7,
            label: "CMS",
          },
        ]}
        breadcrumbBorderColor="#6610f2"
        breadcrumbBorderPlacement="top"
        firstName="John"
        lastName="Doe"
        listItems={[
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
        profileEmail="john.doe@raaghu.io"
        profileName="John Doe"
        profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
        profileTitle="John Doe"
        role="Admin"
        showLogo
        style="App_Shell_3"
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
          {
            icon: "semidark",
            iconHeight: "20px",
            iconWidth: "20px",
            label: "SemiDark",
            val: "semiDark",
          },
        ]}
        top_nav_logo="raaghu logo"
        toggleItems={[]}
        elementList={[]}
        componentsList={[]}
        languageLabel={""}
        themeLabel={""}
        onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
          throw new Error("Function not implemented.");
        }}
        onProfileLinkTopNav={function (
          id: string,
          navigateTo?: string,
          label?: string
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
};

//Side Nav Story
export const SideNav: Story = {
  args: {
    displayType: AppShellDisplayType.SideNav,
    sidebar: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1" }}>
          <RdsCompSideNavigation
            lockIconVisible={true}
            sideNavItems={[
              {
                icon: "home",
                key: "0",
                label: "Home",
                path: "/dashboard",
              },
              {
                icon: "dashboard_meter",
                key: "1",
                label: "Dashboard",
              },
              {
                icon: "saas",
                key: "2",
                label: "Saas",
                path: "",
              },
              {
                icon: "administration_new",
                key: "3",
                label: "Administration",
                path: "",
              },
              {
                icon: "folder",
                key: "4",
                label: "File Management",
                path: "",
              },
              {
                icon: "forms",
                key: "5",
                label: "Forms",
                path: "",
              },
              {
                icon: "payment_new",
                key: "6",
                label: "Payments",
                path: "",
              },
              {
                icon: "cms",
                key: "7",
                label: "CMS",
                path: "",
              },
            ]}
          />
        </div>
        <div>
          <div style={{ flex: "3" }} className="float-end icon-sapce-between">
            <RdsSideNav
              layout="RightSideNav"
              logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
              navLayout={NavLayout.Toolbar}
              navType={NavType.Collapsed}
              // platform={[]}
              showUserProfile
              sideNavItems={[
                {
                  icon: "language",
                  key: "0",
                  label: "Language",
                  path: "",
                },
                {
                  icon: "chat",
                  key: "1",
                  label: "Chat",
                  path: "",
                },
                {
                  icon: "sun",
                  key: "2",
                  label: "Theme",
                  path: "",
                },
                {
                  icon: "grid_layout",
                  key: "3",
                  label: "Layout",
                  path: "",
                },
                {
                  icon: "my_settings",
                  key: "4",
                  label: "Settings",
                  path: "",
                },
                {
                  icon: "interface_logout",
                  key: "5",
                  label: "Logout",
                  path: "",
                },
              ]}
            />
          </div>
        </div>
      </div>
    ),
  },
};

//DoubleNav Story
export const DoubleNav: Story = {
  args: {
    displayType: AppShellDisplayType.TopNav,
    topbar: (
      <div className="fixed-top">
        <RdsCompTopNavigation
          brandLogo="assets/Raaghu-logo-mfe-black.png"
          brandName="Raaghu"
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
          profileEmail="john.doe@raaghu.io"
          profileName="John Doe"
          profileTitle="John Doe"
          role="Admin"
          showLogo
          style="Default"
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
            {
              icon: "semidark",
              iconHeight: "20px",
              iconWidth: "20px",
              label: "SemiDark",
              val: "semiDark",
            },
          ]}
          top_nav_logo="raaghu logo"
          toggleItems={[]}
          elementList={[]}
          componentsList={[]}
          languageLabel={""}
          themeLabel={""}
          onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
            throw new Error("Function not implemented.");
          }}
          onProfileLinkTopNav={function (
            id: string,
            navigateTo?: string,
            label?: string
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    ),

    sidebar: (
      <div className="mt-5 double-nav-sidebar" style={{ display: 'flex', flexDirection: 'row', gap: '7px' }}>
        <RdsSideNav
          layout="LeftSideNav"
          navLayout={NavLayout.Raaghu}
          navType={NavType.Collapsed}
          platform={Platform.SideNavigationABPList}
          showUserProfile
          sideNavItems={[
            {
              icon: "home",
              key: "0",
              label: "Home",
              path: "/dashboard",
            },
            {
              icon: "dashboard_meter",
              key: "1",
              label: "Dashboard",
            },
            {
              icon: "saas",
              key: "2",
              label: "Saas",
              path: "",
            },
            {
              icon: "administration_new",
              key: "3",
              label: "Administration",
              path: "",
            },
            {
              icon: "folder",
              key: "4",
              label: "File Management",
              path: "",
            },
            {
              icon: "forms",
              key: "5",
              label: "Forms",
              path: "",
            },
            {
              icon: "payment_new",
              key: "6",
              label: "Payments",
              path: "",
            },
            {
              icon: "cms",
              key: "7",
              label: "CMS",
              path: "",
            },
          ]}
        />

        <RdsCompSideNavigation
          lockIconVisible={true}
          sideNavItems={[
          {
              icon: "blogs",
              key: "0",
              label: "Blogs",
              path: "/blogs",
            },
            {
              icon: "file_data",
              key: "1",
              label: "Blog Post",
            },
            {
              icon: "comments",
              key: "2",
              label: "Comments",
              path: "",
            },
            {
              icon: "globe",
              key: "3",
              label: "Global Resources",
              path: "",
            },
            {
              icon: "my_settings",
              key: "4",
              label: "Menus",
              path: "",
            },
            {
              icon: "newsletters",
              key: "5",
              label: "Newsletters",
              path: "",
            },
            {
              icon: "pages",
              key: "6",
              label: "Pages",
              path: "",
            },
            {
              icon: "tag",
              key: "7",
              label: "Tags",
              path: "",
            },
          ]}
        />
      </div>
    ),
  },
};

//Relaxing Story
export const OneThreeOne : Story = {
  args: {
    displayType: AppShellDisplayType.TopNav,
    topbar: (
      <div className="fixed-top">
        <RdsCompTopNavigation
          brandLogo="assets/Raaghu-logo-mfe-black.png"
          brandName="Raaghu"
          languageItems={[
            {
              icon: 'us',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'EN(US)',
              val: 'en'
            },
            {
              icon: 'in',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'English(IND)',
              val: 'en'
            },
            {
              icon: 'us',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'French',
              val: 'fr'
            }
          ]}
          logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
          navbarSubTitle="Statistics and reports"
          notifications={[
            {
              selected: false,
              state: 1,
              status: 'success',
              time: 'a month ago',
              title: 'Tenant added',
              urlTitle: 'hello',
              userNotificationId: 0
            },
            {
              selected: false,
              state: 1,
              status: 'error',
              time: 'a month ago',
              title: 'Tenant deleted',
              urlTitle: 'hello',
              userNotificationId: 1
            },
            {
              selected: false,
              state: 1,
              status: 'warn',
              time: 'a month ago',
              title: 'Tenant added  warn',
              urlTitle: 'hello',
              userNotificationId: 2
            },
            {
              selected: false,
              state: 1,
              status: 'info',
              time: 'a month ago',
              title: 'Tenant deleted info',
              urlTitle: 'hello',
              userNotificationId: 3
            }
          ]}
          profileEmail="john.doe@raaghu.io"
          profileName="John Doe"
          profileTitle="John Doe"
          role="Admin"
          showLogo
          style="Default"
          themeItems={[
            {
              icon: 'sun',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'Light',
              val: 'light'
            },
            {
              icon: 'moon',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'Dark',
              val: 'dark'
            },
            {
              icon: 'semidark',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'SemiDark',
              val: 'semiDark'
            }
          ]}
          top_nav_logo="raaghu logo" toggleItems={[]} elementList={[]} componentsList={[]} languageLabel={""} themeLabel={""} onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
            throw new Error("Function not implemented.");
          } } onProfileLinkTopNav={function (id: string, navigateTo?: string, label?: string): void {
            throw new Error("Function not implemented.");
          } }/>
      </div>
    ),

    sidebar: (
      <div className="mt-5 OneThreeOne-sidebar"> 
        <RdsSideNav
          lockIconVisible={true}
          layout="LeftSideNav"
          logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
          navLayout={NavLayout.Raaghu}
          navType={NavType.Expanded}
          platform={Platform.SideNavigationABPList}
          showUserProfile
          sideNavItems={[
            {
              icon: "home",
              key: "0",
              label: "Home",
              path: "/dashboard",
            },
            {
              icon: "dashboard_meter",
              key: "1",
              label: "Dashboard",
            },
            {
              icon: "saas",
              key: "2",
              label: "Saas",
              path: "",
            },
            {
              icon: "administration_new",
              key: "3",
              label: "Administration",
              path: "",
            },
            {
              icon: "folder",
              key: "4",
              label: "File Management",
              path: "",
            },
            {
              icon: "forms",
              key: "5",
              label: "Forms",
              path: "",
            },
            {
              icon: "payment_new",
              key: "6",
              label: "Payments",
              path: "",
            },
            {
              icon: "cms",
              key: "7",
              label: "CMS",
              path: "",
            },
          ]}
        />
      </div>
    ),
  },
};