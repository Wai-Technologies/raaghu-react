import React, { ReactNode } from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Divider, ListSubheader, ListItemIcon, ListItemText, Typography, type MenuProps } from '@mui/material';

export interface RdsMenuItem {
  id: string | number;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  shortcut?: string;
  header?: string;
  color?: 'primary' | 'success' | 'danger' | 'info' | 'warning' | string; // allow custom or theme colors
}

export interface RdsMenuProps extends Omit<MenuProps, 'children'> {
  items: RdsMenuItem[];
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
}


const RdsMenu = ({
  items,
  size = 'medium',
  children,
  ...props
}: RdsMenuProps) => {
  // Use dense for small size, otherwise default
  const dense = size === 'small';
  // Helper to map color prop to CSS color value (can be extended or themed)
function getColor(color: string): string {
  switch (color) {
    case 'primary':
      return '#1976d2';
    case 'success':
      return '#2e7d32';
    case 'danger':
      return '#d32f2f';
    case 'info':
      return '#0288d1';
    case 'warning':
      return '#ed6c02';
    default:
      return color || '#222'; // fallback to default text color
  }
}
  return (
    <MuiMenu
      {...props}
      MenuListProps={{
        ...props.MenuListProps,
        role: 'menu',
        dense,
      }}
    >
      {children ? children : items.map((item) => {
        if (item.header) {
          return (
            <ListSubheader key={item.id} component="div" disableSticky>
              {item.header}
            </ListSubheader>
          );
        }
        if (item.divider) {
          return <Divider key={item.id} />;
        }
        return (
          <MuiMenuItem
            key={item.id}
            onClick={item.onClick}
            disabled={item.disabled}
            role="menuitem"
            component="li"
            dense={dense}
            style={item.color ? { color: getColor(item.color) } : undefined}
            className={item.color ? `rds-menu__item--${item.color}` : undefined}
          >
            {item.icon && (
              <ListItemIcon>
                {React.isValidElement(item.icon) && (typeof item.icon.type === 'function' || typeof item.icon.type === 'object')
                  ? React.cloneElement(
                      item.icon as React.ReactElement<any>,
                      {
                        ...(item.icon.props || {}),
                        style: {
                          ...(item.icon.props?.style || {}),
                          color: getColor(item.color || '')
                        }
                      }
                    )
                  : item.icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              secondary={item.shortcut ? (
                <Typography variant="body2" color="text.secondary" component="span">
                  {item.shortcut}
                </Typography>
              ) : undefined}
              secondaryTypographyProps={{
                sx: { textAlign: 'right', display: 'block' }
              }}
            />
          </MuiMenuItem>
        );
      })}
    </MuiMenu>
  );
};

RdsMenu.displayName = 'RdsMenu';
export default RdsMenu;
