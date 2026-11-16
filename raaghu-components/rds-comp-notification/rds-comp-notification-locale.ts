/** Overridable UI strings of `RdsCompNotification`. */
export interface RdsCompNotificationLocaleText {
  /** Accessible label of the dismiss (close) icon button. */
  dismissNotificationLabel: string;
  /** Label of the secondary button when `dismissLabel` is not set. */
  dismiss: string;
  /** Label of the primary button when `acceptLabel` is not set. */
  accept: string;
}

export const DEFAULT_RDS_COMP_NOTIFICATION_LOCALE_TEXT: RdsCompNotificationLocaleText = {
  dismissNotificationLabel: "Dismiss notification",
  dismiss: "DISMISS",
  accept: "ACCEPT",
};
