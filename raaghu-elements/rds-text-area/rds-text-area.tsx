import {
  useEffect,
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
  isMandatory?: boolean;
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
  const [isValid, setIsValid] = useState(true);
  const [isMandatoryValid, setIsMandatoryValid] = useState(
    !props.isMandatory || (props.value ?? '').trim().length > 0
  );
  const [currentState, setCurrentState] = useState(props.state || TextareaState.Default);
  const prevResetRef = useRef(Boolean(props.reset));
  const idRef = useRef<string>(props.id || `rds-textarea-${Math.random().toString(36).slice(2)}`);
  const assignedId = props.id || idRef.current;
  const errorId = `${assignedId}-error`;

  useEffect(() => {
    if (Boolean(props.reset) && !prevResetRef.current) {
      setIsValid(true);
      setIsMandatoryValid(true);
    }
    prevResetRef.current = Boolean(props.reset);
  }, [props.reset]);

  useEffect(() => {
    setCurrentState(props.state || TextareaState.Default);
  }, [props.state]);

  useEffect(() => {
    if (props.isMandatory) {
      const currentValue = props.value || '';
      setIsMandatoryValid(currentValue.trim().length > 0);
    } else {
      setIsMandatoryValid(true);
    }
  }, [props.isMandatory, props.value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (props.isMandatory) {
      setIsMandatoryValid(inputValue.trim().length > 0);
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
    if (props.isMandatory) {
      setIsMandatoryValid(inputValue.trim().length > 0);
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
  const isError = currentState === TextareaState.Error || !isValid || (props.isMandatory && !isMandatoryValid);

  const getValidationMessage = () => {
    if (props.isMandatory && !isMandatoryValid) {
      return `${props.label || 'Label'} is required`;
    }
    return props.validationMsg;
  };

  return (
    <div className="rds-textarea-container">
      {props.showTitle !== false && props.label && (
        <label htmlFor={assignedId} className={`textarea-label ${isDisabled ? 'disabled' : ''}`}>
          {props.label}
          {props.isMandatory && <span className="required-asterisk"> *</span>}
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
          aria-required={props.isMandatory ? true : undefined}
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