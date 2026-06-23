import clsx from "clsx";
import { Fragment, useState, useMemo, useCallback, useRef } from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { Close } from "@mui/icons-material";
import { RdsButton, RdsIconButton } from "../../raaghu-elements";
import "./rds-comp-notification.scss";
import {
    NotificationLayout,
    NotificationStyle,
    NotificationType,
    type RdsCompNotificationProps,
} from "./rds-comp-notification.types";

const CustomBellIcon = () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.8 7.7L7.6 14.99M19.2 7.7L26.39 14.99M17.07 13.36C17.29 13.36 17.51 13.42 17.69 13.54C17.88 13.66 18.03 13.82 18.12 14.02L22.25 22.4C22.8 23.5 22.99 24.75 22.79 25.96C22.6 27.17 22.04 28.3 21.18 29.18C20.64 29.72 20 30.16 19.3 30.45C18.6 30.75 17.84 30.9 17.07 30.9C16.31 30.9 15.55 30.75 14.85 30.45C14.14 30.16 13.51 29.72 12.97 29.18C12.11 28.3 11.55 27.17 11.35 25.96C11.16 24.75 11.34 23.5 11.89 22.4L16.02 14.02C16.11 13.82 16.27 13.66 16.45 13.54C16.64 13.42 16.85 13.36 17.07 13.36ZM17.07 13.36L17.07 23.49M10.77 33H23.23M12.6 5.46L17 1L21.4 5.46L17 9.93L12.6 5.46ZM1 17.22L5.4 12.75L9.81 17.22L5.4 21.68L1 17.22ZM24.19 17.22L28.6 12.76L33 17.22L28.6 21.68L24.19 17.22Z" stroke="var(--rds-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DEFAULT_NOTIFICATION_IMAGE = "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png";

const RdsCompNotification = ({
    notifications,
    title,
    defaultImage = DEFAULT_NOTIFICATION_IMAGE,
    layout = NotificationLayout.Horizontal,
    style = NotificationStyle.Default,
    type = NotificationType.Info,
    actions = 'none',
    dismiss = 'hidden',
    description,
    onDismiss,
    onAccept,
    ...legacyProps
}) => {
    const legacyShowButton = typeof legacyProps['showButton'] === 'boolean' ? (legacyProps['showButton'] as boolean) : undefined;
    const legacyShowPrimaryButton = typeof legacyProps['showPrimaryButton'] === 'boolean' ? (legacyProps['showPrimaryButton'] as boolean) : undefined;
    const legacyShowSecondaryButton = typeof legacyProps['showSecondaryButton'] === 'boolean' ? (legacyProps['showSecondaryButton'] as boolean) : undefined;
    const legacyShowDismiss = typeof legacyProps['showDismiss'] === 'boolean' ? (legacyProps['showDismiss'] as boolean) : undefined;

    const resolvedDismissVisible = dismiss === 'visible' || legacyShowDismiss === true;
    const resolvedShowPrimaryButton = actions === 'primary' || actions === 'both' || legacyShowPrimaryButton === true;
    const resolvedShowSecondaryButton = actions === 'secondary' || actions === 'both' || legacyShowSecondaryButton === true;
    const resolvedShowButton = actions !== 'none' || legacyShowButton === true || resolvedShowPrimaryButton || resolvedShowSecondaryButton;

    const [dismissedNotificationKeys, setDismissedNotificationKeys] = useState<Array<string | number>>([]);
    const lastNotificationsRef = useRef(notifications);
    const dismissIconElement = useMemo(() => <Close />, []);

    // Avoid resetting dismissed keys via useEffect (causes an extra render).
    // When the `notifications` reference changes, we ignore previously dismissed keys
    // by tracking the last notifications reference. This keeps UI in sync without
    // forcing state updates during an effect.
    if (lastNotificationsRef.current !== notifications) {
        lastNotificationsRef.current = notifications;
    }

    const visibleNotifications = useMemo(() => {
        // If notifications changed, ignore dismissed keys and show all notifications.
        if (lastNotificationsRef.current !== notifications) {
            return notifications;
        }
        return notifications.filter((notification, index) => {
            const notificationKey = notification.userNotificationId ?? `${notification.title}-${index}`;
            return !dismissedNotificationKeys.includes(notificationKey);
        });
    }, [dismissedNotificationKeys, notifications]);

    const removeNotificationByIndex = useCallback((notificationIndex: number) => {
        const notification = visibleNotifications[notificationIndex];
        if (!notification) return;
        const notificationKey = notification.userNotificationId ?? `${notification.title}-${notificationIndex}`;
        setDismissedNotificationKeys((prev) => prev.includes(notificationKey) ? prev : [...prev, notificationKey]);
    }, [visibleNotifications]);

    const handleDismiss = useCallback((event: any, notification: any, notificationIndex: number) => {
        removeNotificationByIndex(notificationIndex);
        onDismiss?.(event, notification);
    }, [onDismiss, removeNotificationByIndex]);

    const handleSecondaryButtonClick = useCallback((event: any, notification: any, notificationIndex: number) => {
        removeNotificationByIndex(notificationIndex);
        onDismiss?.(event, notification);
    }, [onDismiss, removeNotificationByIndex]);
    return (
        <Fragment>
            {visibleNotifications.map((notification, index) => (
                <Card
                                        key={notification.userNotificationId ?? `${notification.title}-${index}`}
                    className={clsx(
                      "rds-comp-notification",
                      `rds-comp-notification--layout-${layout}`,
                      `rds-comp-notification--style-${style}`,
                      `rds-comp-notification--type-${type}`
                    )}
                    sx={{ padding: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? 0 : 2, marginBottom: 2, borderRadius: 2, position: "relative",display: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? "flex" : "block",overflow: "hidden"
                    }}>
                   
                    {layout === NotificationLayout.Horizontal && style === NotificationStyle.Image && (
                        <Box
                            className="rds-comp-notification__image-sidebar"
                            sx={{ width: 90, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                        >
                            <Box
                                component="img"
                                src={notification.image || defaultImage}
                                alt="Notification"
                                sx={{ width: 70, height: 70, objectFit: "contain" }}
                            />
                        </Box>
                    )}
                    
                    <Box sx={{ 
                        flex: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? 1 : "none",
                        padding: layout === NotificationLayout.Horizontal && style === NotificationStyle.Image ? 2 : 0,
                        position: "relative"
                    }}>
                    
                    {resolvedDismissVisible && (
                        <RdsIconButton iconFilled={dismissIconElement} size="small" aria-label="Dismiss notification" onClick={(e) => handleDismiss(e, notification, index)} className="rds-comp-notification__dismiss" />)}
                   
                    <Box
                        className="rds-comp-notification__header"
                        sx={{ display: "flex", alignItems: layout === NotificationLayout.Horizontal ? "center" : "flex-start", flexDirection: layout === NotificationLayout.Horizontal ? "row" : "column", marginBottom: 1, }}>
                       
                        {style === NotificationStyle.Image &&
                            (layout === NotificationLayout.Vertical ||
                                layout === NotificationLayout.Horizontal) && (
                                <Box
                                    className="rds-comp-notification__title-section" sx={{ flexGrow: 1, paddingLeft: 0, }}>
                                    <Typography variant="subtitle1" component="strong" className="rds-comp-notification__title" sx={{ fontWeight: "bold" }}>
                                        {title ?? notification.title}
                                    </Typography>
                                    {notification.time && (
                                        <Typography variant="body2" component="span" className="rds-comp-notification__time" sx={{ marginLeft: 1 }}>
                                            {notification.time}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        {style === NotificationStyle.Image && layout === NotificationLayout.Vertical && (
                            <Box className="rds-comp-notification__image-container">
                            <Box
                                component="img"
                                src={notification.image || defaultImage}
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
                                            sx={{ marginLeft: 1 }}
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
                        >
                            {description ?? notification.description}
                        </Typography>
                    </CardContent>
                    <Box
                        className="rds-comp-notification__footer"
                        sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2, gap: 1,
                        }}
                    >
                        {resolvedShowButton && (
                            <>
                                {resolvedShowSecondaryButton && (
                                    <RdsButton text="DISMISS" size="small" onClick={(e) => handleSecondaryButtonClick(e, notification, index)} className="rds-comp-notification__secondary-button"
                                    />
                                )}
                                {resolvedShowPrimaryButton && (
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
