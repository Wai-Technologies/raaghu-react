import React, { Fragment, useState, useEffect } from "react";
import "./rds-comp-notification.scss";
import {
  NotificationLayout,
  NotificationStyle,
  NotificationType,
  NotificationItem,
  RdsCompNotificationProps,
} from "./rds-comp-notification-types";
import { NotificationCard } from "./rds-comp-notification-helpers";

export { NotificationLayout, NotificationStyle, NotificationType };
export type { NotificationItem, RdsCompNotificationProps };

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
        <Fragment>
            {visibleNotifications.map((notification, index) => (
                <NotificationCard
                    key={notification.userNotificationId ?? `notification-${index}`}
                    notification={notification}
                    index={index}
                    layout={layout}
                    style={style}
                    type={type}
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
        </Fragment>
    );
};
RdsCompNotification.displayName = "RdsCompNotification";
export default RdsCompNotification;
