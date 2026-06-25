import React from 'react';
import { Drawer as MuiDrawer, type DrawerProps } from '@mui/material';
import {
  resolveMenuItems,
  getSidebarVisibilityFlags,
  getDrawerSx,
  SidebarHeaderSection,
  SidebarSearchSection,
  SidebarNavList,
  SidebarFooterAvatar,
  type RdsSidebarItem,
} from './rds-sidebar.helpers';
import './rds-sidebar.scss';

export type { RdsSidebarItem };

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
}: RdsSidebarProps) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [openMap, setOpenMap] = React.useState<Record<number, boolean>>({});

  const menuItems = resolveMenuItems(platform, items);
  const toggleOpen = (idx: number) => {
    setOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const { isNarrowCollapsed, shouldShowIconsOnly, showLabels, showAvatar, showSearchBox } =
    getSidebarVisibilityFlags(typeOf, width, props.layout, showSearch);

  const sidebarClasses = `rds-sidebar rds-sidebar--${typeOf} ${isNarrowCollapsed ? 'rds-sidebar--narrow-collapsed' : ''}`;
  const navItemClasses = `rds-sidebar__nav-item rds-sidebar__nav-item--${typeOf}`;
  const navButtonClasses = `rds-sidebar__nav-button rds-sidebar__nav-button--${typeOf}`;
  const avatarContainerClasses = `rds-sidebar__avatar-container rds-sidebar__avatar-container--${typeOf}`;

  return (
    <MuiDrawer
      open={isOpen}
      onClose={onClose}
      variant={variant}
      sx={getDrawerSx(shouldShowIconsOnly, width, typeOf)}
      className={sidebarClasses}
      container={container}
      {...props}
    >
      <div className="rds-sidebar__content">
        <SidebarHeaderSection
          showLogo={!!showLogo}
          layout={props.layout}
          shouldShowIconsOnly={shouldShowIconsOnly}
          typeOf={typeOf}
          avatarSrc={avatarSrc}
          avatarCollapsedSrc={avatarCollapsedSrc}
        />
        <SidebarSearchSection
          showSearchBox={showSearchBox}
          shouldShowIconsOnly={shouldShowIconsOnly}
          width={width}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <SidebarNavList
          menuItems={menuItems}
          shouldShowIconsOnly={shouldShowIconsOnly}
          showLabels={showLabels}
          openMap={openMap}
          toggleOpen={toggleOpen}
          navItemClasses={navItemClasses}
          navButtonClasses={navButtonClasses}
        />
        <div className="rds-sidebar__footer">
          <hr className="rds-sidebar__footer-divider" />
        </div>
        <SidebarFooterAvatar
          showAvatar={showAvatar}
          shouldShowIconsOnly={shouldShowIconsOnly}
          avatarContainerClasses={avatarContainerClasses}
          avatarSrc={avatarSrc}
        />
      </div>
    </MuiDrawer>
  );
};
RdsSidebar.displayName = 'RdsSidebar';
export default RdsSidebar;
