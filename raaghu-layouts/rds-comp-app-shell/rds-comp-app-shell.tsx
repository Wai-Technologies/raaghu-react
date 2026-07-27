import { ReactNode, ReactElement, useState, useEffect, isValidElement, cloneElement } from "react";
import "./rds-comp-app-shell.scss";
import { AppShellDisplayType } from "./shell-types";
export { AppShellDisplayType } from "./shell-types";
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
  // Avoid animating the sidebar from a desktop first-paint when Storybook/viewport resizes to mobile.
  const [layoutReady, setLayoutReady] = useState(false);

  const mobileSidebarOpen = props.mobileSidebarOpen ?? internalMobileSidebarOpen;
  const handleMobileSidebarToggle = props.onMobileSidebarToggle ?? (() => setInternalMobileSidebarOpen(!internalMobileSidebarOpen));

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => setLayoutReady(true));
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <div
        className={`${GetShellLayoutCss(props.displayType)} ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''} ${layoutReady ? 'rds-appshell--layout-ready' : ''}`}
      >
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
