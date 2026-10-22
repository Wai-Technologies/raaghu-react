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
import "./rds-text-area.scss";
export { TextareaState, TextareaStyle } from './rds-text-area-types';
import { TextareaState, TextareaStyle } from './rds-text-area-types';
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
  /** Figma state. Accepts the `TextareaState` enum or its string value (e.g. `"Disabled"`). */
  state?: TextareaState | `${TextareaState}`;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: TextareaStyle | `${TextareaStyle}` | CSSProperties;
  /** @deprecated Omit `label` to hide the label. */
  showTitle?: boolean;
  /** Forces the error appearance (same as `state="Error"`). */
  error?: boolean;
  /** Text shown under the field when it is in error. */
  helperText?: string;
  /** Style variant. Accepts the `TextareaStyle` enum or its string value (e.g. `"Pill"`). */
  variant?: TextareaStyle | `${TextareaStyle}`;
  /** Marks the field required: shows the asterisk and the empty-value error. */
  required?: boolean;
  /** @deprecated Use `required` instead. */
  isMandatory?: boolean;
  /** Disables the textarea (same as `state="Disabled"`). */
  disabled?: boolean;
  /** Class name for the root container. Use `customClasses` for the textarea element. */
  className?: string;
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
  state,
  style,
  variant,
  error,
  helperText,
  showTitle,
  required,
  isMandatory: isMandatoryProp,
  disabled,
  className,
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
  const [currentState, setCurrentState] = useState(state || TextareaState.Default);
  const [prevReset, setPrevReset] = useState(Boolean(resetProp));
  const [prevState, setPrevState] = useState(state);
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

  const propState = state || TextareaState.Default;
  if (propState !== prevState) {
    setPrevState(propState);
    setCurrentState(propState);
  }

  if (value !== prevValue || isMandatory !== prevMandatory) {
    setPrevValue(value);
    setPrevMandatory(isMandatory);
    if (isMandatory) {
      setIsMandatoryValid((value || '').trim().length > 0);
    } else {
      setIsMandatoryValid(true);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (isMandatory) {
      setIsMandatoryValid(inputValue.trim().length > 0);
    }

    if (validationPattern) {
      const urlPattern = validationPattern;
      const urlValid = isMultiLine
        ? inputValue.split("\n").every((url) => urlPattern.test(url))
        : urlPattern.test(inputValue);

      setIsValid(urlValid);
    }

    onChange?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (currentState !== TextareaState.Disabled && currentState !== TextareaState.Error) {
      setCurrentState(TextareaState.Active);
    }
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (isMandatory) {
      setIsMandatoryValid(inputValue.trim().length > 0);
    }

    if (currentState === TextareaState.Active) {
      setCurrentState(inputValue ? TextareaState.Selected : TextareaState.Default);
    }
    onBlur?.(e);
  };

  const getStateClass = () => {
    switch (effectiveState) {
      case TextareaState.Active:
        return "textarea-active";
      case TextareaState.Selected:
        return "textarea-selected";
      case TextareaState.Error:
        return "textarea-error";
      case TextareaState.Disabled:
        return "textarea-disabled";
      default:
        return "textarea-default";
    }
  };

  const getStyleClass = () => {
    switch (resolvedVariant) {
      case TextareaStyle.Pill:
        return "textarea-pill";
      case TextareaStyle.BottomOutline:
        return "textarea-bottom-outline";
      default:
        return "textarea-style-default";
    }
  };

  const effectiveState = disabled ? TextareaState.Disabled : error ? TextareaState.Error : currentState;
  const isDisabled = effectiveState === TextareaState.Disabled;
  const isError = effectiveState === TextareaState.Error || !isValid || (isMandatory && !isMandatoryValid);

  const getValidationMessage = () => {
    if (isMandatory && !isMandatoryValid) {
      return `${label || 'Label'} is required`;
    }
    return helperText ?? validationMsg;
  };

  return (
    <div className={clsx('rds-textarea-container', className)} style={typeof style === 'object' ? style : undefined}>
      {showTitle !== false && label && (
        <label htmlFor={assignedId} className={`textarea-label ${isDisabled ? 'disabled' : ''}`}>
          {label}
          {isMandatory && <span className="required-asterisk"> *</span>}
        </label>
      )}
      
      <div
        className={clsx(
          'textarea-wrapper',
          resolvedVariant === TextareaStyle.Pill && 'textarea-pill-wrapper',
          resolvedVariant === TextareaStyle.Pill && getStateClass()
        )}
      >
        <textarea
          {...rest}
          ref={ref}
          id={assignedId}
          className={clsx('rds-textarea', getStateClass(), getStyleClass(), customClasses)}
          disabled={isDisabled}
          rows={rows || 4}
          placeholder={placeholder}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
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
    </div>
  );
};

RdsTextArea.displayName = 'RdsTextArea';
export default RdsTextArea;