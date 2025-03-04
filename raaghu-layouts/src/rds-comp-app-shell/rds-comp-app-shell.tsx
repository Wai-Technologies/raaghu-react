import React, { ReactNode, useState } from "react";
import "./rds-comp-app-shell.css";
import { BrowserRouter, Outlet } from "react-router-dom";
import RdsCompTopNavigation from "../../../raaghu-components/src/rds-comp-top-navigation";
import RdsSideNav from "../../../raaghu-elements/src/rds-side-nav";
import { NavLayout, NavType, Platform } from "../../../raaghu-elements/src/rds-side-nav/rds-side-nav";
export * from "../../../raaghu-elements/src/index";
export * from "../../../raaghu-components/src/index";
export interface RdsCompAppShellProps {
  displayType: AppShellDisplayType;
  children?: ReactNode;
}

export enum AppShellDisplayType {
  Basic="Basic",
  Header="Header",
  Default = "Default",
  Relaxing = "Relaxing",
  TopNav = "Top Nav",
  SideNav = "Side Nav",
  DoubleNav = "Double Nav",
  OneThreeOne = "1-3-1"
}


const RdsCompAppShell = (props: RdsCompAppShellProps) => {
  const navbarItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" }
  ];

  const notification = [
    {
      status: "success",
      title: "Tenant added",
      urlTitle: "hello",
      time: "a month ago",
      state: 1,
      userNotificationId: 0,
      selected: false,
    },

    {
      status: "error",
      title: "Tenant deleted",
      urlTitle: "hello",
      time: "a month ago",
      state: 1,
      userNotificationId: 1,
      selected: false,
    },

    {
      status: "warn",
      title: "Tenant added  warn",
      urlTitle: "hello",
      time: "a month ago",
      state: 1,
      userNotificationId: 2,
      selected: false,
    },

    {
      status: "info",
      title: "Tenant deleted info",
      urlTitle: "hello",
      time: "a month ago",
      state: 1,
      userNotificationId: 3,
      selected: false,
    },
  ];

  const language = [
    {
      label: "EN(US)",
      val: "en",
      icon: "us",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "English(IND)",
      val: "en",
      icon: "in",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "French",
      val: "fr",
      icon: "us",
      iconWidth: "20px",
      iconHeight: "20px",
    },
  ];

  const themeItems = [
    {
      label: "Light",
      val: "light",
      icon: "sun",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "Dark",
      val: "dark",
      icon: "moon",
      iconWidth: "20px",
      iconHeight: "20px",
    }
  ];

  return (
    <>

      <div className={props.displayType?.toString()}>
        <div className="sidebar-layout">
          <RdsSideNav
            layout="LeftSideNav"
            logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
            navLayout={NavLayout.Raaghu}
            navType={NavType.Fixed}
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
                icon: 'dashboard',
                key: '1',
                label: 'Dashboard'
              },
              {
                icon: 'tenant',
                key: '2',
                label: 'Saas',
                path: ''
              },
              {
                icon: 'administration',
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
                icon: 'payment',
                key: '5',
                label: 'Payments',
                path: ''
              },
              {
                icon: 'cms',
                key: '6',
                label: 'CMS',
                path: ''
              }
            ]}
          />


        </div>

        <div className="topnav-layout">
          <RdsCompTopNavigation navbarTitle="Home"
            navbarSubTitle="Statistics and reports"
            brandName="Raaghu"
            brandLogo="assets/Raaghu-logo-mfe-black.png"
            profileTitle="John Doe"
            profileEmail="john.doe@raaghu.io"
            profileName="John Doe"
            logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
            notifications={notification}
            languageItems={language}
            icons={true}
            showLogo={false}
            role="Admin"
            style="ABP" themeItems={themeItems} toggleItems={[]} elementList={[]} componentsList={[]} languageLabel={""} themeLabel={""} onForgotPassword={function (isForgotPasswordClicked?: boolean): void {

            }} onProfileLinkTopNav={function (id: string, navigateTo?: string, label?: string): void {

            }} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RdsCompAppShell;
