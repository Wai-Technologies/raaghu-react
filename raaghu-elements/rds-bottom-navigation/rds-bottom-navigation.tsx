import { type SyntheticEvent, type ReactNode } from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  BottomNavigationProps
} from '@mui/material';
import './rds-bottom-navigation.scss';

export interface RdsBottomNavigationItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface RdsBottomNavigationProps extends Omit<BottomNavigationProps, 'children' | 'component'> {
  items: RdsBottomNavigationItem[];
  activeValue?: string;
  onItemChange?: (value: string) => void;
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
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    if (onItemChange) {
      onItemChange(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <div className="rds-bottom-navigation">
      <MuiBottomNavigation
        value={value || activeValue}
        onChange={handleChange}
        {...props}
      >
        {items.map((item) => (
          <MuiBottomNavigationAction
            key={item.value}
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
