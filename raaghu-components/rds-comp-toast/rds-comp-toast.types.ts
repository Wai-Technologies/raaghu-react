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
  Warning = "warning",
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

export interface RdsCompToastProps {
  headerText?: string;
  subText: string;
  delay?: number;
  autohide?: boolean;
  chrome?: {
    header?: "visible" | "hidden";
    leading?: "visible" | "hidden";
    dismiss?: "visible" | "hidden";
    subText?: "visible" | "hidden";
  };
  layout: ToastLayout;
  /** Semantic toast state/color. Prefer `color` for new code. */
  state?: ToastState;
  /** Semantic color alias for `state`. */
  color?: ToastState;
  /** @deprecated Use `color` or `state`. */
  severity?: ToastState;
  placeholder?: string;
  progressWidth?: number;
  filename?: string;
  position?: ToastPosition;
  leadingIcon: ToastLeadingIcon;
  chatTime?: string;
  pauseOnHover?: boolean;
  action?: ReactNode;
  open?: boolean;
  onClose?: (event: SyntheticEvent | null, reason: 'closeClick' | 'timeout') => void;
  [key: string]: unknown;
}
