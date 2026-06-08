import React, { ReactNode } from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Divider, ListSubheader, ListItemIcon, ListItemText, Typography, type MenuProps } from '@mui/material';
import { MotionMenuTransition } from '../../raaghu-react-themes/src/motion';
import './rds-menu.scss'

export interface RdsMenuItem {
  id: string | number;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  shortcut?: string;
  header?: string;
  color?: 'primary' | 'success' | 'danger' | 'info' | 'warning' | string;
}

export interface RdsMenuProps extends Omit<MenuProps, 'children'> {
  items: RdsMenuItem[];
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  animationDuration?: number;
}


const RdsMenu = ({
  items,
  size,
  children,
  animationDuration = 300,
  ...props
}: RdsMenuProps) => {
  const dense = size === 'small';
  const menuClassName = [
    'rds-menu',
    size ? `rds-menu--${size}` : '',
    props.className || ''
  ].filter(Boolean).join(' ');
  const menuListClassName = 'rds-menu__list';
function getColor(color: string): string {
  // Map semantic color names to CSS custom properties so they respond to theme changes.
  // Falls back to the raw value for arbitrary color strings.
  switch (color) {
    case 'primary':
      return 'var(--rds-primary-main)';
    case 'success':
      return 'var(--rds-success-main)';
    case 'danger':
      return 'var(--rds-error-main)';
    case 'info':
      return 'var(--rds-info-main)';
    case 'warning':
      return 'var(--rds-warning-main)';
    default:
      return color || '';
  }
}
  return (
      <MuiMenu
        {...props}
        TransitionComponent={MotionMenuTransition}
        TransitionProps={{ durationMs: animationDuration } as Record<string, unknown>}
        MenuListProps={{
          ...props.MenuListProps,
          role: 'menu',
          dense,
          className: menuListClassName,
        }}
        className={menuClassName}
      >
        {children ? children : items.map((item) => {
          if (item.header) {
            return (
              <ListSubheader key={item.id} component="div" disableSticky className="rds-menu__header">
                {item.header}
              </ListSubheader>
            );
          }
          if (item.divider) {
            return <Divider key={item.id} className="rds-menu__divider" />;
          }
          return (
            <MuiMenuItem
              key={item.id}
              onClick={item.onClick}
              disabled={item.disabled}
              role="menuitem"
              component="li"
              dense={dense}
              style={{
                ...(item.color ? { 
                  color: getColor(item.color),
                  '--rds-menu-icon-color': getColor(item.color)
                } as React.CSSProperties : {})
              }}
              className={['rds-menu__item', item.color ? `rds-menu__item--${item.color}` : '', item.disabled ? 'rds-menu__item--disabled' : ''].filter(Boolean).join(' ')}
            >
              {item.icon && (
                <ListItemIcon 
                  className={`rds-menu__item__icon ${item.color ? `rds-menu__item__icon--${item.color}` : ''}`}
                  style={item.color ? { 
                    color: getColor(item.color)
                  } : {}}
                >
                  {React.isValidElement(item.icon) && (typeof item.icon.type === 'function' || typeof item.icon.type === 'object')
                    ? React.cloneElement(
                        item.icon as React.ReactElement<Record<string, unknown>>,
                        {
                          ...(item.icon.props || {}),
                          style: {
                            ...((item.icon as React.ReactElement<Record<string, unknown>>).props?.style || {}),
                            color: item.color ? getColor(item.color) : undefined,
                            fill: item.color ? getColor(item.color) : undefined
                          }
                        }
                      )
                    : item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                  primary={<span className="rds-menu__item__text" style={item.color ? { color: getColor(item.color) } : undefined}>{item.label}</span>}
                secondary={item.shortcut ? (
                  <Typography variant="body2" color="text.secondary" component="span" className="rds-menu__item__shortcut">
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
