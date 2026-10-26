import { useState, type ReactNode, type MouseEvent } from 'react';
import { IconButton, Avatar, Menu as MuiMenu, Box, MenuItem, useMediaQuery } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RdsAvatar from '../../rds-avatar/rds-avatar';
import { warnDeprecatedProp } from '../utils/deprecation';
import '../styles/rds-profile-menu.scss';

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

export const ProfileMenu = ({
  name,
  email,
  variant = 'rich',
  shortName,
  designation,
  items,
  menuItems,
}: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery('(max-width:834px)', { noSsr: true });
  const open = Boolean(anchorEl);
  const initials = shortName ?? getInitials(name);
  if (menuItems !== undefined) warnDeprecatedProp('ProfileMenu', 'menuItems', '`items`');
  const resolvedItems = items ?? menuItems ?? [];

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
              subText={isSmallScreen ? undefined : designation}
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
