import { ReactNode, ReactElement, Ref, HTMLAttributes, useState, useEffect, useCallback, useId, useRef, isValidElement, cloneElement } from "react";
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

export interface RdsCompAppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'ref'> {
  /** Figma layout name. `variant` takes precedence. */
  displayType?: AppShellDisplayType;
  /** Shell layout variant; takes precedence over `displayType`. */
  variant?: AppShellVariant;
  /** Content rendered in the header area of the shell. */
  header?: ReactNode;
  /** @deprecated Use `header` instead. */
  topbar?: ReactNode;
  /** Content rendered in the sidebar area of the shell. */
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
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
}

type MenuInjectProps = {
  onMenuClick?: () => void;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
};

/** Wires the menu button of an `RdsAppBar` wrapped in a single container element. */
const withMenuClick = (
  topbar: ReactNode,
  onMenuClick: () => void,
  menuA11y: { expanded: boolean; controlsId: string },
): ReactNode => {
  if (!topbar) return null;
  if (!isValidElement<{ children?: ReactNode }>(topbar)) return topbar;
  const appBar = topbar.props.children;
  if (!isValidElement(appBar) || (appBar.type as { displayName?: string }).displayName !== 'RdsAppBar') {
    return topbar;
  }
  return cloneElement(
    topbar,
    undefined,
    cloneElement(appBar as ReactElement<MenuInjectProps>, {
      onMenuClick,
      'aria-expanded': menuA11y.expanded,
      'aria-controls': menuA11y.controlsId,
    }),
  );
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
  sx,
  ref,
  ...rest
}: RdsCompAppShellProps) => {
  if (topbar !== undefined) warnDeprecatedProp('RdsCompAppShell', 'topbar', '`header`');
  if (mobileSidebarOpen !== undefined) warnDeprecatedProp('RdsCompAppShell', 'mobileSidebarOpen', '`sidebarOpen`');
  if (onMobileSidebarToggle !== undefined) warnDeprecatedProp('RdsCompAppShell', 'onMobileSidebarToggle', '`onSidebarOpenChange`');

  const [internalOpen, setInternalOpen] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);
  const sidebarId = useId();
  const mainId = useId();
  const menuTriggerRef = useRef<HTMLElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);

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

  const toggleSidebar = useCallback(() => {
    if (!open) {
      menuTriggerRef.current = document.activeElement as HTMLElement | null;
    }
    requestOpen(!open);
  }, [requestOpen, open]);

  const closeSidebar = useCallback(() => {
    requestOpen(false);
    queueMicrotask(() => {
      menuTriggerRef.current?.focus?.();
    });
  }, [requestOpen]);

  useEffect(() => {
    const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
    if (!isProduction && openProp !== undefined && !hasHandler) {
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
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSidebar();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const firstFocusable = sidebarRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeSidebar]);

  return (
    <Box
      {...rest}
      ref={ref}
      className={clsx(
        GetShellLayoutCss(variant ? VARIANT_DISPLAY_TYPE[variant] : displayType),
        open && 'mobile-sidebar-open',
        layoutReady && 'rds-appshell--layout-ready',
        className,
      )}
      sx={sx}
    >
      <a href={`#${mainId}`} className="rds-appshell__skip-link">
        Skip to main content
      </a>
      <nav
        id={sidebarId}
        ref={sidebarRef}
        className="sidebar-layout"
        aria-label="Primary"
      >
        {sidebar}
      </nav>
      <div className="topnav-layout">
        {withMenuClick(header ?? topbar, toggleSidebar, { expanded: open, controlsId: sidebarId })}
        <main
          id={mainId}
          className="rds-appshell__main"
          inert={open ? true : undefined}
          aria-hidden={open || undefined}
        >
          {children}
        </main>
      </div>
      {open && (
        <div
          className="mobile-sidebar-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
          tabIndex={-1}
          data-close-label={closeSidebarLabel}
        />
      )}
    </Box>
  );
};
RdsCompAppShell.displayName = 'RdsCompAppShell';
export default RdsCompAppShell;
