import { type ReactNode } from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, type AppBarProps, InputBase, Tabs, Tab, Avatar, Menu as MuiMenu, Box, MenuItem } from '@mui/material';
import { ProfileMenu } from './ProfileMenu';
import ClearIcon from '@mui/icons-material/Clear';
import { Menu as MenuIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import clsx from 'clsx';
import './rds-header.scss';

export interface RdsHeaderProps extends AppBarProps {
  title?: string;
  logo?: ReactNode;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  actions?: ReactNode;
  userName?: string;
  userShortName?: string;
  userEmail?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  tabs?: Array<string | { label: string; [key: string]: unknown }>;
  tabValue?: number;
  onTabChange?: (value: number) => void;
  subHeader?: ReactNode;
  children?: ReactNode;
}
const RdsHeader = ({
  title,
  logo,
  onMenuClick,
  showMenuButton = false,
  actions,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  tabs,
  tabValue,
  onTabChange,
  subHeader,
  children,
  userName,
  userShortName,
  userEmail,
  ...props
}: RdsHeaderProps) => {
  const colorClass =
    props.color === 'primary' ? 'rds-header--primary' :
    props.color === 'secondary' ? 'rds-header--secondary' :
    props.color === 'transparent' ? 'rds-header--transparent' :
    undefined;
  return (
    <MuiAppBar
      {...props}
      className={clsx('rds-header', colorClass, props.className)}
      color={props.color === 'transparent' ? 'transparent' : 'default'}
      elevation={0}
    >
      <div className="rds-header__toolbar">
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
        {logo && (
          <span className="rds-header__logo">{logo}</span>
        )}
        <span className="rds-header__title">{title}</span>
        {typeof searchValue === 'string' && typeof onSearchChange === 'function' && (
          <div className="rds-header__search-wrapper">
            <InputBase
              className="rds-header__search"
              placeholder={searchPlaceholder || 'Search…'}
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
            />
            {searchValue && (
              <IconButton
                className="rds-header__search-clear"
                size="small"
                aria-label="Clear search"
                onClick={() => onSearchChange('')}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        )}
        {userName && userShortName && userEmail ? (
          <span className="rds-header__actions">
            <ProfileMenu
              variant="compact"
              name={userName}
              shortName={userShortName}
              email={userEmail}
              menuItems={[
               { label: 'My Profile', icon: <Person />, onClick: () => alert('Profile clicked!') },
    { label: 'Logout', icon: <LogoutIcon />, onClick: () => alert('Logout clicked!'), sx: { color: 'var(--rds-error-main)' } }
              ]}
            />
          </span>
        ) : (
          actions && <span className="rds-header__actions">{actions}</span>
        )}
        {children}
      </div>
      {Array.isArray(tabs) && typeof tabValue === 'number' && typeof onTabChange === 'function' && (
        <Tabs
          className="rds-header__tabs"
          value={tabValue}
          onChange={(_, v) => onTabChange(v)}
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab, idx) =>
            typeof tab === 'string' ? (
              <Tab key={tab} label={tab} />
            ) : (
              <Tab key={tab.label || idx} {...tab} />
            )
          )}
        </Tabs>
      )}
      {subHeader && (
        <div className="rds-header__sub-header">{subHeader}</div>
      )}
    </MuiAppBar>
  );
};
RdsHeader.displayName = 'RdsHeader';
export default RdsHeader;
