import React from 'react';
import {
  List as MuiList,
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  ListItemText as MuiListItemText,
  ListItemIcon as MuiListItemIcon,
  ListItemAvatar as MuiListItemAvatar,
  ListProps
} from '@mui/material';

export interface RdsListItem {
  id: string | number;
  primary: string;
  secondary?: string;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export interface RdsListProps extends ListProps {
  items: RdsListItem[];
  variant?: 'simple' | 'button' | 'icon' | 'avatar';
}

const RdsList: React.FC<RdsListProps> = ({
  items,
  variant = 'simple',
  ...props
}) => {
  const renderListItem = (item: RdsListItem) => {
    const itemProps = {
      key: item.id,
      selected: item.selected,
      disabled: item.disabled,
    };

    if (variant === 'button' || item.onClick) {
      return (
        <MuiListItem disablePadding {...itemProps}>
          <MuiListItemButton onClick={item.onClick}>
            {item.icon && (
              <MuiListItemIcon>
                {item.icon}
              </MuiListItemIcon>
            )}
            {item.avatar && (
              <MuiListItemAvatar>
                {item.avatar}
              </MuiListItemAvatar>
            )}
            <MuiListItemText
              primary={item.primary}
              secondary={item.secondary}
            />
          </MuiListItemButton>
        </MuiListItem>
      );
    }

    return (
      <MuiListItem {...itemProps}>
        {item.icon && (
          <MuiListItemIcon>
            {item.icon}
          </MuiListItemIcon>
        )}
        {item.avatar && (
          <MuiListItemAvatar>
            {item.avatar}
          </MuiListItemAvatar>
        )}
        <MuiListItemText
          primary={item.primary}
          secondary={item.secondary}
        />
      </MuiListItem>
    );
  };

  return (
    <MuiList {...props}>
      {items.map(renderListItem)}
    </MuiList>
  );
};

export default RdsList;
