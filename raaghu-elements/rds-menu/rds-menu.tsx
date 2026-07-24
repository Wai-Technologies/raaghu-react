import { cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Divider, ListSubheader, ListItemIcon, ListItemText, Typography, type MenuProps } from '@mui/material';
import clsx from 'clsx';
import './rds-menu.scss'

function getColor(color: string): string {
  switch (color) {
    case 'primary': return 'var(--rds-primary-main)';
    case 'success': return 'var(--rds-success-main)';
    case 'danger':  return 'var(--rds-error-main)';
    case 'info':    return 'var(--rds-info-main)';
    case 'warning': return 'var(--rds-warning-main)';
    default:        return color || '';
  }
}

/** Map menu size → RdsAvatar size so icons scale with the menu (small→small, large→large). */
const menuToAvatarSize = {
  small: 'smallest',
  medium: 'small',
  large: 'medium',
} as const;

type MenuSize = keyof typeof menuToAvatarSize;
type AvatarSize = (typeof menuToAvatarSize)[MenuSize];

function isRdsAvatarElement(element: ReactElement): boolean {
  const type = element.type as { displayName?: string; name?: string };
  return type?.displayName === 'RdsAvatar' || type?.name === 'RdsAvatar';
}

function renderMenuIcon(
  icon: ReactNode,
  menuSize: MenuSize | undefined,
  itemColor?: string,
): ReactNode {
  if (!isValidElement(icon) || (typeof icon.type !== 'function' && typeof icon.type !== 'object')) {
    return icon;
  }

  const existingProps = (icon as ReactElement<{ style?: CSSProperties; size?: AvatarSize }>).props;
  const avatarSize = menuSize ? menuToAvatarSize[menuSize] : undefined;

  return cloneElement(icon as ReactElement<{ style?: CSSProperties; size?: AvatarSize }>, {
    ...existingProps,
    ...(isRdsAvatarElement(icon) && avatarSize ? { size: avatarSize } : {}),
    style: {
      ...(existingProps?.style ?? {}),
      ...(itemColor
        ? {
            color: getColor(itemColor),
            fill: getColor(itemColor),
          }
        : {}),
    },
  });
}

export interface RdsMenuItem {
  id: string | number;
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  shortcut?: string;
  header?: string;
  color?: 'primary' | 'success' | 'danger' | 'info' | 'warning' | string;
}

export interface RdsMenuProps extends Omit<MenuProps, 'children' | 'component'> {
  items: RdsMenuItem[];
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
}


const RdsMenu = ({
  items,
  size,
  children,
  ...props
}: RdsMenuProps) => {
  const dense = size === 'small';
  const menuClassName = clsx('rds-menu', size && `rds-menu--${size}`, props.className);
  const menuListClassName = 'rds-menu__list';
  return (
      <MuiMenu
        {...props}
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
                } as CSSProperties : {})
              }}
              className={clsx(
                'rds-menu__item',
                item.color && `rds-menu__item--${item.color}`,
                item.disabled && 'rds-menu__item--disabled',
              )}
            >
              {item.icon && (
                <ListItemIcon
                  className={clsx('rds-menu__item__icon', item.color && `rds-menu__item__icon--${item.color}`)}
                  style={item.color ? { 
                    color: getColor(item.color)
                  } : {}}
                >
                  {renderMenuIcon(item.icon, size, item.color)}
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                secondary={item.shortcut}
                primaryTypographyProps={{ className: 'rds-menu__item__text', style: item.color ? { color: getColor(item.color) } : undefined }}
                secondaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.secondary',
                  component: 'span',
                  className: 'rds-menu__item__shortcut',
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
