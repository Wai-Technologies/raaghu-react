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
  variantStyle?: string;
  overflowContent?: React.ReactNode;
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
  variantStyle,
  overflowContent,
  ...props
}:RdsAppBarProps) => {
  const toolbarHeights = {
    small: 50,
    medium: 64,
    large: 80,
  };
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  
  // Check if screen is small (320px or 420px) to disable overflow drawer
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  // Local active index for bottom navigation when the component isn't
  // controlled via `tabs` + `onTabChange` (used by some stories like
  // 'WithNotificationBadge' which provide Buttons instead of `tabs`).
  const [localBottomActive, setLocalBottomActive] = React.useState(0);
  
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 420);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const colorClass =
    props.color === 'primary'
      ? ' rds-header--primary'
      : props.color === 'secondary'
        ? ' rds-header--secondary'
        : props.color === 'transparent'
          ? ' rds-header--transparent'
          : '';
  // normalize variant style to a safe class name (lowercase, remove spaces)
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
          {/*  Show logo only if showLogo is true */}
          {showLogo && logo && <span className="rds-header__logo">{logo}</span>}
          {/*  Optional center content (e.g. buttons placed after the logo) */}
          {centerContent && <span className="rds-header__center-content">{centerContent}</span>}
          {/*  Inline tabs after logo / center content */}
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
          {/* Overflow button for small screens - opens a drawer with overflowContent */}
          {/* Disable overflow drawer for screens 320px and 420px */}
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
          
          {/* Bottom navigation for small screens (320px and 420px) - only for specific variants */}
          {isSmallScreen && (
            // If tabs are provided and controlled by parent, render an interactive
            // bottom tab bar which will call onTabChange when a tab is clicked.
            // Fallback to rendering the provided overflowContent (static) when
            // no `tabs`/`onTabChange` is present.
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
                // Try to clone children of overflowContent and make them
                // interactive by adding onClick that updates localBottomActive.
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
                    : // Fallback: render overflowContent as-is when it isn't a container with children
                      overflowContent}
                </Box>
              ) : null
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
