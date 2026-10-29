import { useState, type ReactNode, type MouseEvent } from 'react';
import { IconButton, Avatar, Menu as MuiMenu, Box, MenuItem, useMediaQuery } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import RdsAvatar from '../../rds-avatar/rds-avatar';
import { warnDeprecatedProp } from '../utils/deprecation';
import '../styles/rds-profile-menu.scss';
import { extendedBreakpointTokens } from '../../../raaghu-react-themes/tokens/design-tokens';

export interface ProfileMenuItem {
  label: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  icon?: ReactNode;
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
  /** Menu actions. */
  items?: ProfileMenuItem[];
  /** @deprecated Use `items` instead. */
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
    sx: { borderRadius: '0 0 var(--rds-border-radius-lg) var(--rds-border-radius-lg)' },
  },
];

export const ProfileMenu = ({
  name,
  email,
  variant = 'rich',
  shortName,
  designation = 'Developer',
  items,
  menuItems,
}: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery(`(max-width:${extendedBreakpointTokens['tablet-md']})`, { noSsr: true });
  const open = Boolean(anchorEl);
  const initials = shortName ?? getInitials(name);
  if (menuItems !== undefined) warnDeprecatedProp('ProfileMenu', 'menuItems', '`items`');
  const resolvedItems = items ?? menuItems ?? DEFAULT_MENU_ITEMS;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label={`Account menu for ${name}`}
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
              description={isSmallScreen ? undefined : designation}
              displayStyle={isSmallScreen ? undefined : 'with-name'}
              title={name}
              showDesignation={!isSmallScreen}
              showName={!isSmallScreen}
              size="small"
            />
            {!isSmallScreen && (
              <ExpandMore className="rds-profile-menu__chevron" fontSize="small" aria-hidden />
            )}
          </>
        ) : (
          <>
            <Avatar className="rds-profile-menu__avatar">{initials}</Avatar>
            <span className="rds-profile-menu__name">{name}</span>
            <ExpandMore className="rds-profile-menu__chevron" fontSize="small" aria-hidden />
          </>
        )}
      </IconButton>
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{ paper: { className: 'rds-profile-menu__dropdown' } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box className="rds-profile-menu__header" role="presentation">
          <Avatar className="rds-profile-menu__avatar-lg">{initials}</Avatar>
          <Box>
            <Box className="rds-profile-menu__name-lg">{name}</Box>
            <Box className="rds-profile-menu__email">{email}</Box>
          </Box>
        </Box>
        {resolvedItems.map((item, idx) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              handleClose();
              item.onClick?.();
            }}
            className={`rds-profile-menu__item${idx === resolvedItems.length - 1 ? ' rds-profile-menu__item--last' : ''}`}
            sx={item.sx}
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
