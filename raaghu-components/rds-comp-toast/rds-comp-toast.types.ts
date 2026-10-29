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

/**
 * Toast / notification popup.
 * @deprecated Prefer `RdsSnackbar` from `raaghu-elements` (G6-149).
 */
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
  /** Per-part visibility of header, leading icon, dismiss button and sub text; wins over the `show*` props. */
  chrome?: {
    header?: "visible" | "hidden";
    leading?: "visible" | "hidden";
    dismiss?: "visible" | "hidden";
    subText?: "visible" | "hidden";
  };
  /** Toast layout variant: text, download, chat or request. */
  layout: ToastLayout;
  /** Severity and visual treatment of the toast. */
  severity?: ToastSeverity;
  /** Placeholder of the reply input in the chat layout. */
  placeholder?: string;
  /** @deprecated Use `progress` instead. */
  progressWidth?: number;
  /** Download progress, 0-100. */
  progress?: number;
  /** File name shown in the footer of the download layout. */
  filename?: string;
  /** Screen position of the toast; overridden by `anchorOrigin`. */
  position?: ToastPosition;
  /** Screen anchor. Wins over `position`. */
  anchorOrigin?: ToastAnchorOrigin;
  /** @deprecated Use `icon` instead. */
  leadingIcon?: ToastLeadingIcon;
  /** Leading icon variant. */
  icon?: ToastLeadingIcon;
  /** Time label shown in the header of the chat layout. */
  chatTime?: string;
  /** Pauses the auto-hide timer while the pointer is over the toast. */
  pauseOnHover?: boolean;
  /** Shows the header; ignored when `chrome.header` is set. */
  showHeader?: boolean;
  /** Shows the leading icon; ignored when `chrome.leading` is set. */
  showLeading?: boolean;
  /** Shows the close button; ignored when `chrome.dismiss` is set. */
  showDismiss?: boolean;
  /** Shows the message body; ignored when `chrome.subText` is set. */
  showSubText?: boolean;
  /** MUI system styles applied to the toast container. */
  sx?: SxProps<Theme>;
  /** Ref to the toast container element. */
  ref?: Ref<HTMLDivElement>;
  /** Extra CSS class applied to the toast container. */
  className?: string;
}
