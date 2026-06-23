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
  state: ToastState;
  placeholder?: string;
  progressWidth?: number;
  filename?: string;
  position?: ToastPosition;
  leadingIcon: ToastLeadingIcon;
  chatTime?: string;
  pauseOnHover?: boolean;
  [key: string]: unknown;
}
