import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, AppBarProps, InputBase, Tabs, Tab } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import './rds-header.scss';

export interface RdsHeaderProps extends AppBarProps {
  title?: string;
  logo?: React.ReactNode;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  actions?: React.ReactNode;
  // Search
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  // Tabs
  tabs?: Array<string | { label: string; [key: string]: any }>;
  tabValue?: number;
  onTabChange?: (value: number) => void;
  // Sub-header
  subHeader?: React.ReactNode;
  children?: React.ReactNode;
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
  ...props
}: RdsHeaderProps) => {
  // Add transparent class if color is 'transparent'
  const isTransparent = props.color === 'transparent';
  return (
    <MuiAppBar
      {...props}
      className={`rds-header${isTransparent ? ' rds-header--transparent' : ''}${props.className ? ' ' + props.className : ''}`}
      color={isTransparent ? 'transparent' : 'default'}
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
          <InputBase
            className="rds-header__search"
            placeholder={searchPlaceholder || 'Search…'}
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
          />
        )}
        {actions && <span className="rds-header__actions">{actions}</span>}
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

export default RdsHeader;
