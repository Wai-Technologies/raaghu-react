import type { MouseEvent, ReactNode } from "react";

export enum NotificationLayout {
  Vertical = "vertical",
  Horizontal = "horizontal",
}

export enum NotificationStyle {
  Default = "default",
  Avatar = "avatar",
  Icon = "icon",
  Image = "image",
}

export enum NotificationType {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning",
}

export interface NotificationItem {
  id?: string | number;
  userNotificationId?: string | number;
  title: string;
  time?: string;
  description?: string;
  image?: string;
  avatar?: string;
  icon?: ReactNode | string;
  status?: string;
  urlTitle?: string;
  [key: string]: unknown;
}

export interface RdsCompNotificationProps {
  items?: NotificationItem[];
  /** @deprecated Use `items` instead. */
  notifications?: NotificationItem[];
  title?: string;
  description?: string;
  fallbackImage?: string;
  /** @deprecated Use `fallbackImage` instead. */
  defaultImage?: string;
  orientation?: NotificationLayout | `${NotificationLayout}`;
  layout?: NotificationLayout | `${NotificationLayout}`;
  variant?: NotificationStyle | `${NotificationStyle}`;
  style?: NotificationStyle | `${NotificationStyle}`;
  /** MUI-named alias for `type`. */
  severity?: NotificationType | `${NotificationType}`;
  /** @deprecated Use `severity` instead. */
  type?: NotificationType | `${NotificationType}`;
  actions?: "none" | "primary" | "secondary" | "both";
  /** @deprecated Use `showDismiss` instead. */
  dismiss?: "visible" | "hidden";
  /** Label of the secondary (dismiss) button. Defaults to "DISMISS". */
  dismissLabel?: string;
  /** Label of the primary (accept) button. Defaults to "ACCEPT". */
  acceptLabel?: string;
  className?: string;
  onDismiss?: (event: MouseEvent<HTMLElement>, notification: NotificationItem) => void;
  onAccept?: (event: MouseEvent<HTMLElement>, notification: NotificationItem) => void;
  /** Legacy boolean, still supported. */
  showButton?: boolean;
  /** Legacy boolean, still supported. */
  showPrimaryButton?: boolean;
  /** Legacy boolean, still supported. */
  showSecondaryButton?: boolean;
  showDismiss?: boolean;
}
