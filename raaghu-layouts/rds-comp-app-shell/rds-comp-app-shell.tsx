import { ReactNode, ReactElement, useState, useEffect, useCallback, isValidElement, cloneElement, forwardRef } from "react";
import Box from "@mui/material/Box";
import "./rds-comp-app-shell.scss";
import { AppShellDisplayType } from "./shell-types";
export { AppShellDisplayType };
import { GetShellLayoutCss } from "./shell-layout";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";

export interface RdsCompAppShellProps extends RdsStylingProps {
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
    } catch {
      return <>{topbar}</>;
    }
  }

  return <>{topbar}</>;
};
TopbarSlot.displayName = 'TopbarSlot';

const RdsCompAppShell = forwardRef<HTMLDivElement, RdsCompAppShellProps>(function RdsCompAppShell(props, ref) {
  const [internalMobileSidebarOpen, setInternalMobileSidebarOpen] = useState(false);
  
  const mobileSidebarOpen = props.mobileSidebarOpen ?? internalMobileSidebarOpen;
  const toggleInternalSidebar = useCallback(() => setInternalMobileSidebarOpen((open) => !open), []);
  const handleMobileSidebarToggle = props.onMobileSidebarToggle ?? toggleInternalSidebar;

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleMobileSidebarToggle();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileSidebarOpen, handleMobileSidebarToggle]);

  return (
    <>
      <Box ref={ref} className={joinClassNames(`${GetShellLayoutCss(props.displayType)} ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''}`, props.className)} sx={props.sx} style={props.style}>
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
      </Box>
    </>
  );
});
RdsCompAppShell.displayName = 'RdsCompAppShell';
export default RdsCompAppShell;
