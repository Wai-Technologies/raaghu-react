import React from 'react';
import { Skeleton as MuiSkeleton, type SkeletonProps, Box } from '@mui/material';

export interface RdsSkeletonProps extends SkeletonProps {
  frames?: number;
  shape?: 'text' | 'rectangular' | 'rounded' | 'circular';
  animated?: boolean;
  animation?: 'pulse' | 'wave' | false;
  height?: number | string;
  width?: number | string;
}

const RdsSkeleton = ({
  shape = 'text',
  frames = 1,
  animated = true,
  animation,
  sx,
  className = '',
  height,
  width,
  ...props
}: RdsSkeletonProps) => {
  const isText = shape === 'text';
  const bemClass = `rds-skeleton rds-skeleton--${shape}` + (className ? ` ${className}` : '');

  const animationValue = typeof animation !== 'undefined' ? animation : (animated ? 'pulse' : false);

  if (frames > 1) {
    return (
      <Box
        className={bemClass}
        style={{
          display: 'flex',
          flexDirection: isText ? 'column' : 'row',
          gap: 'var(--rds-spacing-md, 12px)',
          alignItems: isText ? 'flex-start' : 'center',
        }}
        sx={{
          display: 'flex',
          flexDirection: isText ? 'column' : 'row',
          gap: 'var(--rds-spacing-md, 12px)',
          alignItems: isText ? 'flex-start' : 'center',
        }}
      >
        {Array.from({ length: frames }).map((_, index) => (
          <MuiSkeleton
            key={index}
            variant={shape}
            animation={animationValue}
            {...props}
            sx={{ ...sx, height, width }}
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
      sx={{ ...sx, height, width }}
      className={bemClass}
    />
  );
};
RdsSkeleton.displayName = 'RdsSkeleton';
export default RdsSkeleton;