import React from 'react';
import { Box, BoxProps, Paper } from '@mui/material';
import './rds-comp-layout.css';
import renderLayoutContent from './renderLayoutContent';

export interface RdsCompLayoutProps extends BoxProps {
  children?: React.ReactNode;
  spacing?: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  fullHeight?: boolean;
  fullWidth?: boolean;
  displayType?: 'Basic' | 'Board' | 'Boxify' | 'Cardify' | 'Collage'|'Gridify'|'Highlight'|'Matrix'|'Mosaic'| 'Nexus'|'Pinboard'|'Sections'|'Snapshots'|'Splitz'|'Spotlight' |'Stacks';
  hasShadow?: boolean;
   mode?: 'standard',
}


const RdsCompLayout: React.FC<RdsCompLayoutProps> = ({
  children,
  spacing = 2,
  direction = 'column',
  wrap = false,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  fullHeight = false,
  fullWidth = false,
  displayType,
  hasShadow = false,
  className,
   mode,
  ...props
}) => {
  const layoutClass = `rds-layout ${direction} ${fullHeight ? 'full-height' : ''} ${fullWidth ? 'full-width' : ''} ${className || ''}`;


 
    return (
  <>
 {mode ==='standard' ? (renderLayoutContent(displayType?? 'Basic', hasShadow)) : (
  <Box
      className={layoutClass}
      sx={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        justifyContent,
        alignItems,
        gap: spacing,
        height: fullHeight ? '100%' : 'auto',
        width: fullWidth ? '100%' : 'auto',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>)}
  </>


  // return renderLayoutContent(displayType ?? 'Basic', hasShadow);

  // return (


  //   <Box
  //     className={layoutClass}
  //     sx={{
  //       display: 'flex',
  //       flexDirection: direction,
  //       flexWrap: wrap ? 'wrap' : 'nowrap',
  //       justifyContent,
  //       alignItems,
  //       gap: spacing,
  //       height: fullHeight ? '100%' : 'auto',
  //       width: fullWidth ? '100%' : 'auto',
  //       ...props.sx,
  //     }}
  //     {...props}
  //   >
  //     {children}
  //   </Box>
  // );
    )
};

export default RdsCompLayout;
