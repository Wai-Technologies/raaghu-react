import type { ReactNode, SyntheticEvent } from "react";

export enum ToastLayout {
  Text = "text",
  Download = "download",
  Chat = "chat",
  Request = "request",
}

export enum ToastState {
  Basic = "basic",
  Info = "info",
  Success = "success",
  Error = "error",
}

export enum ToastLeadingIcon {
  Circle = "circle",
  Plus = "plus",
}

export enum ToastPosition {
  TopLeft = "topLeft",
  TopCenter = "topCenter",
  TopRight = "topRight",
  MiddleLeft = "middleLeft",
  MiddleCenter = "middleCenter",
  MiddleRight = "middleRight",
  BottomLeft = "bottomLeft",
  BottomCenter = "bottomCenter",
  BottomRight = "bottomRight",
}

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
  /** Replaces the layout's built-in action buttons. */
  action?: ReactNode;
  chrome?: {
    header?: "visible" | "hidden";
    leading?: "visible" | "hidden";
    dismiss?: "visible" | "hidden";
    subText?: "visible" | "hidden";
  };
  layout: ToastLayout | `${ToastLayout}`;
  /** Figma state variant. */
  state?: ToastState | `${ToastState}`;
  /** Alias of `state`. Wins over `state`. */
  severity?: ToastState | `${ToastState}`;
  placeholder?: string;
  /** @deprecated Use `progress` instead. */
  progressWidth?: number;
  /** Download progress, 0-100. */
  progress?: number;
  filename?: string;
  position?: ToastPosition | `${ToastPosition}`;
  /** Screen anchor. Wins over `position`. */
  anchorOrigin?: ToastAnchorOrigin;
  /** @deprecated Use `icon` instead. */
  leadingIcon?: ToastLeadingIcon | `${ToastLeadingIcon}`;
  icon?: ToastLeadingIcon | `${ToastLeadingIcon}`;
  chatTime?: string;
  pauseOnHover?: boolean;
  showHeader?: boolean;
  showLeading?: boolean;
  showDismiss?: boolean;
  showSubText?: boolean;
}
