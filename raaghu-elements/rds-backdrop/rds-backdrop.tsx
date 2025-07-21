import React from 'react';
import {
  Backdrop as MuiBackdrop,
  BackdropProps,
  CircularProgress
} from '@mui/material';

export interface RdsBackdropProps extends BackdropProps {
  loading?: boolean;
  loadingComponent?: React.ReactNode;
}

const RdsBackdrop: React.FC<RdsBackdropProps> = ({
  loading = false,
  loadingComponent,
  children,
  open,
  ...props
}) => {
  const isOpen = open !== undefined ? open : loading;

  return (
    <MuiBackdrop open={isOpen} {...props}>
      {children || loadingComponent || <CircularProgress color="inherit" />}
    </MuiBackdrop>
  );
};

export default RdsBackdrop;
