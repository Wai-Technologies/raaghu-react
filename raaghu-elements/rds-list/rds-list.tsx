import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { List as MuiList, ListItem as MuiListItem, ListItemButton as MuiListItemButton, ListItemText as MuiListItemText, ListItemIcon as MuiListItemIcon, ListItemAvatar as MuiListItemAvatar, ListProps, Divider } from '@mui/material';
import './rds-list.scss';
import { Paper } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import { useMotionTokens } from '../../raaghu-react-themes/src/motion';

const MotionListItem = motion(MuiListItem);
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
export interface RdsListItem {
  id: string | number;
  primary: string;
  secondary?: string;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  secondaryAction?: React.ReactNode;
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
  animationDuration?: number;
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
  dense,
  animationDuration,
  ...props
}) => {
  const [openMap, setOpenMap] = useState<Record<string | number, boolean>>({});
  const [internalChecked, setInternalChecked] = useState<(string | number)[]>(checkedItems);
  const shouldReduce = useReducedMotion();
  const tokens = useMotionTokens();
  const dur = typeof animationDuration === 'number' ? animationDuration / 1000 : tokens.base;

  const effectiveCheckedItems = checkedItems.length > 0 ? checkedItems : internalChecked;

  const variantClass = variant === 'firebase' ? 'rds-list--firebase' : '';
  const denseClass = dense ? 'rds-list--dense' : '';
  const rootClass = ['rds-list', variantClass, denseClass, className].filter(Boolean).join(' ');

  const getItemClass = (item: RdsListItem) => {
    let cls = 'rds-list__item';
    if (item.onClick || variant === 'button') cls += ' rds-list__item--clickable';
    if (item.selected) cls += ' rds-list__item--selected';
    if (item.disabled) cls += ' rds-list__item--disabled';
    if (disableGutters) cls += ' rds-list__item--no-gutters';
    return cls;
  };

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
      className={`rds-list__expand-icon${open ? ' rds-list__expand-icon--open' : ''}`}
    />
  );

  const renderListItem = (item: RdsListItem, index = 0): React.ReactElement => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const isOpen = openMap[item.id] || false;
    const motionProps = {
      initial: shouldReduce ? false as const : { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: shouldReduce ? { duration: 0 } : { duration: dur, delay: index * 0.06, ease: [0, 0, 0.2, 1] as any },
    };
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
          <MotionListItem
            {...motionProps}
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
          </MotionListItem>
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
        <MotionListItem {...motionProps} disablePadding {...itemProps} key={item.id}>
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
        </MotionListItem>
      );
    }

    return (
      <MotionListItem {...motionProps} {...itemProps} key={item.id}>
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
      </MotionListItem>
    );
  };

  let children: React.ReactNode[];
  if (withDividers) {
    children = [];
    items.forEach((item, idx) => {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      children.push(renderListItem(item, idx));
      if (idx < items.length - 1 && !hasChildren) {
        children.push(
          <Divider component="li" className="rds-list__divider" key={`divider-${item.id}`} />
        );
      }
    });
  } else {
    children = items.map((item, idx) => renderListItem(item, idx));
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
