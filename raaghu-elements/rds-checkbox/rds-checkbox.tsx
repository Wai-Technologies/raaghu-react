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
  ...props
}) => {
  // Generate CSS classes based on props
  const getCheckboxClasses = () => {
    const classes = ['rds-checkbox'];
    
    if (style) {
      classes.push(`rds-checkbox--${style}`);
    }
    
    if (isChecked) {
      classes.push('rds-checkbox--checked');
    }
    
    if (isDisabled || state === 'disabled') {
      classes.push('rds-checkbox--disabled');
    }
    
    if (isIndeterminate) {
      classes.push('rds-checkbox--indeterminate');
    }
    
    if (state && state !== 'default') {
      classes.push(`rds-checkbox--${state}`);
    }
    
    if (color && color !== 'default') {
      classes.push(`rds-checkbox--${color}`);
    }
    
    if (label && !showText) {
      classes.push('rds-checkbox--text-hidden');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  const checkbox = (
    <MuiCheckbox
      checked={isChecked}
      disabled={isDisabled || state === 'disabled'}
      indeterminate={isIndeterminate}
      color={color}
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
