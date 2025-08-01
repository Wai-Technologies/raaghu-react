import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import {
  List as MuiList,
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  ListItemText as MuiListItemText,
  ListItemIcon as MuiListItemIcon,
  ListItemAvatar as MuiListItemAvatar,
  ListProps,
  Divider
} from '@mui/material';
import './rds-list.scss';

export interface RdsListItem {
  id: string | number;
  primary: string;
  secondary?: string;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  secondaryAction?: React.ReactNode; // right-aligned action/icon
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  children?: RdsListItem[];
}

export interface RdsListProps extends ListProps {
  items: RdsListItem[];
  variant?: 'simple' | 'button' | 'icon' | 'avatar';
  alignItems?: 'flex-start' | 'center';
  disableGutters?: boolean;
  withDividers?: boolean;
}





const RdsList: React.FC<RdsListProps> = ({
  items,
  variant = 'simple',
  alignItems,
  disableGutters,
  withDividers,
  className,
  ...props
}) => {
  const [openMap, setOpenMap] = useState<Record<string | number, boolean>>({});
  const rootClass = ['rds-list', className].filter(Boolean).join(' ');
  const getItemClass = (item: RdsListItem) => {
    let cls = 'rds-list__item';
    if (item.onClick || variant === 'button') cls += ' rds-list__item--clickable';
    if (item.selected) cls += ' rds-list__item--selected';
    if (item.disabled) cls += ' rds-list__item--disabled';
    if (disableGutters) cls += ' rds-list__item--no-gutters';
    return cls;
  };

  const handleToggle = (id: string | number) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const ExpandIcon = ({ open }: { open: boolean }) => (
    <ExpandMoreIcon
      className={`rds-list__expand-icon${open ? ' rds-list__expand-icon--open' : ''}`}
      style={{ transition: 'transform 0.2s' }}
    />
  );

  const renderListItem = (item: RdsListItem): React.ReactElement => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const isOpen = openMap[item.id] || false;
    const itemProps = {
      selected: item.selected,
      disabled: item.disabled,
      alignItems: alignItems,
      disableGutters: disableGutters,
      className: getItemClass(item),
    };

    if (hasChildren) {
      return (
        <React.Fragment key={item.id}>
          <MuiListItem
            {...itemProps}
            disablePadding
            className={[
              getItemClass(item),
              isOpen ? 'rds-list__item--expanded' : '',
            ].filter(Boolean).join(' ')}
          >
            <MuiListItemButton onClick={() => handleToggle(item.id)}>
              {item.icon && (
                <MuiListItemIcon className="rds-list__icon">{item.icon}</MuiListItemIcon>
              )}
              {item.avatar && (
                <MuiListItemAvatar className="rds-list__avatar">{item.avatar}</MuiListItemAvatar>
              )}
              <MuiListItemText
                primary={<span className="rds-list__content-primary">{item.primary}</span>}
                secondary={item.secondary && <span className="rds-list__content-secondary">{item.secondary}</span>}
              />
              <ExpandIcon open={isOpen} />
            </MuiListItemButton>
          </MuiListItem>
          {isOpen && (
            <MuiList disablePadding className="rds-list rds-list--nested">
              {(item.children ?? []).map((child) =>
                renderListItem(child)
              )}
            </MuiList>
          )}
        </React.Fragment>
      );
    }

    if (variant === 'button' || item.onClick) {
      return (
        <MuiListItem disablePadding {...itemProps} key={item.id}>
          <MuiListItemButton onClick={item.onClick}>
            {item.icon && !item.secondaryAction && (
              <MuiListItemIcon className="rds-list__icon">
                {item.icon}
              </MuiListItemIcon>
            )}
            {item.avatar && (
              <MuiListItemAvatar className="rds-list__avatar">
                {item.avatar}
              </MuiListItemAvatar>
            )}
            <MuiListItemText
              primary={<span className="rds-list__content-primary">{item.primary}</span>}
              secondary={item.secondary && <span className="rds-list__content-secondary">{item.secondary}</span>}
            />
            {item.secondaryAction && (
              <span className="rds-list__secondary-action">{item.secondaryAction}</span>
            )}
          </MuiListItemButton>
        </MuiListItem>
      );
    }

    return (
      <MuiListItem {...itemProps} key={item.id}>
        {item.icon && !item.secondaryAction && (
          <MuiListItemIcon className="rds-list__icon">
            {item.icon}
          </MuiListItemIcon>
        )}
        {item.avatar && (
          <MuiListItemAvatar className="rds-list__avatar">
            {item.avatar}
          </MuiListItemAvatar>
        )}
        <MuiListItemText
          primary={<span className="rds-list__content-primary">{item.primary}</span>}
          secondary={item.secondary && <span className="rds-list__content-secondary">{item.secondary}</span>}
        />
        {item.secondaryAction && (
          <span className="rds-list__secondary-action">{item.secondaryAction}</span>
        )}
      </MuiListItem>
    );
  };

  // Render with dividers between items if withDividers is true
  let children: React.ReactNode[];
  if (withDividers) {
    children = [];
    items.forEach((item, idx) => {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      children.push(
        renderListItem(item)
      );
      // Only show divider if next item is not a nested child
      if (idx < items.length - 1 && !hasChildren) {
        children.push(
          <Divider component="li" className="rds-list__divider" key={`divider-${item.id}`} />
        );
      }
    });
  } else {
    children = items.map((item) =>
      renderListItem(item)
    );
  }

  return (
    <MuiList className={rootClass} {...props}>
      {children}
    </MuiList>
  );
};

export default RdsList;
