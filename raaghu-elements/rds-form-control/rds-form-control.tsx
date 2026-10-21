import { useId, type ReactNode } from 'react';
import clsx from 'clsx';
import './rds-form-control.scss';
import {
  FormControl as MuiFormControl,
  FormGroup as MuiFormGroup,
  FormHelperText as MuiFormHelperText,
  FormLabel as MuiFormLabel,
  type FormControlProps,
} from '@mui/material';

export interface RdsFormControlProps extends FormControlProps {
  label?: string;
  helperText?: string;
  children: ReactNode;
  group?: boolean;
}

const RdsFormControl = ({
  label,
  helperText,
  children,
  group = false,
  required = false,
  error,
  ...props
}: RdsFormControlProps) => {
  const generatedId = useId();
  const baseId = props.id ?? `rds-form-control-${generatedId}`;
  const labelId = `${baseId}-label`;
  const helperTextId = `${baseId}-helper-text`;

  const isFieldset = props.component === 'fieldset';
  const hasLabel = Boolean(label);

  const groupA11yProps =
    group && !isFieldset
      ? {
          ...(props.role === undefined ? { role: 'group' } : {}),
          ...(hasLabel &&
          props['aria-labelledby'] === undefined &&
          props['aria-label'] === undefined
            ? { 'aria-labelledby': labelId }
            : {}),
        }
      : {};

  const content = group ? (
    <MuiFormGroup>{children}</MuiFormGroup>
  ) : (
    children
  );

  return (
    <MuiFormControl
      required={required}
      error={error}
      {...groupA11yProps}
      {...props}
      className={clsx('rds-form-control', props.className)}
    >
      {label && (
        <MuiFormLabel
          className="rds-form-control__label"
          {...(isFieldset ? { component: 'legend' as const } : {})}
          {...(group ? { id: labelId } : {})}
        >
          {label}
        </MuiFormLabel>
      )}

      {content}

      {helperText && (
        <MuiFormHelperText id={helperTextId}>
          {helperText}
        </MuiFormHelperText>
      )}
    </MuiFormControl>
  );
};

RdsFormControl.displayName = 'RdsFormControl';

export default RdsFormControl;