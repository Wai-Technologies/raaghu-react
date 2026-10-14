import { type SyntheticEvent, type ReactNode } from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  type BottomNavigationProps
} from '@mui/material';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-bottom-navigation.scss';

export interface RdsBottomNavigationItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface RdsBottomNavigationProps extends Omit<BottomNavigationProps, 'children' | 'component'> {
  items: RdsBottomNavigationItem[];
  /** @deprecated Use `value` instead. */
  activeValue?: string;
  /** @deprecated Use `onChange` instead. */
  onItemChange?: (value: string) => void;
  /** Shows the label of every item. When `false`, item labels are hidden. Defaults to `false`. */
  showLabels?: boolean;
}

const RdsBottomNavigation = ({
  items,
  activeValue,
  onItemChange,
  showLabels = false,
  value,
  onChange,
  ...props
}: RdsBottomNavigationProps) => {
  if (activeValue !== undefined) warnDeprecatedProp('RdsBottomNavigation', 'activeValue', '`value`');
  if (onItemChange !== undefined) warnDeprecatedProp('RdsBottomNavigation', 'onItemChange', '`onChange`');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    onItemChange?.(newValue);
    onChange?.(event, newValue);
  };

  return (
    <div className="rds-bottom-navigation">
      <MuiBottomNavigation
        {...props}
        value={value ?? activeValue}
        onChange={handleChange}
        showLabels={showLabels}
      >
        {items.map((item, index) => (
          <MuiBottomNavigationAction
            key={`${item.value}-${index}`}
            label={showLabels ? item.label : undefined}
            value={item.value}
            icon={item.icon}
            disabled={item.disabled}
            showLabel={showLabels}
            aria-label={item.label}
          />
        ))}
      </MuiBottomNavigation>
    </div>
  );
};

RdsBottomNavigation.displayName = 'RdsBottomNavigation';
export default RdsBottomNavigation;
