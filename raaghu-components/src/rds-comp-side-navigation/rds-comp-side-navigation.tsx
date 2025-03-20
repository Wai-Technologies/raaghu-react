import React from "react";
import { RdsSideNav } from "../rds-elements";

export interface sideNavItems {
  key: string;
  label: string;
  icon: string;
  path?: string;
  children?: sideNavItems[];
}
export interface RdsCompSideNavigationProps {
  sideNavItems: sideNavItems[];
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  toggleClass?: any;
  collapse?: any;
  logo?: string;
}

const RdsCompSideNavigation = (props: RdsCompSideNavigationProps) => {
  return <RdsSideNav logo={props.logo} sideNavItems={props.sideNavItems} toggleTheme={props.toggleTheme} collapse={props.collapse} toggleClass={props.toggleClass}></RdsSideNav>;
};

export default RdsCompSideNavigation;
