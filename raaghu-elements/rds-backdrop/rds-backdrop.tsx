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
import { DEFAULT_RDS_BACKDROP_LOCALE_TEXT, type RdsBackdropLocaleText } from './rds-backdrop-locale';

export interface RdsBackdropProps extends Omit<BackdropProps, 'open' | 'component'> {
  /** Shows the loading indicator instead of `children`. Also opens the backdrop when `open` is not set. */
  loading?: boolean;
  /** Content shown while `loading`. Defaults to a `CircularProgress` spinner. */
  loadingIndicator?: ReactNode;
  /** @deprecated Use `loadingIndicator` instead. */
  loadingComponent?: ReactNode;
  /** Controls whether the backdrop is open; when omitted, `loading` decides. */
  open?: boolean;
  /** Overrides for the built-in English strings (aria-label of the default spinner). */
  localeText?: Partial<RdsBackdropLocaleText>;
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
    backgroundColor: 'var(--rds-backdrop-bg)',
    color: 'var(--rds-neutral-0)',
  },
});

const RdsBackdrop = ({
  loading = false,
  loadingIndicator,
  loadingComponent,
  children,
  open,
  localeText,
  className,
  sx,
  ...props
}: RdsBackdropProps) => {
  const text = { ...DEFAULT_RDS_BACKDROP_LOCALE_TEXT, ...localeText };
  if (loadingComponent !== undefined) {
    warnDeprecatedProp('RdsBackdrop', 'loadingComponent', '`loadingIndicator`');
  }

  const isOpen = open !== undefined ? open : loading;

  const indicator = loadingIndicator !== undefined ? loadingIndicator : loadingComponent;
  const resolvedIndicator =
    indicator == null || typeof indicator === 'boolean'
      ? <CircularProgress color="inherit" aria-label={text.loadingLabel} />
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
