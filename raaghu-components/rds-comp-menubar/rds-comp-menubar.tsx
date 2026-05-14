import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MenuList, MenuItem, Menu, MenuProps, Paper } from '@mui/material';
import './rds-comp-menubar.scss';

export interface RdsCompMenubarItem {
  /**
   * Unique identifier for the menu item
   */
  id: string;

  /**
   * Display label for the menu item
   */
  label: React.ReactNode;

  /**
   * Optional icon to display before the label
   */
  icon?: React.ReactElement;

  /**
   * Nested submenu items
   */
  submenu?: RdsCompMenubarItem[];

  /**
   * If true, the menu item will be disabled
   */
  disabled?: boolean;

  /**
   * Callback fired when the menu item is clicked
   */
  onClick?: () => void;

  /**
   * Optional keyboard shortcut text to display
   */
  shortcut?: string;

  /**
   * Optional divider line after this item
   */
  divider?: boolean;
}

export interface RdsCompMenubarProps extends Omit<MenuProps, 'open' | 'onClose' | 'children' | 'variant'> {
  /**
   * Array of menu items to display
   */
  items: RdsCompMenubarItem[];

  /**
   * Controlled mode: currently open menu item ID
   */
  openId?: string | null;

  /**
   * Callback fired when a menu item opens/closes
   */
  onMenuChange?: (id: string | null) => void;

  /**
   * The size of the component
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The variant of the component
   * @default 'outlined'
   */
  variant?: 'filled' | 'outlined';

  /**
   * The color of the component
   * @default 'primary'
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

  /**
   * If true, menu closes after item selection
   * @default true
   */
  closeOnItemClick?: boolean;

  /**
   * If true, the menubar will fill the available width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * The elevation level of the menu dropdown
   * @default 8
   */
  elevation?: number;

  /**
   * If true, menu opens on hover instead of click
   * @default false
   */
  openOnHover?: boolean;

  /**
   * Optional CSS class names
   */
  className?: string;
}

const RdsCompMenubar = React.forwardRef<HTMLDivElement, RdsCompMenubarProps>(
  (
    {
      items,
      openId: controlledOpenId,
      onMenuChange,
      size = 'medium',
      variant = 'outlined',
      color = 'primary',
      closeOnItemClick = true,
      fullWidth = false,
      elevation = 8,
      openOnHover = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalOpenId, setInternalOpenId] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
    const isControlled = controlledOpenId !== undefined;
    const openId = isControlled ? controlledOpenId : internalOpenId;
    const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMenuChange = useCallback(
      (id: string | null) => {
        if (!isControlled) {
          setInternalOpenId(id);
        }
        onMenuChange?.(id);
      },
      [isControlled, onMenuChange]
    );

    const handleMenuItemClick = useCallback(
      (event: React.MouseEvent<HTMLElement>, item: RdsCompMenubarItem) => {
        if (item.submenu && item.submenu.length > 0) {
          if (openId === item.id) {
            handleMenuChange(null);
            setAnchorEl(null);
            setHoveredItemId(null);
          } else {
            setAnchorEl(event.currentTarget);
            handleMenuChange(item.id);
            setHoveredItemId(item.id);
          }
        } else {
          item.onClick?.();
          if (closeOnItemClick) {
            handleMenuChange(null);
            setAnchorEl(null);
            setHoveredItemId(null);
          }
        }
      },
      [openId, handleMenuChange, closeOnItemClick]
    );

    const handleMenuItemHover = useCallback(
      (event: React.MouseEvent<HTMLElement>, item: RdsCompMenubarItem) => {
        if (!openOnHover) return;

        // Clear any pending close timeout
        if (menuTimeoutRef.current) {
          clearTimeout(menuTimeoutRef.current);
          menuTimeoutRef.current = null;
        }

        // Update hovered item
        setHoveredItemId(item.id);

        if (item.submenu && item.submenu.length > 0) {
          setAnchorEl(event.currentTarget);
          handleMenuChange(item.id);
        }
      },
      [openOnHover, handleMenuChange]
    );

    const handleMenuItemHoverLeave = useCallback(() => {
      if (!openOnHover) return;

      // Set a timeout to detect if user moves to submenu
      // Only close if not hovering over another menu item
      menuTimeoutRef.current = setTimeout(() => {
        setHoveredItemId(null);
        handleMenuChange(null);
        setAnchorEl(null);
      }, 250);
    }, [openOnHover, handleMenuChange]
    );

    const handleMenuHoverEnter = useCallback(() => {
      if (!openOnHover) return;

      // Clear close timeout when hovering over the menu
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
        menuTimeoutRef.current = null;
      }
    }, [openOnHover]);

    const handleMenuHoverLeave = useCallback(() => {
      if (!openOnHover) return;

      // Start close timeout when leaving the menu  
      menuTimeoutRef.current = setTimeout(() => {
        setHoveredItemId(null);
        handleMenuChange(null);
        setAnchorEl(null);
      }, 100);
    }, [openOnHover, handleMenuChange]
    );

    const handleClose = useCallback(() => {
      handleMenuChange(null);
      setAnchorEl(null);
      setHoveredItemId(null);
    }, [handleMenuChange]);

    const handleSubitemClick = useCallback(
      (item: RdsCompMenubarItem) => {
        item.onClick?.();
        if (closeOnItemClick) {
          handleMenuChange(null);
          setAnchorEl(null);
          setHoveredItemId(null);
        }
      },
      [handleMenuChange, closeOnItemClick]
    );

    useEffect(() => {
      return () => {
        if (menuTimeoutRef.current) {
          clearTimeout(menuTimeoutRef.current);
        }
      };
    }, []);

    const rootClasses = [
      'rds-comp-menubar',
      `rds-comp-menubar--${size}`,
      `rds-comp-menubar--${variant}`,
      `rds-comp-menubar--color-${color}`,
      fullWidth && 'rds-comp-menubar--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const currentItem = items.find((item) => item.id === openId);

    return (
      <div className={rootClasses} ref={ref} data-testid="rds-comp-menubar" {...props}>
        <MenuList className="rds-comp-menubar__menu-list">
          {items.map((item) => (
            <div key={item.id} className="rds-comp-menubar__item-wrapper">
              <MenuItem
                className={`rds-comp-menubar__item ${
                  openId === item.id ? 'rds-comp-menubar__item--active' : ''
                }`}
                disabled={item.disabled}
                onClick={(e) => handleMenuItemClick(e, item)}
                onMouseEnter={(e) => handleMenuItemHover(e as any, item)}
                onMouseLeave={() => {
                  // Only trigger close if not in hover mode or if item doesn't have submenu
                  if (!openOnHover || !item.submenu || item.submenu.length === 0) {
                    handleMenuItemHoverLeave();
                  }
                }}
                data-testid={`rds-menubar-item-${item.id}`}
              >
                {item.icon && <span className="rds-comp-menubar__icon">{item.icon}</span>}
                <span className="rds-comp-menubar__label">{item.label}</span>
                {item.submenu && item.submenu.length > 0 && (
                  <span className="rds-comp-menubar__chevron" />
                )}
                {item.shortcut && <span className="rds-comp-menubar__shortcut">{item.shortcut}</span>}
              </MenuItem>
              {item.divider && <hr className="rds-comp-menubar__divider" />}
            </div>
          ))}
        </MenuList>

        {currentItem?.submenu && currentItem.submenu.length > 0 && (
          <Menu
            anchorEl={anchorEl}
            open={openId === currentItem.id && !!anchorEl}
            onClose={handleClose}
            MenuListProps={{
              onMouseEnter: handleMenuHoverEnter,
              onMouseLeave: handleMenuHoverLeave,
            }}
            elevation={elevation}
            className="rds-comp-menubar__submenu"
          >
            {currentItem.submenu.map((subitem) => (
              <MenuItem
                key={subitem.id}
                className="rds-comp-menubar__subitem"
                disabled={subitem.disabled}
                onClick={() => handleSubitemClick(subitem)}
                data-testid={`rds-menubar-subitem-${subitem.id}`}
              >
                {subitem.icon && <span className="rds-comp-menubar__sub-icon">{subitem.icon}</span>}
                <span className="rds-comp-menubar__sub-label">{subitem.label}</span>
                {subitem.shortcut && (
                  <span className="rds-comp-menubar__sub-shortcut">{subitem.shortcut}</span>
                )}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
    );
  }
);

RdsCompMenubar.displayName = 'RdsCompMenubar';

export default RdsCompMenubar;
