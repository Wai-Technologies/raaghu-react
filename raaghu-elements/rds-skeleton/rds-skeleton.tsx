import React from 'react';
import { Skeleton as MuiSkeleton, type SkeletonProps, Box } from '@mui/material';

export interface RdsSkeletonProps extends SkeletonProps {
  type?: 'text' | 'rectangular' | 'rounded' | 'circular';
  lines?: number;
  /**
   * Number of skeleton blocks to show in a row/column
   */
  frames?: number;
  shape?: 'text' | 'rectangular' | 'rounded' | 'circular';
  /**
   * Enable animation for the skeleton. When true, shows animated loading effect.
   * When false, shows static placeholder.
   */
  animated?: boolean;
  /**
   * Animation type: 'pulse', 'wave', or false. Overrides animated if provided.
   */
  animation?: 'pulse' | 'wave' | false;
}

const RdsSkeleton= ({
  type = 'text',
  lines = 1,
  shape,
  frames = 1,
  animated = true,
  animation,
  sx,
  className = '',
  ...props
}:RdsSkeletonProps) => {
  const isText = shape === 'text';
  const bemClass = `rds-skeleton rds-skeleton--${shape}` + (className ? ` ${className}` : '');

  // Determine animation value: use animation prop if provided, else fallback to animated boolean
  const animationValue = typeof animation !== 'undefined' ? animation : (animated ? 'pulse' : false);

  if (frames > 1) {
    return (
      <Box
        className={bemClass}
        sx={{
          display: 'flex',
          flexDirection: isText ? 'column' : 'row',
          gap: '12px',
          alignItems: isText ? 'flex-start' : 'center',
        }}
      >
        {Array.from({ length: frames }).map((_, index) => (
          <MuiSkeleton
            key={index}
            variant={shape}
            animation={animationValue}
            {...props}
            sx={{ ...sx }}
            className={bemClass}
          />
        ))}
      </Box>
    );
  }

  return (
    <MuiSkeleton
      variant={shape}
      animation={animationValue}
      {...props}
      sx={sx}
      className={bemClass}
    />
  );
};
RdsSkeleton.displayName = 'RdsSkeleton';
export default RdsSkeleton;
