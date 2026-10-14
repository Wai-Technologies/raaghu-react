import { useState, type ComponentProps, type ReactNode } from 'react';
import { AppBar as MuiAppBar, IconButton, type AppBarProps, InputBase, Tabs, Tab } from '@mui/material';
import { ProfileMenu, type ProfileMenuItem } from './ProfileMenu';
import ClearIcon from '@mui/icons-material/Clear';
import { Menu as MenuIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import clsx from 'clsx';
import './rds-header.scss';

/** Props for {@link RdsHeader}. Extends MUI `AppBar` props. */
export interface RdsHeaderProps extends Omit<AppBarProps, 'component'> {
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
  /** Items of the profile menu shown when `userName`, `userShortName` and `userEmail` are set. Defaults to "My Profile" and "Logout". */
  profileMenuItems?: ProfileMenuItem[];
  subHeader?: ReactNode;
  children?: ReactNode;
}
/** Page header with logo, title, search, profile menu, actions and optional tabs. */
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
  profileMenuItems,
  elevation = 0,
  ...props
}: RdsHeaderProps) => {
  const [innerTab, setInnerTab] = useState(0);
  const currentTab = typeof tabValue === 'number' ? tabValue : innerTab;
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
      elevation={elevation}
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
              slotProps={{ input: { 'aria-label': searchPlaceholder || 'Search…' } }}
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
              menuItems={profileMenuItems ?? [
                { label: 'My Profile', icon: <Person />, onClick: () => alert('Profile clicked!') },
                { label: 'Logout', icon: <LogoutIcon />, onClick: () => alert('Logout clicked!'), sx: { color: 'var(--rds-error-main)' } },
              ]}
            />
          </span>
        ) : (
          actions && <span className="rds-header__actions">{actions}</span>
        )}
        {children}
      </div>
      {Array.isArray(tabs) && tabs.length > 0 && (
        <Tabs
          className="rds-header__tabs"
          value={currentTab}
          onChange={(_, v: number) => { if (typeof tabValue !== 'number') setInnerTab(v); onTabChange?.(v); }}
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab, idx) =>
            typeof tab === 'string' ? (
              <Tab label={tab} key={tab} />
            ) : (
              <Tab {...(tab as ComponentProps<typeof Tab>)} key={tab.label || idx} />
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
