import React from 'react';
import { Snackbar as MuiSnackbar, Alert, SnackbarProps } from '@mui/material';
import { MotionSnackbarTransition } from '../../raaghu-react-themes/src/motion';

export interface RdsSnackbarProps extends SnackbarProps {
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  showCloseButton?: boolean;
  onClose?: () => void;
  duration?: number;
  animationDuration?: number;
}

const RdsSnackbar: React.FC<RdsSnackbarProps> = ({
  message,
  type = 'info',
  showCloseButton = true,
  onClose,
  duration = 6000,
  autoHideDuration,
  children,
  animationDuration,
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
  const alertTextColor = type ? `var(--rds-alert-${type}-text, var(--rds-text-primary))` : 'var(--rds-text-primary)';

  return (
    <MuiSnackbar
      open={props.open}
      autoHideDuration={autoHideDuration || duration}
      onClose={handleClose}
      TransitionComponent={MotionSnackbarTransition}
      TransitionProps={{ durationMs: animationDuration } as any}
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
