import { type ReactNode } from 'react';
import clsx from 'clsx';
import './rds-form-control.scss';
import {
  FormControl as MuiFormControl,
  FormGroup as MuiFormGroup,
  FormHelperText as MuiFormHelperText,
  FormLabel as MuiFormLabel,
  type FormControlProps
} from '@mui/material';

export interface RdsFormControlProps extends Omit<FormControlProps, 'component' | 'required'> {
  label?: string;
  helperText?: string;
  children: ReactNode;
  isRequired?: boolean;
  isGroup?: boolean;
}

const RdsFormControl = ({
  label,
  helperText,
  children,
  isRequired = false,
  isGroup = false,
  error,
  ...props
}: RdsFormControlProps) => {
  const content = isGroup ? (
    <MuiFormGroup>{children}</MuiFormGroup>
  ) : (
    children
  );

  return (
    <MuiFormControl error={error} {...props} required={isRequired} className={clsx('rds-form-control', props.className)}>
      {label && (
        <MuiFormLabel required={isRequired} className="rds-form-control__label">
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
