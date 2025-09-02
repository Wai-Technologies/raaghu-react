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
  // If `open` is explicitly provided, it takes precedence.
  // Otherwise, derive visibility from `loading`.
  const isOpen = open !== undefined ? open : loading;

  // When loading, prefer the provided loadingComponent, otherwise fallback to a spinner.
  // Only render children when not loading.
  const content = loading
    ? (loadingComponent ?? <CircularProgress color="inherit" />)
    : children;

  // Ensure the spinner is visible by default: apply white color while loading.
  // Respect any user-provided sx by merging.
  const { sx, ...restProps } = props as { sx?: any } & typeof props;
  const mergedSx = loading
    ? (Array.isArray(sx) ? [{ color: '#130808' }, ...sx] : { color: '#130808', ...sx })
    : sx;

  return (
    <MuiBackdrop open={isOpen} sx={mergedSx} {...restProps}>
      {content}
    </MuiBackdrop>
  );
};

RdsBackdrop.displayName = 'RdsBackdrop';
export default RdsBackdrop;
