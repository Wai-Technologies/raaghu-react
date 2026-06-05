import React from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  BottomNavigationProps
} from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import { useMotionTokens } from '../../raaghu-react-themes/src/motion';
import './rds-bottom-navigation.scss';

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
  showLabels?: boolean;
  animationDuration?: number;
}

const RdsBottomNavigation: React.FC<RdsBottomNavigationProps> = ({
  items,
  activeValue,
  onItemChange,
  showLabels = false,
  value,
  onChange,
  animationDuration,
  ...props
}) => {
  const shouldReduce = useReducedMotion();
  const motionTokens = useMotionTokens();
  const dur = typeof animationDuration === 'number' ? animationDuration / 1000 : motionTokens.base;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (onItemChange) {
      onItemChange(newValue);
    }
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <motion.div
      className="rds-bottom-navigation"
      initial={shouldReduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: dur, ease: [0, 0, 0.2, 1] }}
    >
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
          />
        ))}
      </MuiBottomNavigation>
    </motion.div>
  );
};

RdsBottomNavigation.displayName = 'RdsBottomNavigation';
export default RdsBottomNavigation;
