import { ReactNode, ReactElement, Ref, HTMLAttributes, useState, useEffect, useCallback, isValidElement, cloneElement } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import clsx from "clsx";
import "./rds-comp-app-shell.scss";
import { AppShellDisplayType } from "./shell-types";
export { AppShellDisplayType } from "./shell-types";
import { GetShellLayoutCss } from "./shell-layout";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export type AppShellVariant = 'default' | 'top-nav' | 'side-nav' | 'double-nav' | 'tri-pane' | 'relaxing';

const VARIANT_DISPLAY_TYPE: Record<AppShellVariant, AppShellDisplayType> = {
  default: AppShellDisplayType.Default,
  'top-nav': AppShellDisplayType.TopNav,
  'side-nav': AppShellDisplayType.SideNav,
  'double-nav': AppShellDisplayType.DoubleNav,
  'tri-pane': AppShellDisplayType.TriPane,
  relaxing: AppShellDisplayType.Relaxing,
};

export interface RdsCompAppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma layout name. `variant` takes precedence. */
  displayType?: AppShellDisplayType;
  variant?: AppShellVariant;
  header?: ReactNode;
  /** @deprecated Use `header` instead. */
  topbar?: ReactNode;
  sidebar?: ReactNode;
  children?: ReactNode;
  /** Controlled open state of the mobile sidebar. */
  sidebarOpen?: boolean;
  /** Called with the requested open state (menu button, backdrop, Escape). */
  onSidebarOpenChange?: (open: boolean) => void;
  /** @deprecated Use `sidebarOpen` instead. */
  mobileSidebarOpen?: boolean;
  /** @deprecated Use `onSidebarOpenChange` instead. */
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
  variant,
  header,
  topbar,
  sidebar,
  children,
  sidebarOpen,
  onSidebarOpenChange,
  mobileSidebarOpen,
  onMobileSidebarToggle,
  closeSidebarLabel = "Close sidebar overlay",
  className,
  ...rest
}: RdsCompAppShellProps) => {
  if (topbar !== undefined) warnDeprecatedProp('RdsCompAppShell', 'topbar', '`header`');
  if (mobileSidebarOpen !== undefined) warnDeprecatedProp('RdsCompAppShell', 'mobileSidebarOpen', '`sidebarOpen`');
  if (onMobileSidebarToggle !== undefined) warnDeprecatedProp('RdsCompAppShell', 'onMobileSidebarToggle', '`onSidebarOpenChange`');

  const [internalOpen, setInternalOpen] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);

  const openProp = sidebarOpen ?? mobileSidebarOpen;
  const open = openProp ?? internalOpen;
  const hasHandler = !!onSidebarOpenChange || !!onMobileSidebarToggle;

  const requestOpen = useCallback((next: boolean) => {
    if (onSidebarOpenChange) {
      if (openProp === undefined) setInternalOpen(next);
      onSidebarOpenChange(next);
    } else if (onMobileSidebarToggle) {
      onMobileSidebarToggle();
    } else {
      setInternalOpen(next);
    }
  }, [onSidebarOpenChange, onMobileSidebarToggle, openProp]);

  const toggleSidebar = useCallback(() => requestOpen(!open), [requestOpen, open]);
  const closeSidebar = useCallback(() => requestOpen(false), [requestOpen]);

  useEffect(() => {
    const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
    if (!isProduction && openProp !== undefined && !hasHandler) {
      // eslint-disable-next-line no-console -- intentional developer-facing warning
      console.warn('RdsCompAppShell: `sidebarOpen` is controlled but `onSidebarOpenChange` is missing, so the sidebar cannot be toggled.');
    }
  }, [openProp, hasHandler]);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => setLayoutReady(true));
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSidebar();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeSidebar]);

  return (
    <Box
      {...rest}
      className={clsx(
        GetShellLayoutCss(variant ? VARIANT_DISPLAY_TYPE[variant] : displayType),
        open && 'mobile-sidebar-open',
        layoutReady && 'rds-appshell--layout-ready',
        className,
      )}
    >
      <div className="sidebar-layout">{sidebar}</div>
      <div className="topnav-layout">
        {withMenuClick(header ?? topbar, toggleSidebar)}
        {children}
      </div>
      {open && (
        <button
          type="button"
          className="mobile-sidebar-backdrop"
          onClick={closeSidebar}
          aria-label={closeSidebarLabel}
        />
      )}
    </Box>
  );
};
RdsCompAppShell.displayName = 'RdsCompAppShell';
export default RdsCompAppShell;
