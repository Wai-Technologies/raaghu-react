import React, { useState } from 'react';
import { ButtonGroup, Button, ButtonGroupProps, ButtonProps } from '@mui/material';
import './rds-comp-button-group.scss';

export interface RdsCompButtonGroupOption {
  /**
   * Unique identifier for the option
   */
  value: string | number;
  
  /**
   * Display label for the button
   */
  label: React.ReactNode;
  
  /**
   * If true, the button will be disabled
   */
  disabled?: boolean;
  
  /**
   * Optional icon to display before the label
   */
  icon?: React.ReactElement;
}

export interface RdsCompButtonGroupProps extends Omit<ButtonGroupProps, 'children' | 'value' | 'onChange' | 'variant' | 'size' | 'color' | 'defaultValue'> {
  /**
   * Array of button options to display
   */
  options: RdsCompButtonGroupOption[];
  
  /**
   * Controlled mode: currently selected value(s)
   * In exclusive mode: string | number
   * In multiple mode: (string | number)[]
   */
  value?: string | number | (string | number)[];
  
  /**
   * Uncontrolled mode: default selected value(s)
   * In exclusive mode: string | number
   * In multiple mode: (string | number)[]
   */
  defaultValue?: string | number | (string | number)[];
  
  /**
   * Callback fired when selection changes
   */
  onChange?: (value: string | number | (string | number)[]) => void;
  
  /**
   * The variant to use
   * @default 'outlined'
   */
  variant?: 'text' | 'outlined' | 'contained';
  
  /**
   * The size of the component
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * The color of the component
   * @default 'primary'
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  
  /**
   * If true, toggle buttons will only allow one button to be selected
   * If false, multiple buttons can be selected
   * @default true
   */
  exclusive?: boolean;
  
  /**
   * The orientation of the button group
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * If true, the button group will fill the available width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * If true, the buttons will be disabled
   * @default false
   */
  disabled?: boolean;
}

const RdsCompButtonGroup: React.FC<RdsCompButtonGroupProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = 'outlined',
  size = 'medium',
  color = 'primary',
  exclusive = true,
  orientation = 'horizontal',
  fullWidth = false,
  disabled = false,
  className,
  ...props
}) => {
  // Initialize internal state based on mode
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return exclusive ? '' : [];
  });

  // Determine if controlled or uncontrolled mode
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  /**
   * Handle button click - update selection based on exclusive mode
   */
  const handleClick = (clickedValue: string | number) => {
    let newValue: string | number | (string | number)[];

    if (exclusive) {
      // Exclusive mode: toggle selected button or select new one
      newValue = selectedValue === clickedValue ? '' : clickedValue;
    } else {
      // Multiple mode: add/remove from array
      const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
      if (currentArray.includes(clickedValue)) {
        newValue = currentArray.filter(v => v !== clickedValue);
      } else {
        newValue = [...currentArray, clickedValue];
      }
    }

    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue);
    }

    // Call onChange callback
    onChange?.(newValue);
  };

  /**
   * Check if a button is selected
   */
  const isSelected = (buttonValue: string | number): boolean => {
    if (exclusive) {
      return selectedValue === buttonValue;
    } else {
      const valueArray = Array.isArray(selectedValue) ? selectedValue : [];
      return valueArray.includes(buttonValue);
    }
  };

  const rootClasses = [
    'rds-comp-button-group',
    `rds-comp-button-group--${size}`,
    orientation === 'vertical' && 'rds-comp-button-group--vertical',
    fullWidth && 'rds-comp-button-group--full-width',
    disabled && 'rds-comp-button-group--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} data-testid="rds-comp-button-group">
      <ButtonGroup
        variant={variant as any}
        size={size as any}
        color={color as any}
        disabled={disabled}
        orientation={orientation as any}
        fullWidth={fullWidth}
        className={className}
        {...props}
      >
        {options.map(option => (
          <Button
            key={option.value}
            value={option.value}
            onClick={() => handleClick(option.value)}
            disabled={option.disabled || disabled}
            variant={isSelected(option.value) ? (variant === 'text' ? 'contained' : variant) : variant}
            color={isSelected(option.value) ? color : 'inherit'}
            aria-pressed={isSelected(option.value)}
            data-testid={`rds-button-group-item-${option.value}`}
            className={`rds-comp-button-group__button ${isSelected(option.value) ? 'rds-comp-button-group__button--selected' : ''}`}
          >
            {option.icon && <span className="rds-comp-button-group__icon">{option.icon}</span>}
            <span className="rds-comp-button-group__label">{option.label}</span>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

RdsCompButtonGroup.displayName = 'RdsCompButtonGroup';
export default RdsCompButtonGroup;
