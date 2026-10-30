import { Skeleton as MuiSkeleton, type SkeletonProps, Box } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export interface RdsSkeletonProps extends Omit<SkeletonProps, 'component'> {
  /** Number of skeleton blocks to render. Values above 1 wrap them in a flex container. */
  frames?: number;
  /** @deprecated Use `variant` instead. */
  shape?: 'text' | 'rectangular' | 'rounded' | 'circular';
  /** @deprecated Use `animation` instead. */
  animated?: boolean;
  /** Animation type; `false` disables it. Defaults to 'pulse'. */
  animation?: 'pulse' | 'wave' | false;
}

/** Placeholder block shown while content is loading. */
const RdsSkeleton = ({
  shape,
  variant,
  frames = 1,
  animated,
  animation,
  sx,
  className = '',
  height,
  width,
  'data-testid': dataTestId,
  ...props
}: RdsSkeletonProps & { 'data-testid'?: string }) => {
  if (shape !== undefined) warnDeprecatedProp('RdsSkeleton', 'shape', '`variant`');
  const resolvedVariant = variant ?? shape ?? 'text';
  const isText = resolvedVariant === 'text';
  const bemClass = clsx('rds-skeleton', `rds-skeleton--${resolvedVariant}`, className);
  const sizeSx = {
    ...(height !== undefined && { height }),
    ...(width !== undefined && { width }),
  };
  const mergedSx = [...(Array.isArray(sx) ? sx : [sx]), sizeSx];

  if (animated !== undefined) warnDeprecatedProp('RdsSkeleton', 'animated', '`animation`');
  const animationValue = animation ?? (animated === false ? false : 'pulse');

  if (frames > 1) {
    return (
      <Box
        className={bemClass}
        data-testid={dataTestId}
        style={{
          display: 'flex',
          flexDirection: isText ? 'column' : 'row',
          gap: 'var(--rds-spacing-md)',
          alignItems: isText ? 'flex-start' : 'center',
        }}
        sx={{
          display: 'flex',
          flexDirection: isText ? 'column' : 'row',
          gap: 'var(--rds-spacing-md)',
          alignItems: isText ? 'flex-start' : 'center',
        }}
      >
        {Array.from({ length: frames }, (_, frameNumber) => frameNumber + 1).map((frameNumber) => (
          <MuiSkeleton
            variant={resolvedVariant}
            animation={animationValue}
            {...props}
            sx={mergedSx}
            className={bemClass}
            key={frameNumber}
          />
        ))}
      </Box>
    );
  }

  return (
    <MuiSkeleton
      variant={resolvedVariant}
      animation={animationValue}
      {...props}
      data-testid={dataTestId}
      sx={mergedSx}
      className={bemClass}
    />
  );
};
RdsSkeleton.displayName = 'RdsSkeleton';
export default RdsSkeleton;
