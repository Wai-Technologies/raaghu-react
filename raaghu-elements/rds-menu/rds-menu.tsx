import React from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, MenuProps } from '@mui/material';

export interface RdsMenuItem {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface RdsMenuProps extends Omit<MenuProps, 'children'> {
  items: RdsMenuItem[];
}

const RdsMenu: React.FC<RdsMenuProps> = ({
  items,
  ...props
}) => {
  return (
    <MuiMenu {...props}>
      {items.map((item) => (
        <MuiMenuItem
          key={item.id}
          onClick={item.onClick}
          disabled={item.disabled}
          divider={item.divider}
        >
          {item.icon && (
            <span style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </span>
          )}
          {item.label}
        </MuiMenuItem>
      ))}
    </MuiMenu>
  );
};

export default RdsMenu;
