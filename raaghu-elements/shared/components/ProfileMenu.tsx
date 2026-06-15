import React from 'react';
import { IconButton, Avatar, Menu as MuiMenu, Box, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import RdsAvatar from '../../rds-avatar/rds-avatar';
import '../styles/rds-profile-menu.scss';

export interface ProfileMenuItem {
  label: string;
  onClick?: () => void;
  sx?: object;
  icon?: React.ReactNode;
}

export type ProfileMenuVariant = 'rich' | 'compact';

export interface ProfileMenuProps {
  name: string;
  email: string;
  /** Compact: initials avatar + name. Rich: RdsAvatar with optional designation. */
  variant?: ProfileMenuVariant;
  /** Initials for compact variant (defaults to first letters of name) */
  shortName?: string;
  designation?: string;
  menuItems?: ProfileMenuItem[];
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

const DEFAULT_MENU_ITEMS: ProfileMenuItem[] = [
  { label: 'My Profile', icon: <PersonIcon fontSize="small" /> },
  { label: 'Theme', icon: <Brightness5Icon fontSize="small" /> },
  { label: 'Setting', icon: <SettingsIcon fontSize="small" /> },
  { label: 'Help', icon: <HelpOutlineIcon fontSize="small" /> },
  {
    label: 'Logout',
    icon: <LogoutIcon fontSize="small" />,
    sx: { borderRadius: '0 0 var(--rds-border-radius-lg, 8px) var(--rds-border-radius-lg, 8px)' },
  },
];

export const ProfileMenu = ({
  name,
  email,
  variant = 'rich',
  shortName,
  designation = 'Developer',
  menuItems,
}: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const open = Boolean(anchorEl);
  const initials = shortName ?? getInitials(name);
  const items = menuItems && menuItems.length > 0 ? menuItems : DEFAULT_MENU_ITEMS;

  React.useEffect(() => {
    if (variant !== 'rich') return;

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 834);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [variant]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="Draw"
        color="inherit"
        onClick={handleClick}
        size="small"
        className="rds-profile-menu__button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {variant === 'rich' ? (
          <>
            <RdsAvatar
              subText={isSmallScreen ? undefined : designation}
              displayStyle={isSmallScreen ? undefined : 'with-name'}
              title={name}
              showDesignation={!isSmallScreen}
              showName={!isSmallScreen}
              size="small"
            />
            {!isSmallScreen && (
              <svg
                className="rds-profile-menu__chevron"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M6 8L10 12L14 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </>
        ) : (
          <>
            <Avatar className="rds-profile-menu__avatar">{initials}</Avatar>
            <span className="rds-profile-menu__name">{name}</span>
            <svg
              className="rds-profile-menu__chevron"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M6 8L10 12L14 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
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
          <Avatar className="rds-profile-menu__avatar-lg">{initials}</Avatar>
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
              item.onClick?.();
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

export default ProfileMenu;

ProfileMenu.displayName = 'ProfileMenu';
