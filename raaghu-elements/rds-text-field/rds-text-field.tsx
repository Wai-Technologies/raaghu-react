
import { TextField as MuiTextField, type TextFieldProps } from '@mui/material';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import clsx from 'clsx';
import './rds-text-field.scss';

/** MUI `TextField` with Raaghu styling. `errorMessage` sets `error` and replaces `helperText`. */
export interface RdsTextFieldProps extends Omit<TextFieldProps, 'component'> {
  /** Shorthand for `error` plus `helperText`. */
  errorMessage?: string;
}

const RdsTextField = ({
  required,
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
    typeof consumerSlotProps?.formHelperText === 'object' &&
    consumerSlotProps?.formHelperText !== null
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

  // Pass defaultValue only when value is not provided.
  const fieldProps =
    defaultValue !== undefined && props.value === undefined
      ? { defaultValue }
      : {};

  return (
    <MuiTextField
      error={error || !!errorMessage}
      helperText={errorMessage || helperText}
      required={required ?? false}
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
