import React from 'react';
import RdsSideNav from '../../../raaghu-elements/src/rds-side-nav/rds-side-nav';

export interface SideNavItem {
  key: string;
  label: string;
  icon: string;
  path?: string;
  children?: SideNavItem[];
}

export interface RdsCompSideNavigationProps {
  sideNavItems: SideNavItem[];
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  toggleClass?: any;
  collapse?: boolean;
  logo?: string;
  lockIconVisible?: boolean;
}

const RdsCompSideNavigation = (props: RdsCompSideNavigationProps) => {
  return (
    <RdsSideNav
      logo={props.logo}
      sideNavItems={props.sideNavItems}
      toggleTheme={props.toggleTheme}
      collapse={props.collapse ?? false} // Default to false if not provided
      toggleClass={props.toggleClass}
      lockIconVisible={props.lockIconVisible ?? true} // Default to true if not provided
    />
  );
};

export default RdsCompSideNavigation;