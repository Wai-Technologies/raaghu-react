import { forwardRef } from 'react';
import { Skeleton as MuiSkeleton, type SkeletonProps, Box } from '@mui/material';

export interface RdsSkeletonProps extends SkeletonProps {
  frames?: number;
  shape?: 'text' | 'rectangular' | 'rounded' | 'circular';
  animated?: boolean;
  animation?: 'pulse' | 'wave' | false;
  height?: number | string;
  width?: number | string;
}

const RdsSkeleton = forwardRef<HTMLElement, RdsSkeletonProps>(function RdsSkeleton({
  shape = 'text',
  frames = 1,
  animated = true,
  animation,
  sx,
  className = '',
  height,
  width,
  ...props
}, ref) {
  const isText = shape === 'text';
  const bemClass = `rds-skeleton rds-skeleton--${shape}` + (className ? ` ${className}` : '');

  const animationValue = animation ?? (animated ? 'pulse' : false);

  if (frames > 1) {
    return (
      <Box
        ref={ref}
        className={bemClass}
        sx={{
          display: 'flex',
          flexDirection: isText ? 'column' : 'row',
          gap: 'var(--rds-spacing-md, var(--rds-spacing-12-px))',
          alignItems: isText ? 'flex-start' : 'center',
        }}
      >
        {Array.from({ length: frames }).map((_, index) => (
          <MuiSkeleton
            key={`skeleton-frame-${index + 1}`}
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
      ref={ref}
      variant={shape}
      animation={animationValue}
      {...props}
      sx={{ ...sx, height, width }}
      className={bemClass}
    />
  );
});
RdsSkeleton.displayName = 'RdsSkeleton';
export default RdsSkeleton;