import React from 'react';
import { Snackbar as MuiSnackbar, Alert, SnackbarProps } from '@mui/material';

export interface RdsSnackbarProps extends SnackbarProps {
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  showCloseButton?: boolean;
  onClose?: () => void;
  duration?: number;
}

const RdsSnackbar: React.FC<RdsSnackbarProps> = ({
  message,
  type = 'info',
  showCloseButton = true,
  onClose,
  duration = 6000,
  autoHideDuration,
  children,
  ...props
}) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  const content = message || children;

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
          sx={{ width: '100%' }}
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
