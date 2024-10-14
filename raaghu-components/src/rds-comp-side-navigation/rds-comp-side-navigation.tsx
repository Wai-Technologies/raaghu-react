import React from "react";
import { RdsSideNav } from "../rds-elements";
export interface RdsCompSideNavigationProps {
  sideNavItems: any[];
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  toggleClass?: any;
  collapse?: any;
  layoutType?: string; // Add layoutType prop
  brandLogo?: string; 
}

const RdsCompSideNavigation = (props: RdsCompSideNavigationProps) => {
  return <RdsSideNav sideNavItems={props.sideNavItems} toggleTheme={props.toggleTheme} collapse={props.collapse} toggleClass={props.toggleClass} layoutType={props.layoutType} brandLogo={props.brandLogo} // Pass layoutType prop
/>;
};

export default RdsCompSideNavigation;
