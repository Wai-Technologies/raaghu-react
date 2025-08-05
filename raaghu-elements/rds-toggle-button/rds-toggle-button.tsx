import React from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButtonProps, ToggleButtonGroupProps } from '@mui/material';
import './rds-toggle-button.scss';

export interface RdsToggleButtonOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RdsStandaloneToggleButtonProps extends Omit<ToggleButtonProps, 'value'> {
  value?: string;
  selected?: boolean;
  onChange?: (event: React.MouseEvent<HTMLElement>, selected: boolean) => void;
  children?: React.ReactNode;
}

export interface RdsToggleButtonProps extends Omit<ToggleButtonGroupProps, 'children'> {
  options: RdsToggleButtonOption[];
  multiple?: boolean;
  enforceSelected?: boolean;
  orientation?: 'horizontal' | 'vertical';
  spacing?: number;
}

/**
 * RdsToggleButton - A customizable toggle button group component
 */
const RdsToggleButton: React.FC<RdsToggleButtonProps> = ({
  options,
  multiple = false,
  exclusive,
  orientation = 'horizontal',
  spacing = 0,
  enforceSelected = false,
  onChange,
  ...props
}) => {
  // Handle change with enforcement that at least one option must be selected
  const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    if (enforceSelected) {
      if (multiple && Array.isArray(value) && value.length > 0) {
        onChange?.(event, value);
      } else if (!multiple && value !== null) {
        onChange?.(event, value);
      }
    } else {
      onChange?.(event, value);
    }
  };

  // Extract color from props to ensure it's passed to MUI components
  const { color, ...otherProps } = props;

  return (
    <div className={`rds-toggle-button rds-toggle-button--${orientation}`} style={{ gap: spacing }}>
      <MuiToggleButtonGroup
        exclusive={exclusive !== undefined ? exclusive : !multiple}
        orientation={orientation}
        onChange={enforceSelected ? handleChange : onChange}
        color={color}
        {...otherProps}
      >
        {options.map((option) => (
          <MuiToggleButton
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className="rds-toggle-button__button"
          >
            {option.icon && (
              <span className="rds-toggle-button__icon" style={{ marginRight: option.label ? 8 : 0 }}>
                {option.icon}
              </span>
            )}
            {option.label}
          </MuiToggleButton>
        ))}
      </MuiToggleButtonGroup>
    </div>
  );
};

export const RdsStandaloneToggleButton: React.FC<RdsStandaloneToggleButtonProps> = ({
  selected,
  onChange,
  children,
  ...props
}) => {
  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    onChange?.(event, !selected);
  };

  return (
    <div className="rds-toggle-button rds-toggle-button--standalone">
      <MuiToggleButton
        value="standalone"
        selected={selected}
        onChange={handleChange}
        className="rds-toggle-button__button"
        {...props}
      >
        {children}
      </MuiToggleButton>
    </div>
  );
};

export default RdsToggleButton;
