import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  AppBarProps,
  Typography,
  IconButton,
  Box
} from '@mui/material';

export interface RdsAppBarProps extends AppBarProps {
  title?: string;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
  centerContent?: React.ReactNode;
}

const RdsAppBar: React.FC<RdsAppBarProps> = ({
  title,
  leftActions,
  rightActions,
  centerContent,
  children,
  ...props
}) => {
  return (
    <MuiAppBar {...props}>
      <MuiToolbar>
        {leftActions && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {leftActions}
          </Box>
        )}
        
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          {centerContent || (title && (
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          ))}
        </Box>
        
        {rightActions && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {rightActions}
          </Box>
        )}
        
        {children}
      </MuiToolbar>
    </MuiAppBar>
  );
};

export default RdsAppBar;
