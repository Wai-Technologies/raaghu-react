import React from 'react';
import RdsAvatar from '../rds-avatar/rds-avatar';
import { IconButton, Avatar, Menu as MuiMenu, Box, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import './rds-app-bar.scss';

export interface ProfileMenuItem {
  label: string;
  onClick?: () => void;
  sx?: object;
  icon?: React.ReactNode;
}

export interface ProfileMenuProps {
  name: string;
  // shortName?: string; // Commented out - automatically generated from name
  email: string;
  menuItems?: ProfileMenuItem[];
}

export const ProfileMenu = ({ name, email, menuItems }: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const open = Boolean(anchorEl);
  
  // Auto-generate shortName from name (replaces manual userShortName control)
  const displayShortName = name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  
  // Check if screen is small to hide name text
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Default menu items if none provided
  const defaultMenuItems: ProfileMenuItem[] = [
    { label: 'My Profile', icon: <PersonIcon fontSize="small" /> },
    { label: 'Theme', icon: <Brightness5Icon fontSize="small" /> },
    { label: 'Setting', icon: <SettingsIcon fontSize="small" /> },
    { label: 'Help', icon: <HelpOutlineIcon fontSize="small" /> },
    { label: 'Logout', icon: <LogoutIcon fontSize="small" />, sx: { borderRadius: '0 0 8px 8px' } },
  ];
  const items = menuItems && menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        size="small"
        className="rds-profile-menu__button"
      >
        <RdsAvatar
          subText={isSmallScreen ? undefined : "Developer"}
          displayStyle={isSmallScreen ? undefined : "with-name"}
          title={name}
          showDesignation={!isSmallScreen}
          showName={!isSmallScreen}
          size="small"
        />
        {!isSmallScreen && (
          <svg className="rds-profile-menu__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8L10 12L14 8" stroke="#7c4dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </IconButton>
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{ className: 'rds-profile-menu__dropdown' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box className="rds-profile-menu__header">
          <Avatar className="rds-profile-menu__avatar-lg">{displayShortName}</Avatar>
          <Box>
            <Box className="rds-profile-menu__name-lg">{name}</Box>
            <Box className="rds-profile-menu__email">{email}</Box>
          </Box>
        </Box>
        {items.map((item, idx) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              handleClose();
              item.onClick && item.onClick();
            }}
            className={`rds-profile-menu__item${idx === items.length - 1 ? ' rds-profile-menu__item--last' : ''}`}
            style={item.sx as React.CSSProperties}
          >
            {item.icon && <span className="rds-profile-menu__item-icon">{item.icon}</span>}
            {item.label}
          </MenuItem>
        ))}
      </MuiMenu>
    </>
  );
};
