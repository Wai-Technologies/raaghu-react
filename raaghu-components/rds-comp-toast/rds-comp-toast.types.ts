import type { ReactNode, Ref, SyntheticEvent } from "react";
import type { SxProps, Theme } from "@mui/material";

export const ToastLayout = {
  Text: 'text',
  Download: 'download',
  Chat: 'chat',
  Request: 'request',
} as const;
export type ToastLayout = (typeof ToastLayout)[keyof typeof ToastLayout];

export const ToastSeverity = {
  Basic: 'basic',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
} as const;
export type ToastSeverity = (typeof ToastSeverity)[keyof typeof ToastSeverity];

/** @deprecated Use `ToastSeverity`. */
export const ToastState = ToastSeverity;
/** @deprecated Use `ToastSeverity`. */
export type ToastState = ToastSeverity;

export const ToastLeadingIcon = {
  Circle: 'circle',
  Plus: 'plus',
} as const;
export type ToastLeadingIcon = (typeof ToastLeadingIcon)[keyof typeof ToastLeadingIcon];

export const ToastPosition = {
  TopLeft: 'topLeft',
  TopCenter: 'topCenter',
  TopRight: 'topRight',
  MiddleLeft: 'middleLeft',
  MiddleCenter: 'middleCenter',
  MiddleRight: 'middleRight',
  BottomLeft: 'bottomLeft',
  BottomCenter: 'bottomCenter',
  BottomRight: 'bottomRight',
} as const;
export type ToastPosition = (typeof ToastPosition)[keyof typeof ToastPosition];

export interface ToastAnchorOrigin {
  vertical: "top" | "middle" | "bottom";
  horizontal: "left" | "center" | "right";
}

export type ToastCloseReason = "timeout" | "closeClick";

export interface RdsCompToastProps {
  /** Toast title. */
  title?: string;
  /** Toast body text. */
  message?: string;
  /** @deprecated Use `title` instead. */
  headerText?: string;
  /** @deprecated Use `message` instead. */
  subText?: string;
  /** @deprecated Use `autoHideDuration` instead. */
  delay?: number;
  /** @deprecated Use `autoHideDuration` instead. */
  autohide?: boolean;
  /** Auto-hide delay in ms; `null` keeps the toast open. Wins over `delay`/`autohide`. */
  autoHideDuration?: number | null;
  /** Controlled visibility. When undefined the toast hides itself. */
  open?: boolean;
  /** Called when the toast hides itself (timeout or close button). */
  onClose?: (event: Event | SyntheticEvent | null, reason: ToastCloseReason) => void;
  /** Action buttons for download/chat/request layouts. No demo buttons are rendered when omitted. */
  action?: ReactNode;
  chrome?: {
    header?: "visible" | "hidden";
    leading?: "visible" | "hidden";
    dismiss?: "visible" | "hidden";
    subText?: "visible" | "hidden";
  };
  layout: ToastLayout;
  /** Severity and visual treatment of the toast. */
  severity?: ToastSeverity;
  placeholder?: string;
  /** @deprecated Use `progress` instead. */
  progressWidth?: number;
  /** Download progress, 0-100. */
  progress?: number;
  filename?: string;
  position?: ToastPosition;
  /** Screen anchor. Wins over `position`. */
  anchorOrigin?: ToastAnchorOrigin;
  /** @deprecated Use `icon` instead. */
  leadingIcon?: ToastLeadingIcon;
  icon?: ToastLeadingIcon;
  chatTime?: string;
  pauseOnHover?: boolean;
  showHeader?: boolean;
  showLeading?: boolean;
  showDismiss?: boolean;
  showSubText?: boolean;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
  className?: string;
}
