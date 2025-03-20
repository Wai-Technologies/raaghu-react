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
  topbar?: ReactNode;
  sidebar?: ReactNode;
}

export enum AppShellDisplayType {
  Basic = "Basic",
  Header = "Header",
  Default = "Default",
  Relaxing = "Relaxing",
  TopNav = "Top Nav",
  SideNav = "Side Nav",
  DoubleNav = "Double Nav",
  OneThreeOne = "1-3-1"
}


const RdsCompAppShell = (props: RdsCompAppShellProps) => {

  return (
    <>

      <div className={props.displayType?.toString()}>
        <div className="sidebar-layout">
          {props.sidebar}
        </div>

        <div className="topnav-layout">
          {props.topbar}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RdsCompAppShell;
