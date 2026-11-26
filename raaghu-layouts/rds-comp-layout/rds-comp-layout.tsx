import React from 'react';
import { Box, type BoxProps } from '@mui/material';
import './rds-comp-layout.scss';
import renderLayoutContent from './renderLayoutContent';
import { mergeSx } from '../../raaghu-elements/shared/utils/styling-props';

export interface RdsCompLayoutProps extends BoxProps {
  children?: React.ReactNode;
  spacing?: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  fullHeight?: boolean;
  fullWidth?: boolean;
  displayType?: 'Basic' | 'Board' | 'Boxify' | 'Cardify' | 'Collage'|'Gridify'|'Highlight'|'Matrix'|'Mosaic'| 'Nexus'|'Pinboard'|'Sections'|'Snapshots'|'Splitz'|'Spotlight' |'Stacks'| 'Dashboard'|'Relaxed';
  hasShadow?: boolean;
   mode?: 'standard',
}


const RdsCompLayout = React.forwardRef<HTMLDivElement, RdsCompLayoutProps>(function RdsCompLayout({
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
  style,
  ...props
}, ref) {
  const layoutClass = `rds-layout ${direction} ${fullHeight ? 'full-height' : ''} ${fullWidth ? 'full-width' : ''} ${className || ''}`;


 
    return (
  <>
 {mode ==='standard' ? (renderLayoutContent(displayType?? 'Basic', hasShadow, { ref, className, sx, style })) : (
  <Box
      ref={ref}
      className={layoutClass}
      style={style}
      sx={mergeSx({
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        justifyContent,
        alignItems,
        gap: spacing,
        height: fullHeight ? '100%' : 'auto',
        width: fullWidth ? '100%' : 'auto',
      }, sx)}
      {...props}
    >
      {children}
    </Box>)}
  </>


    )
});
RdsCompLayout.displayName = 'RdsCompLayout';
export default RdsCompLayout;
