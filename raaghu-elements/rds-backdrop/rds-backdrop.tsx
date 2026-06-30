import { type ReactNode, isValidElement } from 'react';
import {
  Backdrop as MuiBackdrop,
  BackdropProps,
  CircularProgress
} from '@mui/material';

export interface RdsBackdropProps extends Omit<BackdropProps, 'open' | 'component'> {
  loading?: boolean;
  loadingComponent?: ReactNode;
  open?: boolean;
}

const RdsBackdrop = ({
  loading = false,
  loadingComponent,
  children,
  open,
  className = '',
  ...props
}: RdsBackdropProps) => {
  const isOpen = open !== undefined ? open : loading;

  const resolvedLoadingComponent =
    loadingComponent != null && isValidElement(loadingComponent)
      ? loadingComponent
      : <CircularProgress color="inherit" />;

  const content = loading ? resolvedLoadingComponent : children;

  const backdropClassName = className ? `rds-backdrop ${className}` : 'rds-backdrop';

  const { sx, ...restProps } = props;

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
      zIndex: 'var(--rds-z-index-overlay, 1300)',
      backgroundColor: 'var(--rds-overlay-dark, rgba(0, 0, 0, 0.5))',
      color: 'var(--rds-neutral-0, #ffffff)',
    },
    '.dark-theme &.rds-backdrop, [data-theme="dark"] &.rds-backdrop': {
      backgroundColor: 'var(--rds-overlay-semi, rgba(128, 128, 128, 0.4))',
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
                             