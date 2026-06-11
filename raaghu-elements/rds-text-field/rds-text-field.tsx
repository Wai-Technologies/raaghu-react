import React from 'react';
import { TextField as MuiTextField, type TextFieldProps } from '@mui/material';
import clsx from 'clsx';
import './rds-text-field.scss';

export interface RdsTextFieldProps extends Omit<TextFieldProps, 'required'> {
  isRequired?: boolean;
  errorMessage?: string;
}

const RdsTextField = ({
  isRequired = false,
  errorMessage,
  error,
  helperText,
  defaultValue,
  className,
  FormHelperTextProps: formHelperTextProps,
  ...props
}: RdsTextFieldProps) => {
  const rootClassName = clsx('rds-text-field', className);

  const mergedHelperTextProps = {
    ...formHelperTextProps,
    className: clsx('rds-text-field__helper-text', formHelperTextProps?.className),
  };
  
  // Handle defaultValue - only pass it if explicitly provided and no value prop is present
  // to prevent React warnings about controlled/uncontrolled components
  const fieldProps = defaultValue !== undefined && props.value === undefined
    ? { defaultValue } 
    : {};
    
  return (
    <MuiTextField
      error={error || !!errorMessage}
      helperText={errorMessage || helperText}
      required={isRequired}
      FormHelperTextProps={mergedHelperTextProps}
      {...fieldProps}
      {...props}
      className={rootClassName}
    />
  );
};
RdsTextField.displayName = 'RdsTextField';
export default RdsTextField;
