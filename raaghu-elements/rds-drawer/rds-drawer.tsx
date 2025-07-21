import React from 'react';
import { Drawer as MuiDrawer, DrawerProps } from '@mui/material';

export interface RdsDrawerProps extends DrawerProps {
  children: React.ReactNode;
  width?: number | string;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

const RdsDrawer: React.FC<RdsDrawerProps> = ({
  children,
  width = 250,
  position = 'left',
  anchor,
  sx,
  ...props
}) => {
  const drawerAnchor = anchor || position;
  
  return (
    <MuiDrawer
      anchor={drawerAnchor}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiDrawer>
  );
};

export default RdsDrawer;
