import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import "./rds-comp-notification.scss";
import {
  NotificationLayout,
  NotificationStyle,
  NotificationType,
  NotificationItem,
  RdsCompNotificationProps,
} from "./rds-comp-notification-types";
import { NotificationCard } from "./rds-comp-notification-helpers";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { joinClassNames } from "../../raaghu-elements/shared/utils/styling-props";

export { NotificationLayout, NotificationStyle, NotificationType };
export type { NotificationItem, RdsCompNotificationProps };

const RdsCompNotification = React.forwardRef<HTMLDivElement, RdsCompNotificationProps>(function RdsCompNotification({
    notifications,
    title,
    layout = NotificationLayout.Horizontal,
    style = NotificationStyle.Default,
    color,
    severity,
    type,
    showButton = false,
    showPrimaryButton = false,
    showSecondaryButton = false,
    showDismiss = false,
    description,
    onDismiss,
    onAccept,
    className,
    sx,
}, ref) {
    if (type !== undefined) warnDeprecatedProp('RdsCompNotification', 'type', '`color`');
    if (severity !== undefined) warnDeprecatedProp('RdsCompNotification', 'severity', '`color`');
    const resolvedType = color ?? severity ?? type ?? NotificationType.Info;
    const [visibleNotifications, setVisibleNotifications] = useState(notifications);

    useEffect(() => {
        setVisibleNotifications(notifications);
    }, [notifications]);

    const handleDismiss = (event: React.SyntheticEvent, notification: NotificationItem, notificationIndex: number) => {
        setVisibleNotifications(prev => 
            prev.filter((n, index) => index !== notificationIndex)
        );
        onDismiss?.(event, notification);
    };

    return (
        <Box ref={ref} className={joinClassNames("rds-comp-notification-list", className)} sx={sx}>
            {visibleNotifications.map((notification, index) => (
                <NotificationCard
                    key={notification.userNotificationId ?? `notification-${index}`}
                    notification={notification}
                    index={index}
                    layout={layout}
                    style={style}
                    type={resolvedType}
                    title={title}
                    description={description}
                    showButton={showButton}
                    showPrimaryButton={showPrimaryButton}
                    showSecondaryButton={showSecondaryButton}
                    showDismiss={showDismiss}
                    onDismiss={handleDismiss}
                    onAccept={onAccept}
                />
            ))}
        </Box>
    );
});
RdsCompNotification.displayName = "RdsCompNotification";
export default RdsCompNotification;
