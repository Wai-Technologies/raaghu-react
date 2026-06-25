import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  type SxProps,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  DashboardOutlined,
  GroupsOutlined,
  AppsOutlined,
  ManageAccounts,
  DesignServicesOutlined,
  ReceiptLongOutlined,
  FolderOutlined,
  MailOutline,
  CampaignOutlined,
  RequestQuoteOutlined,
} from '@mui/icons-material';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsSearch from '../rds-search/rds-search';
import RdsTooltip from '../rds-tooltip/rds-tooltip';

export interface RdsSidebarItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  typeOf?: 'collapse' | 'expanded' | 'fixed';
  platform?: 'abp-list' | 'anz-list';
  children?: RdsSidebarItem[];
}

const abpMenuItems: RdsSidebarItem[] = [
  { label: 'Dashboard', icon: <DashboardOutlined /> },
  { label: 'Saas', icon: <GroupsOutlined /> },
  { label: 'Invoices', icon: <ReceiptLongOutlined /> },
  { label: 'Ticket Allocation', icon: <FolderOutlined /> },
  { label: 'Communication', icon: <MailOutline /> },
  { label: 'Advertisements', icon: <CampaignOutlined /> },
  { label: 'Requests', icon: <RequestQuoteOutlined /> },
];

const anzMenuItems: RdsSidebarItem[] = [
  { label: 'Dashboard', icon: <DashboardOutlined /> },
  { label: 'Saas', icon: <AppsOutlined /> },
  { label: 'Administration', icon: <ManageAccounts /> },
  { label: 'Demo UI Components', icon: <DesignServicesOutlined /> },
];

export function resolveMenuItems(
  platform: string | undefined,
  items: RdsSidebarItem[]
): RdsSidebarItem[] {
  if (platform === 'abp-list') return abpMenuItems;
  if (platform === 'anz-list') return anzMenuItems;
  return items;
}

export function getSidebarVisibilityFlags(
  typeOf: 'collapse' | 'expanded' | 'fixed',
  width: number,
  layout: string | undefined,
  showSearch: boolean
) {
  const isCollapsed = typeOf === 'collapse' || typeOf === 'fixed';
  const isNarrowCollapsed = width < 200;
  const shouldShowIconsOnly = isCollapsed || isNarrowCollapsed;
  const showLabels = !shouldShowIconsOnly;

  let showAvatar = true;
  let showSearchBox = !shouldShowIconsOnly && showSearch;

  if (layout === 'list' && shouldShowIconsOnly) {
    showAvatar = true;
    showSearchBox = showSearch;
  }
  if (layout === 'raaghu' || layout === 'toolbar') {
    showAvatar = false;
    showSearchBox = showSearch && !shouldShowIconsOnly;
  }

  return { isCollapsed, isNarrowCollapsed, shouldShowIconsOnly, showLabels, showAvatar, showSearchBox };
}

export function getDrawerSx(
  shouldShowIconsOnly: boolean,
  width: number,
  typeOf: 'collapse' | 'expanded' | 'fixed'
): SxProps {
  return {
    width: shouldShowIconsOnly ? 64 : width,
    flexShrink: 0,
    ['& .MuiDrawer-paper']: {
      width: shouldShowIconsOnly ? 64 : width,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      height: shouldShowIconsOnly && typeOf === 'fixed' ? '100vh' : '100%',
      ...(shouldShowIconsOnly && {
        alignItems: 'center',
        overflowX: 'hidden',
        ...(typeOf === 'fixed' && {
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 'var(--rds-z-index-banner, 1200)',
        }),
      }),
    },
  };
}

export interface SidebarHeaderProps {
  showLogo: boolean;
  layout?: string;
  shouldShowIconsOnly: boolean;
  typeOf: string;
  avatarSrc?: string;
  avatarCollapsedSrc?: string;
}

export function SidebarHeaderSection({
  showLogo,
  layout,
  shouldShowIconsOnly,
  typeOf,
  avatarSrc,
  avatarCollapsedSrc,
}: SidebarHeaderProps) {
  if (!showLogo) return null;

  const headerClasses = `rds-sidebar__header rds-sidebar__header--${typeOf}`;
  const logoClass = shouldShowIconsOnly
    ? 'rds-sidebar__logo rds-sidebar__logo--collapse'
    : 'rds-sidebar__logo rds-sidebar__logo--expanded';

  return (
    <div className={headerClasses}>
      {layout === 'toolbar' ? (
        shouldShowIconsOnly ? (
          <RdsAvatar activeDotBottom src={avatarSrc} />
        ) : (
          <RdsAvatar
            alt="User Avatar"
            subText="Designation"
            displayStyle="with-name"
            title="Jane Doe"
            showDesignation
            showName
            activeDotBottom
            src={avatarSrc}
          />
        )
      ) : (
        <img
          src={shouldShowIconsOnly ? '/raaghu.png' : avatarCollapsedSrc}
          alt="Raaghu Design System Logo"
          className={logoClass}
        />
      )}
    </div>
  );
}

export interface SidebarSearchProps {
  showSearchBox: boolean;
  shouldShowIconsOnly: boolean;
  width: number;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export function SidebarSearchSection({
  showSearchBox,
  shouldShowIconsOnly,
  width,
  searchValue,
  setSearchValue,
}: SidebarSearchProps) {
  if (!showSearchBox) return null;

  return (
    <>
      <div className="rds-sidebar__search-section">
        <hr className="rds-sidebar__search-divider" />
      </div>
      <div className="rds-sidebar__search-container">
        <RdsSearch
          iconPosition="right"
          label=""
          labelPosition="top"
          onChange={(value) => setSearchValue(value)}
          onSearch={() => {}}
          placeholder={shouldShowIconsOnly ? '' : 'Search...'}
          size="small"
          value={searchValue}
          sx={{ width: shouldShowIconsOnly ? 38 : Math.min(width - 32, 205) }}
        />
      </div>
    </>
  );
}

export interface SidebarNavListProps {
  menuItems: RdsSidebarItem[];
  shouldShowIconsOnly: boolean;
  showLabels: boolean;
  openMap: Record<number, boolean>;
  toggleOpen: (idx: number) => void;
  navItemClasses: string;
  navButtonClasses: string;
}

export function SidebarNavList({
  menuItems,
  shouldShowIconsOnly,
  showLabels,
  openMap,
  toggleOpen,
  navItemClasses,
  navButtonClasses,
}: SidebarNavListProps) {
  return (
    <List className="rds-sidebar__nav-list">
      {menuItems.map((item, index) => {
        const listItemButton = (
          <ListItemButton
            onClick={() => {
              if (item.children && item.children.length) {
                toggleOpen(index);
              } else {
                item.onClick?.();
              }
            }}
            disabled={item.disabled}
            selected={item.active}
            className={navButtonClasses}
            aria-expanded={!!openMap[index]}
            sx={{
              minHeight: 'var(--rds-sidebar-nav-min-height, 48px)',
              justifyContent: shouldShowIconsOnly ? 'center' : 'flex-start',
              px: shouldShowIconsOnly ? 0 : 2,
            }}
          >
            {item.icon && (
              <ListItemIcon
                className={`rds-sidebar__nav-icon ${showLabels ? 'rds-sidebar__nav-icon--with-label' : 'rds-sidebar__nav-icon--no-label'}`}
              >
                {item.icon}
              </ListItemIcon>
            )}
            {showLabels && <ListItemText primary={item.label} />}
            {item.children && item.children.length > 0 && !shouldShowIconsOnly && (
              openMap[index] ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>
        );

        return (
          <ListItem key={item.label} disablePadding className={navItemClasses} sx={{ display: 'block' }}>
            {shouldShowIconsOnly && item.icon ? (
              <RdsTooltip title={item.label} style="right" arrow>
                {listItemButton}
              </RdsTooltip>
            ) : (
              listItemButton
            )}
            {item.children && item.children.length > 0 && (
              <Collapse in={!!openMap[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child, cIdx) => {
                    const childListItemButton = (
                      <ListItemButton
                        onClick={child.onClick}
                        disabled={child.disabled}
                        selected={child.active}
                        className={navButtonClasses}
                        sx={{
                          minHeight: 'var(--rds-sidebar-child-nav-min-height, 40px)',
                          justifyContent: shouldShowIconsOnly ? 'center' : 'flex-start',
                          px: shouldShowIconsOnly ? 0 : 4,
                        }}
                      >
                        {child.icon && (
                          <ListItemIcon
                            className={`rds-sidebar__nav-icon ${showLabels ? 'rds-sidebar__nav-icon--with-label' : 'rds-sidebar__nav-icon--no-label'}`}
                          >
                            {child.icon}
                          </ListItemIcon>
                        )}
                        {showLabels && <ListItemText primary={child.label} />}
                      </ListItemButton>
                    );

                    return (
                      <ListItem key={cIdx} disablePadding className={navItemClasses}>
                        {shouldShowIconsOnly && child.icon ? (
                          <RdsTooltip title={`${item.label} - ${child.label}`} style="right" arrow>
                            {childListItemButton}
                          </RdsTooltip>
                        ) : (
                          childListItemButton
                        )}
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

export interface SidebarFooterAvatarProps {
  showAvatar: boolean;
  shouldShowIconsOnly: boolean;
  avatarContainerClasses: string;
  avatarSrc?: string;
}

export function SidebarFooterAvatar({
  showAvatar,
  shouldShowIconsOnly,
  avatarContainerClasses,
  avatarSrc,
}: SidebarFooterAvatarProps) {
  if (!showAvatar) return null;

  return (
    <div className={avatarContainerClasses}>
      {!shouldShowIconsOnly ? (
        <RdsAvatar
          alt="User Avatar"
          subText="Designation"
          displayStyle="with-name"
          title="Jane Doe"
          showDesignation
          showName
          activeDotBottom
          src={avatarSrc}
        />
      ) : (
        <RdsAvatar activeDotBottom src={avatarSrc} />
      )}
    </div>
  );
}
