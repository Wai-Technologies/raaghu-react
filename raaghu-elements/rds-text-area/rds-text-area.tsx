import {
  useId,
  useState,
  type ReactNode,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  type TextareaHTMLAttributes,
} from "react";
import clsx from 'clsx';
import type { SxProps, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
import "./rds-text-area.scss";
export type { TextareaStyle } from './rds-text-area-types';
import type { TextareaStyle } from './rds-text-area-types';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

type NativeTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'style' | 'value' | 'defaultValue' | 'onChange' | 'onClick' | 'onKeyDown' | 'onFocus' | 'onBlur'
>;

/**
 * Multi-line text input with a label, required check and optional pattern validation.
 * Other native `<textarea>` attributes (`name`, `maxLength`, `aria-*`, ...) are passed to the textarea.
 */
export interface RdsTextAreaProps extends NativeTextareaProps {
  rows?: number;
  label?: string;
  placeholder?: string;
  value?: string;
  /** Initial value when `value` is not controlled. */
  defaultValue?: string;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: TextareaStyle | CSSProperties;
  /** @deprecated Omit `label` to hide the label. */
  showTitle?: boolean;
  /** Forces the error appearance. */
  error?: boolean;
  /** Applies the selected appearance. */
  selected?: boolean;
  /** Text shown under the field when it is in error. */
  helperText?: string;
  /** Style variant. */
  variant?: TextareaStyle;
  /** Marks the field required: shows the asterisk and the empty-value error. */
  required?: boolean;
  /** @deprecated Use `required` instead. */
  isMandatory?: boolean;
  /** Disables the textarea. */
  disabled?: boolean;
  /** Class name for the root container. Use `customClasses` for the textarea element. */
  className?: string;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLTextAreaElement>;
  id?: string;
  /** @deprecated Use `data-testid` instead. */
  dataTestId?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: MouseEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  /** @deprecated Remount with a new `key` instead. */
  reset?: boolean;
  validationPattern?: RegExp;
  /** @deprecated Use `helperText` instead. */
  validationMsg?: string;
  /** Validates each line against `validationPattern` separately. */
  multiUrl?: boolean;
  /** @deprecated Use `multiUrl` instead. */
  isMultiUrl?: boolean;
  customClasses?: string;
}

const RdsTextArea = ({
  rows,
  label,
  placeholder,
  value,
  defaultValue,
  style,
  variant,
  error,
  selected = false,
  helperText,
  showTitle,
  required,
  isMandatory: isMandatoryProp,
  disabled,
  className,
  sx,
  ref,
  id,
  dataTestId,
  onChange,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
  reset: resetProp,
  validationPattern,
  validationMsg,
  multiUrl,
  isMultiUrl,
  customClasses,
  ...rest
}: RdsTextAreaProps): ReactNode => {
  if (showTitle !== undefined) warnDeprecatedProp('RdsTextArea', 'showTitle', 'omitting `label`');
  if (dataTestId !== undefined) warnDeprecatedProp('RdsTextArea', 'dataTestId', '`data-testid`');
  if (resetProp !== undefined) warnDeprecatedProp('RdsTextArea', 'reset', 'a new `key`');
  if (validationMsg !== undefined) warnDeprecatedProp('RdsTextArea', 'validationMsg', '`helperText`');
  if (isMultiUrl !== undefined) warnDeprecatedProp('RdsTextArea', 'isMultiUrl', '`multiUrl`');
  const isMultiLine = multiUrl ?? isMultiUrl;
  const legacyVariant = typeof style === 'string' ? style : undefined;
  if (legacyVariant !== undefined) warnDeprecatedProp('RdsTextArea', 'style', '`variant`');
  const resolvedVariant = variant ?? legacyVariant;
  if (isMandatoryProp !== undefined) warnDeprecatedProp('RdsTextArea', 'isMandatory', '`required`');
  const isMandatory = required ?? isMandatoryProp;
  const [isValid, setIsValid] = useState(true);
  const [isMandatoryValid, setIsMandatoryValid] = useState(
    !isMandatory || (value ?? defaultValue ?? '').trim().length > 0
  );
  const [prevReset, setPrevReset] = useState(Boolean(resetProp));
  const [prevValue, setPrevValue] = useState(value);
  const [prevMandatory, setPrevMandatory] = useState(isMandatory);
  const reactId = useId();
  const generatedId = `rds-textarea-${reactId}`;
  const assignedId = id || generatedId;
  const errorId = `${assignedId}-error`;

  const reset = Boolean(resetProp);
  if (reset !== prevReset) {
    if (reset) {
      setIsValid(true);
      setIsMandatoryValid(true);
    }
    setPrevReset(reset);
  }

  if (value !== prevValue || isMandatory !== prevMandatory) {
    setPrevValue(value);
    setPrevMandatory(isMandatory);
    setIsMandatoryValid(!isMandatory || (value || '').trim().length > 0);
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (isMandatory) {
      setIsMandatoryValid(inputValue.trim().length > 0);
    }

    if (validationPattern) {
      setIsValid(
        isMultiLine
          ? inputValue.split("\n").every((url) => validationPattern.test(url))
          : validationPattern.test(inputValue)
      );
    }

    onChange?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (isMandatory) {
      setIsMandatoryValid(inputValue.trim().length > 0);
    }

    onBlur?.(e);
  };

  const getStyleClass = () => {
    switch (resolvedVariant) {
      case 'Pill':
        return "textarea-pill";
      case 'Bottom Outline':
        return "textarea-bottom-outline";
      default:
        return "textarea-style-default";
    }
  };

  const isDisabled = Boolean(disabled);
  const isError = Boolean(error) || !isValid || (isMandatory && !isMandatoryValid);
  const stateClass = clsx(
    isError && 'textarea-error',
    isDisabled && 'textarea-disabled',
    selected && 'textarea-selected'
  );

  const getValidationMessage = () => {
    if (isMandatory && !isMandatoryValid) {
      return `${label || 'Label'} is required`;
    }
    return helperText ?? validationMsg;
  };

  return (
    <Box
      className={clsx('rds-textarea-container', className)}
      sx={sx}
      style={typeof style === 'object' ? style : undefined}
    >
      {showTitle !== false && label && (
        <label htmlFor={assignedId} className={`textarea-label ${isDisabled ? 'disabled' : ''}`}>
          {label}
          {isMandatory && <span className="required-asterisk"> *</span>}
        </label>
      )}
      
      <div
        className={clsx(
          'textarea-wrapper',
          resolvedVariant === 'Pill' && 'textarea-pill-wrapper',
          resolvedVariant === 'Pill' && stateClass
        )}
      >
        <textarea
          {...rest}
          ref={ref}
          id={assignedId}
          className={clsx('rds-textarea', stateClass, getStyleClass(), customClasses)}
          disabled={isDisabled}
          rows={rows || 4}
          placeholder={placeholder ?? ' '}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={handleBlur}
          {...(dataTestId !== undefined && { 'data-testid': dataTestId })}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={handleChange}
          aria-invalid={isError}
          aria-required={isMandatory ? true : undefined}
          aria-describedby={isError ? errorId : undefined}
        />
      </div>
      
      {isError && getValidationMessage() && (
        <div id={errorId} className="error-message">{getValidationMessage()}</div>
      )}
    </Box>
  );
};

RdsTextArea.displayName = 'RdsTextArea';
export default RdsTextArea;