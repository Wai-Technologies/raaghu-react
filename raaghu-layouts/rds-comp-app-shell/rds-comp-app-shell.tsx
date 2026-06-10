import { ReactNode, useState, isValidElement, cloneElement, type ReactElement } from "react";
import "./rds-comp-app-shell.scss";
import { GetShellLayoutCss } from "./shell-layout";

export interface RdsCompAppShellProps {
  displayType: AppShellDisplayType;
  topbar?: ReactNode;
  sidebar?: ReactNode;
  children?: ReactNode;
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
    
    if (isValidElement(props.topbar)) {
      try {
        const topbarElement = props.topbar as ReactElement<any>;
        if (topbarElement.props && topbarElement.props.children && isValidElement(topbarElement.props.children)) {
          const appBarChild = topbarElement.props.children as ReactElement<any>;
          if (appBarChild.type && (appBarChild.type as any).displayName === 'RdsAppBar') {
            const clonedAppBar = cloneElement(appBarChild, {
              ...appBarChild.props,
              onMenuClick: handleMobileSidebarToggle
            });
            return cloneElement(topbarElement, {
              ...topbarElement.props
            }, clonedAppBar);
          }
        }
      } catch (error) {
        // Topbar clone failed — render without cloning
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
