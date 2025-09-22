import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import './rds-text-field.scss';

export interface RdsTextFieldProps extends Omit<TextFieldProps, 'required'> {
  isRequired?: boolean;
  errorMessage?: string;
}

const RdsTextField: React.FC<RdsTextFieldProps> = ({
  isRequired = false,
  errorMessage,
  error,
  helperText,
  ...props
}) => {
  const rootClassName = [
    'rds-text-field',
    props.className,
  ].filter(Boolean).join(' ');

  const mergedHelperTextProps = {
    ...props.FormHelperTextProps,
    className: [
      'rds-text-field__helper-text',
      props.FormHelperTextProps?.className,
    ].filter(Boolean).join(' '),
  };
  return (
    <MuiTextField
      error={error || !!errorMessage}
      helperText={errorMessage || helperText}
      required={isRequired}
      className={rootClassName}
      FormHelperTextProps={mergedHelperTextProps}
      {...props}
    />
  );
};
RdsTextField.displayName = 'RdsTextField';
export default RdsTextField;
