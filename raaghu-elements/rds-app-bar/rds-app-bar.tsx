import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  type AppBarProps,
  IconButton,
  Box,
  InputBase,
  Drawer,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Dehaze as DehazeIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';
import { ProfileMenu } from './ProfileMenu';
import "./rds-app-bar.scss";
export type RdsAppBarSize = 'small' | 'medium' | 'large';
export interface RdsAppBarProps extends AppBarProps {
  title?: string;
  rightActions?: React.ReactNode;
  centerContent?: React.ReactNode;
  size?: RdsAppBarSize;
  logo?: React.ReactNode;
  showLogo?: boolean;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  actions?: React.ReactNode;
  userName?: string;
  userEmail?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  tabs?: Array<string | { label: string;[key: string]: any }>;
  tabValue?: number;
  onTabChange?: (value: number) => void;
  subHeader?: React.ReactNode;
  showSearch?: boolean;
  variantStyle?: string;
  overflowContent?: React.ReactNode;
}
const RdsAppBar = ({
  title,
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
  userEmail,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  tabs,
  tabValue,
  onTabChange,
  subHeader,
  showSearch = true,
  variantStyle,
  overflowContent,
  ...props
}:RdsAppBarProps) => {
  const toolbarHeights = {
    small: 55,
    medium: 64,
    large: 80,
  };
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const [localBottomActive, setLocalBottomActive] = React.useState(0);
  
  React.useEffect(() => {
    const checkScreenSize = () => {
      const isWithMenuButton = variantStyle && String(variantStyle).toLowerCase() === 'withmenubutton';
      const threshold = isWithMenuButton ? 840 : 420;
      setIsSmallScreen(window.innerWidth <= threshold);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [variantStyle]);
  const colorClass =
    props.color === 'primary'
      ? ' rds-header--primary'
      : props.color === 'secondary'
        ? ' rds-header--secondary'
        : props.color === 'transparent'
          ? ' rds-header--transparent'
          : '';
 
  const variantClass = variantStyle ? ` rds-header--variant-${String(variantStyle).toLowerCase().replace(/[^a-z0-9]+/g, '')}` : '';
  return (
    <MuiAppBar
      {...props}
      className={[
        `rds-app-bar--size-${size}`,
        `rds-header${colorClass}${variantClass}${props.className ? ' ' + props.className : ''}`,
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
              <DehazeIcon />
            </IconButton>
          )}
         
          {showLogo && logo && <span className="rds-header__logo">{logo}</span>}
          {centerContent && <span className="rds-header__center-content">{centerContent}</span>}
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
          {rightActions && <span className="rds-header__right-actions">{rightActions}</span>}

          {userName && userEmail ? (
            <span className="rds-header__actions">
              <ProfileMenu
                name={userName}
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
          {overflowContent && !isSmallScreen ? (
            <>
              <IconButton
                className="rds-appbar-overflow-button"
                color="inherit"
                aria-label="open overflow menu"
                onClick={() => setOverflowOpen(true)}
                size="small"
              >
                <span className="rds-overflow-icon rds-overflow-icon--hamburger" aria-hidden>
                  <DehazeIcon />
                </span>
              </IconButton>
              <Drawer anchor="right" open={Boolean((overflowOpen))} onClose={() => setOverflowOpen(false)} PaperProps={{ sx: { width: 320 } }}>
                <Box sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => setOverflowOpen(false)} aria-label="close">
                      <Close />
                    </IconButton>
                  </Box>
                  <Box className="rds-appbar-overflow-content" sx={{ mt: 1 }}>{overflowContent}</Box>
                </Box>
              </Drawer>
            </>
          ) : null}
          
          {isSmallScreen && (
            (variantStyle && variantStyle.toLowerCase() === 'withmenubutton') ? (
              <Box className="rds-bottom-navigation">
                <Box className="rds-bottom-navigation-single-row">
                  {Array.isArray(tabs) && tabs.map((t, i) => {
                    const label = typeof t === 'string' ? t : (t as any).label || String(i);
                    const isActive = tabValue === i;
                    return (
                      <Button
                        key={label + i}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => typeof onTabChange === 'function' && onTabChange(i)}
                        className={`rds-bottom-nav-tab ${isActive ? 'rds-bottom-nav-tab--active' : ''}`}
                        variant="text"
                        size="small"
                      >
                        {label}
                      </Button>
                    );
                  })}
                  
                  <span className="rds-appbar-badge">28 Days Left</span>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ 
                      minWidth: 'auto', 
                      fontWeight: 500, 
                      fontSize: 12, 
                      boxShadow: 'none', 
                      textTransform: 'none',
                      padding: '4px 8px'
                    }}
                  >
                    View Plans
                  </Button>
                </Box>
              </Box>
            ) : (
              (Array.isArray(tabs) && typeof tabValue === 'number' && typeof onTabChange === 'function') ? (
                <Box
                  className="rds-bottom-navigation"
                  role="tablist"
                  sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'var(--rds-appbar-bg, var(--rds-primary-main))',
                    padding: '8px 12px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    zIndex: 1000,
                    borderTop: '1px solid var(--rds-color-border, #e0e0e0)',
                    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {tabs.map((t, i) => {
                    const label = typeof t === 'string' ? t : (t as any).label || String(i);
                    const isActive = tabValue === i;
                    return (
                      <Button
                        key={label + i}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onTabChange(i)}
                        className={`rds-bottom-nav-tab ${isActive ? 'rds-bottom-nav-tab--active' : ''}`}
                        variant="text"
                        size="small"
                      >
                        {label}
                      </Button>
                    );
                  })}
                </Box>
              ) : (
                overflowContent ? (
                  <Box
                    className="rds-bottom-navigation"
                    sx={{
                      position: 'fixed',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'var(--rds-appbar-bg, var(--rds-primary-main))',
                      padding: '8px 16px',
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      zIndex: 1000,
                      borderTop: '1px solid var(--rds-color-border, #e0e0e0)',
                      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {React.isValidElement(overflowContent) && (overflowContent as any).props?.children
                      ? React.Children.toArray((overflowContent as any).props.children).map((child, i) => {
                          if (React.isValidElement(child)) {
                            const childProps: any = (child as any).props || {};
                            const existingOnClick = childProps.onClick;
                            const className = (childProps.className ? childProps.className + ' ' : '') + 'rds-bottom-nav-tab';
                            return React.cloneElement(child as React.ReactElement, ({
                              key: i,
                              onClick: (e: any) => {
                                if (typeof existingOnClick === 'function') existingOnClick(e);
                                setLocalBottomActive(i);
                              },
                              className: (localBottomActive === i ? className + ' rds-bottom-nav-tab--active' : className),
                            } as any));
                          }
                          return <span key={i}>{child}</span>;
                        })
                      :
                        overflowContent}
                  </Box>
                ) : null
              )
            )
          )}
        </Box>
      </MuiToolbar>

      {subHeader && <div className="rds-header__sub-header">{subHeader}</div>}
    </MuiAppBar>
  );
};
RdsAppBar.displayName = 'RdsAppBar';
export default RdsAppBar;
