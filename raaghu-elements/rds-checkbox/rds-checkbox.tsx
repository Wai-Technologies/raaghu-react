import { useState, useRef, type CSSProperties, type ChangeEvent } from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, type CheckboxProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-checkbox.scss';

export interface RdsCheckboxProps extends Omit<CheckboxProps, 'style' | 'component'> {
  /** Text shown next to the checkbox. Takes precedence over `label`. */
  labelText?: string;
  /** Text shown next to the checkbox. */
  label?: string;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: 'square' | 'circular' | CSSProperties;
  /** Checkbox shape. */
  variant?: 'square' | 'circular';
  status?: 'checked' | 'unchecked' | 'indeterminate';
  /** Shows the label text. When hidden, the label is still used as the accessible name. */
  showText?: boolean;
  cssStyle?: CSSProperties;
  /** @deprecated Use `disabled`. */
  isDisabled?: boolean;
}

const RdsCheckbox = ({
  labelText,
  label,
  isDisabled,
  disabled,
  style,
  variant,
  status,
  showText = true,
  className,
  cssStyle,
  color,
  checked: checkedProp,
  defaultChecked,
  indeterminate,
  onChange,
  slotProps,
  ...props
}: RdsCheckboxProps) => {
  if (isDisabled !== undefined) warnDeprecatedProp('RdsCheckbox', 'isDisabled', '`disabled`');

  const legacyShape = typeof style === 'string' ? style : undefined;
  if (legacyShape !== undefined) warnDeprecatedProp('RdsCheckbox', 'style', '`variant`');
  const styleObject = typeof style === 'object' ? style : undefined;

  const resolvedLabelText = labelText ?? label;
  const isCheckboxDisabled = Boolean(disabled) || Boolean(isDisabled);

  const [internalChecked, setInternalChecked] = useState(status === 'checked' || Boolean(defaultChecked));
  const prevStatusRef = useRef(status);

  if (status !== prevStatusRef.current) {
    prevStatusRef.current = status;
    if (status !== undefined) {
      setInternalChecked(status === 'checked');
    }
  }

  const checked = checkedProp ?? internalChecked;
  const currentIndeterminate = indeterminate ?? status === 'indeterminate';
  const shape = variant ?? legacyShape ?? 'square';

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: boolean) => {
    setInternalChecked(value);
    if (onChange) onChange(event, value);
  };

  const checkboxClassName = clsx(
    'rds-checkbox',
    `rds-checkbox__${shape}`,
    checked && 'rds-checkbox__checked',
    isCheckboxDisabled && 'rds-checkbox__disabled',
    currentIndeterminate && 'rds-checkbox__indeterminate',
    color && color !== 'default' && `rds-checkbox__${color}`,
    resolvedLabelText && !showText && 'rds-checkbox__text-hidden',
    status && `rds-checkbox__${status}`,
    className,
  );

  const inputSlot = slotProps?.input;
  const needsHiddenLabel = Boolean(resolvedLabelText) && !showText && !props['aria-label'] && typeof inputSlot !== 'function';
  const resolvedSlotProps = needsHiddenLabel
    ? { ...slotProps, input: { 'aria-label': resolvedLabelText, ...(inputSlot as object | undefined) } }
    : slotProps;

  const checkbox = (
    <MuiCheckbox
      disableRipple
      checked={checked}
      disabled={isCheckboxDisabled}
      indeterminate={currentIndeterminate}
      color={color}
      onChange={handleChange}
      slotProps={resolvedSlotProps}
      {...props}
    />
  );

  return (
    <div className={checkboxClassName} style={styleObject ? { ...cssStyle, ...styleObject } : cssStyle}>
      {resolvedLabelText ? (
        <FormControlLabel
          control={checkbox}
          label={showText ? resolvedLabelText : ''}
          disabled={isCheckboxDisabled}
        />
      ) : checkbox}
    </div>
  );
};

RdsCheckbox.displayName = 'RdsCheckbox';
export default RdsCheckbox;
