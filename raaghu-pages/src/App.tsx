import RdsCompAppShell from "../../raaghu-layouts/src/rds-comp-app-shell";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AppShellDisplayType,
  RdsCompSideNavigation,
  RdsCompTopNavigation,
} from "../../raaghu-layouts/src/rds-comp-app-shell/rds-comp-app-shell";

export * from "../../raaghu-elements/src/index";
export * from "../../raaghu-components/src/index";
export * from "../../raaghu-layouts/src/index";

import "../../raaghu-react-themes/build/styles/default.css";

function App() {
  return (
    <div className={"theme-light"}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RdsCompAppShell
                displayType={AppShellDisplayType.Default}
                sidebar={
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
                }
                topbar={
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
                        title: "Tenant added warn",
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
                    onForgotPassword={() => {}}
                    onProfileLinkTopNav={() => {}}
                    profileEmail="john.doe@raaghu.io"
                    profileName="John Doe"
                    profileTitle="John Doe"
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
                    ]}
                    themeLabel=""
                    toggleItems={[]}
                    elementList={[]}
                    componentsList={[]}
                    languageLabel={""}
                  />
                }
              />
            }
          >
            <Route index element={<h1>Home </h1>} /> {/* Default page */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
