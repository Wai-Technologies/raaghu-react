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
  type?: string; // Optional prop for loader type
}


const RdsLoader = (props: RdsLoaderProps) => {
  // type logic: if present, render custom loader type and size
  if (props.type) {
    const size = props.size || "medium";
    // Remove 'loader-' prefix if present for BEM compliance
    let type = props.type;
    if (type.startsWith('loader-')) {
      type = type.replace(/^loader-/, '');
    }
    const loaderClass = `rds-loader__${type}`;
    const sizeClass = `loader-${size}`;
    const classes = `${loaderClass} ${sizeClass}`.trim();
    return (
      <div className="d-flex justify-content-center my-5">
        <div className={classes} />
        {props.label && (
          <div style={{ marginTop: 12, textAlign: "center", width: "100%" }}>
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
