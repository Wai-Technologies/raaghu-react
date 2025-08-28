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
    title?: string; // Title for all notifications (overrides notification.title)
    description?: string; // Description for all notifications (overrides notification.description)
    layout?: NotificationLayout; // Layout of the notification
    style?: NotificationStyle; // Style of the notification
    type?: NotificationType; // Type of the notification
    showButton?: boolean; // Show buttons in the notification
    showPrimaryButton?: boolean; // Show primary button in the notification
    showSecondaryButton?: boolean; // Show secondary button in the notification
    showDismiss?: boolean; // Show dismiss button in the notification
    onDismiss?: (event: any, notification: any) => void; // Event handler for dismiss button
    onAccept?: (event: React.MouseEvent<HTMLElement>, notification: any) => void; // Event handler for accept button
}
const CustomBellIcon: React.FC = () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7976 7.69526L7.60461 14.9865M19.2006 7.69526L26.3937 14.9865M17.0723 13.3624C17.292 13.3624 17.5071 13.4241 17.6931 13.5405C17.879 13.6568 18.0281 13.8231 18.1232 14.0201L22.2528 22.3993C22.7979 23.5018 22.9869 24.7451 22.794 25.9588C22.6011 27.1724 22.0358 28.297 21.1754 29.1785C20.6423 29.7238 20.0048 30.1573 19.3005 30.4533C18.5961 30.7493 17.8393 30.9019 17.0747 30.9019C16.3101 30.9019 15.5533 30.7493 14.849 30.4533C14.1446 30.1573 13.5071 29.7238 12.9741 29.1785C12.1124 28.2979 11.5455 27.1737 11.3512 25.9601C11.1568 24.7464 11.3445 23.5026 11.8886 22.3993L16.0198 14.0201C16.1149 13.8231 16.2656 13.6568 16.4516 13.5405C16.6375 13.4241 16.8527 13.3624 17.0723 13.3624ZM17.0723 13.3624L17.0715 23.4873M10.7726 32.9993H23.2273M12.596 5.46326L17 1L21.404 5.46326L17 9.92652L12.596 5.46326ZM1 17.2169L5.40398 12.7536L9.80797 17.2169L5.40398 21.6801L1 17.2169ZM24.192 17.2185L28.596 12.7552L33 17.2185L28.596 21.6817L24.192 17.2185Z" stroke="#7D7D7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const RdsCompNotification: React.FC<RdsCompNotificationProps> = ({
    notifications,
    title,
    layout = NotificationLayout.Horizontal,
    style = NotificationStyle.Default,
    type = NotificationType.Info,
    showButton = false,
    showPrimaryButton = false,
    showSecondaryButton = false,
    showDismiss = false,
    description,
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
                    sx={{ ...getTypeStyles(), padding: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? 0 : 2, marginBottom: 2, borderRadius: 2, position: "relative",display: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? "flex" : "block",overflow: "hidden"
                    }}>
                    {/* Image Sidebar for Horizontal Layout */}
                    {layout === NotificationLayout.Horizontal && style === NotificationStyle.Image && (
                        <Box
                            sx={{width: "90px",background: "#E1E3EA",display: "flex",alignItems: "center",justifyContent: "center",flexShrink: 0,
                            }}
                        >
                            <Box
                                component="img"
                                src={notification.image ||"https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/Raaghu%20Logo%20SD.svg"
                                }
                                alt="Notification"
                                sx={{width: "70px",height: "70px",objectFit: "contain",
                                }}
                            />
                        </Box>
                    )}
                    
                    {/* Content Area */}
                    <Box sx={{ 
                        flex: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? 1 : "none",
                        padding: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? 2 : 0,
                        position: "relative"
                    }}>
                    {/* Dismiss Icon */}
                    {showDismiss && (
                        <RdsIconButton iconFilled={<Close />} size="small" onClick={(e) => onDismiss?.(e, notification)} sx={{ position: "absolute", top: 8, right: 8, padding: 0.5, }} className="rds-comp-notification__dismiss" />)}
                    {/* Header Section */}
                    <Box
                        className="rds-comp-notification__header"
                        sx={{ display: "flex", alignItems: layout === NotificationLayout.Horizontal ? "center" : "flex-start", flexDirection: layout === NotificationLayout.Horizontal ? "row" : "column", marginBottom: 1, }}>
                        {/* Title section for image style with special positioning */}
                        {style === NotificationStyle.Image &&
                            (layout === NotificationLayout.Vertical ||
                                layout === NotificationLayout.Horizontal) && (
                                <Box
                                    className="rds-comp-notification__title-section" sx={{ flexGrow: 1, paddingLeft: 0, }}>
                                    <Typography variant="subtitle1" component="strong" className="rds-comp-notification__title" sx={{ fontWeight: "bold" }}>
                                        {title ?? notification.title}
                                    </Typography>
                                    {notification.time && (
                                        <Typography variant="body2" component="span" className="rds-comp-notification__time" sx={{ color: "text.secondary", marginLeft: 1 }}>
                                            {notification.time}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        {style === NotificationStyle.Image && layout === NotificationLayout.Vertical && (
                            <Box className="rds-comp-notification__image-container">
                            <Box
                                component="img"
                                src={
                                    notification.image ||
                                    "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
                                }
                                alt="Notification"
                                />
                            </Box>
                        )}
                        {style === NotificationStyle.Avatar && (
                            <Avatar
                                src={
                                    notification.avatar ||
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                                }
                                sx={{ width: 40, height: 40, marginRight: 2 }} />)}
                        {style === NotificationStyle.Icon && (
                            <Box className="rds-comp-notification__icon" sx={{ marginRight: 2, display: "flex", alignItems: "center", width: 38, height: 38 }}>
                                {typeof notification.icon === 'string' ? (
                                    <CustomBellIcon />
                                ) : (
                                    notification.icon || <CustomBellIcon />
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
                                        {title ?? notification.title}
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
                        <Typography
                            variant="body2"
                            className="rds-comp-notification__description"
                            sx={{ color: "text.primary" }}
                        >
                            {description ?? notification.description}
                        </Typography>
                    </CardContent>
                    <Box
                        className="rds-comp-notification__footer"
                        sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2, gap: 1,
                        }}
                    >
                        {showButton && (
                            <>
                                {showSecondaryButton && (
                                    <RdsButton text="DISMISS" size="small" onClick={(e) => onDismiss?.(e, notification)} className="rds-comp-notification__secondary-button"
                                    />
                                )}
                                {showPrimaryButton && (
                                    <RdsButton text="ACCEPT" size="small" style="transparent" color="primary" onClick={(e) => onAccept?.(e, notification)} className="rds-comp-notification__primary-button"
                                    />
                                )}
                            </>
                        )}
                    </Box>
                    </Box>
                </Card>
            ))}
        </Fragment>
    );
};
RdsCompNotification.displayName = "RdsCompNotification";
export default RdsCompNotification;
