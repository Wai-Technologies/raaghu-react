import React from 'react';
import { Skeleton as MuiSkeleton, SkeletonProps, Box } from '@mui/material';

export interface RdsSkeletonProps extends SkeletonProps {
  type?: 'text' | 'rectangular' | 'rounded' | 'circular';
  lines?: number;
  /**
   * Number of skeleton blocks to show in a row/column
   */
  frames?: number;
}

const RdsSkeleton: React.FC<RdsSkeletonProps> = ({
  type = 'text',
  lines = 1,
  variant,
  frames = 1,
  sx,
  className = '',
  ...props
}) => {
  const isText = variant === 'text';
  const bemClass = `rds-skeleton rds-skeleton--${variant}` + (className ? ` ${className}` : '');

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
            variant={variant}
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
      variant={variant}
      {...props}
      sx={sx}
      className={bemClass}
    />
  );
};
RdsSkeleton.displayName = 'RdsSkeleton';
export default RdsSkeleton;
