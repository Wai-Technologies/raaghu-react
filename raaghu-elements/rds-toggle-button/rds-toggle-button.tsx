import React, { useState, useEffect } from 'react';
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
  defaultValue?: string | string[];  // Added default value for uncontrolled mode
}

const RdsToggleButton: React.FC<RdsToggleButtonProps> = ({
  options,
  multiple = false,
  exclusive,
  orientation = 'horizontal',
  spacing = 0,
  enforceSelected = false,
  onChange,
  value: controlledValue,
  defaultValue,
  ...props
}) => {
  // State for internal management (uncontrolled mode)
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    // Initialize with defaultValue if provided
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    
    // Otherwise use first option value if enforceSelected is true
    if (enforceSelected && options.length > 0) {
      return multiple ? [options[0].value] : options[0].value;
    }
    
    // Default empty state
    return multiple ? [] : '';
  });

  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Update internal state if controlled value changes
  useEffect(() => {
    if (isControlled) {
      // No need to update internal state as we're using controlled value
    } else if (enforceSelected && options.length > 0) {
      // Make sure at least one option is selected if enforceSelected is true
      if (multiple && Array.isArray(internalValue) && internalValue.length === 0) {
        setInternalValue([options[0].value]);
      } else if (!multiple && !internalValue) {
        setInternalValue(options[0].value);
      }
    }
  }, [enforceSelected, options, multiple, internalValue, isControlled]);

  // Handle change with enforcement that at least one option must be selected
  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: any) => {
    let finalValue = newValue;
    
    // Apply enforcement logic - follows MUI's behavior where we prevent deselection
    // See: https://mui.com/material-ui/react-toggle-button/ - "Enforce Value Set" example
    if (enforceSelected) {
      // For multiple selection, ensure at least one option remains selected
      if (multiple && Array.isArray(newValue) && newValue.length === 0) {
        // Prevent deselection of the last item by returning early
        return; // Don't update state or call onChange
      } 
      // For single selection, don't allow deselection (when newValue is null)
      else if (!multiple && newValue === null) {
        return; // Don't update state or call onChange
      }
    }
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(finalValue);
    }
    
    // Call onChange handler with final value
    onChange?.(event, finalValue);
  };

  // Extract color from props to ensure it's passed to MUI components
  const { color, ...otherProps } = props;

  return (
    <div className={`rds-toggle-button rds-toggle-button--${orientation}`} style={{ gap: spacing }}>
      <MuiToggleButtonGroup
        exclusive={exclusive !== undefined ? exclusive : !multiple}
        orientation={orientation}
        onChange={handleChange}
        value={value}
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
  selected: controlledSelected,
  onChange,
  children,
  ...props
}) => {
  // State for internal management (uncontrolled mode)
  const [internalSelected, setInternalSelected] = useState(false);
  
  // Determine if component is controlled
  const isControlled = controlledSelected !== undefined;
  const selected = isControlled ? controlledSelected : internalSelected;

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    const newSelected = !selected;
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalSelected(newSelected);
    }
    
    // Call onChange handler
    onChange?.(event, newSelected);
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