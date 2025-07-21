import React from 'react';
import { Alert as MuiAlert, AlertProps, AlertColor } from '@mui/material';

export interface RdsAlertProps extends AlertProps {
  message?: string;
  type?: AlertColor;
}

const RdsAlert: React.FC<RdsAlertProps> = ({
  message,
  children,
  type = 'info',
  severity,
  ...props
}) => {
  return (
    <MuiAlert severity={severity || type} {...props}>
      {message || children}
    </MuiAlert>
  );
};

export default RdsAlert;
