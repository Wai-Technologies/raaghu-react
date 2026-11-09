import { type ReactNode, type SyntheticEvent } from 'react';
import { Snackbar as MuiSnackbar, Alert, type AlertColor, type SnackbarProps } from '@mui/material';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export interface RdsSnackbarProps extends Omit<SnackbarProps, 'component'> {
  /** Content of the alert; when set, the snackbar renders an Alert. */
  message?: ReactNode;
  /** Semantic color of the alert. Defaults to 'info'. */
  color?: AlertColor;
  /** @deprecated Use `color` instead. */
  type?: AlertColor;
  /** @deprecated Use `color` instead. */
  severity?: AlertColor;
  /** Hides the close button on the alert. */
  hideCloseButton?: boolean;
  /** @deprecated Use `hideCloseButton` instead. */
  showCloseButton?: boolean;
  /** Called when the snackbar closes (clickaway is ignored). */
  onClose?: () => void;
  /** @deprecated Use `autoHideDuration` instead. */
  duration?: number;
}

/** Transient notification built on MUI Snackbar and Alert. */
const RdsSnackbar = ({
  message,
  color,
  type,
  severity,
  hideCloseButton,
  showCloseButton,
  onClose,
  duration,
  autoHideDuration,
  children,
  ...props
}: RdsSnackbarProps) => {
  if (type !== undefined) warnDeprecatedProp('RdsSnackbar', 'type', '`color`');
  if (severity !== undefined) warnDeprecatedProp('RdsSnackbar', 'severity', '`color`');
  if (duration !== undefined) warnDeprecatedProp('RdsSnackbar', 'duration', '`autoHideDuration`');
  const resolvedColor = color ?? severity ?? type ?? 'info';
  if (showCloseButton !== undefined) warnDeprecatedProp('RdsSnackbar', 'showCloseButton', '`hideCloseButton`');
  const showClose = hideCloseButton === undefined ? showCloseButton ?? true : !hideCloseButton;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  const content = message || children;
  const ALERT_TEXT_BY_COLOR: Record<AlertColor, string> = {
    success: 'var(--rds-alert-success-text)',
    error: 'var(--rds-alert-error-text)',
    warning: 'var(--rds-alert-warning-text)',
    info: 'var(--rds-alert-info-text)',
  };
  const alertTextColor = ALERT_TEXT_BY_COLOR[resolvedColor] ?? 'var(--rds-text-primary)';

  return (
    <MuiSnackbar
      autoHideDuration={autoHideDuration || duration || 6000}
      onClose={handleClose}
      {...props}
    >
      {resolvedColor && content ? (
        <Alert
          onClose={showClose ? handleClose : undefined}
          severity={resolvedColor}
          sx={{
            width: '100%',
            '& .MuiAlert-message': {
              color: alertTextColor,
            },
            '& .MuiAlert-icon, & .MuiAlert-action .MuiIconButton-root': {
              color: alertTextColor,
            },
          }}
        >
          {content}
        </Alert>
      ) : (
        <div>{content}</div>
      )}
    </MuiSnackbar>
  );
};
RdsSnackbar.displayName = 'RdsSnackbar';
export default RdsSnackbar;
