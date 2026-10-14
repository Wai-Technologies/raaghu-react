import { useState, type MouseEvent, type ReactNode } from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonGroup as MuiToggleButtonGroup, type ToggleButtonGroupProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-toggle-button.scss';

/** A single option rendered as a toggle button. */
export interface RdsToggleButtonOption {
  /** Unique value of the option. */
  value: string;
  /** Visible label (also used as the accessible name). */
  label: string;
  /** Optional icon shown before the label. */
  icon?: ReactNode;
  /** Disables this option only. */
  disabled?: boolean;
}
export type { RdsStandaloneToggleButtonProps } from './rds-standalone-toggle-button';

/** Props for RdsToggleButton, a group of toggle buttons built on MUI ToggleButtonGroup. */
export interface RdsToggleButtonProps extends Omit<ToggleButtonGroupProps, 'children' | 'component'> {
  /** Options rendered as toggle buttons. */
  options: RdsToggleButtonOption[];
  /** Allow several options to be selected at once. */
  multiple?: boolean;
  /** Keep at least one option selected. */
  enforceSelected?: boolean;
  /** Layout direction of the group. */
  orientation?: 'horizontal' | 'vertical';
  /** Gap in px between buttons (the `--rds-toggle-button-spacing` CSS variable still wins). 0 uses the joined MUI group. */
  spacing?: number;
  /** Initially selected value(s) when uncontrolled. */
  defaultValue?: string | string[];
  /** Gap in px between icon and label; when passed it overrides the spacing token. */
  iconTextSpacing?: number;
  /** @deprecated Use `size` instead. */
  inputSize?: 'small' | 'medium' | 'large';
}

const RdsToggleButton = ({
  options,
  multiple = false,
  orientation = 'horizontal',
  spacing = 0,
  iconTextSpacing,
  enforceSelected = false,
  onChange,
  value: controlledValue,
  defaultValue,
  inputSize,
  size: sizeProp,
  disabled,
  color,
  className,
  ...otherProps
}: RdsToggleButtonProps) => {
  if (inputSize !== undefined) warnDeprecatedProp('RdsToggleButton', 'inputSize', '`size`');
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
  const rawValue = isControlled ? controlledValue : internalValue;

  let value = rawValue;
  if (enforceSelected && options.length > 0) {
    if (multiple) {
      const current = Array.isArray(rawValue) ? rawValue : [];
      value = current.length > 0 ? current : [options[0].value];
    } else {
      value = rawValue || options[0].value;
    }
  }

  const effectiveSize = (sizeProp as 'small' | 'medium' | 'large' | undefined) || inputSize || 'small';

  const sizeClass =
    effectiveSize === 'large'
      ? 'rds-toggle-button--large'
      : effectiveSize === 'medium'
      ? 'rds-toggle-button--medium'
      : 'rds-toggle-button--small';

  const iconGap = iconTextSpacing !== undefined ? `${iconTextSpacing}px` : 'var(--rds-spacing-xs, 8px)';

  const handleChange = (event: MouseEvent<HTMLElement>, newValue: string | string[] | null) => {
    if (enforceSelected) {
      if (multiple && Array.isArray(newValue) && newValue.length === 0) {
        return;
      } else if (!multiple && newValue === null) {
        return;
      }
    }
    if (!isControlled) {
      setInternalValue(newValue ?? (multiple ? [] : ''));
    }
    onChange?.(event, newValue);
  };

  const handleCustomButtonClick = (event: MouseEvent<HTMLElement>, optionValue: string) => {
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

  const groupAriaLabel = (otherProps['aria-label'] as string | undefined) || 'Toggle button group';

  const renderButtons = () => {
    if (spacing === 0) {
      return options.map((option) => (
        <MuiToggleButton
          key={option.value}
          value={option.value}
          disabled={disabled || option.disabled}
          className={`rds-toggle-button__button ${sizeClass}`}
          size={effectiveSize}
          aria-label={option.label || `Option ${option.value}`}
        >
          {option.icon && (
            <span className="rds-toggle-button__icon" style={{ marginRight: option.label ? iconGap : 0 }}>
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
        [orientation === 'vertical' ? 'marginTop' : 'marginLeft']: `var(--rds-toggle-button-spacing, ${spacing}px)`
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
            className={clsx('rds-toggle-button__button', 'rds-toggle-button__button--spaced', sizeClass)}
            size={effectiveSize}
            onClick={(e) => handleCustomButtonClick(e, option.value)}
            selected={isSelected}
            aria-label={option.label || `Option ${option.value}`}
            color={color}
            fullWidth={orientation === 'vertical'}
          >
            {option.icon && (
              <span className="rds-toggle-button__icon" style={{ marginRight: option.label ? iconGap : 0 }}>
                {option.icon}
              </span>
            )}
            {option.label}
          </MuiToggleButton>
        </div>
      );
    });
  };

  const useCustomSpacing = spacing > 0;

  const countClass = effectiveSize === 'large' && options.length === 3 ? 'rds-toggle-button--large-three' : '';

  return (
    <div
      className={clsx(
        'rds-toggle-button',
        `rds-toggle-button--${orientation}`,
        sizeClass,
        countClass,
        useCustomSpacing && 'rds-toggle-button--spaced',
        options.length > 3 && 'rds-toggle-button--wrap-mobile',
        className,
      )}
    >
      {useCustomSpacing ? (
        <fieldset className="rds-toggle-button__custom-group" aria-label={groupAriaLabel}>
          {renderButtons()}
        </fieldset>
      ) : (
        <MuiToggleButtonGroup
          exclusive={!multiple}
          orientation={orientation}
          onChange={handleChange}
          value={value}
          size={effectiveSize}
          color={color}
          {...otherProps}
          aria-label={groupAriaLabel}
          className="rds-toggle-button__group"
        >
          {renderButtons()}
        </MuiToggleButtonGroup>
      )}
    </div>
  );
};
export { default as RdsStandaloneToggleButton } from './rds-standalone-toggle-button';
RdsToggleButton.displayName = 'RdsToggleButton';
export default RdsToggleButton;
