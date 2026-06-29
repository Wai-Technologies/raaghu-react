import React from 'react';

export enum NotificationLayout { Vertical = "vertical", Horizontal = "horizontal", }
export enum NotificationStyle { Default = "default", Avatar = "avatar", Icon = "icon", Image = "image", }
export enum NotificationType { Error = "error", Info = "info", Success = "success", Warning = "warning", }
export interface NotificationItem { userNotificationId?: string | number; title: string; time?: string; description: string; image?: string; avatar?: string; icon?: React.ReactNode | string; status?: string; urlTitle?: string; }
export interface RdsCompNotificationProps {
    notifications: any[];
    title?: string;
    description?: string;
    layout?: NotificationLayout;
    style?: NotificationStyle;
    type?: NotificationType;
    showButton?: boolean;
    showPrimaryButton?: boolean;
    showSecondaryButton?: boolean;
    showDismiss?: boolean;
    onDismiss?: (event: any, notification: any) => void;
    onAccept?: (event: React.MouseEvent<HTMLElement>, notification: any) => void;
}
