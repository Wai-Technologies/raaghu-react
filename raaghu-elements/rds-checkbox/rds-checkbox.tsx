import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, type CheckboxProps } from '@mui/material';
import './rds-checkbox.scss';

export interface RdsCheckboxProps extends Omit<CheckboxProps, 'style'> {
  labeltext?: string;
  isDisabled?: boolean;
  style?: 'square' | 'circular';
  state?: 'default' | 'disabled' | 'hover';
  status?: 'checked' | 'unchecked' | 'indeterminate';
  showText?: boolean;
  cssStyle?: React.CSSProperties;
}


const RdsCheckbox = ({
  labeltext,
  isDisabled = false,
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
  // Determine initial state based on status prop or fallback to legacy props
  const getInitialCheckedState = () => {
    if (status !== undefined) {
      return status === 'checked';
    }
    return false;
  };

  const getInitialIndeterminateState = () => {
    if (status !== undefined) {
      return status === 'indeterminate';
    }
    return false;
  };

  // Internal checked state for uncontrolled usage
  const [checked, setChecked] = React.useState(getInitialCheckedState());

  // Sync with controlled props (status takes precedence over legacy props)
  React.useEffect(() => {
    if (status !== undefined) {
      setChecked(status === 'checked');
    }
  }, [status]);

  // Determine current indeterminate state
  const currentIndeterminate = getInitialIndeterminateState();

  // Handle change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
    setChecked(value);
    if (onChange) onChange(event, value);
  };

  // Generate CSS classes based on props
  const getCheckboxClasses = () => {
    const classes = ['rds-checkbox'];
    if (style) classes.push(`rds-checkbox__${style}`);
    if (checked) classes.push('rds-checkbox__checked');
    if (isDisabled || state === 'disabled') classes.push('rds-checkbox__disabled');
    if (currentIndeterminate) classes.push('rds-checkbox__indeterminate');
    if (state && state !== 'default') classes.push(`rds-checkbox__${state}`);
    if (color && color !== 'default') classes.push(`rds-checkbox__${color}`);
    if (labeltext && !showText) classes.push('rds-checkbox__text-hidden');
    if (status) classes.push(`rds-checkbox__${status}`);
    if (className) classes.push(className);
    return classes.join(' ');
  };

  const checkbox = (
    <MuiCheckbox
      checked={checked}
      disabled={isDisabled || state === 'disabled'}
      indeterminate={currentIndeterminate}
      color={color}
      onChange={handleChange}
      {...props}
    />
  );

  if (labeltext) {
    return (
      <div className={getCheckboxClasses()} style={cssStyle}>
        <FormControlLabel
          control={checkbox}
          label={showText ? labeltext : ''}
          disabled={isDisabled || state === 'disabled'}
        />
      </div>
    );
  }

  return (
    <div className={getCheckboxClasses()} style={cssStyle}>
      {checkbox}
    </div>
  );
};

export default RdsCheckbox;
