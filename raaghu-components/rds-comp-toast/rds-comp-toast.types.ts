import type { ReactNode, SyntheticEvent } from "react";
import type { RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";

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

export interface RdsCompToastProps extends RdsStylingProps {
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
  /** Semantic colour of the toast (basic, info, success, warning, error). */
  color?: ToastState;
  /** @deprecated Use `color` instead. */
  state?: ToastState;
  /** @deprecated Use `color` instead. */
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
