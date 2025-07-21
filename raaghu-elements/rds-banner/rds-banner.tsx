import React from 'react';
import { Alert, AlertProps, AlertColor, IconButton, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

export interface RdsBannerProps extends Omit<AlertProps, 'severity' | 'onClose'> {
  message: string;
  type?: AlertColor;
  closable?: boolean;
  onClose?: () => void;
  persistent?: boolean;
  fullWidth?: boolean;
  actions?: React.ReactNode;
}

const RdsBanner: React.FC<RdsBannerProps> = ({
  message,
  type = 'info',
  closable = true,
  onClose,
  persistent = false,
  fullWidth = true,
  actions,
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible && !persistent) {
    return null;
  }

  return (
    <Alert
      severity={type}
      sx={{
        width: fullWidth ? '100%' : 'auto',
        borderRadius: 0,
        '& .MuiAlert-message': {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      }}
      action={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {actions}
          {closable && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <Close fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      }
      {...props}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {message}
        </Typography>
        {children}
      </Box>
    </Alert>
  );
};

export default RdsBanner;
