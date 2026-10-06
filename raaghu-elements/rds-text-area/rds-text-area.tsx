import {
  useId,
  useRef,
  useState,
  type ReactNode,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import clsx from 'clsx';
import "./rds-text-area.scss";
export { TextareaState, TextareaStyle } from './rds-text-area-types';
import { TextareaState, TextareaStyle } from './rds-text-area-types';

export interface RdsTextAreaProps {
  rows?: number;
  label?: string;
  placeholder?: string;
  value?: string;
  state?: TextareaState;
  style?: TextareaStyle;
  showTitle?: boolean;
  isRequired?: boolean;
  id?: string;
  dataTestId?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: MouseEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  reset?: boolean;
  validationPattern?: RegExp;
  validationMsg?: string;
  isMultiUrl?: boolean;
  customClasses?: string;
}

const RdsTextArea = (props: RdsTextAreaProps): ReactNode => {
  const isRequired = Boolean(props.isRequired);
  const fieldId = useId();
  const assignedId = props.id || fieldId;
  const [isValid, setIsValid] = useState(true);
  const [hasValue, setHasValue] = useState(
    !isRequired || (props.value ?? '').trim().length > 0
  );
  const [currentState, setCurrentState] = useState(props.state || TextareaState.Default);
  const prevResetRef = useRef(Boolean(props.reset));
  const prevStateRef = useRef(props.state);
  const prevValueRef = useRef(props.value);
  const prevMandatoryRef = useRef(isRequired);
  const errorId = `${assignedId}-error`;

  const reset = Boolean(props.reset);
  if (reset !== prevResetRef.current) {
    if (reset) {
      setIsValid(true);
      setHasValue(true);
    }
    prevResetRef.current = reset;
  }

  const propState = props.state || TextareaState.Default;
  if (propState !== prevStateRef.current) {
    prevStateRef.current = propState;
    setCurrentState(propState);
  }

  if (props.value !== prevValueRef.current || isRequired !== prevMandatoryRef.current) {
    prevValueRef.current = props.value;
    prevMandatoryRef.current = isRequired;
    if (isRequired) {
      setHasValue((props.value || '').trim().length > 0);
    } else {
      setHasValue(true);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (isRequired) {
      setHasValue(inputValue.trim().length > 0);
    }

    if (props.validationPattern) {
      const urlPattern = props.validationPattern;
      const urlValid = props.isMultiUrl
        ? inputValue.split("\n").every((url) => urlPattern.test(url))
        : urlPattern.test(inputValue);

      setIsValid(urlValid);
    }

    props.onChange?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (currentState !== TextareaState.Disabled && currentState !== TextareaState.Error) {
      setCurrentState(TextareaState.Active);
    }
    props.onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (isRequired) {
      setHasValue(inputValue.trim().length > 0);
    }

    if (currentState === TextareaState.Active) {
      setCurrentState(inputValue ? TextareaState.Selected : TextareaState.Default);
    }
    props.onBlur?.(e);
  };

  const getStateClass = () => {
    switch (currentState) {
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
    switch (props.style) {
      case TextareaStyle.Pill:
        return "textarea-pill";
      case TextareaStyle.BottomOutline:
        return "textarea-bottom-outline";
      default:
        return "textarea-style-default";
    }
  };

  const isDisabled = currentState === TextareaState.Disabled;
  const isError = currentState === TextareaState.Error || !isValid || (isRequired && !hasValue);

  const getValidationMessage = () => {
    if (isRequired && !hasValue) {
      return `${props.label || 'Label'} is required`;
    }
    return props.validationMsg;
  };

  return (
    <div className="rds-textarea-container">
      {props.showTitle !== false && props.label && (
        <label htmlFor={assignedId} className={`textarea-label ${isDisabled ? 'disabled' : ''}`}>
          {props.label}
          {isRequired && <span className="required-asterisk"> *</span>}
        </label>
      )}
      
      <div
        className={clsx(
          'textarea-wrapper',
          props.style === TextareaStyle.Pill && 'textarea-pill-wrapper',
          props.style === TextareaStyle.Pill && getStateClass()
        )}
      >
        <textarea
          id={assignedId}
          className={clsx('rds-textarea', getStateClass(), getStyleClass(), props.customClasses)}
          disabled={isDisabled}
          rows={props.rows || 4}
          placeholder={props.placeholder}
          onClick={props.onClick}
          onKeyDown={props.onKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-testid={props.dataTestId}
          value={props.value}
          onChange={handleChange}
          aria-invalid={isError}
          aria-required={isRequired ? true : undefined}
          required={isRequired || undefined}
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