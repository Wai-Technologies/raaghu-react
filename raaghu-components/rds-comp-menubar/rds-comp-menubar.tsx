import React, { useState } from 'react';
import {
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  MenuList as MuiMenuList,
  Button,
  Box,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import './rds-comp-menubar.scss';

/**
 * Submenu item interface
 */
export interface MenuSubItem {
  /** Unique identifier for the submenu item */
  id: string | number;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Callback when item is clicked */
  onClick?: () => void;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether to show a divider after this item */
  divider?: boolean;
}

/**
 * Main menubar item interface
 */
export interface MenubarItem {
  /** Unique identifier */
  id: string | number;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Submenu items */
  submenu?: MenuSubItem[];
  /** Callback when item is clicked */
  onClick?: () => void;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Badge count/text */
  badge?: string | number;
}

/**
 * Props for RdsCompMenubar component
 */
export interface RdsCompMenubarProps {
  /** Array of menu items */
  items: MenubarItem[];
  /** Size of menubar items */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  /** Menu orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Visual variant */
  variant?: 'filled' | 'outlined' | 'text';
  /** Menubar layout style */
  layout?: 'default' | 'compact';
  /** Currently selected menu item ID */
  activeId?: string | number | null;
  /** Callback when menu item is selected */
  onItemClick?: (itemId: string | number, subItemId?: string | number) => void;
  /** Whether menu items are clickable */
  clickable?: boolean;
  /** Theme mode */
  theme?: 'light' | 'dark' | 'auto';
  /** Custom CSS class */
  className?: string;
  /** Data test ID */
  dataTestId?: string;
}

/**
 * RdsCompMenubar - Navigation menubar component using MUI
 * Supports hierarchical menu structure with submenus
 * Supports both horizontal and vertical orientations
 * Automatic dark & light theme support
 * 
 * @example
 * // Basic menubar
 * <RdsCompMenubar
 *   items={menuItems}
 *   onItemClick={(id) => console.log(id)}
 * />
 * 
 * // With submenus
 * <RdsCompMenubar
 *   items={[
 *     {
 *       id: 'file',
 *       label: 'File',
 *       submenu: [
 *         { id: 'new', label: 'New' },
 *         { id: 'open', label: 'Open' }
 *       ]
 *     }
 *   ]}
 * />
 */
const RdsCompMenubar: React.FC<RdsCompMenubarProps> = ({
  items,
  size = 'medium',
  color = 'primary',
  orientation = 'horizontal',
  variant = 'text',
  layout = 'default',
  activeId = null,
  onItemClick,
  clickable = true,
  theme = 'auto',
  className,
  dataTestId = 'rds-comp-menubar',
}) => {
  const [anchorEls, setAnchorEls] = useState<Record<string | number, HTMLElement | null>>({});
  const [expandedIds, setExpandedIds] = useState<Set<string | number>>(new Set());

  // Detect system theme preference if theme is 'auto'
  const systemTheme = 
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  const activeTheme = theme === 'auto' ? systemTheme : theme;

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    itemId: string | number
  ) => {
    setAnchorEls((prev) => ({
      ...prev,
      [itemId]: event.currentTarget,
    }));
  };

  const handleMenuClose = (itemId: string | number) => {
    setAnchorEls((prev) => ({
      ...prev,
      [itemId]: null,
    }));
  };

  const handleVerticalExpand = (itemId: string | number) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = (
    itemId: string | number,
    subItemId?: string | number
  ) => {
    onItemClick?.(itemId, subItemId);
    if (subItemId === undefined && orientation === 'horizontal') {
      handleMenuClose(itemId);
    }
  };

  const rootClasses = [
    'rds-comp-menubar',
    `rds-comp-menubar--${size}`,
    `rds-comp-menubar--${variant}`,
    `rds-comp-menubar--${orientation}`,
    `rds-comp-menubar--${color}`,
    `rds-comp-menubar--${layout}`,
    activeTheme === 'dark' && 'rds-comp-menubar--dark',
    clickable && 'rds-comp-menubar--clickable',
    className,
  ].filter(Boolean).join(' ');

  // Horizontal menubar
  if (orientation === 'horizontal') {
    return (
      <div className={rootClasses} data-testid={dataTestId} data-theme={activeTheme}>
        <MuiMenuList className="rds-comp-menubar__list" role="menubar" orientation="horizontal">
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <Button
                className={`rds-comp-menubar__item ${
                  activeId === item.id ? 'rds-comp-menubar__item--active' : ''
                } ${item.disabled ? 'rds-comp-menubar__item--disabled' : ''} ${
                  item.submenu ? 'rds-comp-menubar__item--has-submenu' : ''
                }`}
                onClick={(e) => {
                  if (item.submenu) {
                    handleMenuOpen(e, item.id);
                  } else {
                    handleItemClick(item.id);
                    item.onClick?.();
                  }
                }}
                disabled={item.disabled}
                role="menuitem"
                aria-haspopup={!!item.submenu}
                aria-expanded={!!anchorEls[item.id]}
                size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium'}
              >
                {item.icon && <span className="rds-comp-menubar__icon">{item.icon}</span>}
                <span className="rds-comp-menubar__label-wrapper">
                  <span className="rds-comp-menubar__label">{item.label}</span>
                  {item.badge && <span className="rds-comp-menubar__badge">{item.badge}</span>}
                </span>
                {item.submenu && (
                  <KeyboardArrowDown
                    className="rds-comp-menubar__arrow"
                    fontSize="small"
                  />
                )}
              </Button>

              {/* Submenu for horizontal */}
              {item.submenu && (
                <MuiMenu
                  anchorEl={anchorEls[item.id]}
                  open={!!anchorEls[item.id]}
                  onClose={() => handleMenuClose(item.id)}
                  className="rds-comp-menubar__submenu"
                  slotProps={{
                    paper: {
                      className: 'rds-comp-menubar__submenu-paper',
                    },
                  }}
                >
                  {item.submenu.map((subItem, index) => (
                    <React.Fragment key={subItem.id}>
                      <MuiMenuItem
                        className={`rds-comp-menubar__submenu-item ${
                          subItem.disabled ? 'rds-comp-menubar__submenu-item--disabled' : ''
                        }`}
                        onClick={() => {
                          handleItemClick(item.id, subItem.id);
                          subItem.onClick?.();
                          handleMenuClose(item.id);
                        }}
                        disabled={subItem.disabled}
                        role="menuitem"
                      >
                        {subItem.icon && (
                          <ListItemIcon className="rds-comp-menubar__submenu-icon">
                            {subItem.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText className="rds-comp-menubar__submenu-label">
                          {subItem.label}
                        </ListItemText>
                      </MuiMenuItem>
                      {subItem.divider && index < item.submenu!.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </MuiMenu>
              )}
            </React.Fragment>
          ))}
        </MuiMenuList>
      </div>
    );
  }

  // Vertical menubar
  return (
    <div className={rootClasses} data-testid={dataTestId} data-theme={activeTheme}>
      <div className="rds-comp-menubar__vertical-list">
        {items.map((item) => (
          <div key={item.id} className="rds-comp-menubar__item-group">
            <Button
              className={`rds-comp-menubar__item rds-comp-menubar__item--vertical ${
                activeId === item.id ? 'rds-comp-menubar__item--active' : ''
              } ${item.disabled ? 'rds-comp-menubar__item--disabled' : ''} ${
                item.submenu ? 'rds-comp-menubar__item--has-submenu' : ''
              }`}
              onClick={() => {
                if (item.submenu) {
                  handleVerticalExpand(item.id);
                } else {
                  handleItemClick(item.id);
                  item.onClick?.();
                }
              }}
              disabled={item.disabled}
              role="menuitem"
              aria-haspopup={!!item.submenu}
              aria-expanded={expandedIds.has(item.id)}
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
            >
              {item.icon && <span className="rds-comp-menubar__icon">{item.icon}</span>}
              <span className="rds-comp-menubar__label">{item.label}</span>
              {item.badge && <span className="rds-comp-menubar__badge">{item.badge}</span>}
              {item.submenu && (
                <KeyboardArrowRight
                  className={`rds-comp-menubar__arrow ${
                    expandedIds.has(item.id) ? 'rds-comp-menubar__arrow--expanded' : ''
                  }`}
                  fontSize="small"
                  sx={{ marginLeft: 'auto' }}
                />
              )}
            </Button>

            {/* Submenu for vertical */}
            {item.submenu && (
              <Collapse
                in={expandedIds.has(item.id)}
                timeout="auto"
                unmountOnExit
                className="rds-comp-menubar__submenu-collapse"
              >
                <div className="rds-comp-menubar__submenu-list">
                  {item.submenu.map((subItem, index) => (
                    <React.Fragment key={subItem.id}>
                      <Button
                        className={`rds-comp-menubar__submenu-item rds-comp-menubar__submenu-item--vertical ${
                          subItem.disabled ? 'rds-comp-menubar__submenu-item--disabled' : ''
                        }`}
                        onClick={() => {
                          handleItemClick(item.id, subItem.id);
                          subItem.onClick?.();
                        }}
                        disabled={subItem.disabled}
                        role="menuitem"
                        fullWidth
                        sx={{ justifyContent: 'flex-start', paddingLeft: '40px' }}
                      >
                        {subItem.icon && (
                          <span className="rds-comp-menubar__submenu-icon">
                            {subItem.icon}
                          </span>
                        )}
                        <span className="rds-comp-menubar__submenu-label">
                          {subItem.label}
                        </span>
                      </Button>
                      {subItem.divider && index < item.submenu!.length - 1 && (
                        <Divider className="rds-comp-menubar__submenu-divider" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </Collapse>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

RdsCompMenubar.displayName = 'RdsCompMenubar';

export default RdsCompMenubar;
