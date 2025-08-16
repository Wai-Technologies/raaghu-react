import React from 'react';
import { 
  Drawer as MuiDrawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  type DrawerProps
} from '@mui/material';
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
}

const RdsSidebar = ({
  items,
  isOpen,
  onClose,
  width = 240,
  variant = 'temporary',
  showSearch = true,
  typeOf = 'expanded',
  avatarSrc,
  avatarCollapsedSrc,
  ...props
}:RdsSidebarProps) => {
  const [searchValue, setSearchValue] = React.useState("");

  // Derived state for sidebar appearance
  const isCollapsed = typeOf === 'collapse' || typeOf === 'fixed';
  const showLabels = !isCollapsed;
  const showLogo = true;
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
    showSearchBox = false;
    showAvatar = false;
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
  // ...existing code...

  return (
    <MuiDrawer
      open={isOpen}
      onClose={onClose}
      variant={drawerVariant}
      sx={drawerSx}
      className={sidebarClasses}
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
                  designation="Designation"
                  displayStyle="with-name"
                  name="Jane Doe"
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
          {items.map((item, index) => (
            <ListItem key={index} disablePadding className={navItemClasses}>
              <ListItemButton
                onClick={item.onClick}
                disabled={item.disabled}
                selected={item.active}
                className={navButtonClasses}
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
              </ListItemButton>
            </ListItem>
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
                designation="Designation"
                displayStyle="with-name"
                name="Jane Doe"
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

export default RdsSidebar;
