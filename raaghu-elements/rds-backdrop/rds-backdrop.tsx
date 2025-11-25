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
  className = '',
  ...props
}) => {
  // If `open` is explicitly provided, it takes precedence.
  // Otherwise, derive visibility from `loading`.
  const isOpen = open !== undefined ? open : loading;

  // When loading, prefer the provided loadingComponent, otherwise fallback to a spinner.
  // Only render children when not loading.
  const content = loading
    ? (loadingComponent ?? <CircularProgress color="inherit" />)
    : children;

  // Combine our backdrop class with any provided className
  const backdropClassName = `rds-backdrop ${className}`.trim();

  // Remove the hardcoded color for loading spinner to let CSS handle theme-aware colors
  const { sx, ...restProps } = props as { sx?: any } & typeof props;

  // Ensure our custom styles take precedence over Material-UI defaults
  const backdropSx = {
    // Apply our custom backdrop styles with proper positioning
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
    },
    // Dark theme override
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
                             