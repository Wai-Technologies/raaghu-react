import React from 'react';
import { Box, Typography, LinearProgress, CircularProgress } from '@mui/material';
import { joinClassNames, mergeSx, type RdsStylingProps } from '../shared/utils/styling-props';
import './rds-loader.scss';
export interface RdsLoaderProps extends RdsStylingProps {
  variant?: 'linear' | 'circular';
  size?: 'small' | 'medium' | 'large';
  /** `info` is kept for backward compatibility and renders as `primary` (they share the same blue). */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  value?: number;
  label?: string;
  overlay?: boolean;
  thickness?: number;
  type?: string; 
}


const RdsLoader = React.forwardRef<HTMLDivElement, RdsLoaderProps>(function RdsLoader(props, ref) {
  const { className, sx, style } = props;
  if (props.type) {
    const size = props.size || "medium";
    let type = props.type;
    if (type.startsWith('loader-')) {
      type = type.replace(/^loader-/, '');
    }
    const loaderClass = `rds-loader__${type}`;
    const sizeClass = `loader-${size}`;
    const classes = `${loaderClass} ${sizeClass}`.trim();
    return (
      <Box ref={ref} className={joinClassNames('d-flex justify-content-center my-5', className)} sx={sx} style={style}>
        <div className={classes} />
        {typeof props.label === 'string' && props.label && (
          <div className="rds-loader__label-wrap">
            <span className="rds-loader__label">{props.label}</span>
          </div>
        )}
      </Box>
    );
  }

  const {
    variant = 'circular',
    size = 'medium',
    color: colorProp = 'primary',
    value,
    label,
    overlay = false,
    thickness = 3.6,
  } = props;

  // `info` and `primary` look the same, so `info` is folded into `primary`.
  const color = colorProp === 'info' ? 'primary' : colorProp;

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

  const linearHeight = { small: 2, medium: 4, large: 8 }[size] ?? 4;

  const renderLoader = (isRoot = false) => {
    if (variant === 'linear') {
      return (
        <Box ref={isRoot ? ref : undefined} className={isRoot ? className : undefined} sx={mergeSx({ width: '100%' }, isRoot && sx)} style={isRoot ? style : undefined}>
          {typeof label === 'string' && label && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {label}
            </Typography>
          )}
          <LinearProgress
            variant={value !== undefined ? 'determinate' : 'indeterminate'}
            value={value}
            color={color}
            sx={{ height: linearHeight, borderRadius: linearHeight / 2 }}
            aria-label={typeof label === 'string' ? label || 'Loading' : 'Loading'}
          />
          {value !== undefined && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {Math.round(value)}%
            </Typography>
          )}
        </Box>
      );
    }

    return (
      <Box
        ref={isRoot ? ref : undefined}
        className={isRoot ? className : undefined}
        sx={mergeSx({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }, isRoot && sx)}
        style={isRoot ? style : undefined}
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
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        )}
        {value !== undefined && (
          <Typography variant="body2" color="text.secondary">
            {Math.round(value)}%
          </Typography>
        )}
      </Box>
    );
  };

  if (overlay) {
    return (
      <Box
        ref={ref}
        className={className}
        style={style}
        sx={mergeSx({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--rds-overlay-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 'var(--rds-z-index-tooltip, 9999)',
        }, sx)}
      >
        {renderLoader()}
      </Box>
    );
  }

  return renderLoader(true);
});
RdsLoader.displayName = 'RdsLoader';
export default RdsLoader;
