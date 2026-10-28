import { type ReactNode, type SyntheticEvent } from 'react';
import { Snackbar as MuiSnackbar, Alert, type AlertColor, type SnackbarProps } from '@mui/material';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export interface RdsSnackbarProps extends Omit<SnackbarProps, 'component'> {
  /** Content of the alert; when set, the snackbar renders an Alert. */
  message?: ReactNode;
  /** @deprecated Use `severity` instead. */
  type?: AlertColor;
  /** Alert severity. Defaults to 'info'. */
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
  if (type !== undefined) warnDeprecatedProp('RdsSnackbar', 'type', '`severity`');
  if (duration !== undefined) warnDeprecatedProp('RdsSnackbar', 'duration', '`autoHideDuration`');
  const resolvedSeverity = severity ?? type ?? 'info';
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
  const ALERT_TEXT_BY_SEVERITY: Record<AlertColor, string> = {
    success: 'var(--rds-alert-success-text)',
    error: 'var(--rds-alert-error-text)',
    warning: 'var(--rds-alert-warning-text)',
    info: 'var(--rds-alert-info-text)',
  };
  const alertTextColor = ALERT_TEXT_BY_SEVERITY[resolvedSeverity] ?? 'var(--rds-text-primary)';

  return (
    <MuiSnackbar
      autoHideDuration={autoHideDuration || duration || 6000}
      onClose={handleClose}
      {...props}
    >
      {resolvedSeverity && content ? (
        <Alert
          onClose={showClose ? handleClose : undefined}
          severity={resolvedSeverity}
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
