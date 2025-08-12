import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, CheckboxProps } from '@mui/material';
import './rds-checkbox.scss';

export interface RdsCheckboxProps extends Omit<CheckboxProps, 'style'> {
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  style?: 'square' | 'circular';
  state?: 'default' | 'disabled' | 'hover';
  showText?: boolean;
  cssStyle?: React.CSSProperties;
}


const RdsCheckbox: React.FC<RdsCheckboxProps> = ({
  label,
  isChecked,
  isDisabled = false,
  isIndeterminate = false,
  style = 'square',
  state = 'default',
  showText = true,
  className,
  cssStyle,
  color,
  onChange,
  ...props
}) => {
  // Internal checked state for uncontrolled usage
  const [checked, setChecked] = React.useState(isChecked ?? false);

  // Sync with controlled prop
  React.useEffect(() => {
    if (typeof isChecked === 'boolean') setChecked(isChecked);
  }, [isChecked]);

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
    if (isIndeterminate) classes.push('rds-checkbox__indeterminate');
    if (state && state !== 'default') classes.push(`rds-checkbox__${state}`);
    if (color && color !== 'default') classes.push(`rds-checkbox__${color}`);
    if (label && !showText) classes.push('rds-checkbox__text-hidden');
    if (className) classes.push(className);
    return classes.join(' ');
  };

  const checkbox = (
    <MuiCheckbox
      checked={checked}
      disabled={isDisabled || state === 'disabled'}
      indeterminate={isIndeterminate}
      color={color}
      onChange={handleChange}
      {...props}
    />
  );

  if (label) {
    return (
      <div className={getCheckboxClasses()} style={cssStyle}>
        <FormControlLabel
          control={checkbox}
          label={showText ? label : ''}
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
