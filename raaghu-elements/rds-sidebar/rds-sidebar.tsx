import React from 'react';
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
import './rds-sidebar.scss';

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

export interface RdsSidebarProps extends Omit<DrawerProps, 'children'> {
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
  ...props
}:RdsSidebarProps) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [openMap, setOpenMap] = React.useState<Record<number, boolean>>({});

  const anzMenuItems: RdsSidebarItem[] = [
    { label: 'Dashboard', icon: <DashboardOutlined /> },
    { label: 'Saas', icon: <AppsOutlined /> },
    { label: 'Administration', icon: <ManageAccounts /> },
    { label: 'Demo UI Components', icon: <DesignServicesOutlined /> },
  ];

  const abpMenuItems: RdsSidebarItem[] = [
    { label: 'Dashboard', icon: <DashboardOutlined /> },
    { label: 'Saas', icon: <GroupsOutlined /> },
    { label: 'Invoices', icon: <ReceiptLongOutlined /> },
    { label: 'Ticket Allocation', icon: <FolderOutlined /> },
    { label: 'Communication', icon: <MailOutline /> },
    { label: 'Advertisements', icon: <CampaignOutlined /> },
    { label: 'Requests', icon: <RequestQuoteOutlined /> },
  ];

  const menuItems = platform === 'abp-list' ? abpMenuItems : 
                   platform === 'anz-list' ? anzMenuItems : 
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

  if (props.layout === 'list' && shouldShowIconsOnly) {
    showAvatar = true;
    showSearchBox = showSearch;
  }
  if (props.layout === 'raaghu' || props.layout === 'toolbar') {
    showAvatar = false;
    showSearchBox = showSearch && !shouldShowIconsOnly;
  }

  const sidebarClasses = `rds-sidebar rds-sidebar--${typeOf} ${isNarrowCollapsed ? 'rds-sidebar--narrow-collapsed' : ''}`;
  const headerClasses = `rds-sidebar__header rds-sidebar__header--${typeOf}`;
  const contentClasses = 'rds-sidebar__content';
  const navItemClasses = `rds-sidebar__nav-item rds-sidebar__nav-item--${typeOf}`;
  const navButtonClasses = `rds-sidebar__nav-button rds-sidebar__nav-button--${typeOf}`;
  const avatarContainerClasses = `rds-sidebar__avatar-container rds-sidebar__avatar-container--${typeOf}`;
  const getLogoClass = () => shouldShowIconsOnly ? 'rds-sidebar__logo rds-sidebar__logo--collapse' : 'rds-sidebar__logo rds-sidebar__logo--expanded';

  const drawerSx: SxProps = {
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
        })
      })
    }
  };

  return (
    <MuiDrawer
      open={isOpen}
      onClose={onClose}
      variant={variant}
      sx={drawerSx}
      className={sidebarClasses}
      container={container}
      {...props}
    >
      <div className={contentClasses}>
        {showLogo && (
          <div className={headerClasses}>
            {props.layout === 'toolbar' ? (
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
            <div className="rds-sidebar__search-container">
              <RdsSearch
                iconPosition="right"
                label=""
                labelPosition="top"
                onChange={value => setSearchValue(value)}
                onSearch={() => {}}
                placeholder={shouldShowIconsOnly ? '' : 'Search...'}
                size="small"
                value={searchValue}
                sx={{ width: shouldShowIconsOnly ? 38 : Math.min(width - 32, 205) }}
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
              <ListItem key={index} disablePadding className={navItemClasses} sx={{ display: 'block' }}>
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
                          <ListItem key={cIdx} disablePadding className={navItemClasses}>
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
              </ListItem>
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
