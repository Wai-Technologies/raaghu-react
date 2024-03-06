import React from "react";
import { RdsSideNav } from "../rds-elements";
export interface RdsCompSideNavigationProps {
  sideNavItems: any[];
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  toggleClass?: any;
  collapse?: any;
}

const RdsCompSideNavigation = (props: RdsCompSideNavigationProps) => {
  return <RdsSideNav sideNavItems={props.sideNavItems} toggleTheme={props.toggleTheme} collapse={props.collapse} toggleClass={props.toggleClass}></RdsSideNav>;
};

export default RdsCompSideNavigation;
