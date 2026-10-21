import { type ReactNode } from 'react';
import { Box, type BoxProps } from '@mui/material';
import clsx from 'clsx';
import './rds-comp-layout.scss';
import renderLayoutContent from './renderLayoutContent';

export interface RdsCompLayoutProps extends BoxProps {
  children?: ReactNode;
  spacing?: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  fullHeight?: boolean;
  fullWidth?: boolean;
  displayType?: 'Basic' | 'Board' | 'Boxify' | 'Cardify' | 'Collage'|'Gridify'|'Highlight'|'Matrix'|'Mosaic'| 'Nexus'|'Pinboard'|'Sections'|'Snapshots'|'Splitz'|'Spotlight' |'Stacks'| 'Dashboard'|'Relaxed';
  hasShadow?: boolean;
  mode?: 'standard';
}

const RdsCompLayout = ({
  children,
  spacing = 2,
  direction = 'column',
  fullHeight = false,
  fullWidth = false,
  displayType,
  hasShadow = false,
  wrap = false,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  className,
  mode,
  sx,
  ...props
}: RdsCompLayoutProps) => {
  if (mode === 'standard') {
    return renderLayoutContent(displayType ?? 'Basic', hasShadow);
  }

  return (
    <Box
      {...props}
      className={clsx('rds-layout', direction, fullHeight && 'full-height', fullWidth && 'full-width', className)}
      sx={[
        {
          display: 'flex',
          flexDirection: direction,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          justifyContent,
          alignItems,
          gap: spacing,
          height: fullHeight ? '100%' : 'auto',
          width: fullWidth ? '100%' : 'auto',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};
RdsCompLayout.displayName = 'RdsCompLayout';
export default RdsCompLayout;
