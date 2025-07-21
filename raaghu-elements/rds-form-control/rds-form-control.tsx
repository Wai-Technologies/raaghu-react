import React from 'react';
import {
  FormControl as MuiFormControl,
  FormControlLabel as MuiFormControlLabel,
  FormGroup as MuiFormGroup,
  FormHelperText as MuiFormHelperText,
  FormLabel as MuiFormLabel,
  FormControlProps
} from '@mui/material';

export interface RdsFormControlProps extends FormControlProps {
  label?: string;
  helperText?: string;
  children: React.ReactNode;
  isRequired?: boolean;
  isGroup?: boolean;
}

const RdsFormControl: React.FC<RdsFormControlProps> = ({
  label,
  helperText,
  children,
  isRequired = false,
  isGroup = false,
  required,
  error,
  ...props
}) => {
  const isRequiredProp = required !== undefined ? required : isRequired;

  const content = isGroup ? (
    <MuiFormGroup>{children}</MuiFormGroup>
  ) : (
    children
  );

  return (
    <MuiFormControl required={isRequiredProp} error={error} {...props}>
      {label && <MuiFormLabel>{label}</MuiFormLabel>}
      {content}
      {helperText && <MuiFormHelperText>{helperText}</MuiFormHelperText>}
    </MuiFormControl>
  );
};

export default RdsFormControl;
