import React, { ReactNode, useState } from "react";
import "./rds-comp-app-shell.scss";
import { GetShellLayoutCss } from "./shell-layout";

export interface RdsCompAppShellProps {
  displayType: AppShellDisplayType;
  topbar?: ReactNode;
  sidebar?: ReactNode;
  children?: React.ReactNode;
  mobileSidebarOpen?: boolean;
  onMobileSidebarToggle?: () => void;
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
  const [internalMobileSidebarOpen, setInternalMobileSidebarOpen] = useState(false);
  
  const mobileSidebarOpen = props.mobileSidebarOpen ?? internalMobileSidebarOpen;
  const handleMobileSidebarToggle = props.onMobileSidebarToggle ?? (() => setInternalMobileSidebarOpen(!internalMobileSidebarOpen));
  
  const renderTopbar = () => {
    if (!props.topbar) return null;
    
    // If topbar is a React element and has RdsAppBar as a child, try to clone it with mobile props
    if (React.isValidElement(props.topbar)) {
      try {
        const topbarElement = props.topbar as React.ReactElement<any>;
        // Check if it's a div containing RdsAppBar
        if (topbarElement.props && topbarElement.props.children && React.isValidElement(topbarElement.props.children)) {
          const appBarChild = topbarElement.props.children as React.ReactElement<any>;
          if (appBarChild.type && (appBarChild.type as any).displayName === 'RdsAppBar') {
            const clonedAppBar = React.cloneElement(appBarChild, {
              ...appBarChild.props,
              onMenuClick: handleMobileSidebarToggle
            });
            return React.cloneElement(topbarElement, {
              ...topbarElement.props
            }, clonedAppBar);
          }
        }
      } catch (error) {
        console.warn('Could not clone topbar element:', error);
      }
    }
    
    return props.topbar;
  };
  
  return (
    <>
      <div className={`${GetShellLayoutCss(props.displayType)} ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
        <div className="sidebar-layout">
          {props.sidebar}
        </div>
        <div className="topnav-layout">
          {renderTopbar()}
          {props.children}
        </div>
        {mobileSidebarOpen && <div className="mobile-sidebar-backdrop" onClick={handleMobileSidebarToggle} />}
      </div>
    </>
  );
};
RdsCompAppShell.displayName = 'RdsCompAppShell';
export default RdsCompAppShell;
