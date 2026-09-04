import { Fragment, useState, type ReactNode } from 'react';
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  type DrawerProps,
  type SxProps,
} from '@mui/material';
import { 
  ExpandLess, 
  ExpandMore,
  DashboardOutlined,
  GroupsOutlined,
  AppsOutlined,
  ManageAccounts,
  DesignServicesOutlined,
  ReceiptLongOutlined,
  FolderOutlined,
  MailOutline,
  CampaignOutlined,
  RequestQuoteOutlined
} from '@mui/icons-material';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsSearch from '../rds-search/rds-search';
import RdsTooltip from '../rds-tooltip/rds-tooltip';
import clsx from 'clsx';
import './rds-sidebar.scss';

const ANZ_MENU_ITEMS: RdsSidebarItem[] = [
  { label: 'Dashboard', icon: <DashboardOutlined /> },
  { label: 'Saas', icon: <AppsOutlined /> },
  { label: 'Administration', icon: <ManageAccounts /> },
  { label: 'Demo UI Components', icon: <DesignServicesOutlined /> },
];

const ABP_MENU_ITEMS: RdsSidebarItem[] = [
  { label: 'Dashboard', icon: <DashboardOutlined /> },
  { label: 'Saas', icon: <GroupsOutlined /> },
  { label: 'Invoices', icon: <ReceiptLongOutlined /> },
  { label: 'Ticket Allocation', icon: <FolderOutlined /> },
  { label: 'Communication', icon: <MailOutline /> },
  { label: 'Advertisements', icon: <CampaignOutlined /> },
  { label: 'Requests', icon: <RequestQuoteOutlined /> },
];

export interface RdsSidebarItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  typeOf?: 'collapse' | 'expanded' | 'fixed';
  platform?: 'abp-list' | 'anz-list';
  children?: RdsSidebarItem[];
  /** Optional navigation path (alias used by some consumers). */
  path?: string;
  /** Optional href for link-style items. */
  href?: string;
}

export interface RdsSidebarProps extends Omit<DrawerProps, 'children' | 'component'> {
  items: RdsSidebarItem[];
  isOpen: boolean;
  onClose?: () => void;
  width?: number;
  showSearch?: boolean;
  layout?: 'raaghu' | 'list' | 'toolbar';
  typeOf?: 'collapse' | 'expanded' | 'fixed';
  platform?: 'abp-list' | 'anz-list';
  avatarSrc?: string;
  avatarCollapsedSrc?: string;
  showLogo?: boolean;
  container?: Element | (() => Element | null) | null;
}

const RdsSidebar = ({
  items,
  isOpen,
  onClose,
  width = 240,
  variant = 'temporary',
  showSearch = true,
  typeOf = 'expanded',
  platform,
  avatarSrc,
  avatarCollapsedSrc,
  showLogo,
  container,
  layout,
  ModalProps: modalPropsFromProps,
  sx: propsSx,
  ...props
}:RdsSidebarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});

  const menuItems = platform === 'abp-list' ? ABP_MENU_ITEMS : 
                   platform === 'anz-list' ? ANZ_MENU_ITEMS : 
                   items;

  const toggleOpen = (idx: number) => {
    setOpenMap(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

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
    // Keep search available in collapse/fixed (icon-only) mode when showSearch is true
    showSearchBox = showSearch;
  }

  const sidebarClasses = clsx('rds-sidebar', `rds-sidebar--${typeOf}`, isNarrowCollapsed && 'rds-sidebar--narrow-collapsed');
  const headerClasses = clsx('rds-sidebar__header', `rds-sidebar__header--${typeOf}`);
  const contentClasses = 'rds-sidebar__content';
  const navItemClasses = clsx('rds-sidebar__nav-item', `rds-sidebar__nav-item--${typeOf}`);
  const navButtonClasses = clsx('rds-sidebar__nav-button', `rds-sidebar__nav-button--${typeOf}`);
  const avatarContainerClasses = clsx('rds-sidebar__avatar-container', `rds-sidebar__avatar-container--${typeOf}`);
  const getLogoClass = () => clsx('rds-sidebar__logo', shouldShowIconsOnly ? 'rds-sidebar__logo--collapse' : 'rds-sidebar__logo--expanded');

  const drawerSx: Record<string, unknown> = {
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
        overflow: 'hidden',
        ...(typeOf === 'fixed' && {
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 'var(--rds-z-index-banner, 1200)',
        })
      })
    }
  };

  const searchIconOnlySize = 'var(--rds-sidebar-search-icon-only-size, var(--rds-menu-item-min-height, 40px))';
  const searchSx = shouldShowIconsOnly
    ? {
        width: searchIconOnlySize,
        maxWidth: searchIconOnlySize,
        minWidth: 0,
        margin: '0 auto',
        '& .MuiInputBase-root': {
          minWidth: 0,
          width: searchIconOnlySize,
          maxWidth: searchIconOnlySize,
          height: searchIconOnlySize,
          margin: '0 auto',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--rds-sidebar-search-icon-border-color, var(--rds-border-default))',
          borderWidth: 'var(--rds-border-width-thin, 1px)',
          borderRadius: 'var(--rds-sidebar-search-icon-border-radius, var(--rds-border-radius-sm, 4px))',
        },
        '& .MuiInputBase-input': {
          display: 'none',
          width: 0,
          padding: 0,
          flex: '0 0 0',
          position: 'absolute',
        },
        '& .MuiInputAdornment-root': {
          margin: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        },
        '& .MuiIconButton-root': {
          margin: 0,
        },
      }
    : { width: '100%', maxWidth: Math.min(width - 32, 205) };

  const modalProps = {
    disableScrollLock: true,
    ...(container
      ? {
          disableAutoFocus: true,
          disableEnforceFocus: true,
          disableRestoreFocus: true,
        }
      : {}),
    ...modalPropsFromProps,
  };

  return (
    <MuiDrawer
      open={isOpen}
      onClose={onClose}
      variant={variant}
      className={sidebarClasses}
      container={container}
      ModalProps={modalProps}
      {...props}
      sx={[drawerSx, propsSx] as SxProps}
    >
      <div className={contentClasses}>
        {showLogo && (
          <div className={headerClasses}>
            {layout === 'toolbar' ? (
              shouldShowIconsOnly ? (
                <RdsAvatar
                  activeDotBottom
                  src={avatarSrc}
                />
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
                className={getLogoClass()}
              />
            )}
          </div>
        )}
        {showSearchBox && (
          <>
            <div className="rds-sidebar__search-section">
              <hr className="rds-sidebar__search-divider" />
            </div>
            <div
              className={clsx(
                'rds-sidebar__search-container',
                shouldShowIconsOnly && 'rds-sidebar__search-container--icon-only',
              )}
            >
              <RdsSearch
                iconPosition={shouldShowIconsOnly ? 'left' : 'right'}
                label=""
                labelPosition="top"
                onChange={value => setSearchValue(value)}
                onSearch={() => {}}
                placeholder={shouldShowIconsOnly ? '' : 'Search...'}
                showClearButton={!shouldShowIconsOnly}
                size="small"
                variant="outlined"
                value={searchValue}
                sx={searchSx}
              />
            </div>
          </>
        )}
        <List className="rds-sidebar__nav-list">
          {menuItems.map((item, index) => {
            const listItemButton = (
              <ListItemButton
                onClick={() => {
                  if (item.children && item.children.length) {
                    toggleOpen(index);
                  } else {
                    item.onClick && item.onClick();
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
                  <ListItemIcon className={`rds-sidebar__nav-icon ${showLabels ? 'rds-sidebar__nav-icon--with-label' : 'rds-sidebar__nav-icon--no-label'}`}>
                    {item.icon}
                  </ListItemIcon>
                )}
                {showLabels && <ListItemText primary={item.label} />}
                {item.children && item.children.length > 0 && !shouldShowIconsOnly && (
                  (openMap[index]) ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            );

            return (
              <Fragment key={`${item.label}-${item.path || item.href || 'nav-item'}`}>
                <ListItem disablePadding className={navItemClasses}>
                  {shouldShowIconsOnly && item.icon ? (
                    <RdsTooltip 
                      title={item.label} 
                      style="right"
                      arrow
                    >
                      {listItemButton}
                    </RdsTooltip>
                  ) : (
                    listItemButton
                  )}
                </ListItem>
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
                              <ListItemIcon className={`rds-sidebar__nav-icon ${showLabels ? 'rds-sidebar__nav-icon--with-label' : 'rds-sidebar__nav-icon--no-label'}`}>
                                {child.icon}
                              </ListItemIcon>
                            )}
                            {showLabels && <ListItemText primary={child.label} />}
                          </ListItemButton>
                        );

                        return (
                          <ListItem key={`${child.label}-${child.path || child.href || 'child-item'}`} disablePadding className={navItemClasses}>
                            {shouldShowIconsOnly && child.icon ? (
                              <RdsTooltip
                                title={`${item.label} - ${child.label}`}
                                style="right"
                                arrow
                              >
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
              </Fragment>
            );
          })}
        </List>
        <div className="rds-sidebar__footer">
          <hr className="rds-sidebar__footer-divider" />
        </div>
        {showAvatar && (
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
              <RdsAvatar
                activeDotBottom
                src={avatarSrc}
              />
            )}
          </div>
        )}
      </div>
    </MuiDrawer>
  );
};
RdsSidebar.displayName = 'RdsSidebar';
export default RdsSidebar;
