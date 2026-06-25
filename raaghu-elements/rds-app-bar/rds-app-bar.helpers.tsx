import React from 'react';
import { Box, Drawer, IconButton, InputBase, Tabs, Tab } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Dehaze as DehazeIcon } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import RdsButton from '../rds-button/rds-button';
import { ProfileMenu } from './ProfileMenu';

export const toolbarHeights = {
  small: 55,
  medium: 64,
  large: 80,
};

export function getAppBarColorClass(color?: string): string {
  if (color === 'primary') return ' rds-header--primary';
  if (color === 'secondary') return ' rds-header--secondary';
  if (color === 'transparent') return ' rds-header--transparent';
  return '';
}

export function getAppBarVariantClass(variantStyle?: string): string {
  if (!variantStyle) return '';
  return ` rds-header--variant-${String(variantStyle).toLowerCase().replace(/[^a-z0-9]+/g, '')}`;
}

export function useAppBarScreenSize(variantStyle?: string) {
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      const variantLower = variantStyle ? String(variantStyle).toLowerCase() : '';
      const tabletBottomNavVariants = [
        'withmenubutton',
        'withactions',
        'withtabs',
        'withnotificationbadge',
        'withlogoandtabs',
      ];
      const needsTabletBottomNav = tabletBottomNavVariants.includes(variantLower);
      const threshold = needsTabletBottomNav ? 840 : 420;
      setIsSmallScreen(globalThis.innerWidth <= threshold);
    };

    checkScreenSize();
    globalThis.addEventListener('resize', checkScreenSize);
    return () => globalThis.removeEventListener('resize', checkScreenSize);
  }, [variantStyle]);

  return isSmallScreen;
}

export interface AppBarSearchProps {
  searchValue: string;
  searchPlaceholder?: string;
  onSearchChange: (value: string) => void;
}

export function AppBarSearch({ searchValue, searchPlaceholder, onSearchChange }: AppBarSearchProps) {
  return (
    <div className="rds-header__search-wrapper">
      <InputBase
        className="rds-header__search"
        placeholder={searchPlaceholder || 'Search…'}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
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
  );
}

export interface AppBarTabsProps {
  tabs: Array<string | { label: string; [key: string]: unknown }>;
  tabValue: number;
  onTabChange: (value: number) => void;
}

export function AppBarInlineTabs({ tabs, tabValue, onTabChange }: AppBarTabsProps) {
  return (
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
          <Tab key={tab.label || idx} {...(tab as React.ComponentProps<typeof Tab>)} />
        )
      )}
    </Tabs>
  );
}

export interface AppBarOverflowDrawerProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  overflowContent: React.ReactNode;
  drawerWidth: number | string;
  isSmallScreen: boolean;
}

export function AppBarOverflowDrawer({
  open,
  onOpen,
  onClose,
  overflowContent,
  drawerWidth,
  isSmallScreen,
}: AppBarOverflowDrawerProps) {
  if (isSmallScreen || !overflowContent) return null;

  return (
    <>
      <IconButton
        className="rds-appbar-overflow-button"
        color="inherit"
        aria-label="open overflow menu"
        onClick={onOpen}
        size="small"
      >
        <span className="rds-overflow-icon rds-overflow-icon--hamburger" aria-hidden>
          <DehazeIcon />
        </span>
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: drawerWidth } }}
      >
        <Box sx={{ p: 2, height: '100%', boxSizing: 'border-box' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={onClose} aria-label="close">
              <Close />
            </IconButton>
          </Box>
          <Box className="rds-appbar-overflow-content" sx={{ mt: 1 }}>
            {overflowContent}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

function BottomNavTabs({
  tabs,
  tabValue,
  onTabChange,
  tokens,
  variant = 'default',
}: {
  tabs: AppBarTabsProps['tabs'];
  tabValue: number;
  onTabChange: (value: number) => void;
  tokens: { space: (n: number) => number | string; zIndex: { dropdown: number }; cssVar: (name: string) => string };
  variant?: 'default' | 'menuButton';
}) {
  const tabButtons = tabs.map((t, i) => {
    const label = typeof t === 'string' ? t : (t as { label: string }).label || String(i);
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
  });

  if (variant === 'menuButton') {
    return (
      <Box className="rds-bottom-navigation">
        <Box className="rds-bottom-navigation-single-row">
          {tabButtons}
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
              padding: 'var(--rds-spacing-xs) var(--rds-spacing-sm)',
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
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
      {tabButtons}
    </Box>
  );
}

function BottomNavOverflow({
  overflowContent,
  localBottomActive,
  setLocalBottomActive,
  tokens,
}: {
  overflowContent: React.ReactNode;
  localBottomActive: number;
  setLocalBottomActive: (index: number) => void;
  tokens: { space: (n: number) => number | string; zIndex: { dropdown: number }; cssVar: (name: string) => string };
}) {
  return (
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
      {React.isValidElement(overflowContent) &&
      (overflowContent as React.ReactElement<{ children?: React.ReactNode }>).props?.children
        ? React.Children.toArray(
            (overflowContent as React.ReactElement<{ children?: React.ReactNode }>).props.children
          ).map((child, i) => {
            if (React.isValidElement(child)) {
              const childProps = (
                child as React.ReactElement<{ onClick?: React.MouseEventHandler<HTMLElement>; className?: string }>
              ).props;
              const existingOnClick = childProps.onClick;
              const className = (childProps.className ? childProps.className + ' ' : '') + 'rds-bottom-nav-tab';
              return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                key: child.key ?? `bottom-nav-tab-${i}`,
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                  if (typeof existingOnClick === 'function') existingOnClick(e);
                  setLocalBottomActive(i);
                },
                className: localBottomActive === i ? className + ' rds-bottom-nav-tab--active' : className,
              });
            }
            return <span key={`bottom-nav-child-${String(child)}`}>{child}</span>;
          })
        : overflowContent}
    </Box>
  );
}

export interface AppBarBottomNavigationProps {
  isSmallScreen: boolean;
  variantStyle?: string;
  tabs?: AppBarTabsProps['tabs'];
  tabValue?: number;
  onTabChange?: (value: number) => void;
  overflowContent?: React.ReactNode;
  localBottomActive: number;
  setLocalBottomActive: (index: number) => void;
  tokens: { space: (n: number) => number | string; zIndex: { dropdown: number }; cssVar: (name: string) => string };
}

export function AppBarBottomNavigation({
  isSmallScreen,
  variantStyle,
  tabs,
  tabValue,
  onTabChange,
  overflowContent,
  localBottomActive,
  setLocalBottomActive,
  tokens,
}: AppBarBottomNavigationProps) {
  if (!isSmallScreen) return null;

  const hasTabs =
    Array.isArray(tabs) && typeof tabValue === 'number' && typeof onTabChange === 'function';
  const variantLower = variantStyle?.toLowerCase();

  if (variantLower === 'withmenubutton' && hasTabs) {
    return (
      <BottomNavTabs
        tabs={tabs!}
        tabValue={tabValue!}
        onTabChange={onTabChange!}
        tokens={tokens}
        variant="menuButton"
      />
    );
  }

  if (hasTabs) {
    return (
      <BottomNavTabs tabs={tabs!} tabValue={tabValue!} onTabChange={onTabChange!} tokens={tokens} />
    );
  }

  if (overflowContent) {
    return (
      <BottomNavOverflow
        overflowContent={overflowContent}
        localBottomActive={localBottomActive}
        setLocalBottomActive={setLocalBottomActive}
        tokens={tokens}
      />
    );
  }

  return null;
}

export interface AppBarUserActionsProps {
  userName?: string;
  userEmail?: string;
  actions?: React.ReactNode;
}

export function AppBarUserActions({ userName, userEmail, actions }: AppBarUserActionsProps) {
  if (userName && userEmail) {
    return (
      <span className="rds-header__actions">
        <ProfileMenu
          name={userName}
          email={userEmail}
          menuItems={[
            { label: 'My Profile', icon: <Person /> },
            { label: 'Logout', icon: <LogoutIcon />, sx: { color: 'var(--rds-error-main)' } },
          ]}
        />
      </span>
    );
  }
  if (actions) {
    return <span className="rds-header__actions">{actions}</span>;
  }
  return null;
}
