import React from 'react';
import { Snackbar as MuiSnackbar, Alert, SnackbarProps } from '@mui/material';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

type SnackbarColor = 'success' | 'error' | 'warning' | 'info';

export interface RdsSnackbarProps extends Omit<SnackbarProps, 'color'> {
  message?: string;
  /** Semantic color of the snackbar alert. @default 'info' */
  color?: SnackbarColor;
  /** @deprecated Use `color`. */
  type?: SnackbarColor;
  /** Shows the close button of the alert. @default true */
  showCloseButton?: boolean;
  /** @deprecated Use `showCloseButton`. */
  hideCloseButton?: boolean;
  /** @deprecated Use `color`. */
  severity?: SnackbarColor;
  onClose?: () => void;
  /** Time in milliseconds before the snackbar hides itself. @default 6000 */
  duration?: number;
}

const RdsSnackbar = React.forwardRef<HTMLDivElement, RdsSnackbarProps>(function RdsSnackbar({
  message,
  color,
  type,
  showCloseButton,
  hideCloseButton,
  severity,
  onClose,
  duration = 6000,
  autoHideDuration,
  children,
  ...props
}, ref) {
  if (type !== undefined) warnDeprecatedProp('RdsSnackbar', 'type', '`color`');
  const resolvedColor: SnackbarColor = color ?? severity ?? type ?? 'info';
  if (hideCloseButton !== undefined) warnDeprecatedProp('RdsSnackbar', 'hideCloseButton', '`showCloseButton`');
  const showClose = showCloseButton ?? (hideCloseButton === undefined ? true : !hideCloseButton);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  const content = message || children;
  const alertTextColor = `var(--rds-alert-${resolvedColor}-text, var(--rds-text-primary))`;

  return (
    <MuiSnackbar
      open={props.open}
      autoHideDuration={autoHideDuration ?? duration}
      onClose={handleClose}
      {...props}
      ref={ref}
    >
      {content ? (
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
});
RdsSnackbar.displayName = 'RdsSnackbar';
export default RdsSnackbar;
