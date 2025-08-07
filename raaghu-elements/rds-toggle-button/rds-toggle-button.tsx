import React, { useState, useEffect, useMemo } from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
import './rds-toggle-button.scss';
export interface RdsToggleButtonOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
export type { RdsStandaloneToggleButtonProps } from './rds-standalone-toggle-button';
export interface RdsToggleButtonProps extends Omit<ToggleButtonGroupProps, 'children'> {
  options: RdsToggleButtonOption[];
  multiple?: boolean;
  enforceSelected?: boolean;
  orientation?: 'horizontal' | 'vertical';
  spacing?: number;
  defaultValue?: string | string[];
  iconTextSpacing?: number;
  inputSize?: 'small' | 'medium' | 'large';
}

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
  inputSize = 'small',
  ...props
}) => {
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

  // Map inputSize to BEM modifier class
  const sizeClass =
    inputSize === 'large'
      ? 'rds-toggle-button--large'
      : inputSize === 'medium'
      ? 'rds-toggle-button--medium'
      : 'rds-toggle-button--small';

  // Large size style override using design tokens
  const largeButtonStyle = inputSize === 'large' ? {
    fontSize: 'var(--rds-font-size-lg)',
    padding: 'var(--rds-spacing-lg, 12px) var(--rds-spacing-2xl)',
    minHeight: 'var(--rds-toggle-button-min-height-lg)'
  } : {};


  // Handle change with enforcement that at least one option must be selected
  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: any) => {
    let finalValue = newValue;
    
    if (enforceSelected) {
      // For multiple selection, ensure at least one option remains selected
      if (multiple && Array.isArray(newValue) && newValue.length === 0) {
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
  
  // Handle custom button click when using spacing
  const handleCustomButtonClick = useMemo(() => {
    return (event: React.MouseEvent<HTMLElement>, optionValue: string) => {
      if (multiple) {
        // For multiple selection, toggle the value
        const newValue = Array.isArray(value) ? [...value] : [];
        const index = newValue.indexOf(optionValue);
        
        if (index === -1) {
          newValue.push(optionValue);
        } else if (!enforceSelected || newValue.length > 1) {
          newValue.splice(index, 1);
        } else {
          return; // Prevent deselection of last item
        }
        
        handleChange(event, newValue);
      } else {
        // For single selection, set the value (or unset if clicking the selected button)
        const newValue = value === optionValue && !enforceSelected ? null : optionValue;
        handleChange(event, newValue);
      }
    };
  }, [multiple, value, enforceSelected, handleChange]);

  // Extract color from props to ensure it's passed to MUI components
  const { color, ...otherProps } = props;

  // Create a custom class name for proper border styling with spacing
  const getButtonClassName = useMemo(() => {
    return (index: number) => {
      const baseClass = "rds-toggle-button__button";
      if (spacing === 0) return baseClass;
      // Add position-specific classes for border styling
      return `${baseClass} rds-toggle-button__button--spaced`;
    };
  }, [spacing]);

  // Memoize rendered buttons for performance with large option lists
  const memoizedButtons = useMemo(() => {
    // If not using custom spacing, just render normal toggle buttons
    if (spacing === 0) {
      return options.map((option, index) => (
        <MuiToggleButton
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className={`rds-toggle-button__button ${sizeClass}`}
          style={inputSize === 'large' ? largeButtonStyle : {}}
          aria-pressed={multiple ? 
            Array.isArray(value) && value.includes(option.value) : 
            value === option.value
          }
          aria-label={option.label || `Option ${option.value}`}
        >
          {option.icon && (
            <span className="rds-toggle-button__icon" style={{ marginRight: option.label ? `var(--rds-spacing-xs, ${iconTextSpacing}px)` : 0 }}>
              {option.icon}
            </span>
          )}
          {option.label}
        </MuiToggleButton>
      ));
    }

    // With spacing, render custom button wrappers
    return options.map((option, index) => {
      const isSelected = multiple ? 
        Array.isArray(value) && value.includes(option.value) : 
        value === option.value;
      const spacingStyle = index === 0 ? {} : {
        [orientation === 'vertical' ? 'marginTop' : 'marginLeft']: `var(--rds-toggle-button-spacing, ${spacing}px)`
      };

      // Define position-specific classes for proper styling
      let positionClass = '';
      if (options.length === 1) {
        positionClass = 'rds-toggle-button__button-wrapper--single';
      } else if (index === 0) {
        positionClass = 'rds-toggle-button__button-wrapper--first';
      } else if (index === options.length - 1) {
        positionClass = 'rds-toggle-button__button-wrapper--last';
      } else {
        positionClass = 'rds-toggle-button__button-wrapper--middle';
      }

      return (
        <div
          key={option.value}
          className={`rds-toggle-button__button-wrapper ${positionClass}`}
          style={spacingStyle}
        >
          <MuiToggleButton
            value={option.value}
            disabled={option.disabled}
            className={getButtonClassName(index) + ' ' + sizeClass}
            style={inputSize === 'large' ? largeButtonStyle : {}}
            onClick={(e) => handleCustomButtonClick(e, option.value)}
            selected={isSelected}
            aria-pressed={isSelected}
            aria-label={option.label || `Option ${option.value}`}
            color={color}
            fullWidth={orientation === 'vertical'}
          >
            {option.icon && (
              <span className="rds-toggle-button__icon" style={{ marginRight: option.label ? `var(--rds-spacing-xs, ${iconTextSpacing}px)` : 0 }}>
                {option.icon}
              </span>
            )}
            {option.label}
          </MuiToggleButton>
        </div>
      );
    });
  }, [options, value, multiple, iconTextSpacing, spacing, orientation, color, enforceSelected, getButtonClassName, handleCustomButtonClick, inputSize, largeButtonStyle]);

  // Determine if we need to use custom spacing rendering
  const useCustomSpacing = spacing > 0;

  return (
    <div
      className={`rds-toggle-button rds-toggle-button--${orientation} ${sizeClass} ${useCustomSpacing ? 'rds-toggle-button--spaced' : ''}`}
      role="group"
      aria-label={otherProps['aria-label'] || 'Toggle button group'}
    >
      {useCustomSpacing ? (
        <div className="rds-toggle-button__custom-group">
          {memoizedButtons}
        </div>
      ) : (
        <MuiToggleButtonGroup
          exclusive={exclusive !== undefined ? exclusive : !multiple}
          orientation={orientation}
          onChange={handleChange}
          value={value}
          color={color}
          {...otherProps}
          className="rds-toggle-button__group"
        >
          {memoizedButtons}
        </MuiToggleButtonGroup>
      )}
    </div>
  );
};
export { default as RdsStandaloneToggleButton } from './rds-standalone-toggle-button';
export default RdsToggleButton;