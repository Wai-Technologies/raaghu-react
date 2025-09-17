import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { List as MuiList,ListItem as MuiListItem,ListItemButton as MuiListItemButton,ListItemText as MuiListItemText,ListItemIcon as MuiListItemIcon,ListItemAvatar as MuiListItemAvatar,ListProps, Divider,Checkbox } from '@mui/material';
import './rds-list.scss';
import {Paper } from '@mui/material';
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
  variant?: 'simple' | 'button' | 'icon' | 'avatar' | 'firebase';
  alignItems?: 'flex-start' | 'center';
  disableGutters?: boolean;
  withDividers?: boolean;
  withCheckboxes?: boolean;
  onCheckboxChange?: (id: string | number, checked: boolean) => void;
  checkedItems?: (string | number)[];
}

const RdsList: React.FC<RdsListProps> = ({
  items,
  variant = 'simple',
  alignItems,
  disableGutters,
  withDividers,
  withCheckboxes,
  onCheckboxChange,
  checkedItems = [],
  className,
  ...props
}) => {
  const [openMap, setOpenMap] = useState<Record<string | number, boolean>>({});
  const [internalChecked, setInternalChecked] = useState<(string | number)[]>(checkedItems);

  // Use the provided checkedItems or internal state
  const effectiveCheckedItems = checkedItems.length > 0 ? checkedItems : internalChecked;

  // Root class based on variant and other props
  const variantClass = variant === 'firebase' ? 'rds-list--firebase' : '';
  const rootClass = ['rds-list', variantClass, className].filter(Boolean).join(' ');

  const getItemClass = (item: RdsListItem) => {
    let cls = 'rds-list__item';
    if (item.onClick || variant === 'button') cls += ' rds-list__item--clickable';
    if (item.selected) cls += ' rds-list__item--selected';
    if (item.disabled) cls += ' rds-list__item--disabled';
    if (disableGutters) cls += ' rds-list__item--no-gutters';
    return cls;
  };

  // Handle checkbox changes
  const handleCheckboxChange = (id: string | number) => () => {
    const isChecked = !effectiveCheckedItems.includes(id);

    if (onCheckboxChange) {
      // Use callback if provided
      onCheckboxChange(id, isChecked);
    } else {
      // Otherwise manage internal state
      const newChecked = isChecked
        ? [...effectiveCheckedItems, id]
        : effectiveCheckedItems.filter(item => item !== id);
      setInternalChecked(newChecked);
    }
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

    if (variant === 'button' || item.onClick || withCheckboxes) {
      // Create checkbox if withCheckboxes is true and no custom icon is provided
      const checkbox = withCheckboxes && !item.icon ? (
        <MuiListItemIcon className="rds-list__icon">
          <Checkbox
            edge="start"
            checked={effectiveCheckedItems.includes(item.id)}
            tabIndex={-1}
            disableRipple
            disabled={item.disabled}
            onChange={handleCheckboxChange(item.id)}
          />
        </MuiListItemIcon>
      ) : null;

      // Use the provided icon or checkbox
      const icon = item.icon ? (
        <MuiListItemIcon className="rds-list__icon">
          {item.icon}
        </MuiListItemIcon>
      ) : checkbox;

      return (
        <MuiListItem disablePadding {...itemProps} key={item.id}>
          <MuiListItemButton
            onClick={withCheckboxes ? handleCheckboxChange(item.id) : item.onClick}
            disabled={item.disabled}
          >
            {icon}
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
    <Paper>
      <MuiList className={rootClass} {...props}>
        {children}
      </MuiList>
    </Paper>
  );
};

RdsList.displayName = 'RdsList';
export default RdsList;
