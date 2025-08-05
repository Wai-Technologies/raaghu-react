import React, { useState, useEffect } from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButtonProps, ToggleButtonGroupProps } from '@mui/material';
import './rds-toggle-button.scss';
/**
 * Represents a single toggle button option
 */
export interface RdsToggleButtonOption {
  /** The value of the toggle button option, used for selection state */
  value: string;
  /** The text label to display on the button */
  label: string;
  /** Optional icon to display on the button */
  icon?: React.ReactNode;
  /** Whether the option is disabled */
  disabled?: boolean;
}

/**
 * Props for standalone toggle button component
 */
export interface RdsStandaloneToggleButtonProps extends Omit<ToggleButtonProps, 'value'> {
  /** The value of the toggle button (used for identification) */
  value?: string;
  /** Whether the button is selected (controlled mode) */
  selected?: boolean;
  /** Callback fired when the button state changes */
  onChange?: (event: React.MouseEvent<HTMLElement>, selected: boolean) => void;
  /** Content to render inside the button */
  children?: React.ReactNode;
}

/**
 * Props for toggle button group component
 */
export interface RdsToggleButtonProps extends Omit<ToggleButtonGroupProps, 'children'> {
  /** Array of options to display as toggle buttons */
  options: RdsToggleButtonOption[];
  /** Whether multiple buttons can be selected */
  multiple?: boolean;
  /** When true, at least one button must remain selected at all times */
  enforceSelected?: boolean;
  /** Orientation of the toggle button group */
  orientation?: 'horizontal' | 'vertical';
  /** Spacing between toggle buttons in pixels */
  spacing?: number;
  /** Default selected value(s) for uncontrolled mode */
  defaultValue?: string | string[];
  /** Spacing between icon and text within a button in pixels */
  iconTextSpacing?: number;
}

/**
 * A toggle button group component that allows selection of options
 * Supports both controlled and uncontrolled usage patterns
 */
const RdsToggleButton: React.FC<RdsToggleButtonProps> = ({
  options,
  multiple = false,
  exclusive,
  orientation = 'horizontal',
  spacing = 0,
  iconTextSpacing = 8,
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
        role="group"
        aria-label={otherProps['aria-label'] || "Toggle button group"}
        {...otherProps}
      >
        {options.map((option) => (
          <MuiToggleButton
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className="rds-toggle-button__button"
            aria-pressed={multiple ? 
              Array.isArray(value) && value.includes(option.value) : 
              value === option.value
            }
            aria-label={option.label || `Option ${option.value}`}
          >
            {option.icon && (
              <span className="rds-toggle-button__icon" style={{ marginRight: option.label ? iconTextSpacing : 0 }}>
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

/**
 * A standalone toggle button component that can be toggled on and off
 * Supports both controlled and uncontrolled usage
 */
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
        aria-pressed={selected}
        {...props}
      >
        {children}
      </MuiToggleButton>
    </div>
  );
};
export default RdsToggleButton;