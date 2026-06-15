import { useState, useEffect, type CSSProperties, type ChangeEvent } from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, type CheckboxProps } from '@mui/material';
import clsx from 'clsx';
import './rds-checkbox.scss';

export interface RdsCheckboxProps extends Omit<CheckboxProps, 'style'> {
  labeltext?: string;
  isDisabled?: boolean;
  style?: 'square' | 'circular';
  state?: 'default' | 'disabled' | 'hover';
  status?: 'checked' | 'unchecked' | 'indeterminate';
  showText?: boolean;
  cssStyle?: CSSProperties;
}


const RdsCheckbox = ({
  labeltext,
  isDisabled = false,
  disabled,
  style = 'square',
  state = 'default',
  status,
  showText = true,
  className,
  cssStyle,
  color,
  onChange,
  ...props
}:RdsCheckboxProps) => {
  const isCheckboxDisabled = Boolean(disabled) || isDisabled || state === 'disabled';

  const [checked, setChecked] = useState(status === 'checked');

  useEffect(() => {
    if (status !== undefined) {
      setChecked(status === 'checked');
    }
  }, [status]);

  const currentIndeterminate = status === 'indeterminate';

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: boolean) => {
    setChecked(value);
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
    labeltext && !showText && 'rds-checkbox__text-hidden',
    status && `rds-checkbox__${status}`,
    className,
  );

  const checkbox = (
    <MuiCheckbox
      checked={checked}
      disabled={isCheckboxDisabled}
      indeterminate={currentIndeterminate}
      color={color}
      onChange={handleChange}
      {...props}
    />
  );

  if (labeltext) {
    return (
      <div className={checkboxClassName} style={cssStyle}>
        <FormControlLabel
          control={checkbox}
          label={showText ? labeltext : ''}
          disabled={isCheckboxDisabled}
        />
      </div>
    );
  }

  return (
    <div className={checkboxClassName} style={cssStyle}>
      {checkbox}
    </div>
  );
};

RdsCheckbox.displayName = 'RdsCheckbox';
export default RdsCheckbox;
