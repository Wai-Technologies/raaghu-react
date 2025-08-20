import React, { ReactNode, useState } from "react";
import "./rds-comp-app-shell.scss";
import { BrowserRouter, Outlet } from "react-router-dom";
import RdsAppBar from "../../raaghu-elements/rds-app-bar/rds-app-bar";
import rdsSidebar from "../../raaghu-elements/rds-sidebar/rds-sidebar";
import { GetShellLayoutCss } from "./shell-layout";

export interface RdsCompAppShellProps {
  displayType: AppShellDisplayType;
  topbar?: ReactNode;
  sidebar?: ReactNode;
  children?: React.ReactNode;
}
 
export enum AppShellDisplayType {
  Basic = "Basic",
  Header = "Header",
  Default = "Default",
  Relaxing = "Relaxing",
  TopNav = "Top Nav",
  SideNav = "Side Nav",
  DoubleNav = "Double Nav",
  TriPane = "TriPane"
}
 
const RdsCompAppShell = (props: RdsCompAppShellProps) => {
  return (
    <>
      <div className={GetShellLayoutCss(props.displayType)}>
        <div className="sidebar-layout">
          {props.sidebar}
        </div>
        <div className="topnav-layout">
          {props.topbar}
          {props.children}
        </div>
      </div>
    </>
  );
};
RdsCompAppShell.displayName = 'RdsCompAppShell';
export default RdsCompAppShell;
