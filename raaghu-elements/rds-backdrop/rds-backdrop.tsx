import type { ReactNode } from 'react';
import {
  Backdrop as MuiBackdrop,
  CircularProgress,
  type BackdropProps,
  type Theme
} from '@mui/material';
import type { SystemStyleObject } from '@mui/system';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export interface RdsBackdropProps extends Omit<BackdropProps, 'open' | 'component'> {
  /** Shows the loading indicator instead of `children`. Also opens the backdrop when `open` is not set. */
  loading?: boolean;
  /** Content shown while `loading`. Defaults to a `CircularProgress` spinner. */
  loadingIndicator?: ReactNode;
  /** @deprecated Use `loadingIndicator` instead. */
  loadingComponent?: ReactNode;
  open?: boolean;
}

const baseSx = (theme: Theme): SystemStyleObject<Theme> => ({
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
    zIndex: `var(--rds-z-index-overlay, ${theme.zIndex.modal})`,
    backgroundColor: 'var(--rds-overlay-dark, rgba(0, 0, 0, 0.5))',
    color: 'var(--rds-neutral-0)',
  },
  '.dark-theme &.rds-backdrop, [data-theme="dark"] &.rds-backdrop': {
    backgroundColor: 'var(--rds-overlay-semi, rgba(128, 128, 128, 0.4))',
  },
});

const RdsBackdrop = ({
  loading = false,
  loadingIndicator,
  loadingComponent,
  children,
  open,
  className,
  sx,
  ...props
}: RdsBackdropProps) => {
  if (loadingComponent !== undefined) {
    warnDeprecatedProp('RdsBackdrop', 'loadingComponent', '`loadingIndicator`');
  }

  const isOpen = open !== undefined ? open : loading;

  const indicator = loadingIndicator !== undefined ? loadingIndicator : loadingComponent;
  const resolvedIndicator =
    indicator == null || typeof indicator === 'boolean'
      ? <CircularProgress color="inherit" aria-label="Loading" />
      : indicator;

  const content = loading ? resolvedIndicator : children;

  return (
    <MuiBackdrop
      {...props}
      open={isOpen}
      className={clsx('rds-backdrop', className)}
      sx={[baseSx, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {content}
    </MuiBackdrop>
  );
};

RdsBackdrop.displayName = 'RdsBackdrop';
export default RdsBackdrop;
