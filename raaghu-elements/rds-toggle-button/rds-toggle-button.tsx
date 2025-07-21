import React from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButtonProps, ToggleButtonGroupProps } from '@mui/material';

export interface RdsToggleButtonOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RdsToggleButtonProps extends Omit<ToggleButtonGroupProps, 'children'> {
  options: RdsToggleButtonOption[];
  multiple?: boolean;
}

const RdsToggleButton: React.FC<RdsToggleButtonProps> = ({
  options,
  multiple = false,
  exclusive,
  ...props
}) => {
  return (
    <MuiToggleButtonGroup
      exclusive={exclusive !== undefined ? exclusive : !multiple}
      {...props}
    >
      {options.map((option) => (
        <MuiToggleButton
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.icon && (
            <span style={{ marginRight: option.label ? 8 : 0, display: 'flex', alignItems: 'center' }}>
              {option.icon}
            </span>
          )}
          {option.label}
        </MuiToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
};

export default RdsToggleButton;
