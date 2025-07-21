import React from 'react';
import { 
  Drawer as MuiDrawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  DrawerProps
} from '@mui/material';

export interface RdsSidebarItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface RdsSidebarProps extends Omit<DrawerProps, 'children'> {
  items: RdsSidebarItem[];
  isOpen: boolean;
  onClose?: () => void;
  width?: number;
}

const RdsSidebar: React.FC<RdsSidebarProps> = ({
  items,
  isOpen,
  onClose,
  width = 240,
  variant = 'temporary',
  ...props
}) => {
  return (
    <MuiDrawer
      open={isOpen}
      onClose={onClose}
      variant={variant}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
      {...props}
    >
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={item.onClick}
              disabled={item.disabled}
              selected={item.active}
            >
              {item.icon && (
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default RdsSidebar;
