import React, { Fragment } from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { Close } from "@mui/icons-material";
import { RdsButton, RdsIconButton } from "../../raaghu-elements";
import "./rds-comp-notification.scss";
export enum NotificationLayout { Vertical = "vertical", Horizontal = "horizontal", }
export enum NotificationStyle { Default = "default", Avatar = "avatar", Icon = "icon", Image = "image", }
export enum NotificationType { Error = "error", Info = "info", Success = "success", Warning = "warning", }
export interface NotificationItem { userNotificationId?: string | number; title: string; time?: string; description: string; image?: string; avatar?: string; icon?: React.ReactNode | string; status?: string; urlTitle?: string; }
export interface RdsCompNotificationProps {
    notifications: any[]; // Array of notifications (matching old interface)
    layout?: NotificationLayout; // Layout of the notification
    style?: NotificationStyle; // Style of the notification
    type?: NotificationType; // Type of the notification
    showButton?: boolean; // Show buttons in the notification
    showPrimaryButton?: boolean; // Show primary button in the notification
    showSecondaryButton?: boolean; // Show secondary button in the notification
    showDismissIcon?: boolean; // Show dismiss button in the notification
    onDismiss?: (event: any, notification: any) => void; // Event handler for dismiss button
    onAccept?: (event: React.MouseEvent<HTMLElement>, notification: any) => void; // Event handler for accept button
}
const RdsCompNotification: React.FC<RdsCompNotificationProps> = ({
    notifications,
    layout = NotificationLayout.Horizontal,
    style = NotificationStyle.Default,
    type = NotificationType.Info,
    showButton = false,
    showPrimaryButton = false,
    showSecondaryButton = false,
    showDismissIcon = false,
    onDismiss,
    onAccept,
}) => {
    const getTypeStyles = () => {
        switch (type) {
            case NotificationType.Error:
                return {
                    backgroundColor: "#ffdad6",
                    borderLeft: "4px solid #f5c6cb",
                };
            case NotificationType.Success:
                return {
                    backgroundColor: "#ebdcff",
                    borderLeft: "4px solid #c3e6cb",
                };
            case NotificationType.Warning:
                return {
                    backgroundColor: "#fed99b",
                    borderLeft: "4px solid #ffeeba",
                };
            case NotificationType.Info:
            default:
                return {
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #e2e3e5",
                    borderLeft: "4px solid #bee5eb",
                };
        }
    };
    return (
        <Fragment>
            {notifications.map((notification) => (
                <Card
                    key={notification.userNotificationId || Math.random()}
                    className={`rds-comp-notification rds-comp-notification--layout-${layout} rds-comp-notification--style-${style} rds-comp-notification--type-${type}`}
                    sx={{ ...getTypeStyles(), padding: 2, marginBottom: 2, borderRadius: 2, position: "relative" }}>
                    {/* Dismiss Icon */}
                    {showDismissIcon && (
                        <RdsIconButton
                            iconFilled={<Close />}
                            size="small"
                            onClick={(e) => onDismiss?.(e, notification)}
                            sx={{ position: "absolute", top: 8, right: 8, padding: 0.5, }}
                            className="rds-comp-notification__dismiss" />)}
                    {/* Header Section */}
                    <Box
                        className="rds-comp-notification__header"
                        sx={{ display: "flex", alignItems: layout === NotificationLayout.Horizontal ? "center" : "flex-start", flexDirection: layout === NotificationLayout.Horizontal ? "row" : "column", marginBottom: 1, }}>
                        {/* Title section for image style with special positioning */}
                        {style === NotificationStyle.Image &&
                            (layout === NotificationLayout.Vertical ||
                                layout === NotificationLayout.Horizontal) && (
                                <Box
                                    className="rds-comp-notification__title-section" sx={{ flexGrow: 1, paddingLeft: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? "75px" : 0, }}>
                                    <Typography variant="subtitle1" component="strong" className="rds-comp-notification__title" sx={{ fontWeight: "bold" }}>
                                        {notification.title}
                                    </Typography>
                                    {notification.time && (
                                        <Typography variant="body2" component="span" className="rds-comp-notification__time" sx={{ color: "text.secondary", marginLeft: 1 }}>
                                            {notification.time}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        {style === NotificationStyle.Image && layout === NotificationLayout.Vertical && (
                            <Box
                                component="img"
                                src={
                                    notification.image ||
                                    "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                                }
                                alt="Notification"
                                sx={{ width: 120, height: 50, objectFit: "cover", borderRadius: 1, marginTop: 1, }} />)}
                        {style === NotificationStyle.Avatar && (
                            <Avatar
                                src={
                                    notification.avatar ||
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                                }
                                sx={{ width: 40, height: 40, marginRight: 2 }} />)}
                        {style === NotificationStyle.Icon && (
                            <Box sx={{ marginRight: 2, display: "flex", alignItems: "center", width: 38, height: 38 }}>
                                {typeof notification.icon === 'string' ? (
                                    <span style={{ fontSize: '24px' }}>🔔</span>
                                ) : (
                                    notification.icon || <span style={{ fontSize: '24px' }}>🔔</span>
                                )}
                            </Box>
                        )}
                        {/* Title section for non-image styles or specific conditions */}
                        {((layout !== NotificationLayout.Vertical && style !== NotificationStyle.Image) ||
                            (layout === NotificationLayout.Horizontal && style !== NotificationStyle.Image) ||
                            (layout === NotificationLayout.Vertical && style !== NotificationStyle.Image)) && (
                                <Box
                                    className="rds-comp-notification__title-section"
                                    sx={{ flexGrow: 1, marginTop: layout === NotificationLayout.Vertical ? 0 : 0.125 }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        component="strong"
                                        className="rds-comp-notification__title"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {notification.title}
                                    </Typography>
                                    {notification.time && (
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className="rds-comp-notification__time"
                                            sx={{ color: "text.secondary", marginLeft: 1 }}
                                        >
                                            {notification.time}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                    </Box>
                    <CardContent
                        className="rds-comp-notification__body"
                        sx={{
                            padding: 0, marginTop: 1, marginLeft: layout === NotificationLayout.Horizontal && (style === NotificationStyle.Avatar || style === NotificationStyle.Icon) ? 5 : 0, "&:last-child": { paddingBottom: 0 },
                        }}>
                        {style === NotificationStyle.Image && layout === NotificationLayout.Horizontal && (
                            <Box
                                component="img"
                                src={
                                    notification.image ||
                                    "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/Raaghu%20Logo%20SD.svg"
                                }
                                alt="Notification"
                                sx={{
                                    width: 70, height: 70, objectFit: "cover", borderRadius: 1, marginRight: 2, float: "left",
                                }}
                            />
                        )}
                        <Typography
                            variant="body2"
                            className="rds-comp-notification__description"
                            sx={{ color: "text.primary" }}
                        >
                            {notification.description}
                        </Typography>
                    </CardContent>
                    <Box
                        className="rds-comp-notification__footer"
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 2,
                            gap: 1,
                        }}
                    >
                        {showButton && (
                            <>
                                {showSecondaryButton && (
                                    <RdsButton
                                        text="DISMISS"
                                        inputSize="small"
                                        onClick={(e) => onDismiss?.(e, notification)}
                                        className="rds-comp-notification__secondary-button"
                                    />
                                )}
                                {showPrimaryButton && (
                                    <RdsButton
                                        text="ACCEPT"
                                        inputSize="small"
                                        style="transparent"
                                        color="primary"
                                        onClick={(e) => onAccept?.(e, notification)}
                                        className="rds-comp-notification__primary-button"
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Card>
            ))}
        </Fragment>
    );
};
RdsCompNotification.displayName = "RdsCompNotification";
export default RdsCompNotification;
