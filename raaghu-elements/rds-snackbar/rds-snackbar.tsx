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
  /** Shows the close button on the alert. */
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
  showCloseButton = true,
  onClose,
  duration,
  autoHideDuration,
  children,
  ...props
}: RdsSnackbarProps) => {
  if (type !== undefined) warnDeprecatedProp('RdsSnackbar', 'type', '`severity`');
  if (duration !== undefined) warnDeprecatedProp('RdsSnackbar', 'duration', '`autoHideDuration`');
  const resolvedSeverity = severity ?? type ?? 'info';

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  const content = message || children;
  const alertTextColor = resolvedSeverity ? `var(--rds-alert-${resolvedSeverity}-text, var(--rds-text-primary))` : 'var(--rds-text-primary)';

  return (
    <MuiSnackbar
      autoHideDuration={autoHideDuration || duration || 6000}
      onClose={handleClose}
      {...props}
    >
      {resolvedSeverity && message ? (
        <Alert
          onClose={showCloseButton ? handleClose : undefined}
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
