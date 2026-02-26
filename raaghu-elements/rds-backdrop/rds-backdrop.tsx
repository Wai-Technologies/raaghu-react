import React from 'react';
import {
  Backdrop as MuiBackdrop,
  BackdropProps,
  CircularProgress
} from '@mui/material';

export interface RdsBackdropProps extends Omit<BackdropProps, 'open'> {
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  open?: boolean;
}

const RdsBackdrop: React.FC<RdsBackdropProps> = ({
  loading = false,
  loadingComponent,
  children,
  open,
  className = '',
  ...props
}) => {
  const isOpen = open !== undefined ? open : loading;

  const content = loading
    ? (loadingComponent ?? <CircularProgress color="inherit" />)
    : children;

  const backdropClassName = `rds-backdrop ${className}`.trim();

  const { sx, ...restProps } = props as { sx?: any } & typeof props;

  const backdropSx = {
    '&.rds-backdrop': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1300,
      backgroundColor: 'var(--rds-background-overlay, rgba(0, 0, 0, 0.5))',
      color: '#ffffff',
    },
    '.dark-theme &.rds-backdrop, [data-theme="dark"] &.rds-backdrop': {
      backgroundColor: 'rgba(128, 128, 128, 0.4)',
    },
    ...sx
  };

  return (
    <MuiBackdrop open={isOpen} className={backdropClassName} sx={backdropSx} {...restProps}>
      {content}
    </MuiBackdrop>
  );
};

RdsBackdrop.displayName = 'RdsBackdrop';
export default RdsBackdrop;
                             