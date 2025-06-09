import React, { ReactNode } from "react";
import "./rds-comp-app-shell.css";
import { Outlet } from "react-router-dom";
export * from "../../../raaghu-elements/src/index";
export * from "../../../raaghu-components/src/index";
export interface RdsCompAppShellProps {
  displayType: AppShellDisplayType;
  topbar?: ReactNode;
  sidebar?: ReactNode;
  children?: React.ReactNode; // Allow children as main content
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
          {props.children}
        </div>
      </div>
    </>
  );
};
 
export default RdsCompAppShell;