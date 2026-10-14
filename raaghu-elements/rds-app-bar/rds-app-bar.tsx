import {
  Children,
  cloneElement,
  isValidElement,
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
  useMediaQuery,
} from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import ClearIcon from '@mui/icons-material/Clear';
import DehazeIcon from '@mui/icons-material/Dehaze';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Close from '@mui/icons-material/Close';
import { ProfileMenu, type ProfileMenuItem } from './ProfileMenu';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';
import clsx from 'clsx';
import "./rds-app-bar.scss";

export type RdsAppBarSize = 'small' | 'medium' | 'large';

/** Layout presets that have dedicated styles. Matching is case-insensitive; other strings are allowed. */
export type RdsAppBarVariantStyle =
  | 'withMenuButton'
  | 'withActions'
  | 'withTabs'
  | 'withLogoAndTabs'
  | 'withNotificationBadge'
  | 'withUserProfile'
  | 'logoSearchTabs'
  | 'logoSearchTabsActions'
  | 'logoTabsActions'
  | 'dashboardWithLang'
  | (string & {});

export type RdsAppBarTab = string | { label: string; [key: string]: unknown };

export interface RdsAppBarProps extends Omit<AppBarProps, 'component'> {
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
  /** Items of the profile menu shown when `userName` and `userEmail` are set. Defaults to "My Profile" and "Logout". */
  profileMenuItems?: ProfileMenuItem[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  tabs?: RdsAppBarTab[];
  tabValue?: number;
  onTabChange?: (value: number) => void;
  subHeader?: ReactNode;
  showSearch?: boolean;
  variantStyle?: RdsAppBarVariantStyle;
  overflowContent?: ReactNode;
  /**
   * Content after the tabs in the small-screen bottom bar of the `withMenuButton` layout.
   * Defaults to the trial badge and "View Plans" button; pass `null` to show nothing.
   */
  bottomActions?: ReactNode;
}

const toolbarHeights: Record<RdsAppBarSize, number> = {
  small: 55,
  medium: 64,
  large: 80,
};

const DEFAULT_PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  { label: 'My Profile', icon: <Person /> },
  { label: 'Logout', icon: <LogoutIcon />, sx: { color: 'var(--rds-error-main)' } },
];

const DEFAULT_BOTTOM_ACTIONS = (
  <>
    <span className="rds-appbar-badge">28 Days Left</span>
    <RdsButton
      style="filled"
      color="primary"
      textCase="capitalize"
      sx={{
        minWidth: 'auto',
        fontWeight: 500,
        fontSize: 'var(--rds-font-size-sm, 12px)',
        boxShadow: 'none',
        padding: 'var(--rds-spacing-xs) var(--rds-spacing-sm)'
      }}
    >
      View Plans
    </RdsButton>
  </>
);

// Layouts that move the tabs into a bottom bar on tablets as well as phones.
const TABLET_BOTTOM_NAV_VARIANTS = ['withmenubutton', 'withactions', 'withtabs', 'withnotificationbadge', 'withlogoandtabs'];

// The CSS class strips spaces and punctuation, while the layout logic only lower-cases
// ("With Menu Button" gets the class but not the mobile bottom bar), as it always has.
const toVariantClass = (variantStyle?: string) =>
  variantStyle ? variantStyle.toLowerCase().replace(/[^a-z0-9]+/g, '') : '';

const getSmallScreenBreakpoint = (variant: string) => {
  if (variant === 'withnotificationbadge') return 1280;
  if (TABLET_BOTTOM_NAV_VARIANTS.includes(variant)) return 840;
  return 420;
};

const getTabLabel = (tab: RdsAppBarTab, index: number) =>
  typeof tab === 'string' ? tab : tab.label || String(index);

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
  profileMenuItems = DEFAULT_PROFILE_MENU_ITEMS,
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
  bottomActions = DEFAULT_BOTTOM_ACTIONS,
  elevation = 0,
  className,
  ...props
}: RdsAppBarProps) => {
  const tokens = useRdsTokens();
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [localBottomActive, setLocalBottomActive] = useState(0);

  const variant = variantStyle ? variantStyle.toLowerCase() : '';
  const variantClass = toVariantClass(variantStyle);
  const isSmallScreen = useMediaQuery(`(max-width:${getSmallScreenBreakpoint(variant)}px)`, { noSsr: true });
  const hasControlledTabs = Array.isArray(tabs) && typeof tabValue === 'number' && typeof onTabChange === 'function';

  const renderBottomNavTabs = () =>
    tabs?.map((tab, index) => {
      const isActive = tabValue === index;
      return (
        <RdsButton
          key={`${getTabLabel(tab, index)}-${index}`}
          role="tab"
          aria-selected={isActive}
          onClick={() => onTabChange?.(index)}
          className={clsx('rds-bottom-nav-tab', isActive && 'rds-bottom-nav-tab--active')}
          style="transparent"
          size="small"
          layout="text-only"
        >
          {getTabLabel(tab, index)}
        </RdsButton>
      );
    });

  // Overflow children become bottom-bar items on small screens; the active one is tracked locally.
  const renderOverflowItems = () => {
    if (!isValidElement<{ children?: ReactNode }>(overflowContent) || !overflowContent.props.children) {
      return overflowContent;
    }
    return Children.toArray(overflowContent.props.children).map((child, index) => {
      if (!isValidElement(child)) return <span key={`overflow-text-${index}`}>{child}</span>;
      const childProps = (child as ReactElement<{ onClick?: (event: SyntheticEvent) => void; className?: string }>).props;
      return cloneElement(child as ReactElement<Record<string, unknown>>, {
        key: child.key ?? `overflow-item-${index}`,
        onClick: (event: SyntheticEvent) => {
          childProps.onClick?.(event);
          setLocalBottomActive(index);
        },
        className: clsx(childProps.className, 'rds-bottom-nav-tab', localBottomActive === index && 'rds-bottom-nav-tab--active'),
      });
    });
  };

  const bottomBarSx = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: tokens.zIndex.dropdown,
    borderTop: `1px solid ${tokens.cssVar('border-default')}`,
    boxShadow: tokens.cssVar('elevation-2'),
    backgroundColor: 'var(--rds-background-paper, var(--rds-color-surface, #ffffff))',
  } as const;

  const renderBottomBar = () => {
    if (variant === 'withmenubutton') {
      return (
        <Box className="rds-bottom-navigation">
          <Box className="rds-bottom-navigation-single-row">
            {renderBottomNavTabs()}
            {bottomActions}
          </Box>
        </Box>
      );
    }
    if (hasControlledTabs) {
      return (
        <Box
          className="rds-bottom-navigation"
          role="tablist"
          sx={{
            ...bottomBarSx,
            height: 56,
            maxHeight: 56,
            minHeight: 56,
            padding: `0 ${tokens.space(2)}`,
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {renderBottomNavTabs()}
        </Box>
      );
    }
    if (overflowContent) {
      return (
        <Box
          className="rds-bottom-navigation"
          sx={{
            ...bottomBarSx,
            padding: `${tokens.space(1)} ${tokens.space(3)}`,
            color: 'var(--rds-color-on-surface, var(--rds-text-primary, #212121))',
          }}
        >
          {renderOverflowItems()}
        </Box>
      );
    }
    return null;
  };

  return (
    <MuiAppBar
      {...props}
      className={clsx(
        `rds-app-bar--size-${size}`,
        'rds-header',
        props.color === 'primary' && 'rds-header--primary',
        props.color === 'secondary' && 'rds-header--secondary',
        props.color === 'transparent' && 'rds-header--transparent',
        showMenuButton && 'rds-header--has-menu-button',
        variantClass && `rds-header--variant-${variantClass}`,
        className,
      )}
      color={props.color === 'transparent' ? 'transparent' : 'default'}
      elevation={elevation}
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
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} className="rds-header__menu-button">
              <DehazeIcon />
            </IconButton>
          )}

          {showLogo && logo && <span className="rds-header__logo">{logo}</span>}
          {centerContent && <span className="rds-header__center-content">{centerContent}</span>}
          {hasControlledTabs && (
            <Tabs
              className="rds-header__tabs-inline"
              value={tabValue}
              onChange={(_, value) => onTabChange(value)}
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab, index) =>
                typeof tab === 'string' ? (
                  <Tab label={tab} key={`${tab}-${index}`} />
                ) : (
                  <Tab {...tab} key={`${getTabLabel(tab, index)}-${index}`} />
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
                onChange={(event) => onSearchChange(event.target.value)}
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
              <ProfileMenu name={userName} email={userEmail} menuItems={profileMenuItems} />
            </span>
          ) : (
            actions && <span className="rds-header__actions">{actions}</span>
          )}
          {children}
          {overflowContent && !isSmallScreen && (
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
              <Drawer anchor="right" open={overflowOpen} onClose={() => setOverflowOpen(false)} slotProps={{ paper: { sx: { width: tokens.space(40) } } }}>
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
          )}

          {isSmallScreen && renderBottomBar()}
        </Box>
      </MuiToolbar>

      {subHeader && <div className="rds-header__sub-header">{subHeader}</div>}
    </MuiAppBar>
  );
};
RdsAppBar.displayName = 'RdsAppBar';
export default RdsAppBar;
