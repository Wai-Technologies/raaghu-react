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
  showCloseButton?: boolean;
  onClose?: () => void;
  duration?: number;
}

const RdsSnackbar: React.FC<RdsSnackbarProps> = ({
  message,
  color,
  type,
  showCloseButton = true,
  onClose,
  duration = 6000,
  autoHideDuration,
  children,
  ...props
}) => {
  if (type !== undefined) warnDeprecatedProp('RdsSnackbar', 'type', '`color`');
  const resolvedColor: SnackbarColor = color ?? type ?? 'info';

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
      autoHideDuration={autoHideDuration || duration}
      onClose={handleClose}
      {...props}
    >
      {message ? (
        <Alert
          onClose={showCloseButton ? handleClose : undefined}
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
