import React from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  BottomNavigationProps
} from '@mui/material';

export interface RdsBottomNavigationItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RdsBottomNavigationProps extends Omit<BottomNavigationProps, 'children'> {
  items: RdsBottomNavigationItem[];
  activeValue?: string;
  onItemChange?: (value: string) => void;
}

const RdsBottomNavigation: React.FC<RdsBottomNavigationProps> = ({
  items,
  activeValue,
  onItemChange,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (onItemChange) {
      onItemChange(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <MuiBottomNavigation
      value={value || activeValue}
      onChange={handleChange}
      {...props}
    >
      {items.map((item) => (
        <MuiBottomNavigationAction
          key={item.value}
          label={item.label}
          value={item.value}
          icon={item.icon}
          disabled={item.disabled}
        />
      ))}
    </MuiBottomNavigation>
  );
};

export default RdsBottomNavigation;
