import { ReactNode, ReactElement, Ref, HTMLAttributes, useState, useEffect, useCallback, isValidElement, cloneElement } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import clsx from "clsx";
import "./rds-comp-app-shell.scss";
import { AppShellDisplayType } from "./shell-types";
export { AppShellDisplayType } from "./shell-types";
import { GetShellLayoutCss } from "./shell-layout";

export interface RdsCompAppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  displayType: AppShellDisplayType;
  topbar?: ReactNode;
  sidebar?: ReactNode;
  children?: ReactNode;
  mobileSidebarOpen?: boolean;
  onMobileSidebarToggle?: () => void;
  /** Accessible label of the backdrop that closes the mobile sidebar. */
  closeSidebarLabel?: string;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
}

/** Wires the menu button of an `RdsAppBar` wrapped in a single container element. */
const withMenuClick = (topbar: ReactNode, onMenuClick: () => void): ReactNode => {
  if (!topbar) return null;
  if (!isValidElement<{ children?: ReactNode }>(topbar)) return topbar;
  const appBar = topbar.props.children;
  if (!isValidElement(appBar) || (appBar.type as { displayName?: string }).displayName !== 'RdsAppBar') {
    return topbar;
  }
  return cloneElement(topbar, undefined, cloneElement(appBar as ReactElement<{ onMenuClick?: () => void }>, { onMenuClick }));
};

const RdsCompAppShell = ({
  displayType,
  topbar,
  sidebar,
  children,
  mobileSidebarOpen: mobileSidebarOpenProp,
  onMobileSidebarToggle,
  closeSidebarLabel = "Close sidebar overlay",
  className,
  ...rest
}: RdsCompAppShellProps) => {
  const [internalMobileSidebarOpen, setInternalMobileSidebarOpen] = useState(false);
  // Avoid animating the sidebar from a desktop first-paint when Storybook/viewport resizes to mobile.
  const [layoutReady, setLayoutReady] = useState(false);

  const mobileSidebarOpen = mobileSidebarOpenProp ?? internalMobileSidebarOpen;
  const toggleInternalSidebar = useCallback(() => setInternalMobileSidebarOpen((open) => !open), []);
  const handleMobileSidebarToggle = onMobileSidebarToggle ?? toggleInternalSidebar;

  useEffect(() => {
    const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
    if (!isProduction && mobileSidebarOpenProp !== undefined && !onMobileSidebarToggle) {
      // eslint-disable-next-line no-console -- intentional developer-facing warning
      console.warn('RdsCompAppShell: `mobileSidebarOpen` is controlled but `onMobileSidebarToggle` is missing, so the sidebar cannot be toggled.');
    }
  }, [mobileSidebarOpenProp, onMobileSidebarToggle]);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => setLayoutReady(true));
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleMobileSidebarToggle();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileSidebarOpen, handleMobileSidebarToggle]);

  return (
    <Box
      {...rest}
      className={clsx(
        GetShellLayoutCss(displayType),
        mobileSidebarOpen && 'mobile-sidebar-open',
        layoutReady && 'rds-appshell--layout-ready',
        className,
      )}
    >
      <div className="sidebar-layout">{sidebar}</div>
      <div className="topnav-layout">
        {withMenuClick(topbar, handleMobileSidebarToggle)}
        {children}
      </div>
      {mobileSidebarOpen && (
        <button
          type="button"
          className="mobile-sidebar-backdrop"
          onClick={handleMobileSidebarToggle}
          aria-label={closeSidebarLabel}
        />
      )}
    </Box>
  );
};
RdsCompAppShell.displayName = 'RdsCompAppShell';
export default RdsCompAppShell;
