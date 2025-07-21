import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, CheckboxProps } from '@mui/material';

export interface RdsCheckboxProps extends CheckboxProps {
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
}

const RdsCheckbox: React.FC<RdsCheckboxProps> = ({
  label,
  isChecked,
  isDisabled = false,
  isIndeterminate = false,
  ...props
}) => {
  const checkbox = (
    <MuiCheckbox
      checked={isChecked}
      disabled={isDisabled}
      indeterminate={isIndeterminate}
      {...props}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={checkbox}
        label={label}
        disabled={isDisabled}
      />
    );
  }

  return checkbox;
};

export default RdsCheckbox;
