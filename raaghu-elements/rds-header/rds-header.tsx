import React from 'react';
import { 
  AppBar as MuiAppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  AppBarProps
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export interface RdsHeaderProps extends AppBarProps {
  title?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  actions?: React.ReactNode;
}

const RdsHeader: React.FC<RdsHeaderProps> = ({
  title,
  onMenuClick,
  showMenuButton = false,
  actions,
  children,
  ...props
}) => {
  return (
    <MuiAppBar {...props}>
      <Toolbar>
        {showMenuButton && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {actions}
        {children}
      </Toolbar>
    </MuiAppBar>
  );
};

export default RdsHeader;
