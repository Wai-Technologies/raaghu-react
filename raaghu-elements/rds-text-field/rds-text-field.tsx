import { TextField as MuiTextField, type TextFieldProps } from '@mui/material';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-text-field.scss';

/** MUI `TextField` with Raaghu styling. `errorMessage` sets `error` and replaces `helperText`. */
export interface RdsTextFieldProps extends Omit<TextFieldProps, 'component'> {
  /** @deprecated Use `required` instead. */
  isRequired?: boolean;
  /** @deprecated Use `error` and `helperText` instead. */
  errorMessage?: string;
}

const RdsTextField = ({
  required,
  isRequired,
  errorMessage,
  error,
  helperText,
  defaultValue,
  className,
  FormHelperTextProps: legacyFormHelperTextProps,
  slotProps: consumerSlotProps,
  ...props
}: RdsTextFieldProps) => {
  if (isRequired !== undefined) warnDeprecatedProp('RdsTextField', 'isRequired', '`required`');
  if (errorMessage !== undefined) warnDeprecatedProp('RdsTextField', 'errorMessage', '`error` and `helperText`');
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

  const fieldProps = defaultValue !== undefined && props.value === undefined
    ? { defaultValue }
    : {};

  return (
    <MuiTextField
      error={error || !!errorMessage}
      helperText={errorMessage || helperText}
      required={required ?? isRequired ?? false}
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
