import React from 'react';
import { Skeleton as MuiSkeleton, SkeletonProps } from '@mui/material';

export interface RdsSkeletonProps extends SkeletonProps {
  type?: 'text' | 'rectangular' | 'rounded' | 'circular';
  lines?: number;
}

const RdsSkeleton: React.FC<RdsSkeletonProps> = ({
  type = 'text',
  lines = 1,
  variant,
  ...props
}) => {
  const skeletonVariant = variant || type;

  if (type === 'text' && lines > 1) {
    return (
      <div>
        {Array.from({ length: lines }).map((_, index) => (
          <MuiSkeleton
            key={index}
            variant={skeletonVariant}
            {...props}
            sx={{
              marginBottom: index < lines - 1 ? 1 : 0,
              ...props.sx,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <MuiSkeleton
      variant={skeletonVariant}
      {...props}
    />
  );
};

export default RdsSkeleton;
