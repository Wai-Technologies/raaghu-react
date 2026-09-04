import React from 'react';
import { TextField as MuiTextField, type TextFieldProps } from '@mui/material';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import clsx from 'clsx';
import './rds-text-field.scss';

export interface RdsTextFieldProps extends Omit<TextFieldProps, 'required' | 'component'> {
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
  FormHelperTextProps: legacyFormHelperTextProps,
  slotProps: consumerSlotProps,
  ...props
}: RdsTextFieldProps) => {
  const rootClassName = clsx('rds-text-field', className);
  const consumerFormHelperTextProps =
    typeof consumerSlotProps?.formHelperText === 'object' && consumerSlotProps?.formHelperText !== null
      ? (consumerSlotProps.formHelperText as FormHelperTextProps)
      : undefined;

  const formHelperTextSlotProps: FormHelperTextProps = {
    ...legacyFormHelperTextProps,
    ...consumerFormHelperTextProps,
    className: clsx(
      'rds-text-field__helper-text',
      legacyFormHelperTextProps?.className,
      consumerFormHelperTextProps?.className,
    ),
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
      slotProps={{
        ...consumerSlotProps,
        formHelperText: formHelperTextSlotProps,
      }}
      {...fieldProps}
      {...props}
      className={rootClassName}
    />
  );
};
RdsTextField.displayName = 'RdsTextField';
export default RdsTextField;
