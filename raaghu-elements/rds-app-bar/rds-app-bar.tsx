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
  type TabsProps,
  useMediaQuery,
} from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import ClearIcon from '@mui/icons-material/Clear';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Close from '@mui/icons-material/Close';
import { ProfileMenu, type ProfileMenuItem } from './ProfileMenu';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import { rdsAppBarSx } from './rds-app-bar.styles';
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
  /** Content at the right of the bar. Takes precedence over `rightActions` and `actions`. */
  endSlot?: ReactNode;
  /** Content in the centre of the bar. Takes precedence over `centerContent`. */
  centerSlot?: ReactNode;
  /** @deprecated Use `endSlot` instead. */
  rightActions?: ReactNode;
  /** @deprecated Use `centerSlot` instead. */
  centerContent?: ReactNode;
  size?: RdsAppBarSize;
  logo?: ReactNode;
  /** @deprecated The logo is shown whenever `logo` is provided. Documentation only: still works. */
  showLogo?: boolean;
  onMenuClick?: () => void;
  /** @deprecated The menu button is decided by `onMenuClick`. Documentation only: still works. */
  showMenuButton?: boolean;
  /** @deprecated Use `endSlot` instead. */
  actions?: ReactNode;
  userName?: string;
  userEmail?: string;
  /** Items of the profile menu shown when `userName` and `userEmail` are set. Pass explicitly; there is no demo default. */
  profileMenuItems?: ProfileMenuItem[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  tabs?: RdsAppBarTab[];
  /** @deprecated Use `tabsProps.value` instead. */
  tabValue?: number;
  /** @deprecated Use `tabsProps.onChange` instead. */
  onTabChange?: (value: number) => void;
  /** Props for the tabs. `value` and `onChange(event, value)` take precedence over `tabValue` and `onTabChange`. */
  tabsProps?: Partial<TabsProps>;
  subHeader?: ReactNode;
  /** @deprecated Search is shown when `onSearchChange` is provided. Documentation only: still works. */
  showSearch?: boolean;
  variantStyle?: RdsAppBarVariantStyle;
  overflowContent?: ReactNode;
  /**
   * Content after the tabs in the small-screen bottom bar of the `withMenuButton` layout.
   * No demo content by default; pass nodes (e.g. a trial badge) when needed.
   */
  bottomActions?: ReactNode;
}

const toolbarHeights: Record<RdsAppBarSize, number> = {
  small: 55,
  medium: 64,
  large: 80,
};

const TABLET_BOTTOM_NAV_VARIANTS = ['withmenubutton', 'withactions', 'withtabs', 'withnotificationbadge', 'withlogoandtabs'];

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
  endSlot,
  centerSlot,
  rightActions,
  centerContent,
  tabsProps,
  children,
  size = 'medium',
  logo,
  showLogo = true,
  onMenuClick,
  showMenuButton = false,
  actions,
  userName,
  userEmail,
  profileMenuItems,
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
  bottomActions,
  elevation = 0,
  className,
  sx,
  ...props
}: RdsAppBarProps) => {
  if (rightActions !== undefined) warnDeprecatedProp('RdsAppBar', 'rightActions', '`endSlot`');
  if (actions !== undefined) warnDeprecatedProp('RdsAppBar', 'actions', '`endSlot`');
  if (centerContent !== undefined) warnDeprecatedProp('RdsAppBar', 'centerContent', '`centerSlot`');
  if (tabValue !== undefined) warnDeprecatedProp('RdsAppBar', 'tabValue', '`tabsProps.value`');
  if (onTabChange !== undefined) warnDeprecatedProp('RdsAppBar', 'onTabChange', '`tabsProps.onChange`');

  const tokens = useRdsTokens();
  const endContent = endSlot ?? rightActions;
  const centerResolved = centerSlot ?? centerContent;
  const tabValueResolved = tabsProps?.value ?? tabValue;
  const hasTabHandler = Boolean(tabsProps?.onChange ?? onTabChange);
  const handleTabChange = (event: SyntheticEvent, value: number) =>
    tabsProps?.onChange ? tabsProps.onChange(event, value) : onTabChange?.(value);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [localBottomActive, setLocalBottomActive] = useState(0);

  const variant = variantStyle ? variantStyle.toLowerCase() : '';
  const variantClass = toVariantClass(variantStyle);
  const isSmallScreen = useMediaQuery(`(max-width:${getSmallScreenBreakpoint(variant)}px)`, { noSsr: true });
  const isNarrowMobile = useMediaQuery('(max-width:420px)', { noSsr: true });
  const isExtraNarrowMobile = useMediaQuery('(max-width:320px)', { noSsr: true });
  const hasControlledTabs = Array.isArray(tabs) && typeof tabValueResolved === 'number' && hasTabHandler;
  const showInlineTabs = hasControlledTabs && !isSmallScreen;
  const isWithMenuButton = variant === 'withmenubutton';
  const isLogoSearchTabs = variantClass === 'logosearchtabs';
  const isLogoSearchTabsActions = variantClass === 'logosearchtabsactions';
  const isLogoTabsActions = variantClass === 'logotabsactions';
  const isDashboardWithLang = variantClass === 'dashboardwithlang';
  const isWithActions = variantClass === 'withactions';
  const isWithTabs = variantClass === 'withtabs';
  const isWithLogoAndTabs = variantClass === 'withlogoandtabs';
  const isWithNotificationBadge = variantClass === 'withnotificationbadge';
  const isTabletChromeVariant = isWithActions || isWithTabs || isWithLogoAndTabs || isWithNotificationBadge;
  const bottomNavActive = isSmallScreen && (
    isWithMenuButton || hasControlledTabs || Boolean(overflowContent)
  );

  const renderBottomNavTabs = () =>
    tabs?.map((tab, index) => {
      const isActive = tabValueResolved === index;
      return (
        <RdsButton
          key={`${getTabLabel(tab, index)}-${index}`}
          role="tab"
          aria-selected={isActive}
          onClick={(event) => handleTabChange(event, index)}
          className={clsx('rds-bottom-nav-tab', isActive && 'rds-bottom-nav-tab--active')}
          style="transparent"
          size="small"
          layout="text-only"
        >
          {getTabLabel(tab, index)}
        </RdsButton>
      );
    });

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
    backgroundColor: 'var(--rds-background-paper, var(--rds-color-surface))',
  } as const;

  const renderBottomBar = () => {
    if (isWithMenuButton) {
      return (
        <Box
          className="rds-bottom-navigation"
          sx={{
            ...bottomBarSx,
            minHeight: 56,
            padding: `${tokens.space(1)} ${tokens.space(1.5)}`,
            boxSizing: 'border-box',
          }}
        >
          <Box
            className="rds-bottom-navigation-single-row"
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
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
            color: 'var(--rds-color-on-surface, var(--rds-text-primary))',
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
        bottomNavActive && 'rds-header--bottom-nav-active',
        isWithMenuButton && isSmallScreen && 'rds-header--withmenubutton-compact',
        isWithMenuButton && isNarrowMobile && 'rds-header--withmenubutton-narrow',
        isLogoSearchTabs && isNarrowMobile && 'rds-header--logosearchtabs-compact',
        isLogoSearchTabs && isExtraNarrowMobile && 'rds-header--logosearchtabs-narrow',
        isLogoSearchTabsActions && isNarrowMobile && 'rds-header--logosearchtabsactions-compact',
        isLogoTabsActions && isNarrowMobile && 'rds-header--logotabsactions-compact',
        isLogoTabsActions && isExtraNarrowMobile && 'rds-header--logotabsactions-narrow',
        isDashboardWithLang && isNarrowMobile && 'rds-header--dashboardwithlang-compact',
        isDashboardWithLang && isExtraNarrowMobile && 'rds-header--dashboardwithlang-narrow',
        isTabletChromeVariant && isSmallScreen && 'rds-header--tablet-compact',
        isWithActions && isSmallScreen && 'rds-header--withactions-compact',
        isWithActions && isNarrowMobile && 'rds-header--withactions-narrow',
        isWithActions && isExtraNarrowMobile && 'rds-header--withactions-xs',
        isWithNotificationBadge && isSmallScreen && 'rds-header--withnotificationbadge-compact',
        isNarrowMobile && 'rds-header--mobile-toolbar',
        isExtraNarrowMobile && 'rds-header--mobile-toolbar-xs',
        className,
      )}
      color={props.color === 'transparent' ? 'transparent' : 'default'}
      elevation={elevation}
      sx={[...rdsAppBarSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
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
          {centerResolved && <span className="rds-header__center-content">{centerResolved}</span>}
          {showInlineTabs && (
            <Tabs
              {...tabsProps}
              className={clsx('rds-header__tabs-inline', tabsProps?.className)}
              value={tabValueResolved}
              onChange={handleTabChange}
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
          {endContent && <span className="rds-header__right-actions">{endContent}</span>}

          {userName && userEmail ? (
            <span className="rds-header__actions">
              <ProfileMenu name={userName} email={userEmail} items={profileMenuItems} />
            </span>
          ) : (
            endSlot === undefined && actions && <span className="rds-header__actions">{actions}</span>
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
