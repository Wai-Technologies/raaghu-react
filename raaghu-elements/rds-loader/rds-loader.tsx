import { Box, Typography, LinearProgress, CircularProgress } from '@mui/material';
import clsx from 'clsx';
import './rds-loader.scss';
export interface RdsLoaderProps {
  variant?: 'linear' | 'circular';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  value?: number;
  label?: string;
  overlay?: boolean;
  thickness?: number;
  type?: string; 
}


const RdsLoader = (props: RdsLoaderProps) => {
  if (props.type) {
    const size = props.size || "medium";
    let type = props.type;
    if (type.startsWith('loader-')) {
      type = type.replace(/^loader-/, '');
    }
    const loaderClass = `rds-loader__${type}`;
    const sizeClass = `loader-${size}`;
    const classes = clsx(loaderClass, sizeClass);
    return (
      <div className="d-flex justify-content-center my-5">
        <div className={classes} />
        {typeof props.label === 'string' && props.label && (
          <div className="rds-loader__label-wrap">
            <span className="rds-loader__label">{props.label}</span>
          </div>
        )}
      </div>
    );
  }

  const {
    variant = 'circular',
    size = 'medium',
    color = 'primary',
    value,
    label,
    overlay = false,
    thickness = 3.6,
  } = props;

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

  const renderLoader = () => {
    if (variant === 'linear') {
      return (
        <Box sx={{ width: '100%' }}>
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
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
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

  const loaderElement = renderLoader();

  if (overlay) {
    return (
      <Box className="rds-loader rds-loader--overlay" role="presentation">
        {loaderElement}
      </Box>
    );
  }

  return loaderElement;
};
RdsLoader.displayName = 'RdsLoader';
export default RdsLoader;
