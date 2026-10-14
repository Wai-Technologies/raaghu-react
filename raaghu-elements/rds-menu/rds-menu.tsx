import { cloneElement, isValidElement, type CSSProperties, type ReactElement, type MouseEvent, type ReactNode } from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Divider, ListSubheader, ListItemIcon, ListItemText, type MenuProps } from '@mui/material';
import type { MenuOwnerState } from '@mui/material/Menu';
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

/** Map menu size → RdsAvatar size so avatars stay compact alongside menu icons. */
const menuToAvatarSize = {
  small: 'smallest',
  medium: 'smallest',
  large: 'small',
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

  return cloneElement(icon as ReactElement<{ style?: CSSProperties; size?: AvatarSize; displayStyle?: string; showName?: boolean; showDesignation?: boolean }>, {
    ...existingProps,
    ...(isRdsAvatarElement(icon)
      ? {
          ...(avatarSize ? { size: avatarSize } : {}),
          showName: false,
          showDesignation: false,
          // Compact avatar chrome (no with-name wrapper) for menu list rows
          displayStyle: 'icon-only' as 'with-name',
        }
      : {}),
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

/** A single entry (item, header or divider) of an {@link RdsMenu}. */
export interface RdsMenuItem {
  id: string | number;
  label?: string;
  icon?: ReactNode;
  /** Called with the click event when the item is selected. The menu is not closed automatically. */
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  disabled?: boolean;
  divider?: boolean;
  shortcut?: string;
  header?: string;
  color?: 'primary' | 'success' | 'danger' | 'info' | 'warning' | string;
}

export interface RdsMenuProps extends Omit<MenuProps, 'children' | 'component'> {
  /** Menu entries. May be omitted when `children` is supplied. */
  items?: RdsMenuItem[];
  /** Menu density/size; `small` renders dense rows. */
  size?: 'small' | 'medium' | 'large';
  /** Custom menu content; when given, `items` is ignored. */
  children?: ReactNode;
}


/** Menu built from an `items` config (or custom `children`) on top of MUI `Menu`. */
const RdsMenu = ({
  items = [],
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
        slotProps={{
          ...props.slotProps,
          list: (ownerState: MenuOwnerState) => {
            const slotList = props.slotProps?.list;
            const resolved = (typeof slotList === 'function' ? slotList(ownerState) : slotList) ?? {};
            const legacy = props.MenuListProps ?? {};
            const sx = [legacy.sx, resolved.sx];
            return {
              ...legacy,
              ...resolved,
              dense,
              className: clsx(menuListClassName, legacy.className, resolved.className),
              sx: sx.flatMap((x) => (Array.isArray(x) ? x : x ? [x] : [])),
            };
          },
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
                slotProps={{
                  primary: { className: 'rds-menu__item__text', style: item.color ? { color: getColor(item.color) } : undefined },
                  secondary: {
                    variant: 'body2',
                    color: 'text.secondary',
                    component: 'span',
                    className: 'rds-menu__item__shortcut',
                    sx: { textAlign: 'right', display: 'block' },
                  },
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
