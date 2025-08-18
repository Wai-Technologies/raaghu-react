import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  type AppBarProps,
  IconButton,
  Box,
  InputBase,
  Tabs,
  Tab,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Menu as MenuIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import { ProfileMenu } from './ProfileMenu';
import "./rds-app-bar.scss";
export type RdsAppBarSize = 'small' | 'medium' | 'large';
export interface RdsAppBarProps extends AppBarProps {
  title?: string;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
  centerContent?: React.ReactNode;
  size?: RdsAppBarSize;
  logo?: React.ReactNode;
  showLogo?: boolean;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  actions?: React.ReactNode;
  userName?: string;
  userShortName?: string;
  userEmail?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  tabs?: Array<string | { label: string;[key: string]: any }>;
  tabValue?: number;
  onTabChange?: (value: number) => void;
  subHeader?: React.ReactNode;
  showSearch?: boolean;
}
const RdsAppBar = ({
  title,
  leftActions,
  rightActions,
  centerContent,
  children,
  size = 'medium',
  logo,
  showLogo = true, 
  onMenuClick,
  showMenuButton = false,
  actions,
  userName,
  userShortName,
  userEmail,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  tabs,
  tabValue,
  onTabChange,
  subHeader,
  showSearch = true,
  ...props
}:RdsAppBarProps) => {
  const toolbarHeights = {
    small: 50,
    medium: 64,
    large: 80,
  };
  const colorClass =
    props.color === 'primary'
      ? ' rds-header--primary'
      : props.color === 'secondary'
        ? ' rds-header--secondary'
        : props.color === 'transparent'
          ? ' rds-header--transparent'
          : '';
  return (
    <MuiAppBar
      {...props}
      className={[
        `rds-app-bar--size-${size}`,
        `rds-header${colorClass}${props.className ? ' ' + props.className : ''}`,
      ].filter(Boolean).join(' ')}
      color={props.color === 'transparent' ? 'transparent' : 'default'}
      elevation={0}
    >
      <MuiToolbar
        className={`rds-app-bar--size-${size}`}
        style={{
          minHeight: toolbarHeights[size],
          height: toolbarHeights[size],
          padding: 0,
        }}
      >
        <Box className="rds-header__toolbar" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {showMenuButton && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          {/*  Show logo only if showLogo is true */}
          {showLogo && logo && <span className="rds-header__logo">{logo}</span>}
          {/*  Inline tabs after logo */}
          {Array.isArray(tabs) && typeof tabValue === 'number' && typeof onTabChange === 'function' && (
            <Tabs
              className="rds-header__tabs-inline"
              value={tabValue}
              onChange={(_, v) => onTabChange(v)}
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab, idx) =>
                typeof tab === 'string' ? (
                  <Tab key={tab} label={tab} />
                ) : (
                  <Tab key={(tab as any).label || idx} {...(tab as any)} />
                )
              )}
            </Tabs>
          )}
          <span className="rds-header__title">{title}</span>
          {/* Move leftActions to immediately left of search bar */}
          {showSearch && typeof searchValue === 'string' && typeof onSearchChange === 'function' && leftActions && (
            <span className="rds-header__left-actions">{leftActions}</span>
          )}
          {showSearch && typeof searchValue === 'string' && typeof onSearchChange === 'function' && (
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
          {/* Render rightActions after search bar */}
          {rightActions && <span className="rds-header__right-actions">{rightActions}</span>}

          {userName && userShortName && userEmail ? (
            <span className="rds-header__actions">
              <ProfileMenu
                name={userName}
                shortName={userShortName}
                email={userEmail}
                menuItems={[
                  { label: 'My Profile', icon: <Person />},
                  { label: 'Logout', icon: <LogoutIcon />, sx: { color: 'red' } },
                ]}
              />
            </span>
          ) : (
            actions && <span className="rds-header__actions">{actions}</span>
          )}
          {children}
        </Box>
      </MuiToolbar>

      {subHeader && <div className="rds-header__sub-header">{subHeader}</div>}
    </MuiAppBar>
  );
};
export default RdsAppBar;
