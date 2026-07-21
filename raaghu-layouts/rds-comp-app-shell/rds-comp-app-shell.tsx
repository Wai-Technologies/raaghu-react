import { ReactNode, ReactElement, useState, isValidElement, cloneElement } from "react";
import "./rds-comp-app-shell.scss";
import { AppShellDisplayType } from "./shell-types";
export { AppShellDisplayType };
import { GetShellLayoutCss } from "./shell-layout";

export interface RdsCompAppShellProps {
  displayType: AppShellDisplayType;
  topbar?: ReactNode;
  sidebar?: ReactNode;
  children?: ReactNode;
  mobileSidebarOpen?: boolean;
  onMobileSidebarToggle?: () => void;
}

interface TopbarSlotProps {
  topbar: ReactNode;
  onMenuClick: () => void;
}

const TopbarSlot = ({ topbar, onMenuClick }: TopbarSlotProps) => {
  if (!topbar) return null;

  if (isValidElement(topbar)) {
    try {
      const topbarElement = topbar as ReactElement<any>;
      if (topbarElement.props && topbarElement.props.children && isValidElement(topbarElement.props.children)) {
        const appBarChild = topbarElement.props.children as ReactElement<any>;
        if (appBarChild.type && (appBarChild.type as any).displayName === 'RdsAppBar') {
          const clonedAppBar = cloneElement(appBarChild, {
            ...appBarChild.props,
            onMenuClick
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

  return <>{topbar}</>;
};
TopbarSlot.displayName = 'TopbarSlot';

const RdsCompAppShell = (props: RdsCompAppShellProps) => {
  const [internalMobileSidebarOpen, setInternalMobileSidebarOpen] = useState(false);
  
  const mobileSidebarOpen = props.mobileSidebarOpen ?? internalMobileSidebarOpen;
  const handleMobileSidebarToggle = props.onMobileSidebarToggle ?? (() => setInternalMobileSidebarOpen(!internalMobileSidebarOpen));

  return (
    <>
      <div className={`${GetShellLayoutCss(props.displayType)} ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
        <div className="sidebar-layout">
          {props.sidebar}
        </div>
        <div className="topnav-layout">
          <TopbarSlot topbar={props.topbar} onMenuClick={handleMobileSidebarToggle} />
          {props.children}
        </div>
        {mobileSidebarOpen && (
          <button
            type="button"
            className="mobile-sidebar-backdrop"
            onClick={handleMobileSidebarToggle}
            aria-label="Close sidebar overlay"
          />
        )}
      </div>
    </>
  );
};
RdsCompAppShell.displayName = 'RdsCompAppShell';
export default RdsCompAppShell;
