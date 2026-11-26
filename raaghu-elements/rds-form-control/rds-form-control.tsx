import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import './rds-form-control.scss';
import {
  FormControl as MuiFormControl,
  FormGroup as MuiFormGroup,
  FormHelperText as MuiFormHelperText,
  FormLabel as MuiFormLabel,
  type FormControlProps
} from '@mui/material';

export interface RdsFormControlProps extends Omit<FormControlProps, 'component'> {
  label?: string;
  helperText?: string;
  children: ReactNode;
  isRequired?: boolean;
  isGroup?: boolean;
}

const RdsFormControl = React.forwardRef<HTMLDivElement, RdsFormControlProps>(function RdsFormControl({
  label,
  helperText,
  children,
  isRequired = false,
  isGroup = false,
  required,
  error,
  ...props
}, ref) {
  const isRequiredProp = required !== undefined ? required : isRequired;

  const content = isGroup ? (
    <MuiFormGroup>{children}</MuiFormGroup>
  ) : (
    children
  );

  return (
    <MuiFormControl ref={ref} required={isRequiredProp} error={error} {...props} className={clsx('rds-form-control', props.className)}>
      {label && (
        <MuiFormLabel required={isRequiredProp} className="rds-form-control__label">
          {label}
        </MuiFormLabel>
      )}
      {content}
      {helperText && <MuiFormHelperText>{helperText}</MuiFormHelperText>}
    </MuiFormControl>
  );
});
RdsFormControl.displayName = 'RdsFormControl';
export default RdsFormControl;
