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
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export { NotificationLayout, NotificationStyle, NotificationType };
export type { NotificationItem, RdsCompNotificationProps };

const RdsCompNotification: React.FC<RdsCompNotificationProps> = ({
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
}) => {
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
        <Fragment>
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
        </Fragment>
    );
};
RdsCompNotification.displayName = "RdsCompNotification";
export default RdsCompNotification;
