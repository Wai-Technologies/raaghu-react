import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompAppShell, {
  AppShellDisplayType,
  RdsSideNav,
} from "./rds-comp-app-shell";
import RdsCompSideNavigation from "../../../raaghu-components/src/rds-comp-side-navigation";
import RdsTopNavigation from "../../../raaghu-elements/src/rds-top-navigation/rds-top-navigation";
import { BrowserRouter } from "react-router-dom";
import RdsCompSideNavigation1 from '../../../raaghu-components/src/rds-comp-side-navigation1/rds-comp-side-navigation1';
import "./rds-comp-app-shell.css";
import {
  NavLayout,
  NavType,
  Platform,
} from "../../../raaghu-elements/src/rds-side-nav/rds-side-nav";
import RdsCompDetailsPaneFavouites from "../../../raaghu-components/src/rds-comp-details-pane";

const meta: Meta<typeof RdsCompAppShell> = {
  title: "Application Shells",
  component: RdsCompAppShell,
  parameters: {
    layout: "padded",
    docs: {
    description: {
        component: 
            'The **Application Shell** component is a versatile and customizable UI layout designed to provide a structured framework for building applications. It supports features such as top navigation, side navigation, and a combination of both, enabling seamless navigation and content organization. This component is ideal for applications requiring a consistent and responsive layout, such as admin dashboards, SaaS platforms, or enterprise systems. Fully customizable, the Application Shell component ensures seamless integration with your design system while offering an intuitive and user-friendly interface for managing application layouts effectively.'
    },
},
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
        <Story />
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RdsCompAppShell>;

// export const Basic: Story = {
//   args: {
//     displayType: AppShellDisplayType.Default,
//     sidebar: (
//       <RdsCompSideNavigation
//         sideNavItems={[
//           {
//             icon: "home",
//             key: "0",
//             label: "Dashboard",
//             path: "/dashboard",
//           },
//           {
//             icon: "demo_ui",
//             key: "1",
//             label: "UI Components",
//             path: "/demo-ui",
//           },
//           {
//             icon: "icons",
//             key: "2",
//             label: "Icons",
//             path: "/icons",
//           },
//           {
//             children: [
//               {
//                 icon: "tenant",
//                 key: "3-0",
//                 label: "Tenants",
//                 path: "/tenant",
//               },
//               {
//                 icon: "editions",
//                 key: "3-1",
//                 label: "Editions",
//                 path: "/edition",
//               },
//               {
//                 children: [
//                   {
//                     icon: "organization",
//                     key: "3-2-0",
//                     label: "Organization Units",
//                     path: "/organization-unit",
//                   },
//                   {
//                     icon: "roles",
//                     key: "3-2-1",
//                     label: "Roles",
//                     path: "/role",
//                   },
//                   {
//                     icon: "users",
//                     key: "3-2-2",
//                     label: "Users",
//                     path: "/user",
//                   },
//                   {
//                     icon: "languages",
//                     key: "3-2-3",
//                     label: "Language",
//                     path: "/language",
//                   },
//                   {
//                     icon: "audit_logs",
//                     key: "3-2-4",
//                     label: "Audit Logs",
//                     path: "/audit-logs",
//                   },
//                   {
//                     icon: "webhook_subscription",
//                     key: "3-2-5",
//                     label: "Webhook Subscriptions",
//                     path: "/webhook-subscription",
//                   },
//                   {
//                     icon: "maintenance",
//                     key: "3-2-6",
//                     label: "Maintenance",
//                     path: "/maintainance",
//                   },
//                   {
//                     icon: "visual_settings",
//                     key: "3-2-7",
//                     label: "Visual Settings",
//                     path: "/visual-setting",
//                   },
//                   {
//                     icon: "setting",
//                     key: "3-2-8",
//                     label: "Settings",
//                     path: "/settings",
//                   },
//                 ],
//                 icon: "administration",
//                 key: "3-2",
//                 label: "Administration",
//               },
//             ],
//             icon: "pages",
//             key: "3",
//             label: "Pages",
//           },
//         ]}
//       />
//     ),
//     topbar: (
//       <RdsTopNavigation
//         brandLogo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
//         brandName="Raaghu Design System"
//         languageItems={[
//           {
//             icon: "us",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "EN(US)",
//             val: "en",
//           },
//           {
//             icon: "in",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "English(IND)",
//             val: "en",
//           },
//           {
//             icon: "us",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "French",
//             val: "fr",
//           },
//         ]}
//         logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
//         navbarSubTitle="Statistics and reports"
//         navbarTitle="Dashboard"
//         notifications={[
//           {
//             selected: false,
//             state: 1,
//             status: "success",
//             time: "a month ago",
//             title: "Tenant added",
//             urlTitle: "hello",
//             userNotificationId: 0,
//           },
//           {
//             selected: false,
//             state: 1,
//             status: "error",
//             time: "a month ago",
//             title: "Tenant deleted",
//             urlTitle: "hello",
//             userNotificationId: 1,
//           },
//           {
//             selected: false,
//             state: 1,
//             status: "warn",
//             time: "a month ago",
//             title: "Tenant added  warn",
//             urlTitle: "hello",
//             userNotificationId: 2,
//           },
//           {
//             selected: false,
//             state: 1,
//             status: "info",
//             time: "a month ago",
//             title: "Tenant deleted info",
//             urlTitle: "hello",
//             userNotificationId: 3,
//           },
//         ]}
//         profileTitle="John Doe"
//         profileEmail="john.doe@raaghu.io"
//         profileName="John Doe"
//         themeItems={[
//           {
//             icon: "sun",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "Light",
//             val: "light",
//           },
//           {
//             icon: "moon",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "Dark",
//             val: "dark",
//           },
//         ]}
//         toggleItems={[]}
//         elementList={[]}
//         componentsList={[]}
//         languageLabel={""}
//         themeLabel={""}
//         onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
//           console.log("Forgot password clicked:", isForgotPasswordClicked);
//         }}
//         onProfileLinkTopNav={function (
//           id: string,
//           navigateTo?: string,
//           label?: string
//         ): void {
//           console.log("Profile link clicked:", id, navigateTo, label);
//         }}
//         style={"ABP"}
//       />
//     ),
//   },
// };

// // Add more variants
// export const HeaderOnly: Story = {
//   args: {
//     displayType: AppShellDisplayType.TopNav,
//     topbar: (
//       <RdsTopNavigation
//         brandLogo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
//         brandName="Raaghu Design System"
//         languageItems={[
//           {
//             icon: "us",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "EN(US)",
//             val: "en",
//           },
//           {
//             icon: "in",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "English(IND)",
//             val: "en",
//           },
//           {
//             icon: "us",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "French",
//             val: "fr",
//           },
//         ]}
//         logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
//         navbarSubTitle="Statistics and reports"
//         navbarTitle="Dashboard"
//         notifications={[
//           {
//             selected: false,
//             state: 1,
//             status: "success",
//             time: "a month ago",
//             title: "Tenant added",
//             urlTitle: "hello",
//             userNotificationId: 0,
//           },
//           {
//             selected: false,
//             state: 1,
//             status: "error",
//             time: "a month ago",
//             title: "Tenant deleted",
//             urlTitle: "hello",
//             userNotificationId: 1,
//           },
//           {
//             selected: false,
//             state: 1,
//             status: "warn",
//             time: "a month ago",
//             title: "Tenant added  warn",
//             urlTitle: "hello",
//             userNotificationId: 2,
//           },
//           {
//             selected: false,
//             state: 1,
//             status: "info",
//             time: "a month ago",
//             title: "Tenant deleted info",
//             urlTitle: "hello",
//             userNotificationId: 3,
//           },
//         ]}
//         profileTitle="John Doe"
//         profileEmail="john.doe@raaghu.io"
//         profileName="John Doe"
//         themeItems={[
//           {
//             icon: "sun",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "Light",
//             val: "light",
//           },
//           {
//             icon: "moon",
//             iconHeight: "20px",
//             iconWidth: "20px",
//             label: "Dark",
//             val: "dark",
//           },
//         ]}
//         toggleItems={[]}
//         elementList={[]}
//         componentsList={[]}
//         languageLabel={""}
//         themeLabel={""}
//         onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
//           console.log("Forgot password clicked:", isForgotPasswordClicked);
//         }}
//         onProfileLinkTopNav={function (
//           id: string,
//           navigateTo?: string,
//           label?: string
//         ): void {
//           console.log("Profile link clicked:", id, navigateTo, label);
//         }}
//         style={"ABP"}
//         showLogo={true}
//       />
//     ),
//   },
// };

// export const SidebarOnly: Story = {
//   args: {
//     displayType: AppShellDisplayType.SideNav,
//     sidebar: (
//       <RdsCompSideNavigation
//         sideNavItems={[
//           {
//             icon: "home",
//             key: "0",
//             label: "Dashboard",
//             path: "/dashboard",
//           },
//           {
//             icon: "users",
//             key: "1",
//             label: "Users",
//             path: "/users",
//           },
//           {
//             icon: "setting",
//             key: "2",
//             label: "Settings",
//             path: "/settings",
//           },
//         ]}
//       />
//     ),
//   },
// };

//Default story
export const Default: Story = {
  args: {
    displayType: AppShellDisplayType.Default,
    sidebar: (
      <BrowserRouter>
        <RdsCompSideNavigation1
          layout="LeftSideNav"
          lockIconVisible={false}
          logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
          navLayout={NavLayout.Raaghu}
          navType={NavType.Expanded}
          platform={Platform.SideNavigationABPList}
          showUserProfile
          sideNavItems={[
            {
              icon: 'home',
              key: '0',
              label: 'Home',
              path: '/dashboard'
            },
            {
              icon: 'dashboard_meter',
              key: '1',
              label: 'Dashboard'
            },
            {
              icon: 'saas',
              key: '2',
              label: 'Saas',
              path: ''
            },
            {
              icon: 'administration_new',
              key: '3',
              label: 'Administration',
              path: ''
            },
            {
              icon: 'folder',
              key: '4',
              label: 'File Management',
              path: ''
            },
            {
              icon: 'forms',
              key: '5',
              label: 'Payments',
              path: ''
            },
            {
              icon: 'payment_new',
              key: '6',
              label: 'Payments',
              path: ''
            },
            {
              icon: 'cms',
              key: '7',
              label: 'CMS',
              path: ''
            }
          ]}
        />
      </BrowserRouter>
    ),
    topbar: (
      <RdsTopNavigation
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
    children: (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div className="rds-appshell-add-layout-center">
          Add Layout
        </div>
      </div>
    ),
  },
};

//Relaxing Story
export const Relaxing: Story = {
  args: {
    displayType: AppShellDisplayType.TopNav,
    topbar: (
      <div className="fixed-top">
        {/* <RdsTopNavigation
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
          top_nav_logo="custom logo"
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
        /> */}
        <RdsTopNavigation
          brandLogo="assets/Raaghu-logo-mfe-black.png"
          brandName="Raaghu"
          firstName="John"
          icons={[
            {
              id: 'star',
              name: 'star'
            },
            {
              id: 'notification_new',
              name: 'notification_new'
            },
            {
              id: 'help_question_circle',
              name: 'help_question_circle'
            }
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
          
          showLogo
          showSearch
          style="With_Theme_Switcher"
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
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }} >
        {/* Content Row: Sidebar + Add Layout */}
        <div style={{ display: 'flex', flexDirection: 'row', minHeight: 0 ,paddingTop: '50px' }}>
          {/* Sidebar */}
          <div style={{ minWidth: 245, maxWidth: 245, height: '100%' }} >
            <BrowserRouter >
              <RdsCompSideNavigation1
             
                layout="LeftSideNav"
                logoVisible={false}
                lockIconVisible={false}
                logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                navLayout={NavLayout.Raaghu}
                navType={NavType.Expanded}
                platform={Platform.SideNavigationABPList}
                showUserProfile
                sideNavItems={[
                  { icon: 'home', key: '0', label: 'Home', path: '/dashboard' },
                  { icon: 'dashboard_meter', key: '1', label: 'Dashboard' },
                  { icon: 'saas', key: '2', label: 'Saas', path: '' },
                  { icon: 'administration_new', key: '3', label: 'Administration', path: '' },
                  { icon: 'folder', key: '4', label: 'File Management', path: '' },
                  { icon: 'forms', key: '5', label: 'Forms', path: '' },
                  { icon: 'payment_new', key: '6', label: 'Payments', path: '' },
                  { icon: 'cms', key: '7', label: 'CMS', path: '' }
                ]}
              />
            </BrowserRouter>
          </div>
          {/* Add Layout Text */}
          <div className="rds-appshell-add-layout-flex-center">
            <span className="rds-appshell-add-layout-text">Add Layout</span>
          </div>
        </div>
      </div>
    ),
  },
};

//TopNav Story
export const TopNav: Story = {
  args: {
    displayType: AppShellDisplayType.Default,

    topbar: (
      <RdsTopNavigation
        appshell3
        brandLogo="assets/Raaghu-logo-mfe-black.png"
        brandName="Raaghu"        breadcrumItem={[
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
            showIcon: true,
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
            showIcon: true,
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
            showIcon: true,
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
            route: "#",
            showIcon: true,
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
            route: "#",
            showIcon: true,
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
            route: "#",
            showIcon: true,
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
            route: "#",
            showIcon: true,
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
            route: "#",
            showIcon: true,
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
        children: (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div className="rds-appshell-add-layout-center">
          Add Layout
        </div>
      </div>
    ),
  },
};

//Side Nav Story
export const SideNav: Story = {
  args: {
    displayType: AppShellDisplayType.SideNav,
    sidebar: (
      <div
        className="rds-appshell-side-nav-layout d-flex flex-row align-items-stretch w-100"
      >
        {/* Left Side Navigation */}
        <div className="rds-appshell-side-nav-left" style={{ flex: "0 0 245px", minWidth: 245, maxWidth: 245, height: '100%' }}>
          <BrowserRouter>
            <RdsCompSideNavigation1
              lockIconVisible={false}
              sideNavItems={[
                {
                  icon: 'home',
                  key: '0',
                  label: 'Home',
                  path: '/dashboard'
                },
                {
                  icon: 'dashboard_meter',
                  key: '1',
                  label: 'Dashboard'
                },
                {
                  icon: 'saas',
                  key: '2',
                  label: 'Saas',
                  path: ''
                },
                {
                  icon: 'administration_new',
                  key: '3',
                  label: 'Administration',
                  path: ''
                },
                {
                  icon: 'folder',
                  key: '4',
                  label: 'File Management',
                  path: ''
                },
                {
                  icon: 'forms',
                  key: '5',
                  label: 'Forms',
                  path: ''
                },
                {
                  icon: 'payment_new',
                  key: '6',
                  label: 'Payments',
                  path: ''
                },
                {
                  icon: 'cms',
                  key: '7',
                  label: 'CMS',
                  path: ''
                }
              ]}
            />
          </BrowserRouter>
        </div>
        {/* Center Add Layout Text with Default story style */}
        <div className="rds-appshell-add-layout-flex-center">
          <span className="rds-appshell-add-layout-text">Add Layout</span>
        </div>
        {/* Right Side Navigation aligned to end */}
        <div className="rds-appshell-side-nav-right d-flex align-items-end justify-content-end"  style={{ flex: "0 0 80px", minWidth: 80, maxWidth: 120, height: '100%' }}>
          <div style={{ width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }} id="side-nav-icon-list">
            <BrowserRouter>
              <RdsCompSideNavigation1
                layout="RightSideNav"
                logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                navLayout={NavLayout.Toolbar}
                navType={NavType.Collapsed}
                showUserProfile
                sideNavItems={[
                  // { icon: "language", key: "0", label: "Language", path: "" },
                  { icon: "chat", key: "1", label: "Chat", path: "" },
                  { icon: "sun", key: "2", label: "Theme", path: "" },
                  { icon: "grid_layout", key: "3", label: "Layout", path: "" },
                  { icon: "my_settings", key: "4", label: "Settings", path: "" },
                  { icon: "interface_logout", key: "5", label: "Logout", path: "" },
                ]}
              />
            </BrowserRouter>
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
        <RdsTopNavigation
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
      <div className="mt-5 double-nav-sidebar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '7px' }}>
          <BrowserRouter>
            <RdsCompSideNavigation1
              layout="LeftSideNav"
              logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
              navLayout={NavLayout.Raaghu}
              navType={NavType.Collapsed}
              platform={Platform.SideNavigationABPList}
              showUserProfile
              sideNavItems={[
                {
                  icon: 'home',
                  key: '0',
                  label: 'Home',
                  path: '/dashboard'
                },
                {
                  icon: 'dashboard_meter',
                  key: '1',
                  label: 'Dashboard'
                },
                {
                  icon: 'saas',
                  key: '2',
                  label: 'Saas',
                  path: ''
                },
                {
                  icon: 'administration_new',
                  key: '3',
                  label: 'Administration',
                  path: ''
                },
                {
                  icon: 'folder',
                  key: '4',
                  label: 'File Management',
                  path: ''
                },
                {
                  icon: 'forms',
                  key: '5',
                  label: 'Payments',
                  path: ''
                },
                {
                  icon: 'payment_new',
                  key: '6',
                  label: 'Payments',
                  path: ''
                },
                {
                  icon: 'cms',
                  key: '7',
                  label: 'CMS',
                  path: ''
                }
              ]} />
            <RdsCompSideNavigation1
              lockIconVisible={false}
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
              ]} />
          </BrowserRouter>
        </div>
        {/* Add Layout message in the center, full height */}
        <div className="rds-appshell-add-layout-flex-center">
          <span className="rds-appshell-add-layout-text">Add Layout</span>
        </div>
        <div  id="details-pane-app-shell"> 
              <RdsCompDetailsPaneFavouites
                  headerSubText="Agent Information"
                  headerText="Bayshore Transportation System"
                  style="Selection"
            />
        </div>
      </div>
    ),
  },
};

//OneThreeOne Story
export const TriPane : Story = {
  args: {
    displayType: AppShellDisplayType.TopNav,
    topbar: (
      <div className="fixed-top">
        <RdsTopNavigation
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
      <div className="mt-5 tripane-sidebar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
        <div>
          <RdsCompSideNavigation1
    layout="LeftSideNav"
    lockIconVisible={false}
    logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
    navLayout={NavLayout.Raaghu}
    navType={NavType.Expanded}
    platform={Platform.SideNavigationABPList}
    showUserProfile
    sideNavItems={[
      {
        icon: 'home',
        key: '0',
        label: 'Home',
        path: '/dashboard'
      },
      {
        icon: 'dashboard_meter',
        key: '1',
        label: 'Dashboard'
      },
      {
        icon: 'saas',
        key: '2',
        label: 'Saas',
        path: ''
      },
      {
        icon: 'administration_new',
        key: '3',
        label: 'Administration',
        path: ''
      },
      {
        icon: 'folder',
        key: '4',
        label: 'File Management',
        path: ''
      },
      {
        icon: 'forms',
        key: '5',
        label: 'Forms',
        path: ''
      },
      {
        icon: 'payment_new',
        key: '6',
        label: 'Payments',
        path: ''
      },
      {
        icon: 'cms',
        key: '7',
        label: 'CMS',
        path: ''
      }
    ]}
  />

        </div>
        {/* Add Layout message in the center, full height */}
        <div className="rds-appshell-add-layout-flex-center">
          <span className="rds-appshell-add-layout-text">Add Layout</span>
        </div>
        <div id="detail-pane-one-three-one">
          <RdsCompDetailsPaneFavouites style="Toolbar" headerText={""} />
        </div>
      </div>
    ),
  },
};