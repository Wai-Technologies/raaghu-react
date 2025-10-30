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
} from '@mui/material';
import { 
  ExpandLess, 
  ExpandMore,
  DashboardOutlined,
  GroupsOutlined,
  AdminPanelSettings,
  WidgetsOutlined,
  AppsOutlined,
  ManageAccounts,
  DesignServicesOutlined,
  ReceiptLongOutlined,
  FolderOutlined,
  PeopleOutline,
  MailOutline,
  CampaignOutlined,
  RequestQuoteOutlined
} from '@mui/icons-material';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsSearch from '../rds-search/rds-search';
import './rds-sidebar.scss';

export interface RdsSidebarItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  layout?: 'raaghu' | 'list' | 'toolbar';
  typeOf?: 'collapse' | 'expanded' | 'fixed';
  platform?: 'abp-list' | 'anz-list';
  /** Optional nested submenu items */
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
  // Track which top-level items with children are expanded
  const [openMap, setOpenMap] = React.useState<Record<number, boolean>>({});

  // Platform-specific menu items
  const anzMenuItems: RdsSidebarItem[] = [
    { label: 'Dashboard', icon: <DashboardOutlined />, onClick: () => console.log('Dashboard clicked') },
    { label: 'Saas', icon: <AppsOutlined />, onClick: () => console.log('Saas clicked') },
    { label: 'Administration', icon: <ManageAccounts />, onClick: () => console.log('Administration clicked') },
    { label: 'Demo UI Components', icon: <DesignServicesOutlined />, onClick: () => console.log('Demo UI Components clicked') },
  ];

  const abpMenuItems: RdsSidebarItem[] = [
    { label: 'Dashboard', icon: <DashboardOutlined />, onClick: () => console.log('Dashboard clicked') },
    { label: 'Saas', icon: <GroupsOutlined />, onClick: () => console.log('Saas clicked') },
    { label: 'Invoices', icon: <ReceiptLongOutlined />, onClick: () => console.log('Invoices clicked') },
    { label: 'Ticket Allocation', icon: <FolderOutlined />, onClick: () => console.log('Ticket Allocation clicked') },
    { label: 'Communication', icon: <MailOutline />, onClick: () => console.log('Communication clicked') },
    { label: 'Advertisements', icon: <CampaignOutlined />, onClick: () => console.log('Advertisements clicked') },
    { label: 'Requests', icon: <RequestQuoteOutlined />, onClick: () => console.log('Requests clicked') },
  ];

  // Determine which items to use based on platform
  const menuItems = platform === 'abp-list' ? abpMenuItems : 
                   platform === 'anz-list' ? anzMenuItems : 
                   items;

  const toggleOpen = (idx: number) => {
    setOpenMap(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Derived state for sidebar appearance
  const isCollapsed = typeOf === 'collapse' || typeOf === 'fixed';
  const showLabels = !isCollapsed;
  let showAvatar = !isCollapsed;
  let showSearchBox = !isCollapsed && showSearch;
  let drawerVariant = variant;

  // Special case for list layout
  if (props.layout === 'list' && isCollapsed) {
    showAvatar = true;
    showSearchBox = showSearch;
  }
  // Hide search and avatar for raaghu and toolbar layouts
  if (props.layout === 'raaghu' || props.layout === 'toolbar') {
    // Avatar should be hidden in these layouts, but respect the `showSearch` prop so
    // consumers can toggle the search box via controls or props.
    showAvatar = false;
    showSearchBox = showSearch && !isCollapsed;
  }

  // CSS classes
  const sidebarClasses = `rds-sidebar rds-sidebar--${typeOf}`;
  const headerClasses = `rds-sidebar__header rds-sidebar__header--${typeOf}`;
  const contentClasses = 'rds-sidebar__content';
  const navItemClasses = `rds-sidebar__nav-item rds-sidebar__nav-item--${typeOf}`;
  const navButtonClasses = `rds-sidebar__nav-button rds-sidebar__nav-button--${typeOf}`;
  const avatarContainerClasses = `rds-sidebar__avatar-container rds-sidebar__avatar-container--${typeOf}`;
  const getLogoClass = () => isCollapsed ? 'rds-sidebar__logo rds-sidebar__logo--collapse' : 'rds-sidebar__logo rds-sidebar__logo--expanded';

  // Drawer styles
  const drawerSx: any = {
    width: isCollapsed ? 64 : width,
    flexShrink: 0,
    ['& .MuiDrawer-paper']: {
      width: isCollapsed ? 64 : width,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      height: isCollapsed && typeOf === 'fixed' ? '100vh' : '100%',
      ...(isCollapsed && {
        alignItems: 'center',
        overflowX: 'hidden',
        ...(typeOf === 'fixed' && {
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1200,
        })
      })
    }
  };

  return (
    <MuiDrawer
      open={isOpen}
      onClose={onClose}
      variant={drawerVariant}
      sx={drawerSx}
      className={sidebarClasses}
      container={container}
      {...props}
    >
      <div className={contentClasses}>
        {showLogo && (
          <div className={headerClasses}>
            {props.layout === 'toolbar' ? (
              isCollapsed ? (
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
                src={isCollapsed ? '/raaghu.png' : avatarCollapsedSrc}
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
                placeholder={isCollapsed ? '' : 'Search...'}
                size="small"
                value={searchValue}
                sx={{ width: isCollapsed ? 38 : 205 }}
              />
            </div>
          </>
        )}
        <List className="rds-sidebar__nav-list">
          {menuItems.map((item, index) => (
            <div key={index}>
              <ListItem disablePadding className={navItemClasses}>
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
                    minHeight: 48,
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    px: isCollapsed ? 0 : 2,
                  }}
                >
                  {item.icon && (
                    <ListItemIcon className={`rds-sidebar__nav-icon ${showLabels ? 'rds-sidebar__nav-icon--with-label' : 'rds-sidebar__nav-icon--no-label'}`}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                  {showLabels && <ListItemText primary={item.label} />}
                  {item.children && item.children.length > 0 && (
                    (!!openMap[index]) ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              {item.children && item.children.length > 0 && (
                <Collapse in={!!openMap[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, cIdx) => (
                      <ListItem key={cIdx} disablePadding className={navItemClasses}>
                        <ListItemButton
                          onClick={child.onClick}
                          disabled={child.disabled}
                          selected={child.active}
                          className={navButtonClasses}
                          sx={{
                            minHeight: 40,
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                            px: isCollapsed ? 0 : 4,
                          }}
                        >
                          {child.icon && (
                            <ListItemIcon className={`rds-sidebar__nav-icon ${showLabels ? 'rds-sidebar__nav-icon--with-label' : 'rds-sidebar__nav-icon--no-label'}`}>
                              {child.icon}
                            </ListItemIcon>
                          )}
                          {showLabels && <ListItemText primary={child.label} />}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
        <div className="rds-sidebar__footer">
          <hr className="rds-sidebar__footer-divider" />
        </div>
        {showAvatar && (
          <div className={avatarContainerClasses}>
            {typeOf === 'expanded' ? (
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
