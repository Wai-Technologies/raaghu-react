import React from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, MenuProps } from '@mui/material';

export interface RdsMenuItem {
  id: string | number;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  shortcut?: string;
  header?: string;
}

export interface RdsMenuProps extends Omit<MenuProps, 'children'> {
  items: RdsMenuItem[];
  size?: 'small' | 'medium' | 'large';
}

const RdsMenu: React.FC<RdsMenuProps> = ({
  items,
  size = 'medium',
  ...props
}) => {
  const menuClass = `rds-menu rds-menu--${size}`;
  return (
    <MuiMenu {...props} MenuListProps={{ className: menuClass }}>
      {items.map((item) => {
        if (item.header) {
          return (
            <div key={item.id} className="rds-menu__header">{item.header}</div>
          );
        }
        if (item.divider) {
          return <div key={item.id} className="rds-menu__divider" />;
        }
        return (
          <MuiMenuItem
            key={item.id}
            onClick={item.onClick}
            disabled={item.disabled}
            className={`rds-menu__item rds-menu__item--${size}${item.disabled ? ' rds-menu__item--disabled' : ''}`}
          >
            {item.icon && (
              <span className="rds-menu__icon">{item.icon}</span>
            )}
            <span className="rds-menu__text">{item.label}</span>
            {item.shortcut && (
              <span className="rds-menu__shortcut">{item.shortcut}</span>
            )}
          </MuiMenuItem>
        );
      })}
    </MuiMenu>
  );
};

export default RdsMenu;
