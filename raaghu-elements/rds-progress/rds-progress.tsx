import React from 'react';
import {
  LinearProgress as MuiLinearProgress,
  CircularProgress as MuiCircularProgress,
  LinearProgressProps,
  CircularProgressProps,
  Box,
  Typography
} from '@mui/material';

export interface RdsProgressProps {
  type?: 'linear' | 'circular';
  value?: number;
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  size?: number;
  thickness?: number;
  showLabel?: boolean;
  label?: string;
  sx?: any;
}

const RdsProgress: React.FC<RdsProgressProps> = ({
  type = 'linear',
  value,
  variant = 'indeterminate',
  color = 'primary',
  size = 40,
  thickness = 3.6,
  showLabel = false,
  label,
  sx,
  ...props
}) => {
  if (type === 'circular') {
    const circularProps: CircularProgressProps = {
      variant: variant as any,
      value,
      color,
      size,
      thickness,
      sx,
      ...props,
    };

    if (showLabel && variant === 'determinate') {
      return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <MuiCircularProgress {...circularProps} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {label || `${Math.round(value || 0)}%`}
            </Typography>
          </Box>
        </Box>
      );
    }

    return <MuiCircularProgress {...circularProps} />;
  }

  const linearProps: LinearProgressProps = {
    variant: variant as any,
    value,
    color,
    sx,
    ...props,
  };

  if (showLabel && variant === 'determinate') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <MuiLinearProgress {...linearProps} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {label || `${Math.round(value || 0)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return <MuiLinearProgress {...linearProps} />;
};

export default RdsProgress;
