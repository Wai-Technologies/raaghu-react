import React, { useState, useEffect } from 'react';
import {
  List as MuiList,
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  Checkbox,
  Button,
  Card,
  CardHeader,
  Divider,
  Box,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import './rds-comp-transfer-list.scss';

/**
 * Individual item in transfer list
 */
export interface TransferListItem {
  /** Unique identifier for the item */
  id: string | number;
  /** Display label for the item */
  label: string;
  /** Optional description text */
  description?: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * Props for RdsCompTransferList component
 */
export interface RdsCompTransferListProps {
  /** All available items */
  items: TransferListItem[];
  /** Currently selected/checked item IDs - controlled mode */
  checked?: (string | number)[];
  /** Default selected/checked item IDs - uncontrolled mode */
  defaultChecked?: (string | number)[];
  /** Currently left list items (available items)  - controlled mode */
  leftItems?: (string | number)[];
  /** Default left list items - uncontrolled mode */
  defaultLeftItems?: (string | number)[];
  /** Size of the component */
  size?: 'small' | 'medium' | 'large';
  /** Allow multiple items to be selected */
  multiple?: boolean;
  /** Show select all checkbox */
  showSelectAll?: boolean;
  /** Disable the move buttons */
  disableMoveButtons?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Left list title */
  leftTitle?: string;
  /** Right list title */
  rightTitle?: string;
  /** Callback when checked items change */
  onCheckChange?: (checked: (string | number)[]) => void;
  /** Callback when items are moved */
  onMove?: (leftItems: (string | number)[], rightItems: (string | number)[]) => void;
  /** Callback when left list items change */
  onLeftItemsChange?: (leftItems: (string | number)[]) => void;
}

/**
 * RdsCompTransferList - Transfer List component using MUI components
 * Displays two lists with the ability to move items between them
 * Supports both controlled and uncontrolled modes
 * Supports selection and movement of items
 * 
 * @example
 * // Uncontrolled
 * <RdsCompTransferList 
 *   items={items}
 *   defaultLeftItems={leftIds}
 *   onMove={(left, right) => console.log(left, right)}
 * />
 * 
 * // Controlled
 * <RdsCompTransferList 
 *   items={items}
 *   leftItems={left}
 *   onLeftItemsChange={setLeft}
 * />
 */
const RdsCompTransferList: React.FC<RdsCompTransferListProps> = ({
  items,
  checked: controlledChecked,
  defaultChecked,
  leftItems: controlledLeftItems,
  defaultLeftItems,
  size = 'medium',
  multiple = true,
  showSelectAll = true,
  disableMoveButtons = false,
  className,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  onCheckChange,
  onMove,
  onLeftItemsChange,
}) => {
  // ─── State Management (Controlled + Uncontrolled) ────────────────

  // Initialize left items (items not moved to right)
  const [internalLeftItems, setInternalLeftItems] = useState<(string | number)[]>(() => {
    if (defaultLeftItems !== undefined) {
      return defaultLeftItems;
    }
    return items.map(item => item.id);
  });

  // Initialize checked items (selected for movement)
  const [internalChecked, setInternalChecked] = useState<(string | number)[]>(() => {
    return defaultChecked || [];
  });

  const isLeftItemsControlled = controlledLeftItems !== undefined;
  const isCheckedControlled = controlledChecked !== undefined;

  const leftItems = isLeftItemsControlled ? controlledLeftItems : internalLeftItems;
  const rightItems = items
    .map(item => item.id)
    .filter(id => !leftItems.includes(id));
  const checked = isCheckedControlled ? controlledChecked : internalChecked;

  // Sync when defaultLeftItems changes (uncontrolled mode only)
  useEffect(() => {
    if (!isLeftItemsControlled && defaultLeftItems !== undefined) {
      setInternalLeftItems(defaultLeftItems);
    }
  }, [defaultLeftItems, isLeftItemsControlled]);

  // Sync when defaultChecked changes (uncontrolled mode only)
  useEffect(() => {
    if (!isCheckedControlled && defaultChecked !== undefined) {
      setInternalChecked(defaultChecked);
    }
  }, [defaultChecked, isCheckedControlled]);

  // ─── Event Handlers ──────────────────────────────────────────────

  const handleCheckChange = (id: string | number) => {
    const newChecked = multiple
      ? checked.includes(id)
        ? checked.filter(item => item !== id)
        : [...checked, id]
      : checked.includes(id)
        ? []
        : [id];

    if (!isCheckedControlled) {
      setInternalChecked(newChecked);
    }

    onCheckChange?.(newChecked);
  };

  const handleSelectAllChange = (list: 'left' | 'right', isChecked: boolean) => {
    const itemsInList = list === 'left' ? leftItems : rightItems;
    const itemsInListObj = itemsInList.map(id => items.find(i => i.id === id)).filter(Boolean) as TransferListItem[];

    const availableItems = itemsInListObj
      .filter(item => !item.disabled)
      .map(item => item.id);

    let newChecked: (string | number)[] = [];

    if (isChecked) {
      // Select all items in the list
      newChecked = [...new Set([...checked, ...availableItems])];
    } else {
      // Deselect all items in the list
      newChecked = checked.filter(id => !availableItems.includes(id));
    }

    if (!isCheckedControlled) {
      setInternalChecked(newChecked);
    }

    onCheckChange?.(newChecked);
  };

  const handleMoveRight = () => {
    const checkedInLeft = checked.filter(id => leftItems.includes(id));
    if (checkedInLeft.length === 0) return;

    const newLeftItems = leftItems.filter(id => !checkedInLeft.includes(id));

    if (!isLeftItemsControlled) {
      setInternalLeftItems(newLeftItems);
    }

    // Clear checked after move
    if (!isCheckedControlled) {
      setInternalChecked([]);
    }

    onLeftItemsChange?.(newLeftItems);
    onMove?.(newLeftItems, items.map(i => i.id).filter(id => !newLeftItems.includes(id)));
    onCheckChange?.([]);
  };

  const handleMoveLeft = () => {
    const checkedInRight = checked.filter(id => rightItems.includes(id));
    if (checkedInRight.length === 0) return;

    const newLeftItems = [...leftItems, ...checkedInRight];

    if (!isLeftItemsControlled) {
      setInternalLeftItems(newLeftItems);
    }

    // Clear checked after move
    if (!isCheckedControlled) {
      setInternalChecked([]);
    }

    onLeftItemsChange?.(newLeftItems);
    onMove?.(newLeftItems, items.map(i => i.id).filter(id => !newLeftItems.includes(id)));
    onCheckChange?.([]);
  };

  // ─── Helper Functions ────────────────────────────────────────────

  const getSelectAllCount = (list: 'left' | 'right'): { numSelected: number; numTotal: number } => {
    const itemsInList = list === 'left' ? leftItems : rightItems;
    const itemsInListObj = itemsInList
      .map(id => items.find(i => i.id === id))
      .filter(Boolean) as TransferListItem[];
    const availableItems = itemsInListObj.filter(item => !item.disabled);
    const selectedInList = checked.filter(id => itemsInList.includes(id));

    return {
      numSelected: selectedInList.filter(id => availableItems.map(i => i.id).includes(id)).length,
      numTotal: availableItems.length,
    };
  };

  const getListItems = (list: 'left' | 'right'): TransferListItem[] => {
    const itemIds = list === 'left' ? leftItems : rightItems;
    return itemIds
      .map(id => items.find(item => item.id === id))
      .filter(Boolean) as TransferListItem[];
  };

  // ─── CSS Classes ─────────────────────────────────────────────────

  const getRootClasses = (): string => {
    const classes = ['rds-comp-transfer-list'];
    classes.push(`rds-comp-transfer-list--${size}`);
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // ─── Render ──────────────────────────────────────────────────────

  const leftCount = getSelectAllCount('left');
  const rightCount = getSelectAllCount('right');

  const renderList = (list: 'left' | 'right') => {
    const listItems = getListItems(list);
    const count = list === 'left' ? leftCount : rightCount;
    const title = list === 'left' ? leftTitle : rightTitle;

    return (
      <Card className="rds-comp-transfer-list__card">
        <CardHeader
          className="rds-comp-transfer-list__header"
          sx={{ px: 2, py: 1.5 }}
          avatar={
            showSelectAll && (
              <Checkbox
                onClick={(e) => e.stopPropagation()}
                checked={count.numSelected === count.numTotal && count.numTotal !== 0}
                indeterminate={count.numSelected !== 0 && count.numSelected !== count.numTotal}
                tabIndex={-1}
                disabled={count.numTotal === 0}
                onChange={(e) => handleSelectAllChange(list, e.target.checked)}
                data-testid={`select-all-${list}`}
              />
            )
          }
          title={title}
          subheader={`${count.numSelected}/${count.numTotal} selected`}
        />
        <Divider />
        <MuiList
          className={`rds-comp-transfer-list__list rds-comp-transfer-list__list--${list}`}
          dense
          component="div"
          role="list"
          data-testid={`transfer-list-${list}`}
        >
          {listItems.map((item) => {
            const isChecked = checked.includes(item.id);
            return (
              <MuiListItemButton
                key={item.id}
                role="listitem"
                onClick={() => handleCheckChange(item.id)}
                disabled={item.disabled}
                selected={isChecked}
                className={`rds-comp-transfer-list__item ${
                  isChecked ? 'rds-comp-transfer-list__item--selected' : ''
                } ${item.disabled ? 'rds-comp-transfer-list__item--disabled' : ''}`}
                data-testid={`transfer-item-${item.id}`}
              >
                <MuiListItemIcon className="rds-comp-transfer-list__checkbox">
                  <Checkbox
                    tabIndex={-1}
                    disableRipple
                    checked={isChecked}
                    disabled={item.disabled}
                    data-testid={`checkbox-${item.id}`}
                  />
                </MuiListItemIcon>
                {item.icon && (
                  <MuiListItemIcon className="rds-comp-transfer-list__icon">
                    {item.icon}
                  </MuiListItemIcon>
                )}
                <MuiListItemText
                  primary={item.label}
                  secondary={item.description}
                  className="rds-comp-transfer-list__text"
                />
              </MuiListItemButton>
            );
          })}
        </MuiList>
      </Card>
    );
  };

  return (
    <Box className={getRootClasses()} role="region" data-testid="rds-comp-transfer-list">
      <div className="rds-comp-transfer-list__container">
        {/* Left List */}
        <div className="rds-comp-transfer-list__list-wrapper">
          {renderList('left')}
        </div>

        {/* Move Buttons */}
        <div className="rds-comp-transfer-list__buttons">
          <Button
            variant="outlined"
            size="small"
            onClick={handleMoveRight}
            disabled={
              disableMoveButtons ||
              checked.filter(id => leftItems.includes(id)).length === 0
            }
            endIcon={<ChevronRightIcon />}
            className="rds-comp-transfer-list__button rds-comp-transfer-list__button--move-right"
            data-testid="button-move-right"
          >
            Move
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleMoveLeft}
            disabled={
              disableMoveButtons ||
              checked.filter(id => rightItems.includes(id)).length === 0
            }
            startIcon={<ChevronLeftIcon />}
            className="rds-comp-transfer-list__button rds-comp-transfer-list__button--move-left"
            data-testid="button-move-left"
          >
            Move
          </Button>
        </div>

        {/* Right List */}
        <div className="rds-comp-transfer-list__list-wrapper">
          {renderList('right')}
        </div>
      </div>
    </Box>
  );
};

RdsCompTransferList.displayName = 'RdsCompTransferList';
export default RdsCompTransferList;
