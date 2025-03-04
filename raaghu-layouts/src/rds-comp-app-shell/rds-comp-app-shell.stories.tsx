import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompAppShell, { AppShellDisplayType } from "./rds-comp-app-shell";
import RdsCompAppShellItem from "./rds-comp-app-shell-item";
import { BrowserRouter, HashRouter } from "react-router-dom";
import RdsCompSideNavigation from "../../../raaghu-components/src/rds-comp-side-navigation";
import RdsCompTopNavigation from "../../../raaghu-components/src/rds-comp-top-navigation/rds-comp-top-navigation";
import { RdsDropdown, RdsIcon, RdsInput, RdsSearch, RdsSideNav } from "../../../raaghu-elements/src";
import { DisplayType } from "../../../raaghu-elements/src/rds-dropdown/rds-dropdown";

const meta: Meta = {
  title: "Application Shells",
  component: RdsCompAppShell,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompAppShell>;

const toggleDropdown = () => {
  console.log('Dropdown clicked');
};

export default meta;
type Story = StoryObj<typeof RdsCompAppShell>;

export const Basic: Story = {
  args: {
    displayType: AppShellDisplayType.Basic,
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="row navbar-margin">
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
              ]} toggleItems={[]} elementList={[]} componentsList={[]} languageLabel={""} themeLabel={""} onForgotPassword={function (isForgotPasswordClicked?: boolean | undefined): void {
                throw new Error("Function not implemented.");
              }} onProfileLinkTopNav={function (id: string, navigateTo?: string | undefined, label?: string | undefined): void {
                throw new Error("Function not implemented.");
              }} />
          </div>
          <div className="row">
            <div className="d-flex">
              <div>
                <BrowserRouter>
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
                </BrowserRouter>
              </div>
              <div className="align-items-center bg-body-secondary d-flex justify-content-center w-100 app-shell-layout m-3">
                <h2 className="fw-bolder">Add Layout Here</h2>
              </div>
            </div>
          </div>
        </RdsCompAppShellItem>
      </>
    ),
  },
} satisfies Story;

export const Header: Story = {
  args: {
    displayType: AppShellDisplayType.Header,
    children: (
      <>
        <div className="container-fluid bg-white px-0">
          <div>
            <nav
              className={
                "navbar shadow d-block"
              }
            >
              <div>
                <div>
                  {/* mobile top nav */}

                  <div className="d-md-none d-block">
                    <button
                      className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-none border-0 btn-sm"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex justify-content-between">
                      <div
                        id="raaghuLogo"
                        className=""
                      >
                        <img
                          className="cursor-pointer tenant-sidenav-logo"
                          src="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
                          alt="logo"
                          height="35px"
                        ></img>
                      </div>

                      <div className="align-items-center d-flex ms-auto mx-3">
                        <div className="px-2 px-md-3">
                        <img
                          src="./assets/profile-picture-circle.svg"
                          alt={"profilePic"}
                          width="30px"
                          height="30px"
                          className="profil_image_Class rounded-circle"
                          data-testid="avatar"
                          style={{ height: '-webkit-fill-available' }}
                        ></img>
                        <RdsDropdown
                          colorVariant="white"
                          displayType= {DisplayType.Dropdown}
                          id="1"
                          label="Hi, John Doe"
                          listItems={[
                            {
                              id: '1',
                              label: 'My Account',
                              path: ''
                            },
                            {
                              id: '2',
                              label: 'Logout',
                              path: ''
                            },
                          ]}
                          size="mid" darkDropdown={false} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* end */}

                  <div className="d-md-flex d-grid align-items-center justify-content-md-between right-side-menu tenant-sm-nav">
                    <div className="position-relative px-2 px-lg-3 d-md-flex d-block justify-content-center align-items-center text-center">
                      <div
                        id="raaghuLogo"
                        className="d-xxl-block d-xl-block d-lg-block d-md-block d-none"

                      >
                        <img
                          className="cursor-pointer tenant-sidenav-logo"
                          src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                          alt="logo"
                          height="35px"
                        ></img>
                      </div>
                      <div className="ps-lg-4 d-flex pe-md-0 px-4 justify-content-between gap-4 ms-lg-4 top-link">
                        <div className="m-lg-2 cursor-pointer fw-semibold">
                          <a
                            href="https://react.raaghu.ai"
                            target="_blank"
                            className="text-black"
                          >
                            <span className="d-md-block d-none">Storybook</span>
                            <span className="d-md-none b-block">
                              <RdsIcon
                                colorVariant="dark"
                                height="20px"
                                name="code"
                                stroke
                                width="20px"
                              />
                            </span>
                          </a>
                        </div>
                        <div className="m-lg-2 cursor-pointer fw-semibold">
                          <a
                            href="https://docs.raaghu.ai"
                            target="_blank"
                            className="text-black"
                          >
                            <span className="d-md-block d-none">Documentation</span>
                            <span className="d-md-none b-block">
                              <RdsIcon
                                colorVariant="dark"
                                height="20px"
                                name="file_data"
                                stroke
                                width="20px"
                              />
                            </span>
                          </a>
                        </div>
                        <div className="m-lg-2 cursor-pointer fw-semibold"
                        >
                          <a href="#" className="text-black">
                            <span className="d-md-block d-none">Download Project</span>
                            <span className="d-md-none b-block">
                              <RdsIcon
                                colorVariant="dark"
                                height="20px"
                                name="download_data"
                                stroke
                                width="20px"
                              />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="align-items-center d-flex ms-auto d-none d-md-block">
                      <div className="px-2 px-md-3 d-none d-md-block ">

                        <img
                          src="./assets/profile-picture-circle.svg"
                          alt={"profilePic"}
                          width="30px"
                          height="30px"
                          className="profil_image_Class rounded-circle"
                          data-testid="avatar"
                          style={{ height: '-webkit-fill-available' }}
                        ></img>
                        <RdsDropdown
                          colorVariant="white"
                          displayType= {DisplayType.Dropdown}
                          id="1"
                          label="Hi, John Doe"
                          listItems={[
                            {
                              id: '1',
                              label: 'My Account',
                              path: ''
                            },
                            {
                              id: '2',
                              label: 'Logout',
                              path: ''
                            },
                          ]}
                          size="mid" darkDropdown={false} />

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className=" align-items-center  d-flex justify-content-center m-3 app-shell-layout">
          {/* <h2 className="fw-bolder">Add Layout Here</h2> */}
        </div>
      </>
    ),
  },
} satisfies Story;

export const Default: Story = {
  args: {
    displayType: AppShellDisplayType.Default,
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="d-flex flex-column vh-50">
            <BrowserRouter>
              <div className="d-flex flex-row">
                <RdsCompSideNavigation
                  sideNavItems={[
                    { icon: "home", key: "0", label: "Home", path: "/home" },
                    { icon: "dashboard_new", key: "1", label: "Dashboard", path: "/dashboard" },
                    { icon: "saas", key: "2", label: "Saas", path: "/saas" },
                    { icon: "administration", key: "3", label: "Administration", path: "/administration" },
                    { icon: "file_management", key: "4", label: "File Management", path: "/file_management" },
                    { icon: "forms", key: "5", label: "Forms", path: "/forms" },
                    { icon: "payment", key: "6", label: "Payment", path: "/payment" },
                    { icon: "cms", key: "7", label: "CMS", path: "/cms" },
                  ]}
                />
                <div className="w-100">
                  <RdsCompTopNavigation
                    brandLogo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                    brandName="Raaghu Design System"
                    languageItems={[
                      { icon: "us", iconHeight: "20px", iconWidth: "20px", label: "EN(US)", val: "en" },
                      { icon: "in", iconHeight: "20px", iconWidth: "20px", label: "English(IND)", val: "en" },
                      { icon: "us", iconHeight: "20px", iconWidth: "20px", label: "French", val: "fr" },
                    ]}
                    logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
                    navbarSubTitle="Statistics and reports"
                    navbarTitle="Dashboard"
                    notifications={[
                      { selected: false, state: 1, status: "success", time: "a month ago", title: "Tenant added", urlTitle: "hello", userNotificationId: 0 },
                      { selected: false, state: 1, status: "error", time: "a month ago", title: "Tenant deleted", urlTitle: "hello", userNotificationId: 1 },
                      { selected: false, state: 1, status: "warn", time: "a month ago", title: "Tenant added warn", urlTitle: "hello", userNotificationId: 2 },
                      { selected: false, state: 1, status: "info", time: "a month ago", title: "Tenant deleted info", urlTitle: "hello", userNotificationId: 3 },
                    ]}
                    profileTitle="Jane Doe"
                    profileEmail="jane.doe@raaghu.io"
                    profileName="Jane Doe"
                    profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                    themeItems={[
                      { icon: "sun", iconHeight: "20px", iconWidth: "20px", label: "Light", val: "light" },
                      { icon: "moon", iconHeight: "20px", iconWidth: "20px", label: "Dark", val: "dark" },
                    ]}
                    toggleItems={[]}
                    elementList={[]}
                    componentsList={[]}
                    languageLabel={""}
                    themeLabel={""}
                    onForgotPassword={() => { throw new Error("Function not implemented."); }}
                    onProfileLinkTopNav={() => { throw new Error("Function not implemented."); }}
                  />
                </div>
              </div>
            </BrowserRouter>
          </div>
        </RdsCompAppShellItem>
      </>
    ),
  },
} satisfies Story;

export const Relaxing: Story = {
  args: {
    displayType: AppShellDisplayType.Relaxing,
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="row">
          <RdsCompTopNavigation
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
              role="Admin"
              showLogo
              showSearch
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
                }
              ]}
              top_nav_logo="raaghu logo" toggleItems={[]} elementList={[]} componentsList={[]} languageLabel={""} themeLabel={""} onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
                throw new Error("Function not implemented.");
              } } onProfileLinkTopNav={function (id: string, navigateTo?: string, label?: string): void {
                throw new Error("Function not implemented.");
              } }/>
          </div>

          <div className="row">
            <div className="d-flex relaxing-nav pt-2">
              <div>
                <BrowserRouter>
                  <RdsCompSideNavigation
                    sideNavItems={[
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
                        icon: "saas",
                        key: "2",
                        label: "Saas",
                        path: "/saas",
                      },
                      {
                        icon: "administration",
                        key: "3",
                        label: "Administration",
                        path: "/administration",
                      },
                      {
                        icon: "file_management",
                        key: "4",
                        label: "File Management",
                        path: "/file_management",
                      },
                      {
                        icon: "forms",
                        key: "5",
                        label: "Forms",
                        path: "/forms",
                      },
                      {
                        icon: "payment",
                        key: "6",
                        label: "Payment",
                        path: "/payment",
                      },
                      {
                        icon: "cms",
                        key: "7",
                        label: "CMS",
                        path: "/cms",
                      },
                    ]}
                  />
                </BrowserRouter>
              </div>
              <div className="align-items-center  d-flex justify-content-center w-100 app-shell-layout m-3">
                {/* <h2 className="fw-bolder">Add Layout Here</h2> */}
              </div>
            </div>
          </div>
        </RdsCompAppShellItem>
      </>
    ),
  },
} satisfies Story;

export const TopNavBar: Story = {
  args: {
    displayType: AppShellDisplayType.TopNav,
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="row">
          <RdsCompTopNavigation
              appshell3
              brandLogo="assets/Raaghu-logo-mfe-black.png"
              brandName="Raaghu"
              breadcrumItem={[
                {
                  active: true,
                  disabled: false,
                  icon: 'home',
                  iconColor: 'primary',
                  iconFill: false,
                  iconHeight: '15px',
                  iconWidth: '15px',
                  iconstroke: true,
                  id: 0,
                  label: 'Home',
                  route: '#'
                },
                {
                  active: false,
                  disabled: false,
                  icon: 'dashboard_new',
                  iconColor: 'primary',
                  iconFill: false,
                  iconHeight: '15px',
                  iconWidth: '15px',
                  iconstroke: true,
                  id: 1,
                  label: 'Dashboard',
                  route: '#'
                },
                {
                  active: false,
                  disabled: false,
                  icon: 'saas',
                  iconColor: 'primary',
                  iconFill: false,
                  iconHeight: '15px',
                  iconWidth: '15px',
                  iconstroke: true,
                  id: 2,
                  label: 'Saas',
                  route: '#'
                },
                {
                  active: false,
                  disabled: true,
                  icon: 'administration',
                  iconColor: 'primary',
                  iconFill: false,
                  iconHeight: '15px',
                  iconWidth: '15px',
                  iconstroke: true,
                  id: 3,
                  label: 'Administration',
                  route: '#'
                },
                {
                  active: false,
                  disabled: true,
                  icon: 'file_management',
                  iconColor: 'primary',
                  iconFill: false,
                  iconHeight: '14px',
                  iconWidth: '14px',
                  iconstroke: true,
                  id: 4,
                  label: 'File Management',
                  route: '#'
                },
                {
                  active: false,
                  disabled: true,
                  icon: 'forms',
                  iconColor: 'primary',
                  iconFill: false,
                  iconHeight: '14px',
                  iconWidth: '14px',
                  iconstroke: true,
                  id: 5,
                  label: 'Forms',
                  route: '#'
                },
                {
                  active: false,
                  disabled: true,
                  icon: 'payment',
                  iconColor: 'primary',
                  iconFill: false,
                  iconHeight: '14px',
                  iconWidth: '14px',
                  iconstroke: true,
                  id: 6,
                  label: 'Payment',
                  route: '#'
                },
                {
                  active: false,
                  disabled: true,
                  icon: 'cms',
                  iconColor: 'primary',
                  iconFill: false,
                  iconHeight: '14px',
                  iconWidth: '14px',
                  iconstroke: true,
                  id: 7,
                  label: 'CMS',
                  route: '#'
                }
              ]}
              firstName="John"
              lastName="Doe"
              listItems={[
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
              navbarTitle="Dashboard"
              profileEmail="john.doe@raaghu.io"
              profileName="John Doe"
              profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
              profileTitle="John Doe"
              role="Admin"
              showLogo
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
                }
              ]}
              top_nav_logo="raaghu logo" toggleItems={[]} elementList={[]} componentsList={[]} languageLabel={""} themeLabel={""} onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
                throw new Error("Function not implemented.");
              } } onProfileLinkTopNav={function (id: string, navigateTo?: string, label?: string): void {
                throw new Error("Function not implemented.");
              } }/>
          </div>

          <div className="row">
            <div className="d-flex">
              <div>
                <BrowserRouter>            
                </BrowserRouter>
              </div>
              <div className="align-items-center d-flex justify-content-center w-100 app-shell-layout m-3">
                {/* <h2 className="fw-bolder">Add Layout Here</h2> */}
              </div>
            </div>
          </div>
        </RdsCompAppShellItem>
      </>
    ),
  },
} satisfies Story;

export const SideNav: Story = {
  args: {
    displayType: AppShellDisplayType.SideNav,
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="row">
            <div className="d-flex">
              <div>
                <BrowserRouter>
                  <RdsCompSideNavigation
                    sideNavItems={[
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
                        icon: "saas",
                        key: "2",
                        label: "Saas",
                        path: "/saas",
                      },
                      {
                        icon: "administration",
                        key: "3",
                        label: "Administration",
                        path: "/administration",
                      },
                      {
                        icon: "file_management",
                        key: "4",
                        label: "File Management",
                        path: "/file_management",
                      },
                      {
                        icon: "forms",
                        key: "5",
                        label: "Forms",
                        path: "/forms",
                      },
                      {
                        icon: "payment",
                        key: "6",
                        label: "Payment",
                        path: "/payment",
                      },
                      {
                        icon: "cms",
                        key: "7",
                        label: "CMS",
                        path: "/cms",
                      },
                    ]}
                  />
                </BrowserRouter>
              </div>
              <div className="align-items-center  d-flex justify-content-center w-100 app-shell-layout m-3">
                {/* <h2 className="fw-bolder">Add Layout Here</h2> */}
              </div>
              <BrowserRouter>
                <RdsSideNav
                  layout="RightSideNav"
                  logo=""
                  showUserProfile
                  sideNavItems={[
                    {
                      icon: 'language',
                      key: 'a',
                      label: 'Language',
                      path: ''
                    },
                    {
                      icon: 'chat',
                      key: 'b',
                      label: 'Chat',
                      path: ''
                    }, 
                    {
                      icon: 'sun',
                      key: 'c',
                      label: 'Mode',
                      path: ''
                    },
                    {
                      icon: 'grid_Layout',
                      key: 'd',
                      label: 'Mode',
                      path: '',
                    },
                    {
                      icon: 'my_Settings',
                      key: 'e',
                      label: 'Mode',
                      path: ''
                    },
                    {
                      icon: 'interface_logout',
                      key: 'f',
                      label: 'Mode',
                      path: ''
                    }
                  ]}
                />
              </BrowserRouter>
            </div>
          </div>
        </RdsCompAppShellItem>
      </>
    ),
  },
} satisfies Story;

export const DoubleNav: Story = {
  args: {
    displayType: AppShellDisplayType.DoubleNav,
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="row">
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
                }
              ]}
              top_nav_logo="raaghu logo" toggleItems={[]} elementList={[]} componentsList={[]} languageLabel={""} themeLabel={""} onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
                throw new Error("Function not implemented.");
              } } onProfileLinkTopNav={function (id: string, navigateTo?: string, label?: string): void {
                throw new Error("Function not implemented.");
              } }/>
          </div>

          <div className="row">
              <div className="d-flex  pt-2">
                <RdsSideNav
                  layout="RightSideNav"
                  sideNavItems={[
                    { icon: 'home', key: '1', label: 'Chat', path: '' },
                    { icon: 'dashboard_new', key: '2', label: 'Language', path: '' },
                    { icon: 'saas', key: '3', label: 'Mode', path: '' },
                    { icon: 'administration', key: '4', label: 'Mode', path: '' },
                    { icon: 'file_management', key: '5', label: 'Mode', path: '' },
                    { icon: 'forms', key: '6', label: 'Mode', path: '' },
                    { icon: 'payment', key: '7', label: 'Mode', path: '' },
                    { icon: 'cms', key: '8', label: 'Mode', path: '' }
                  ]}
                />

                <div className="double-nav">
                <RdsCompSideNavigation
                  sideNavItems={[
                    { icon: "blogs", key: "0", label: "Blogs", path: "/dashboard" },
                    { icon: "blog_posts", key: "1", label: "Blog Posts", path: "/demo-ui" },
                    { icon: "comments", key: "2", label: "Comments", path: "/icons" },
                    { icon: "globe", key: "3", label: "Global Resources", path: "/icons" },
                    { icon: "my_Settings", key: "4", label: "Menus", path: "/icons" },
                    { icon: "newsletters", key: "5", label: "Newsletters", path: "/icons" },
                    { icon: "pages", key: "6", label: "Pages", path: "/icons" },
                    { icon: "tag", key: "7", label: "Tags", path: "/icons" },
                  ]}
                />
              </div>
              </div>
          </div>
        </RdsCompAppShellItem>
      </>
    ),
  },
} satisfies Story;

export const One_Three_One: Story = {
  args: {
    displayType: AppShellDisplayType.OneThreeOne,
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="row">
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
                }
              ]}
              top_nav_logo="raaghu logo" toggleItems={[]} elementList={[]} componentsList={[]} languageLabel={""} themeLabel={""} onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
                throw new Error("Function not implemented.");
              } } onProfileLinkTopNav={function (id: string, navigateTo?: string, label?: string): void {
                throw new Error("Function not implemented.");
              } }/>
          </div>
          <div className="row">
            <div className="d-flex DEmo">
              <div>
                <BrowserRouter>
                  <RdsCompSideNavigation
                     sideNavItems={[
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
                        icon: "saas",
                        key: "2",
                        label: "Saas",
                        path: "/saas",
                      },
                      {
                        icon: "administration",
                        key: "3",
                        label: "Administration",
                        path: "/administration",
                      },
                      {
                        icon: "file_management",
                        key: "4",
                        label: "File Management",
                        path: "/file_management",
                      },
                      {
                        icon: "forms",
                        key: "5",
                        label: "Forms",
                        path: "/forms",
                      },
                      {
                        icon: "payment",
                        key: "6",
                        label: "Payment",
                        path: "/payment",
                      },
                      {
                        icon: "cms",
                        key: "7",
                        label: "CMS",
                        path: "/cms",
                      },
                    ]}
                  />
                </BrowserRouter>
              </div>
              <div className="align-items-center  d-flex justify-content-center w-100 app-shell-layout m-3">
                {/* <h2 className="fw-bolder">Add Layout Here</h2> */}
              </div>
            </div>
          </div>
        </RdsCompAppShellItem>
      </>
    ),
  },
} satisfies Story;
