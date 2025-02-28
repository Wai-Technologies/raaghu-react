import React from "react";
import { RdsSideNav } from "../rds-elements";
export interface RdsCompSideNavigationProps {
  sideNavItems: any[];
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  toggleClass?: any;
  collapse?: any;
  logo?: string;
}

const RdsCompSideNavigation = (props: RdsCompSideNavigationProps) => {
  return <RdsSideNav  logo={props.logo} sideNavItems={props.sideNavItems} toggleTheme={props.toggleTheme} collapse={props.collapse} toggleClass={props.toggleClass}></RdsSideNav>;
};

export default RdsCompSideNavigation;
