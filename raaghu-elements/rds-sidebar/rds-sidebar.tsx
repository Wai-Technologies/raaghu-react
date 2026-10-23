import { Fragment, isValidElement, useState, type ReactNode } from 'react';
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
  type Theme,
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
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-sidebar.scss';

/** Use only values that React can render as children (guards Storybook `{}` controls). */
const asReactNode = (value: ReactNode): ReactNode => {
  if (value == null || typeof value === 'boolean') return undefined;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') {
    return value;
  }
  if (isValidElement(value)) return value;
  if (Array.isArray(value)) {
    const safe = value
      .map((item) => asReactNode(item as ReactNode))
      .filter((item) => item !== undefined);
    return safe.length > 0 ? safe : undefined;
  }
  return undefined;
};

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

/** A single navigation entry in {@link RdsSidebar}. */
export interface RdsSidebarItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  /** Marks the item as the current one. */
  selected?: boolean;
  /** @deprecated Use `selected` instead. */
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

/** Props for {@link RdsSidebar}. */
export interface RdsSidebarProps extends Omit<DrawerProps, 'children' | 'component'> {
  /** Navigation items. Ignored when `platform` selects a built-in menu. */
  items: RdsSidebarItem[];
  /** @deprecated Use `open`. */
  isOpen?: boolean;
  /** Whether the sidebar is open (MUI Drawer prop). Takes precedence over `isOpen`. */
  open?: boolean;
  /** Called when the drawer requests to close. */
  onClose?: () => void;
  /** Expanded width in px. Widths below 200 render icon-only. */
  width?: number;
  /** Shows the search box. */
  showSearch?: boolean;
  /** Controlled search text. */
  searchValue?: string;
  /** Initial search text when uncontrolled. */
  defaultSearchValue?: string;
  /** Called when the search text changes. Items are not filtered by the sidebar. */
  onSearchChange?: (value: string) => void;
  /** User shown in the avatar area. Defaults to "Jane Doe" / "Designation". String values are expected by RdsAvatar. */
  user?: { name?: string; subtitle?: string; avatarSrc?: string };
  /** Custom logo node; replaces the default logo image when `showLogo` is on. */
  logo?: ReactNode;
  /** Replaces the default header content (logo or toolbar avatar); shown even when `showLogo` is off. */
  header?: ReactNode;
  /** Replaces the default footer content (user avatar). */
  footer?: ReactNode;
  layout?: 'raaghu' | 'list' | 'toolbar';
  /** Collapses the sidebar to icons only. Takes precedence over `typeOf`. */
  collapsed?: boolean;
  typeOf?: 'collapse' | 'expanded' | 'fixed';
  /** @deprecated Pass `items` instead. */
  platform?: 'abp-list' | 'anz-list';
  /** @deprecated Use `user.avatarSrc` instead. */
  avatarSrc?: string;
  avatarCollapsedSrc?: string;
  showLogo?: boolean;
  container?: Element | (() => Element | null) | null;
}

const RdsSidebar = ({
  items,
  isOpen,
  open,
  onClose,
  width = 240,
  variant = 'temporary',
  showSearch = true,
  searchValue,
  defaultSearchValue,
  onSearchChange,
  user,
  logo,
  header,
  footer,
  className,
  collapsed,
  typeOf: typeOfProp = 'expanded',
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
  if (isOpen !== undefined) warnDeprecatedProp('RdsSidebar', 'isOpen', '`open`');
  if (platform !== undefined) warnDeprecatedProp('RdsSidebar', 'platform', '`items`');
  if (avatarSrc !== undefined) warnDeprecatedProp('RdsSidebar', 'avatarSrc', '`user.avatarSrc`');
  const resolvedOpen = open ?? isOpen ?? false;
  const typeOf = collapsed === undefined ? typeOfProp : collapsed ? 'collapse' : 'expanded';
  const resolvedAvatarSrc = user?.avatarSrc ?? avatarSrc;
  const isSearchControlled = searchValue !== undefined;
  const [innerSearch, setInnerSearch] = useState(defaultSearchValue ?? '');
  const currentSearch = isSearchControlled ? searchValue : innerSearch;
  const handleSearchChange = (value: string) => {
    if (!isSearchControlled) setInnerSearch(value);
    onSearchChange?.(value);
  };
  const userName = user?.name ?? 'Jane Doe';
  const userSubtitle = user?.subtitle ?? 'Designation';
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});
  const resolvedLogo = asReactNode(logo);
  const resolvedHeader = asReactNode(header);
  const resolvedFooter = asReactNode(footer);

  const menuItems = platform === 'abp-list' ? ABP_MENU_ITEMS : 
                   platform === 'anz-list' ? ANZ_MENU_ITEMS : 
                   items;

  const isItemSelected = (item: RdsSidebarItem) => {
    if (item.active !== undefined) warnDeprecatedProp('RdsSidebar', 'items[].active', '`items[].selected`');
    return item.selected ?? item.active;
  };

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
    showSearchBox = showSearch;
  }

  const sidebarClasses = clsx('rds-sidebar', `rds-sidebar--${typeOf}`, isNarrowCollapsed && 'rds-sidebar--narrow-collapsed', className);
  const headerClasses = clsx('rds-sidebar__header', `rds-sidebar__header--${typeOf}`);
  const contentClasses = 'rds-sidebar__content';
  const navItemClasses = clsx('rds-sidebar__nav-item', `rds-sidebar__nav-item--${typeOf}`);
  const navButtonClasses = clsx('rds-sidebar__nav-button', `rds-sidebar__nav-button--${typeOf}`);
  const avatarContainerClasses = clsx('rds-sidebar__avatar-container', `rds-sidebar__avatar-container--${typeOf}`);
  const getLogoClass = () => clsx('rds-sidebar__logo', shouldShowIconsOnly ? 'rds-sidebar__logo--collapse' : 'rds-sidebar__logo--expanded');

  const drawerSx: SxProps<Theme> = {
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
  const searchSx: SxProps<Theme> = shouldShowIconsOnly
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
      open={resolvedOpen}
      onClose={onClose}
      variant={variant}
      container={container}
      ModalProps={modalProps}
      {...props}
      className={sidebarClasses}
      sx={[drawerSx, ...(Array.isArray(propsSx) ? propsSx : [propsSx])]}
    >
      <div className={contentClasses}>
        {(resolvedHeader != null || showLogo) && (
          <div className={headerClasses}>
            {resolvedHeader ?? (layout === 'toolbar' ? (
              shouldShowIconsOnly ? (
                <RdsAvatar
                  status="online"
                  src={resolvedAvatarSrc}
                />
              ) : (
                <RdsAvatar
                  alt="User Avatar"
                  description={userSubtitle}
                  displayStyle="with-name"
                  name={userName}
                  showDesignation
                  showName
                  status="online"
                  src={resolvedAvatarSrc}
                />
              )
            ) : resolvedLogo ?? (
              <img
                src={shouldShowIconsOnly ? '/raaghu.png' : avatarCollapsedSrc}
                alt="Raaghu Design System Logo"
                className={getLogoClass()}
              />
            ))}
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
                onChange={handleSearchChange}
                onSearch={() => {}}
                placeholder={shouldShowIconsOnly ? '' : 'Search...'}
                showClearButton={!shouldShowIconsOnly}
                size="small"
                variant="outlined"
                value={currentSearch}
                sx={searchSx}
              />
            </div>
          </>
        )}
        <List className="rds-sidebar__nav-list">
          {menuItems.map((item, index) => {
            const itemIcon = asReactNode(item.icon);
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
                selected={isItemSelected(item)}
                className={navButtonClasses}
                aria-expanded={item.children && item.children.length > 0 ? !!openMap[index] : undefined}
                sx={{
                  minHeight: 'var(--rds-sidebar-nav-min-height, 48px)',
                  justifyContent: shouldShowIconsOnly ? 'center' : 'flex-start',
                  px: shouldShowIconsOnly ? 0 : 2,
                }}
              >
                {itemIcon && (
                  <ListItemIcon className={`rds-sidebar__nav-icon ${showLabels ? 'rds-sidebar__nav-icon--with-label' : 'rds-sidebar__nav-icon--no-label'}`}>
                    {itemIcon}
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
                  {shouldShowIconsOnly && itemIcon ? (
                    <RdsTooltip 
                      title={item.label} 
                      placement="right"
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
                        const childIcon = asReactNode(child.icon);
                        const childListItemButton = (
                          <ListItemButton
                            onClick={child.onClick}
                            disabled={child.disabled}
                            selected={isItemSelected(child)}
                            className={navButtonClasses}
                            sx={{
                                minHeight: 'var(--rds-sidebar-child-nav-min-height, 40px)',
                              justifyContent: shouldShowIconsOnly ? 'center' : 'flex-start',
                              px: shouldShowIconsOnly ? 0 : 4,
                            }}
                          >
                            {childIcon && (
                              <ListItemIcon className={`rds-sidebar__nav-icon ${showLabels ? 'rds-sidebar__nav-icon--with-label' : 'rds-sidebar__nav-icon--no-label'}`}>
                                {childIcon}
                              </ListItemIcon>
                            )}
                            {showLabels && <ListItemText primary={child.label} />}
                          </ListItemButton>
                        );

                        return (
                          <ListItem key={`${child.label}-${child.path || child.href || 'child-item'}`} disablePadding className={navItemClasses}>
                            {shouldShowIconsOnly && childIcon ? (
                              <RdsTooltip
                                title={`${item.label} - ${child.label}`}
                                placement="right"
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
        {(resolvedFooter != null || showAvatar) && (
          <div className={avatarContainerClasses}>
            {resolvedFooter ?? (!shouldShowIconsOnly ? (
              <RdsAvatar
                alt="User Avatar"
                description={userSubtitle}
                displayStyle="with-name"
                name={userName}
                showDesignation
                showName
                status="online"
                src={resolvedAvatarSrc}
              />
            ) : (
              <RdsAvatar
                status="online"
                src={resolvedAvatarSrc}
              />
            ))}

          </div>
        )}
      </div>
    </MuiDrawer>
  );
};
RdsSidebar.displayName = 'RdsSidebar';
export default RdsSidebar;
