import type { Ref } from 'react';
import { Box, Typography, LinearProgress, CircularProgress, type BoxProps } from '@mui/material';
import clsx from 'clsx';
import './rds-loader.scss';
export interface RdsLoaderProps extends Omit<BoxProps, 'type' | 'color' | 'variant' | 'ref' | 'children'> {
  /** Loader shape for the MUI-based loaders. @default 'circular' */
  variant?: 'linear' | 'circular';
  /** Loader size. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Theme color of the MUI progress indicator. @default 'primary' */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  /** Progress value (0-100). When set the loader is determinate and shows the percentage. */
  value?: number;
  /** Text shown with the loader and used as its accessible label. */
  label?: string;
  /** Render on a full-area overlay backdrop. @default false */
  overlay?: boolean;
  /** Stroke thickness of the circular loader. @default 3.6 */
  thickness?: number;
  /** Name of a CSS-only loader style (e.g. `hash`, `rotate`); when set it replaces the MUI loaders. */
  type?: string;
  /** Ref to the root element. */
  ref?: Ref<HTMLElement>;
}

/** Loading indicator: MUI linear/circular progress or a CSS-only loader selected via `type`. */
const RdsLoader = ({ className, sx, ref, ...props }: RdsLoaderProps) => {
  const sxList = Array.isArray(sx) ? sx : [sx];
  const {
    variant = 'circular',
    size = 'medium',
    color = 'primary',
    value,
    label,
    overlay = false,
    thickness = 3.6,
    type: loaderType,
    ...rest
  } = props;

  if (loaderType) {
    let type = loaderType;
    if (type.startsWith('loader-')) {
      type = type.replace(/^loader-/, '');
    }
    const loaderClass = `rds-loader__${type}`;
    const sizeClass = `loader-${size}`;
    const classes = clsx(loaderClass, sizeClass);
    const Root = sx ? Box : 'div';
    return (
      <Root
        {...(rest as object)}
        ref={ref as Ref<HTMLDivElement>}
        className={clsx('d-flex justify-content-center my-5', className)}
        {...(sx ? { sx } : {})}
      >
        <div className={classes} />
        {typeof label === 'string' && label && (
          <div className="rds-loader__label-wrap">
            <span className="rds-loader__label">{label}</span>
          </div>
        )}
      </Root>
    );
  }

  // Overlay sits on a dark backdrop — keep label/value text light for contrast in light mode
  const overlayTextSx = overlay
    ? { color: 'var(--rds-neutral-0, #fff)' }
    : undefined;

  const getSizeValue = () => {
    if (variant === 'circular') {
      switch (size) {
        case 'small':
          return 24;
        case 'medium':
          return 40;
        case 'large':
          return 56;
        default:
          return 40;
      }
    }
    return undefined;
  };

  const rootProps = {
    ...rest,
    ref: ref as Ref<HTMLDivElement>,
    className: className || undefined,
  };

  const renderLoader = (root: object, extraSx: unknown[]) => {
    if (variant === 'linear') {
      return (
        <Box {...root} sx={[{ width: '100%' }, ...extraSx] as BoxProps['sx']}>
          {typeof label === 'string' && label && (
            <Typography
              variant="body2"
              color={overlay ? undefined : 'text.secondary'}
              sx={{ mb: 1, ...overlayTextSx }}
            >
              {label}
            </Typography>
          )}
          <LinearProgress
            variant={value !== undefined ? 'determinate' : 'indeterminate'}
            value={value}
            color={color}
            aria-label={typeof label === 'string' ? label || 'Loading' : 'Loading'}
          />
          {value !== undefined && (
            <Typography
              variant="body2"
              color={overlay ? undefined : 'text.secondary'}
              sx={{ mt: 1, ...overlayTextSx }}
            >
              {Math.round(value)}%
            </Typography>
          )}
        </Box>
      );
    }

    return (
      <Box
        {...root}
        sx={[
          {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          },
          ...extraSx,
        ] as BoxProps['sx']}
      >
        <CircularProgress
          variant={value !== undefined ? 'determinate' : 'indeterminate'}
          value={value}
          color={color}
          size={getSizeValue()}
          thickness={thickness}
          aria-label={typeof label === 'string' ? label || 'Loading' : 'Loading'}
        />
        {typeof label === 'string' && label && (
          <Typography
            variant="body2"
            color={overlay ? undefined : 'text.secondary'}
            sx={overlayTextSx}
          >
            {label}
          </Typography>
        )}
        {value !== undefined && (
          <Typography
            variant="body2"
            color={overlay ? undefined : 'text.secondary'}
            sx={overlayTextSx}
          >
            {Math.round(value)}%
          </Typography>
        )}
      </Box>
    );
  };

  if (overlay) {
    const Root = sx ? Box : 'div';
    return (
      <Root
        {...(rootProps as object)}
        className={clsx('rds-loader rds-loader--overlay', className)}
        role="presentation"
        {...(sx ? { sx } : {})}
      >
        {renderLoader({}, [])}
      </Root>
    );
  }

  return renderLoader(rootProps, sxList);
};
RdsLoader.displayName = 'RdsLoader';
export default RdsLoader;
