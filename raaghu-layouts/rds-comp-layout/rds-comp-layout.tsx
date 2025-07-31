import React from 'react';
import { Box, BoxProps } from '@mui/material';
import './rds-comp-layout.scss';

export interface RdsCompLayoutProps extends BoxProps {
  children?: React.ReactNode;
  spacing?: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  fullHeight?: boolean;
  fullWidth?: boolean;
}

const RdsCompLayout: React.FC<RdsCompLayoutProps> = ({
  children,
  spacing = 2,
  direction = 'column',
  fullHeight = false,
  fullWidth = false,
  className,
  ...props
}) => {
  const layoutClass = [
    'rds-comp-layout',
    direction === 'row' ? 'rds-comp-layout--row' : '',
    fullHeight ? 'rds-comp-layout--full-height' : '',
    fullWidth ? 'rds-comp-layout--full-width' : '',
    className || ''
  ].join(' ').replace(/\s+/g, ' ').trim();

  return (
    <Box className={layoutClass} {...props}>
      {children}
    </Box>
  );
};

export default RdsCompLayout;
