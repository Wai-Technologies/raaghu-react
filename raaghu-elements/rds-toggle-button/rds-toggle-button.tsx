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
  orientation = 'horizontal',
  spacing = 0,
  iconTextSpacing = 8,
  enforceSelected = false,
  onChange,
  value: controlledValue,
  defaultValue,
  inputSize = 'small',
  size: sizeProp,
  disabled,
  color,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    if (enforceSelected && options.length > 0) {
      return multiple ? [options[0].value] : options[0].value;
    }
    return multiple ? [] : '';
  });
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  useEffect(() => {
    if (isControlled) {
    } else if (enforceSelected && options.length > 0) {
      if (multiple && Array.isArray(internalValue) && internalValue.length === 0) {
        setInternalValue([options[0].value]);
      } else if (!multiple && !internalValue) {
        setInternalValue(options[0].value);
      }
    }
  }, [enforceSelected, options, multiple, internalValue, isControlled]);

  const effectiveSize = (sizeProp as 'small' | 'medium' | 'large' | undefined) || inputSize;

  const sizeClass =
    effectiveSize === 'large'
      ? 'rds-toggle-button--large'
      : effectiveSize === 'medium'
      ? 'rds-toggle-button--medium'
      : 'rds-toggle-button--small';


  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: any) => {
    let finalValue = newValue;
    
    if (enforceSelected) {
      if (multiple && Array.isArray(newValue) && newValue.length === 0) {
        return;
      } 
      else if (!multiple && newValue === null) {
        return;
      }
    }
    if (!isControlled) {
      setInternalValue(finalValue);
    }
    onChange?.(event, finalValue);
  };
  
  const handleCustomButtonClick = useMemo(() => {
    return (event: React.MouseEvent<HTMLElement>, optionValue: string) => {
      if (disabled) {
        return;
      }
      
      if (multiple) {
        const newValue = Array.isArray(value) ? [...value] : [];
        const index = newValue.indexOf(optionValue);
        
        if (index === -1) {
          newValue.push(optionValue);
        } else if (!enforceSelected || newValue.length > 1) {
          newValue.splice(index, 1);
        } else {
          return;
        }
        
        handleChange(event, newValue);
      } else {
        const newValue = value === optionValue && !enforceSelected ? null : optionValue;
        handleChange(event, newValue);
      }
    };
  }, [multiple, value, enforceSelected, handleChange, disabled]);

  const { ...otherProps } = props;

  const getButtonClassName = useMemo(() => {
    return (index: number) => {
      const baseClass = "rds-toggle-button__button";
      if (spacing === 0) return  baseClass;
      return `${baseClass} rds-toggle-button__button--spaced`;
    };
  }, [spacing]);

  const memoizedButtons = useMemo(() => {
    if (spacing === 0) {
      return options.map((option, index) => (
        <MuiToggleButton
          key={option.value}
          value={option.value}
          disabled={disabled || option.disabled}
          className={`rds-toggle-button__button ${sizeClass}`}
          size={effectiveSize}
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

    return options.map((option, index) => {
      const isSelected = multiple ? 
        Array.isArray(value) && value.includes(option.value) : 
        value === option.value;
      const spacingStyle = index === 0 ? {} : {
        [orientation === 'vertical' ? 'marginTop' : 'marginLeft']: `var(--rds-toggle-button-spacing, var(--rds-spacing-sm, ${spacing}px))`
      };

      return (
        <div
          key={option.value}
          className="rds-toggle-button__button-wrapper"
          style={spacingStyle}
        >
          <MuiToggleButton
            value={option.value}
            disabled={disabled || option.disabled}
            className={getButtonClassName(index) + ' ' + sizeClass}
            size={effectiveSize}
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
  }, [options, value, multiple, iconTextSpacing, spacing, orientation, color, enforceSelected, getButtonClassName, handleCustomButtonClick, inputSize]);

  const useCustomSpacing = spacing > 0;

  const countClass = effectiveSize === 'large' && options.length === 3 ? 'rds-toggle-button--large-three' : '';

  return (
    <div
  className={`rds-toggle-button rds-toggle-button--${orientation} ${sizeClass} ${countClass} ${useCustomSpacing ? 'rds-toggle-button--spaced' : ''} ${options.length > 3 ? 'rds-toggle-button--wrap-mobile' : ''}`}
      role="group"
      aria-label={otherProps['aria-label'] || 'Toggle button group'}
    >
      {useCustomSpacing ? (
        <div className="rds-toggle-button__custom-group">
          {memoizedButtons}
        </div>
      ) : (
        <MuiToggleButtonGroup
          exclusive={!multiple}
          orientation={orientation}
          onChange={handleChange}
          value={value}
          size={effectiveSize}
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
RdsToggleButton.displayName = 'RdsToggleButton';
export default RdsToggleButton;