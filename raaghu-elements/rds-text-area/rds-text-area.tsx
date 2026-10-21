
import {
  useId,
  useState,
  type ReactNode,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  type TextareaHTMLAttributes,
} from "react";
import clsx from "clsx";
import "./rds-text-area.scss";
export { TextareaState, TextareaStyle } from "./rds-text-area-types";
import { TextareaState, TextareaStyle } from "./rds-text-area-types";

type NativeTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  | "style"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onClick"
  | "onKeyDown"
  | "onFocus"
  | "onBlur"
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
  /** Figma style variant. Accepts the `TextareaStyle` enum or its string value (e.g. `"Pill"`). */
  style?: TextareaStyle | `${TextareaStyle}`;
  showTitle?: boolean;
  /** Marks the field required: shows the asterisk and the empty-value error. */
  mandatory?: boolean;
  /** Disables the textarea (same as `state="Disabled"`). */
  disabled?: boolean;
  /** Class name for the root container. Use `customClasses` for the textarea element. */
  className?: string;
  ref?: Ref<HTMLTextAreaElement>;
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
  multiUrl?: boolean;
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
  showTitle,
  mandatory,
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
  customClasses,
  ...rest
}: RdsTextAreaProps): ReactNode => {
  const [isValid, setIsValid] = useState(true);
  const [isMandatoryValid, setIsMandatoryValid] = useState(
    !mandatory || (value ?? defaultValue ?? "").trim().length > 0
  );
  const [currentState, setCurrentState] = useState(
    state || TextareaState.Default
  );
  const [prevReset, setPrevReset] = useState(Boolean(resetProp));
  const [prevState, setPrevState] = useState(state);
  const [prevValue, setPrevValue] = useState(value);
  const [prevMandatory, setPrevMandatory] = useState(mandatory);

  // useId is stable across server and client renders.
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

  if (value !== prevValue || mandatory !== prevMandatory) {
    setPrevValue(value);
    setPrevMandatory(mandatory);

    if (mandatory) {
      setIsMandatoryValid((value || "").trim().length > 0);
    } else {
      setIsMandatoryValid(true);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (mandatory) {
      setIsMandatoryValid(inputValue.trim().length > 0);
    }

    if (validationPattern) {
      const urlPattern = validationPattern;
      const urlValid = multiUrl
        ? inputValue.split("\n").every((url) => urlPattern.test(url))
        : urlPattern.test(inputValue);

      setIsValid(urlValid);
    }

    onChange?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (
      currentState !== TextareaState.Disabled &&
      currentState !== TextareaState.Error
    ) {
      setCurrentState(TextareaState.Active);
    }

    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (mandatory) {
      setIsMandatoryValid(inputValue.trim().length > 0);
    }

    if (currentState === TextareaState.Active) {
      setCurrentState(
        inputValue ? TextareaState.Selected : TextareaState.Default
      );
    }

    onBlur?.(e);
  };

  const effectiveState = disabled
    ? TextareaState.Disabled
    : currentState;

  const isDisabled = effectiveState === TextareaState.Disabled;
  const isError =
    effectiveState === TextareaState.Error ||
    !isValid ||
    (mandatory && !isMandatoryValid);

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
    switch (style) {
      case TextareaStyle.Pill:
        return "textarea-pill";
      case TextareaStyle.BottomOutline:
        return "textarea-bottom-outline";
      default:
        return "textarea-style-default";
    }
  };

  const getValidationMessage = () => {
    if (mandatory && !isMandatoryValid) {
      return `${label || "Label"} is required`;
    }

    return validationMsg;
  };

  return (
    <div className={clsx("rds-textarea-container", className)}>
      {showTitle !== false && label && (
        <label
          htmlFor={assignedId}
          className={`textarea-label ${isDisabled ? "disabled" : ""}`}
        >
          {label}
          {mandatory && <span className="required-asterisk"> *</span>}
        </label>
      )}

      <div
        className={clsx(
          "textarea-wrapper",
          style === TextareaStyle.Pill && "textarea-pill-wrapper",
          style === TextareaStyle.Pill && getStateClass()
        )}
      >
        <textarea
          {...rest}
          ref={ref}
          id={assignedId}
          className={clsx(
            "rds-textarea",
            getStateClass(),
            getStyleClass(),
            customClasses
          )}
          disabled={isDisabled}
          rows={rows || 4}
          placeholder={placeholder}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(dataTestId !== undefined && {
            "data-testid": dataTestId,
          })}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={handleChange}
          aria-invalid={isError}
          aria-required={mandatory ? true : undefined}
          aria-describedby={isError ? errorId : undefined}
        />
      </div>

      {isError && getValidationMessage() && (
        <div id={errorId} className="error-message">
          {getValidationMessage()}
        </div>
      )}
    </div>
  );
};

RdsTextArea.displayName = "RdsTextArea";

export default RdsTextArea;
