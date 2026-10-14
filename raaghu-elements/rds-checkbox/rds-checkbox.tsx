import { useState, type CSSProperties, type ChangeEvent } from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, type CheckboxProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-checkbox.scss';

export interface RdsCheckboxProps extends Omit<CheckboxProps, 'style' | 'component'> {
  /** Text shown next to the checkbox. */
  label?: string;
  style?: 'square' | 'circular';
  state?: 'default' | 'disabled' | 'hover';
  status?: 'checked' | 'unchecked' | 'indeterminate';
  /** Shows the label text. When hidden, the label is still used as the accessible name. */
  showText?: boolean;
  cssStyle?: CSSProperties;
  /** @deprecated Use `label`. */
  labeltext?: string;
  /** @deprecated Use `disabled`. */
  isDisabled?: boolean;
}

const RdsCheckbox = ({
  label,
  labeltext,
  isDisabled,
  disabled,
  style = 'square',
  state = 'default',
  status,
  showText = true,
  className,
  cssStyle,
  color,
  checked: checkedProp,
  defaultChecked,
  onChange,
  slotProps,
  ...props
}: RdsCheckboxProps) => {
  if (labeltext !== undefined) warnDeprecatedProp('RdsCheckbox', 'labeltext', '`label`');
  if (isDisabled !== undefined) warnDeprecatedProp('RdsCheckbox', 'isDisabled', '`disabled`');

  const labelText = label ?? labeltext;
  const isCheckboxDisabled = Boolean(disabled) || Boolean(isDisabled) || state === 'disabled';

  const [internalChecked, setInternalChecked] = useState(status === 'checked' || Boolean(defaultChecked));
  const [prevStatus, setPrevStatus] = useState(status);

  if (status !== prevStatus) {
    setPrevStatus(status);
    if (status !== undefined) {
      setInternalChecked(status === 'checked');
    }
  }

  // A consumer `checked` controls the checkbox (and its classes); otherwise `status`/clicks do.
  const checked = checkedProp ?? internalChecked;
  const currentIndeterminate = status === 'indeterminate';

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: boolean) => {
    setInternalChecked(value);
    if (onChange) onChange(event, value);
  };

  const checkboxClassName = clsx(
    'rds-checkbox',
    style && `rds-checkbox__${style}`,
    checked && 'rds-checkbox__checked',
    isCheckboxDisabled && 'rds-checkbox__disabled',
    currentIndeterminate && 'rds-checkbox__indeterminate',
    state && state !== 'default' && `rds-checkbox__${state}`,
    color && color !== 'default' && `rds-checkbox__${color}`,
    labelText && !showText && 'rds-checkbox__text-hidden',
    status && `rds-checkbox__${status}`,
    className,
  );

  // Keep an accessible name when the visible label is hidden.
  const inputSlot = slotProps?.input;
  const needsHiddenLabel = Boolean(labelText) && !showText && !props['aria-label'] && typeof inputSlot !== 'function';
  const resolvedSlotProps = needsHiddenLabel
    ? { ...slotProps, input: { 'aria-label': labelText, ...(inputSlot as object | undefined) } }
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
    <div className={checkboxClassName} style={cssStyle}>
      {labelText ? (
        <FormControlLabel
          control={checkbox}
          label={showText ? labelText : ''}
          disabled={isCheckboxDisabled}
        />
      ) : checkbox}
    </div>
  );
};

RdsCheckbox.displayName = 'RdsCheckbox';
export default RdsCheckbox;
