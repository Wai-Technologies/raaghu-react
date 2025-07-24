import React from 'react';
import { Box, Typography, LinearProgress, CircularProgress } from '@mui/material';
import './rds-loader.scss';
export interface RdsLoaderProps {
  variant?: 'linear' | 'circular';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  value?: number;
  label?: string;
  overlay?: boolean;
  thickness?: number;
  loaderType?: string;
}


const RdsLoader: React.FC<RdsLoaderProps> = (props) => {
  // loaderType logic: if present, render custom loader type and size
  if (props.loaderType) {
    const size = props.size || 'medium';
    const color = props.color || 'primary';
    
    let type = props.loaderType;
    if (type.startsWith('loader-')) {
      type = type.replace(/^loader-/, '');
    }
    // BEM: rds-loader__type rds-loader--size rds-loader--color rds-loader--variant
    const loaderClass = `rds-loader__${type}`;
    const sizeClass = `rds-loader--${size}`;
    const colorClass = `rds-loader--${color}`;
    const variantClass = props.variant ? `rds-loader--${props.variant}` : '';
    const classes = [loaderClass, sizeClass, colorClass, variantClass].filter(Boolean).join(' ');

    // Inline style for custom loader types using CSS variables (design tokens)
    let style: React.CSSProperties = {};
    // Color CSS variable for all custom loaders
    if (props.color) {
      style['--rds-loader-color' as any] = `var(--rds-color-${props.color})`;
    }
    // Size CSS variable for all custom loaders
    if (props.size) {
      const sizeMap: Record<string, string> = {
        small: '40px',
        medium: '80px',
        large: '120px',
      };
      style['--rds-loader-size' as any] = sizeMap[props.size] || '80px';
    }
    // Loader-specific variables
    if (type === 'moving') {
      style['--loader-color' as any] = `var(--rds-color-${props.color})`;
    }
    if (type === 'line-wobble') {
      style['--uib-color' as any] = `var(--rds-color-${props.color})`;
    }
    if (type === 'spinner-ring') {
      if (props.size) {
        style['--spinner-ring-size' as any] = style['--rds-loader-size'];
      }
      if (props.color) {
        const cssVar = `var(--rds-color-${props.color})`;
        style['borderTopColor'] = cssVar;
        style['borderRightColor'] = cssVar;
      }
    }
    return (
      <div className="rds-loader__container">
        <div className={classes} style={style} />
        {props.label && (
          <div className="rds-loader__label-container">
            <span className="rds-loader__label">{props.label}</span>
          </div>
        )}
      </div>
    );
  }

  // --- original code below, unchanged ---
  const {
    variant = 'circular',
    size = 'medium',
    color = 'primary',
    value,
    label,
    overlay = false,
    thickness = 3.6,
  } = props;

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
          {label && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {label}
            </Typography>
          )}
          <LinearProgress
            variant={value !== undefined ? 'determinate' : 'indeterminate'}
            value={value}
            color={color}
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
        />
        {label && (
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
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        {renderLoader()}
      </Box>
    );
  }

  return renderLoader();
};

export default RdsLoader;
