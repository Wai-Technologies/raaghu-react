import React from 'react';
import RdsAvatar from '../rds-avatar/rds-avatar';
import { IconButton, Avatar, Menu as MuiMenu, Box, MenuItem } from '@mui/material';
import './rds-app-bar.scss';

export interface ProfileMenuItem {
  label: string;
  onClick?: () => void;
  sx?: object;
  icon?: React.ReactNode;
}

export interface ProfileMenuProps {
  name: string;
  shortName: string;
  email: string;
  menuItems?: ProfileMenuItem[];
}

export const ProfileMenu = ({ name, shortName, email, menuItems }: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Default menu items if none provided
  const defaultMenuItems: ProfileMenuItem[] = [
    { label: 'My Profile' },
    { label: 'Theme' },
    { label: 'Setting' },
    { label: 'Help' },
    { label: 'Logout', sx: { borderRadius: '0 0 8px 8px' } },
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
          designation={"Developer"}
          displayStyle="with-name"
          name={name}
          showDesignation
          showName
          size="small"
        />
        <svg className="rds-profile-menu__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8L10 12L14 8" stroke="#7c4dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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
          <Avatar className="rds-profile-menu__avatar-lg">{shortName}</Avatar>
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
