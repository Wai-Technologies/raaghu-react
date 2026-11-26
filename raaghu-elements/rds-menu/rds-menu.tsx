import React, { cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Divider, ListSubheader, ListItemIcon, ListItemText, type MenuProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import { normalizePaletteColor } from '../shared/utils/palette-color';
import './rds-menu.scss'

function getColor(color: string): string {
  switch (color) {
    case 'primary': return 'var(--rds-primary-main)';
    case 'success': return 'var(--rds-success-main)';
    case 'error':
    case 'danger':  return 'var(--rds-error-main)';
    case 'info':    return 'var(--rds-info-main)';
    case 'warning': return 'var(--rds-warning-main)';
    default:        return color || '';
  }
}

const MENU_AVATAR_SIZES = {
  small: 'smallest',
  medium: 'small',
  large: 'medium',
} as const;

const MENU_ICON_FONT_SIZES = {
  small: 'small',
  medium: 'small',
  large: 'medium',
} as const;

function isRdsAvatarElement(icon: ReactElement): boolean {
  const iconType = icon.type as { displayName?: string; name?: string };
  return iconType?.displayName === 'RdsAvatar' || iconType?.name === 'RdsAvatar';
}

function normalizeMenuIcon(
  icon: ReactNode,
  menuSize: 'small' | 'medium' | 'large',
  color?: RdsMenuItem['color'],
): ReactNode {
  if (!isValidElement(icon)) return icon;

  const colorStyle = color
    ? { color: getColor(color), fill: getColor(color) }
    : undefined;

  if (isRdsAvatarElement(icon)) {
    return cloneElement(
      icon as ReactElement<{ size?: string; style?: CSSProperties }>,
      {
        ...(icon.props as Record<string, unknown>),
        size: MENU_AVATAR_SIZES[menuSize],
        style: {
          ...((icon.props as { style?: CSSProperties }).style ?? {}),
          ...colorStyle,
        },
      },
    );
  }

  const iconProps = icon.props as { fontSize?: string; style?: CSSProperties };
  return cloneElement(
    icon as ReactElement<{ fontSize?: string; style?: CSSProperties }>,
    {
      ...iconProps,
      fontSize: iconProps.fontSize ?? MENU_ICON_FONT_SIZES[menuSize],
      style: {
        ...(iconProps.style ?? {}),
        ...colorStyle,
      },
    },
  );
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
  /** `'danger'` is deprecated; prefer `'error'`. */
  color?: 'primary' | 'success' | 'error' | 'danger' | 'info' | 'warning' | string;
}

const MENU_PLACEMENTS = {
  'bottom-start': {
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
  },
  'bottom-end': {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    transformOrigin: { vertical: 'top', horizontal: 'right' },
  },
  'top-start': {
    anchorOrigin: { vertical: 'top', horizontal: 'left' },
    transformOrigin: { vertical: 'bottom', horizontal: 'left' },
  },
  'top-end': {
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    transformOrigin: { vertical: 'bottom', horizontal: 'right' },
  },
} as const;

export interface RdsMenuProps extends Omit<MenuProps, 'children' | 'component'> {
  items: RdsMenuItem[];
  size?: 'small' | 'medium' | 'large';
  /** Where the menu opens relative to its anchor. `anchorOrigin` / `transformOrigin` override it. */
  placement?: keyof typeof MENU_PLACEMENTS;
  children?: ReactNode;
}


const RdsMenu = React.forwardRef<HTMLDivElement, RdsMenuProps>(function RdsMenu({
  items,
  size = 'small',
  placement,
  children,
  ...props
}, ref) {
  const dense = size === 'small';
  const menuClassName = clsx('rds-menu', size && `rds-menu--${size}`, props.className);
  const menuListClassName = 'rds-menu__list';
  return (
      <MuiMenu
        ref={ref}
        {...(placement ? MENU_PLACEMENTS[placement] : {})}
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
          if (item.color === 'danger') {
            warnDeprecatedProp('RdsMenu', 'item.color="danger"', '`item.color: "error"`');
          }
          const resolvedColor = item.color
            ? (normalizePaletteColor(item.color) as string)
            : undefined;
          return (
            <MuiMenuItem
              key={item.id}
              onClick={item.onClick}
              disabled={item.disabled}
              role="menuitem"
              component="li"
              dense={dense}
              style={{
                ...(resolvedColor ? { 
                  color: getColor(resolvedColor),
                  '--rds-menu-icon-color': getColor(resolvedColor)
                } as CSSProperties : {})
              }}
              className={clsx(
                'rds-menu__item',
                resolvedColor && `rds-menu__item--${resolvedColor}`,
                item.disabled && 'rds-menu__item--disabled',
              )}
            >
              {item.icon && (
                <ListItemIcon
                  className={clsx('rds-menu__item__icon', resolvedColor && `rds-menu__item__icon--${resolvedColor}`)}
                  style={resolvedColor ? { 
                    color: getColor(resolvedColor)
                  } : {}}
                >
                  {normalizeMenuIcon(item.icon, size ?? 'small', resolvedColor)}
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                secondary={item.shortcut}
                primaryTypographyProps={{ className: 'rds-menu__item__text', style: resolvedColor ? { color: getColor(resolvedColor) } : undefined }}
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
});

RdsMenu.displayName = 'RdsMenu';
export default RdsMenu;
