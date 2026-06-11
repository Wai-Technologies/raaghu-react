import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, type ReactNode, type ReactElement, Fragment } from 'react';
import { List as MuiList,ListItem as MuiListItem,ListItemButton as MuiListItemButton,ListItemText as MuiListItemText,ListItemIcon as MuiListItemIcon,ListItemAvatar as MuiListItemAvatar,type ListProps, Divider } from '@mui/material';
import clsx from 'clsx';
import './rds-list.scss';
import {Paper } from '@mui/material';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
export interface RdsListItem {
  id: string | number;
  primary: string;
  secondary?: string;
  icon?: ReactNode;
  avatar?: ReactNode;
  secondaryAction?: ReactNode;
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

const RdsList = ({
  items,
  variant = 'simple',
  alignItems,
  disableGutters,
  withDividers,
  withCheckboxes,
  onCheckboxChange,
  checkedItems = [],
  className,
  dense,
  ...props
}: RdsListProps) => {
  const [openMap, setOpenMap] = useState<Record<string | number, boolean>>({});
  const [internalChecked, setInternalChecked] = useState<(string | number)[]>(checkedItems);

  const effectiveCheckedItems = checkedItems.length > 0 ? checkedItems : internalChecked;

  const variantClass = variant === 'firebase' ? 'rds-list--firebase' : '';
  const denseClass = dense ? 'rds-list--dense' : '';
  const rootClass = clsx('rds-list', variantClass, denseClass, className);

  const getItemClass = (item: RdsListItem) => clsx(
    'rds-list__item',
    (item.onClick || variant === 'button') && 'rds-list__item--clickable',
    item.selected && 'rds-list__item--selected',
    item.disabled && 'rds-list__item--disabled',
    disableGutters && 'rds-list__item--no-gutters',
  );

  const handleCheckboxChange = (id: string | number) => () => {
    const isChecked = !effectiveCheckedItems.includes(id);

    if (onCheckboxChange) {
      onCheckboxChange(id, isChecked);
    } else {
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
      className={clsx('rds-list__expand-icon', open && 'rds-list__expand-icon--open')}
    />
  );

  const renderListItem = (item: RdsListItem): ReactElement => {
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
        <Fragment key={item.id}>
          <MuiListItem
            {...itemProps}
            disablePadding
            className={clsx(getItemClass(item), isOpen && 'rds-list__item--expanded')}
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
        </Fragment>
      );
    }

    if (variant === 'button' || item.onClick || withCheckboxes) {
      const checkbox = withCheckboxes && !item.icon ? (
        <MuiListItemIcon className="rds-list__icon">
          <RdsCheckbox
            checked={effectiveCheckedItems.includes(item.id)}
            isDisabled={item.disabled}
            onChange={(event, checked) => handleCheckboxChange(item.id)()}
            style="square"
          />
        </MuiListItemIcon>
      ) : null;

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

  let children: ReactNode[];
  if (withDividers) {
    children = [];
    items.forEach((item, idx) => {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      children.push(
        renderListItem(item)
      );
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
