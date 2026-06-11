import { type SyntheticEvent } from 'react';
import { Snackbar as MuiSnackbar, Alert, type SnackbarProps } from '@mui/material';

export interface RdsSnackbarProps extends SnackbarProps {
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  showCloseButton?: boolean;
  onClose?: () => void;
  duration?: number;
}

const RdsSnackbar = ({
  message,
  type = 'info',
  showCloseButton = true,
  onClose,
  duration = 6000,
  autoHideDuration,
  children,
  ...props
}: RdsSnackbarProps) => {
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  const content = message || children;
  const alertTextColor = type ? `var(--rds-alert-${type}-text, var(--rds-text-primary))` : 'var(--rds-text-primary)';

  return (
    <MuiSnackbar
      open={props.open}
      autoHideDuration={autoHideDuration || duration}
      onClose={handleClose}
      {...props}
    >
      {type && message ? (
        <Alert
          onClose={showCloseButton ? handleClose : undefined}
          severity={type}
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
