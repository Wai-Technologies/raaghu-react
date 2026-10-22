import clsx from "clsx";
import { Fragment, useState } from "react";
import type { FC, MouseEvent } from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsIconButton from "../../raaghu-elements/rds-icon-button/rds-icon-button";
import { getRaaghuLogoUrlFromDark } from "../../raaghu-elements/shared/constants/raaghu-logo";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-notification.scss";
import {
    NotificationLayout,
    NotificationStyle,
    NotificationType,
    type NotificationItem,
    type RdsCompNotificationProps,
} from "./rds-comp-notification.types";

const CustomBellIcon = () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.8 7.7L7.6 14.99M19.2 7.7L26.39 14.99M17.07 13.36C17.29 13.36 17.51 13.42 17.69 13.54C17.88 13.66 18.03 13.82 18.12 14.02L22.25 22.4C22.8 23.5 22.99 24.75 22.79 25.96C22.6 27.17 22.04 28.3 21.18 29.18C20.64 29.72 20 30.16 19.3 30.45C18.6 30.75 17.84 30.9 17.07 30.9C16.31 30.9 15.55 30.75 14.85 30.45C14.14 30.16 13.51 29.72 12.97 29.18C12.11 28.3 11.55 27.17 11.35 25.96C11.16 24.75 11.34 23.5 11.89 22.4L16.02 14.02C16.11 13.82 16.27 13.66 16.45 13.54C16.64 13.42 16.85 13.36 17.07 13.36ZM17.07 13.36L17.07 23.49M10.77 33H23.23M12.6 5.46L17 1L21.4 5.46L17 9.93L12.6 5.46ZM1 17.22L5.4 12.75L9.81 17.22L5.4 21.68L1 17.22ZM24.19 17.22L28.6 12.76L33 17.22L28.6 21.68L24.19 17.22Z" stroke="var(--rds-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const EMPTY_NOTIFICATIONS: NotificationItem[] = [];

const getNotificationKey = (notification: NotificationItem, index: number): string | number =>
    notification.id ?? notification.userNotificationId ?? `${notification.title}-${index}`;

const RdsCompNotification: FC<RdsCompNotificationProps> & { displayName?: string } = ({
    items,
    notifications: legacyNotifications,
    title,
    fallbackImage,
    defaultImage,
    orientation,
    layout: figmaLayout,
    variant,
    style: figmaStyle,
    severity,
    type,
    actions = 'none',
    dismiss,
    dismissLabel = 'DISMISS',
    acceptLabel = 'ACCEPT',
    description,
    className,
    onDismiss,
    onAccept,
    showButton: legacyShowButton,
    showPrimaryButton: legacyShowPrimaryButton,
    showSecondaryButton: legacyShowSecondaryButton,
    showDismiss: legacyShowDismiss,
}) => {
    if (type !== undefined) warnDeprecatedProp('RdsCompNotification', 'type', '`severity`');
    if (legacyNotifications !== undefined) warnDeprecatedProp('RdsCompNotification', 'notifications', '`items`');
    if (defaultImage !== undefined) warnDeprecatedProp('RdsCompNotification', 'defaultImage', '`fallbackImage`');
    if (dismiss !== undefined) warnDeprecatedProp('RdsCompNotification', 'dismiss', '`showDismiss`');
    const resolvedType = severity ?? type ?? NotificationType.Info;
    const notifications = items ?? legacyNotifications ?? EMPTY_NOTIFICATIONS;
    const layout = orientation ?? figmaLayout ?? NotificationLayout.Horizontal;
    const style = variant ?? figmaStyle ?? NotificationStyle.Default;

    const theme = useTheme();
    const resolvedDefaultImage =
        fallbackImage ?? defaultImage ?? getRaaghuLogoUrlFromDark(theme.palette.mode === 'dark');

    const resolvedDismissVisible = dismiss === 'visible' || legacyShowDismiss === true;
    const resolvedShowPrimaryButton = actions === 'primary' || actions === 'both' || legacyShowPrimaryButton === true;
    const resolvedShowSecondaryButton = actions === 'secondary' || actions === 'both' || legacyShowSecondaryButton === true;
    const resolvedShowButton = actions !== 'none' || legacyShowButton === true || resolvedShowPrimaryButton || resolvedShowSecondaryButton;

    const [dismissedNotificationKeys, setDismissedNotificationKeys] = useState<Array<string | number>>([]);
    const [prevNotifications, setPrevNotifications] = useState(notifications);
    const isReset = notifications !== prevNotifications;
    if (isReset) {
        setPrevNotifications(notifications);
        setDismissedNotificationKeys([]);
    }

    const visibleNotifications = notifications
        .map((notification, index) => ({ notification, key: getNotificationKey(notification, index) }))
        .filter(({ key }) => isReset || !dismissedNotificationKeys.includes(key));

    const dismissNotification = (event: MouseEvent<HTMLElement>, notification: NotificationItem, key: string | number) => {
        setDismissedNotificationKeys((prev) => prev.includes(key) ? prev : [...prev, key]);
        onDismiss?.(event, notification);
    };

    const isHorizontalImage = layout === NotificationLayout.Horizontal && style === NotificationStyle.Image;

    return (
        <Fragment>
            {visibleNotifications.map(({ notification, key }) => (
                <Card
                    role="status"
                    key={key}
                    className={clsx(
                      "rds-comp-notification",
                      `rds-comp-notification--layout-${layout}`,
                      `rds-comp-notification--style-${style}`,
                      `rds-comp-notification--type-${resolvedType}`,
                      className
                    )}
                    sx={{ padding: isHorizontalImage ? 0 : 2, marginBottom: 2, borderRadius: 2, position: "relative",display: isHorizontalImage ? "flex" : "block",overflow: "hidden"
                    }}>

                    {isHorizontalImage && (
                        <Box
                            className="rds-comp-notification__image-sidebar"
                            sx={{ width: 90, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                        >
                            <Box
                                component="img"
                                src={notification.image || resolvedDefaultImage}
                                alt={title ?? notification.title}
                                sx={{ width: 70, height: 70, objectFit: "contain" }}
                            />
                        </Box>
                    )}

                    <Box sx={{
                        flex: isHorizontalImage ? 1 : "none",
                        padding: isHorizontalImage ? 2 : 0,
                        position: "relative"
                    }}>

                    {resolvedDismissVisible && (
                        <RdsIconButton iconFilled={<Close />} size="small" aria-label="Dismiss notification" onClick={(e) => dismissNotification(e, notification, key)} className="rds-comp-notification__dismiss" />)}

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
                                src={notification.image || resolvedDefaultImage}
                                alt={title ?? notification.title}
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

                        {style !== NotificationStyle.Image && (
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
                                    <RdsButton text={dismissLabel} size="small" onClick={(e) => dismissNotification(e, notification, key)} className="rds-comp-notification__secondary-button"
                                    />
                                )}
                                {resolvedShowPrimaryButton && (
                                    <RdsButton text={acceptLabel} size="small" style="transparent" color="primary" onClick={(e) => onAccept?.(e, notification)} className="rds-comp-notification__primary-button"
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
