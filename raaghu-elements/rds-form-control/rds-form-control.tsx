import { Children, cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from 'react';
import clsx from 'clsx';
import './rds-form-control.scss';
import {
  FormControl as MuiFormControl,
  FormGroup as MuiFormGroup,
  FormHelperText as MuiFormHelperText,
  FormLabel as MuiFormLabel,
  type FormControlProps
} from '@mui/material';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export interface RdsFormControlProps extends FormControlProps {
  /** Label text shown above the control. */
  label?: string;
  /** Helper text shown below the control. */
  helperText?: string;
  children: ReactNode;
  /** @deprecated Use `required` instead. */
  isRequired?: boolean;
  /**
   * Wraps the children in a MUI `FormGroup` (checkbox/radio groups). The root gets
   * `role="group"` and is named by the label, unless `role`, `aria-label` or
   * `aria-labelledby` is passed, or `component="fieldset"` is used (the label then
   * renders as a `legend`).
   */
  group?: boolean;
  /** @deprecated Use `group` instead. */
  isGroup?: boolean;
  /**
   * Id of the labelled control. Used as the label `htmlFor` target and merged onto
   * a single child element when that child does not already set `id`.
   * Prefer setting the same `id` on the child input yourself for complex children.
   */
  controlId?: string;
}

function mergeDescribedBy(existing: unknown, helperTextId: string): string {
  const parts = typeof existing === 'string' ? existing.split(/\s+/).filter(Boolean) : [];
  if (!parts.includes(helperTextId)) parts.push(helperTextId);
  return parts.join(' ');
}

const RdsFormControl = ({
  label,
  helperText,
  children,
  isRequired,
  group,
  isGroup,
  required,
  error,
  controlId,
  ...props
}: RdsFormControlProps) => {
  if (isRequired !== undefined) warnDeprecatedProp('RdsFormControl', 'isRequired', '`required`');

  if (isGroup !== undefined) warnDeprecatedProp('RdsFormControl', 'isGroup', '`group`');
  const isGrouped = group ?? isGroup ?? false;
  const isRequiredProp = required ?? isRequired ?? false;

  const generatedId = useId();
  const baseId = props.id ?? `rds-form-control-${generatedId}`;
  const labelId = `${baseId}-label`;
  const helperTextId = `${baseId}-helper-text`;
  const resolvedControlId = controlId ?? `${baseId}-control`;

  const isFieldset = props.component === 'fieldset';
  const hasLabel = Boolean(label);
  const groupA11yProps =
    isGrouped && !isFieldset
      ? {
        ...(props.role === undefined ? { role: 'group' } : {}),
        ...(hasLabel && props['aria-labelledby'] === undefined && props['aria-label'] === undefined
          ? { 'aria-labelledby': labelId }
          : {}),
      }
      : {};

  let content: ReactNode = children;
  if (!isGrouped && isValidElement(children) && Children.count(children) === 1) {
    const child = children as ReactElement<Record<string, unknown>>;
    const childProps = child.props;
    const nextProps: Record<string, unknown> = {};
    if (childProps.id === undefined) {
      nextProps.id = resolvedControlId;
    }
    if (helperText) {
      nextProps['aria-describedby'] = mergeDescribedBy(childProps['aria-describedby'], helperTextId);
    }
    content = Object.keys(nextProps).length > 0 ? cloneElement(child, nextProps) : child;
  } else if (isGrouped) {
    content = <MuiFormGroup>{children}</MuiFormGroup>;
  }

  const childId = isValidElement(children)
    ? (children.props as { id?: string }).id
    : undefined;
  const canAssociateLabel =
    !isGrouped &&
    hasLabel &&
    (controlId !== undefined || childId !== undefined || Children.count(children) === 1);
  const controlHtmlFor = canAssociateLabel
    ? (controlId ?? childId ?? resolvedControlId)
    : undefined;

  return (
    <MuiFormControl
      required={isRequiredProp}
      error={error}
      {...groupA11yProps}
      {...props}
      className={clsx('rds-form-control', props.className)}
    >
      {label && (
        <MuiFormLabel
          className="rds-form-control__label"
          htmlFor={!isGrouped && !isFieldset ? controlHtmlFor : undefined}
          {...(isFieldset ? { component: 'legend' as const } : {})}
          {...(isGrouped ? { id: labelId } : {})}
        >
          {label}
        </MuiFormLabel>
      )}
      {content}
      {helperText && <MuiFormHelperText id={helperTextId}>{helperText}</MuiFormHelperText>}
    </MuiFormControl>
  );
};
RdsFormControl.displayName = 'RdsFormControl';
export default RdsFormControl;
