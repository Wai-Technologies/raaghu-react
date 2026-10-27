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
  required?: boolean;
  /** @deprecated Use `required` instead. */
  enforceSelected?: boolean;
  /** Layout direction of the group. */
  orientation?: 'horizontal' | 'vertical';
  /** Gap in px between buttons (the `--rds-toggle-button-spacing` CSS variable still wins). 0 uses the joined MUI group. */
  spacing?: number;
  /** Initially selected value(s) when uncontrolled. */
  defaultValue?: string | string[];
  /** @deprecated Set the `--rds-spacing-xs` theme token instead. Gap in px between icon and label. */
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
  required,
  enforceSelected,
  onChange,
  value: controlledValue,
  defaultValue,
  inputSize,
  size: sizeProp,
  disabled,
  color,
  className,
  sx,
  'data-testid': dataTestId,
  ...otherProps
}: RdsToggleButtonProps) => {
  if (enforceSelected !== undefined) warnDeprecatedProp('RdsToggleButton', 'enforceSelected', '`required`');
  if (iconTextSpacing !== undefined) warnDeprecatedProp('RdsToggleButton', 'iconTextSpacing', 'the `--rds-spacing-xs` theme token');
  const mustSelect = required ?? enforceSelected ?? false;
  if (inputSize !== undefined) warnDeprecatedProp('RdsToggleButton', 'inputSize', '`size`');
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    if (mustSelect && options.length > 0) {
      return multiple ? [options[0].value] : options[0].value;
    }
    return multiple ? [] : '';
  });
  const isControlled = controlledValue !== undefined;
  const rawValue = isControlled ? controlledValue : internalValue;

  let value = rawValue;
  if (mustSelect && options.length > 0) {
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
    if (mustSelect) {
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

  const groupAriaLabel = (otherProps['aria-label'] as string | undefined) || 'Toggle button group';
  const useCustomSpacing = spacing > 0;
  const countClass = effectiveSize === 'large' && options.length === 3 ? 'rds-toggle-button--large-three' : '';

  return (
    <div
      data-testid={dataTestId}
      className={clsx(
        'rds-toggle-button',
        `rds-toggle-button--${orientation}`,
        sizeClass,
        countClass,
        useCustomSpacing && 'rds-toggle-button--spaced',
        options.length > 3 && 'rds-toggle-button--wrap-mobile',
        className,
      )}
      style={useCustomSpacing ? { ['--rds-toggle-button-spacing' as string]: `${spacing}px` } : undefined}
    >
      <MuiToggleButtonGroup
        exclusive={!multiple}
        orientation={orientation}
        onChange={handleChange}
        value={value}
        size={effectiveSize}
        color={color}
        disabled={disabled}
        {...otherProps}
        aria-label={groupAriaLabel}
        className={clsx('rds-toggle-button__group', useCustomSpacing && 'rds-toggle-button__group--spaced')}
        sx={[
          useCustomSpacing && {
            gap: 'var(--rds-toggle-button-spacing)',
            backgroundColor: 'transparent',
            '& .MuiToggleButtonGroup-grouped': {
              borderRadius: 'var(--rds-border-radius-sm, 4px)',
              border: '1px solid',
              borderColor: 'divider',
              margin: 0,
              '&:not(:first-of-type)': {
                marginLeft: 0,
                marginTop: 0,
                borderLeft: '1px solid',
                borderTop: '1px solid',
                borderColor: 'divider',
              },
              '&.Mui-selected + .MuiToggleButtonGroup-grouped.Mui-selected': {
                borderLeft: '1px solid',
                borderTop: '1px solid',
                borderColor: 'divider',
              },
            },
          },
          ...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
        ]}
      >
        {options.map((option) => (
          <MuiToggleButton
            key={option.value}
            value={option.value}
            disabled={disabled || option.disabled}
            className={clsx('rds-toggle-button__button', useCustomSpacing && 'rds-toggle-button__button--spaced', sizeClass)}
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
        ))}
      </MuiToggleButtonGroup>
    </div>
  );
};
export { default as RdsStandaloneToggleButton } from './rds-standalone-toggle-button';
RdsToggleButton.displayName = 'RdsToggleButton';
export default RdsToggleButton;
