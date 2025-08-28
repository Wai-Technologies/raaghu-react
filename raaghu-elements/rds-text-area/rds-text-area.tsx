import React, { useEffect, useRef, useState } from "react";
import "./rds-text-area.scss";

export enum TextareaState {
  Default = "Default",
  Active = "Active", 
  Selected = "Selected",
  Disabled = "Disabled",
  Error = "Error"
}

export enum TextareaStyle {
  Default = "Default",
  Pill = "Pill",
  BottomOutline = "Bottom Outline"
}

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
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  reset?: boolean;
  validationPattern?: RegExp;
  validationMsg?: string;
  isMultiUrl?: boolean;
  customClasses?: string;
}

const RdsTextArea = (props: RdsTextAreaProps): JSX.Element => {
  const [isValid, setIsValid] = useState(true);
  const [currentState, setCurrentState] = useState(props.state || TextareaState.Default);
  // stable id for label/input association when id prop is not provided
  const idRef = useRef<string>(props.id || `rds-textarea-${Math.random().toString(36).slice(2)}`);
  const assignedId = props.id || idRef.current;
  const errorId = `${assignedId}-error`;

  useEffect(() => {
    if (props.reset) setIsValid(true);
  }, [props.reset]);

  useEffect(() => {
    setCurrentState(props.state || TextareaState.Default);
  }, [props.state]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (props.validationPattern) {
      const urlPattern = props.validationPattern;
      const urlValid = props.isMultiUrl
        ? inputValue.split("\n").every((url) => urlPattern.test(url))
        : urlPattern.test(inputValue);

      setIsValid(urlValid);
    }

    props.onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (currentState !== TextareaState.Disabled && currentState !== TextareaState.Error) {
      setCurrentState(TextareaState.Active);
    }
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (currentState === TextareaState.Active) {
      setCurrentState(props.value ? TextareaState.Selected : TextareaState.Default);
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
  const isError = currentState === TextareaState.Error || !isValid;

  return (
    <div className="rds-textarea-container">
      {props.showTitle !== false && props.label && (
        <label htmlFor={assignedId} className={`textarea-label ${isDisabled ? 'disabled' : ''}`}>
          {props.label}
          {props.isMandatory && <span className="required-asterisk"> *</span>}
        </label>
      )}
      
      <div className="textarea-wrapper">
        <textarea
          id={assignedId}
          className={`rds-textarea ${getStateClass()} ${getStyleClass()} ${props.customClasses || ""}`}
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
          aria-describedby={isError && props.validationMsg ? errorId : undefined}
        />
      </div>
      
      {isError && props.validationMsg && (
        <div id={errorId} className="error-message">{props.validationMsg}</div>
      )}
    </div>
  );
};

RdsTextArea.displayName = 'RdsTextArea';
export default RdsTextArea;