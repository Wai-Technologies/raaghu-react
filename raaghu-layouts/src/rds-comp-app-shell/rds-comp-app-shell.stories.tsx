import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompAppShell from "./rds-comp-app-shell";
import RdsCompAppShellItem from "./rds-comp-app-shell-item";
import { BrowserRouter, HashRouter } from "react-router-dom";
import RdsCompSideNavigation from "../../../raaghu-components/src/rds-comp-side-navigation";
import RdsCompTopNavigation from "../../../raaghu-components/src/rds-comp-top-navigation/rds-comp-top-navigation";
import { RdsDropdown, RdsIcon } from "../../../raaghu-elements/src";

const meta: Meta = {
  title: "Application Shells",
  component: RdsCompAppShell,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompAppShell>;

export default meta;
type Story = StoryObj<typeof RdsCompAppShell>;

export const Basic: Story = {
  args: {
    displayType: "Basic",
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="row">
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
              <div className="align-items-center bg-body-secondary d-flex justify-content-center w-100 m-3">
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
    displayType: "Header",
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

                      <div className="align-items-center d-flex ms-auto">
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
                          displayType="dropdown"
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
                          size="small" darkDropdown={false} />
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
                          displayType="dropdown"
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

        <div className=" align-items-center bg-body-secondary d-flex justify-content-center m-3 app-shell-header-layout">
          <h2 className="fw-bolder">Add Layout Here</h2>
        </div>
      </>
    ),
  },
} satisfies Story;
