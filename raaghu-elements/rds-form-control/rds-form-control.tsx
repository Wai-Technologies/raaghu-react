import React from 'react';
import './rds-form-control.scss';
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
  inputSize?: 'small' | 'medium';
}

const RdsFormControl: React.FC<RdsFormControlProps> = ({
  label,
  helperText,
  children,
  isRequired = false,
  isGroup = false,
  required,
  error,
  inputSize = 'small',
  ...props
}) => {
  const isRequiredProp = required !== undefined ? required : isRequired;

  const content = isGroup ? (
    <MuiFormGroup>{children}</MuiFormGroup>
  ) : (
    children
  );

  return (
    <MuiFormControl required={isRequiredProp} error={error} size={inputSize} {...props} className={`rds-form-control ${props.className ?? ''}`}>
      {label && (
        <MuiFormLabel required={isRequiredProp} className="rds-form-control__label">
          {label}
        </MuiFormLabel>
      )}
      {content}
      {helperText && <MuiFormHelperText>{helperText}</MuiFormHelperText>}
    </MuiFormControl>
  );
};
RdsFormControl.displayName = 'RdsFormControl';
export default RdsFormControl;
