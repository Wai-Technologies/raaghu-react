import type { CSSProperties, HTMLAttributes, MouseEvent, ReactNode, Ref } from "react";
import type { SxProps, Theme } from "@mui/material";

export const NotificationLayout = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;
export type NotificationLayout = (typeof NotificationLayout)[keyof typeof NotificationLayout];

export const NotificationStyle = {
  Default: 'default',
  Avatar: 'avatar',
  Icon: 'icon',
  Image: 'image',
} as const;
export type NotificationStyle = (typeof NotificationStyle)[keyof typeof NotificationStyle];

export const NotificationType = {
  Error: 'error',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

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

export interface RdsCompNotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "style" | "children"> {
  /** Notifications to render. */
  items?: NotificationItem[];
  /** @deprecated Use `items` instead. */
  notifications?: NotificationItem[];
  /** Title text; overrides the title of each item. */
  title?: string;
  /** Description text; overrides the description of each item. */
  description?: string;
  /** Image used when an item has no image; defaults to the Raaghu logo. */
  fallbackImage?: string;
  /** @deprecated Use `fallbackImage` instead. */
  defaultImage?: string;
  /** Layout of the notification: horizontal or vertical. Wins over `layout`. */
  orientation?: NotificationLayout | `${NotificationLayout}`;
  /** Figma-named alias for `orientation`. */
  layout?: NotificationLayout | `${NotificationLayout}`;
  /** Visual style of the notification. */
  variant?: NotificationStyle | `${NotificationStyle}`;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: NotificationStyle | `${NotificationStyle}` | CSSProperties;
  /** MUI-named alias for `type`. */
  severity?: NotificationType;
  /** @deprecated Use `severity` instead. */
  type?: NotificationType;
  /** Which action buttons to show. @default 'none' */
  actions?: "none" | "primary" | "secondary" | "both";
  /** @deprecated Use `showDismiss` instead. */
  dismiss?: "visible" | "hidden";
  /** Label of the secondary (dismiss) button. Defaults to "DISMISS". */
  dismissLabel?: string;
  /** Label of the primary (accept) button. Defaults to "ACCEPT". */
  acceptLabel?: string;
  /** MUI system styles applied to the root. */
  sx?: SxProps<Theme>;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
  /** Called with the click event and the notification when the secondary button is clicked. */
  onDismiss?: (event: MouseEvent<HTMLElement>, notification: NotificationItem) => void;
  /** Called with the click event and the notification when the primary button is clicked. */
  onAccept?: (event: MouseEvent<HTMLElement>, notification: NotificationItem) => void;
  /** Legacy boolean, still supported. */
  showButton?: boolean;
  /** Legacy boolean, still supported. */
  showPrimaryButton?: boolean;
  /** Legacy boolean, still supported. */
  showSecondaryButton?: boolean;
  /** Shows the dismiss control. */
  showDismiss?: boolean;
}
