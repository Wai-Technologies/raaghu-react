import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
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
} from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import ClearIcon from '@mui/icons-material/Clear';
import { Dehaze as DehazeIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';
import { ProfileMenu } from './ProfileMenu';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';
import clsx from 'clsx';
import "./rds-app-bar.scss";
export type RdsAppBarSize = 'small' | 'medium' | 'large';
export interface RdsAppBarProps extends AppBarProps {
  title?: string;
  rightActions?: ReactNode;
  centerContent?: ReactNode;
  size?: RdsAppBarSize;
  logo?: ReactNode;
  showLogo?: boolean;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  actions?: ReactNode;
  userName?: string;
  userEmail?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  tabs?: Array<string | { label: string; [key: string]: unknown }>;
  tabs?: Array<string | { label: string; [key: string]: unknown }>;
  tabValue?: number;
  onTabChange?: (value: number) => void;
  subHeader?: ReactNode;
  showSearch?: boolean;
  variantStyle?: string;
  overflowContent?: ReactNode;
}
const toolbarHeights: Record<RdsAppBarSize, number> = {
  small: 55,
  medium: 64,
  large: 80,
};

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
  const tokens = useRdsTokens();
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [localBottomActive, setLocalBottomActive] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      const variantLower = variantStyle ? String(variantStyle).toLowerCase() : '';
      const tabletBottomNavVariants = ['withmenubutton', 'withactions', 'withtabs', 'withnotificationbadge', 'withlogoandtabs'];
      const needsTabletBottomNav = tabletBottomNavVariants.includes(variantLower);
      const threshold = needsTabletBottomNav ? 840 : 420;
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
      className={clsx(
        `rds-app-bar--size-${size}`,
        'rds-header',
        props.color === 'primary' && 'rds-header--primary',
        props.color === 'secondary' && 'rds-header--secondary',
        props.color === 'transparent' && 'rds-header--transparent',
        variantStyle && `rds-header--variant-${String(variantStyle).toLowerCase().replace(/[^a-z0-9]+/g, '')}`,
        props.className,
      )}
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
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: tokens.space(2) }}>
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
                  <Tab key={tab.label || idx} {...(tab as Record<string, unknown>)} />
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
                  { label: 'Logout', icon: <LogoutIcon />, sx: { color: 'var(--rds-error-main)' } },
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
              <Drawer anchor="right" open={Boolean((overflowOpen))} onClose={() => setOverflowOpen(false)} PaperProps={{ sx: { width: tokens.space(40) } }}>
                <Box sx={{ p: tokens.space(2), height: '100%', boxSizing: 'border-box' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => setOverflowOpen(false)} aria-label="close">
                      <Close />
                    </IconButton>
                  </Box>
                  <Box className="rds-appbar-overflow-content" sx={{ mt: tokens.space(1) }}>{overflowContent}</Box>
                </Box>
              </Drawer>
            </>
          ) : null}
          
          {isSmallScreen && (
            (variantStyle && variantStyle.toLowerCase() === 'withmenubutton') ? (
              <Box className="rds-bottom-navigation">
                <Box className="rds-bottom-navigation-single-row">
                  {Array.isArray(tabs) && tabs.map((t, i) => {
                    const label = typeof t === 'string' ? t : t.label || String(i);
                    const isActive = tabValue === i;
                    return (
                      <RdsButton
                        key={label + i}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => typeof onTabChange === 'function' && onTabChange(i)}
                        className={`rds-bottom-nav-tab ${isActive ? 'rds-bottom-nav-tab--active' : ''}`}
                        style="transparent"
                        size="small"
                        text={label}
                      />
                    );
                  })}

                  <span className="rds-appbar-badge">28 Days Left</span>
                  <RdsButton
                    style="filled"
                    color="primary"
                    text="View Plans"
                    textCase="capitalize"
                    sx={{
                      minWidth: 'auto',
                      fontWeight: 500,
                      fontSize: 'var(--rds-font-size-sm, 12px)',
                      boxShadow: 'none',
                      padding: 'var(--rds-spacing-xs) var(--rds-spacing-sm)'
                    }}
                  />
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
                    padding: `${tokens.space(1)} ${tokens.space(2)}`,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    zIndex: tokens.zIndex.dropdown,
                    borderTop: `1px solid ${tokens.cssVar('border-default')}`,
                    boxShadow: tokens.cssVar('elevation-2'),
                  }}
                >
                  {tabs.map((t, i) => {
                    const label = typeof t === 'string' ? t : t.label || String(i);
                    const isActive = tabValue === i;
                    return (
                      <RdsButton
                        key={label + i}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onTabChange(i)}
                        className={`rds-bottom-nav-tab ${isActive ? 'rds-bottom-nav-tab--active' : ''}`}
                        style="transparent"
                        size="small"
                        text={label}
                      />
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
                      padding: `${tokens.space(1)} ${tokens.space(3)}`,
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      zIndex: tokens.zIndex.dropdown,
                      borderTop: `1px solid ${tokens.cssVar('border-default')}`,
                      boxShadow: tokens.cssVar('elevation-2'),
                    }}
                  >
                    {isValidElement<{ children?: ReactNode }>(overflowContent) && overflowContent.props.children
                      ? Children.toArray(overflowContent.props.children).map((child, i) => {
                          if (isValidElement(child)) {
                            const childProps = (child as ReactElement<{ onClick?: (e: SyntheticEvent) => void; className?: string }>).props;
                            const existingOnClick = childProps.onClick;
                            const childClassName = `${childProps.className ? `${childProps.className} ` : ''}rds-bottom-nav-tab`;
                            return cloneElement(
                              child as ReactElement<Record<string, unknown>>,
                              {
                                key: i,
                                onClick: (e: SyntheticEvent) => {
                                  existingOnClick?.(e);
                                  setLocalBottomActive(i);
                                },
                                className: localBottomActive === i
                                  ? `${childClassName} rds-bottom-nav-tab--active`
                                  : childClassName,
                              },
                            );
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
