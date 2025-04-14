import React, { useEffect, useRef, useState } from "react";
import "./rds-input.css";
import RdsIcon from "../rds-icon";
import Tooltip, { TooltipStyle } from "../rds-tooltip/rds-tooltip";
import { useTranslation } from "react-i18next";

export enum InputSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum TooltipPlacement {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
}

export enum LabelPosition {
  Top = "top",
  Bottom = "bottom",
  Floating = "floating",
  Right = "right",
  Left = "left",
}

export interface RdsInputProps {
  size?: InputSize; // Size of the input field
  isDisabled?: boolean; // Whether the input field is disabled
  readonly?: boolean; // Whether the input field is read-only
  value?: string; // Value of the input field
  inputType?: string; // Type of the input field (e.g., text, password, number)
  state?: string; // State of the input field (e.g., default, active, selected, error, disabled)
  style?: string; // Style of the input field (e.g., Default, Bottom Outline, Pill)
  showTitle?: boolean; // Whether to show the title/label of the input field
  validatonPattern?: RegExp; // Regular expression pattern for validation
  validationMsg?: string; // Validation message to display
  placeholder?: string; // Placeholder text for the input field
  autoFocus?: [boolean, number]; // Whether to auto-focus the input field and the delay in milliseconds
  singleDigit?: boolean; // Whether the input field is for single digit input
  ref?: any; // Reference to the input field
  labelPosition?: LabelPosition; // Position of the label (e.g., top, bottom, floating, right, left)
  name: string; // Name attribute of the input field
  label?: boolean; // Whether to show the label
  id?: string; // ID attribute of the input field
  required?: boolean; // Whether the input field is required
  dataTestId?: string; // Data test ID for testing purposes
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any; // Change event handler
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any; // Focus event handler
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any; // Blur event handler
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void; // Click event handler
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>; // Key down event handler
  customClasses?: string; // Custom CSS classes for the input field
  formName?: string; // Name of the form the input field belongs to
  reset?: boolean; // Whether to reset the input field
  fontWeight?: string; // Font weight of the input field text
  minLength?: number; // Minimum length of the input field value
  maxLength?: number; // Maximum length of the input field value
  minValue?: number; // Minimum value for the input field (for numeric inputs)
  maxValue?: number; // Maximum value for the input field (for numeric inputs)
  showIcon?: boolean; // Whether to show an icon in the input field
  HintText?: string; // Hint text to display below the input field
  ShowHintText?: boolean; // Whether to show the hint text
  tooltipPlacement?: TooltipPlacement; // Placement of the tooltip
  tooltipTitle?: string; // Title of the tooltip
  isValidConfirmPass?: boolean; // Whether the confirm password is valid
  className?: string; // Additional CSS classes for the input field
}

const RdsInput = React.forwardRef<HTMLInputElement, RdsInputProps>(
  (props, ref) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(props.value);
    const [errorRegardingLengthOrValue, setErrorRegardingLengthOrValue] =
      useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      setValue(props.value ?? "");
    }, [props.value]);

    useEffect(() => { 
      if(props?.name == "curNewPass" || props?.name == "newPass")
      props.isValidConfirmPass ? setIsValid(true) : setIsValid(false);
    });

    const formatCardNumber = (inputValue: string) => {
      inputValue = inputValue.replace(/\D/g, '');
      return inputValue.replace(/(\d{4})/g, '$1 ').trim();
    };

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      setIsTouch(true);
      props.onChange && props.onChange(e);
      setHasError(!inputValue);

      if (props.inputType === "card number") {
        inputValue = formatCardNumber(inputValue);
      }

      if (props.inputType === "phone number") {
        inputValue = inputValue.replace(/[^\d+]/g, '');
        if (inputValue.includes('+')) {
          inputValue = '+' + inputValue.replace(/\+/g, ''); // Keep only the first '+' at the start
        }
        if (inputValue.startsWith('+')) {
          inputValue = '+' + inputValue.substring(1, 13); // Include '+' and up to 12 digits
        } else {
          inputValue = inputValue.substring(0, 12); // No '+' case, limit to 12 digits
        }
      }

      if (props.inputType === "otp") {
        inputValue = inputValue.replace(/\D/g, '');
        inputValue = inputValue.substring(0, 6);
      }

      if (props.validatonPattern && inputValue) {
        const urlPattern = props.validatonPattern;
        setIsValid(urlPattern.test(inputValue));
      } else {
        setIsValid(true);
      }

      const valueLength = inputValue.replace(/\s/g, '').length; // Exclude spaces from length

      if (inputValue) {
        if (valueLength < (props.minLength || 0)) {
          setErrorRegardingLengthOrValue(
            `This field must be a string or array type with a minimum length of ${props.minLength}.`
          );
        } else if (valueLength > (props.maxLength || Infinity)) {
          setErrorRegardingLengthOrValue(
            `This field must be a string or array type with a maximum length of ${props.maxLength}.`
          );
        } else {
          setErrorRegardingLengthOrValue("");
        }

        const numInputValue = Number(inputValue.replace(/\s/g, ''));

        if (props.minValue !== undefined && numInputValue < props.minValue) {
          setErrorRegardingLengthOrValue(
            `Value should be greater than ${props.minValue}`
          );
        } else if (props.maxValue !== undefined && numInputValue > props.maxValue) {
          setErrorRegardingLengthOrValue(
            `Value cannot be more than ${props.maxValue}`
          );
        } else {
          setErrorRegardingLengthOrValue("");
        }
      } else {
        setErrorRegardingLengthOrValue("");
      }

      setValue(inputValue);
    };
    let size: "sm" | "lg" | "md";

    if (props.size === InputSize.Small) {
      size = "sm";
    } else if (props.size === InputSize.Large) {
      size = "lg";
    } else {
      size = "md";
    }

    const borderColorClass = 
      (props.state === "active" ? " inputOutlineActive " : "  ") +
      (props.state === "selected" ? " inputOutlineSelected " : " ") +
      (props.state === "error" ? " inputOutlineError " : "  ") +
      (props.state === "default" ? " inputOutline " : "  ") +
      (props.state === "disabled" ? " inputDisabled" : " ");

    const inputClasses =
      "form-control mt-1 form-control-" +
      size +
      " flex-grow-1 " +
      (props.customClasses ? props.customClasses : "") +
      (props.state === "active" ? " inputActive" : "") +
      (props.state === "selected" ? " inputSelected" : "") +
      (props.state === "error" ? " inputError" : "") +
      (props.style === "Bottom Outline" ? borderColorClass : "") +
      (props.style === "Pill" ? " rounded-5" : " rounded ") +
      (props.state === "disabled" ? " inputDisabled" : " ");

    const getClassNames = () => {
      let defaultClasses: string = "input-group mb-0";
      if (props.labelPosition === LabelPosition.Floating) {
        defaultClasses = "form-floating";
      }
      return defaultClasses;
    };

    const labelClass = () => {
      let labelPositionClass: string = "";
      if (props.labelPosition === LabelPosition.Bottom) {
        labelPositionClass = " d-flex flex-column-reverse";
      }
      if (props.labelPosition === LabelPosition.Left) {
        labelPositionClass = " d-flex align-items-center gap-2";
      }
      if (props.labelPosition === LabelPosition.Right) {
        labelPositionClass =
          " d-flex align-items-center gap-2 flex-row-reverse";
      }
      if (props.labelPosition === LabelPosition.Floating) {
        labelPositionClass = "";
      }
      return labelPositionClass;
    };

    const fontWeight = "fw-" + props.fontWeight;

    const getPlaceholder = () => {
      switch (props.inputType) {
        case "phone number":
          return "Add Phone Number";
        case "card number":
          return "Add Card Number";
        case "otp":
          return "";
        case "number":
          return "Enter Number";
        case "password":
          return "Enter Password";
        case "email":
          return "Enter Email";
        case "text":
          return "Enter Text";
        default:
          return "Enter value";
      }
    };

    const isNumberPlaceholder = getPlaceholder() === "Enter Number";

    return (
      <>
        <div className={` ${props.id == "passwordfield" ? "":"mb-2"} ${labelClass()} position-relative`}>
        {props.showTitle && (
    <label
        id="labelText"
        htmlFor={props.id}
        className={`text-capitalize ${fontWeight} ${props.id === 'address-input' ? '' : 'mt-2'}`}
    >
        {props.label ? props.name : ''}
        {(props.required || props.validatonPattern) && (
            <span className="text-danger ms-1">*</span>
        )}
    </label>
)}
          <div className="mb-0">
            {props.tooltipTitle ? (
              <Tooltip label={props.tooltipTitle} style={TooltipStyle.MiddleBottomArrow}>
                <input
            type={props.inputType === "password" && !showPassword ? "password" : props.inputType}
            className={`${inputClasses} ${borderColorClass}`}
                  id={props.id}
                  placeholder={props.placeholder || getPlaceholder()}
                  required={props.required ?? false}
                  onFocus={props.onFocus}
                  onBlur={props.onBlur}
                  onKeyDown={props.onKeyDown}
                  value={value ?? ""}
                  onChange={handlerChange}
                  disabled={props.isDisabled}
                  readOnly={props.readonly}
                  data-testid={props.dataTestId}
                  onClick={props.onClick}
                  ref={ref}
                />
              </Tooltip>
            ) : (
          <input
                  type={
                    props.inputType === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : props.inputType
                  }
                  minLength={props.minLength}
                  maxLength={props.maxLength}
                  className={inputClasses}
            id={props.id}
                placeholder={props.placeholder || getPlaceholder()}
            required={props.required ?? false}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
                onKeyDown={props.onKeyDown}
            value={value ?? ""}
            onChange={handlerChange}
            disabled={props.isDisabled}
            readOnly={props.readonly}
            data-testid={props.dataTestId}
            onClick={props.onClick}
            ref={ref}
          />
            )}
          
          </div>
          <div className="validation-position">
              <div className="col-12">
                {props.required && value !== "" && props.validationMsg && !isValid && (
                  <div className="form-control-feedback">
                    <span className="text-danger">{props.validationMsg}</span>
                  </div>
                )}
                {errorRegardingLengthOrValue && (
                  <div className="form-control-feedback">
                    <span className="text-danger">
                      {errorRegardingLengthOrValue}{" "}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {hasError && isTouch && props.required && value === "" && (
              <div className="form-control-feedback validation-position">
                <span className="text-danger">
                  {props.name} {t("is required")}
                </span>
              </div>
            )}
          {/* Error Messages */}
          
          {props.inputType === "password" && props.showIcon ? (
            <RdsIcon
              name={showPassword ? "eye" : "eye_slash"}
              classes="password-toggle mysettingspage pt-3"
              height="16px"
              width="16px"
              id={"iconPassword" + props.labelPosition}
              fill={false}
              stroke={true}
              opacity="0.5"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            props.showIcon && (
              <RdsIcon
                name="information"
                classes={`password-toggle mt-4 ${isNumberPlaceholder ? "number-placeholder-style" : "" }`}
                height="16px"
                width="16px"
                id={"icon" + props.labelPosition}
                fill={false}
                stroke={true}
                opacity="0.5"
              />
            )
          )}
        </div>
        {props.ShowHintText && props.HintText && (
          <div className={`d-flex justify-content-start text-muted`}>
            {props.HintText}
          </div>
        )}
      </>
    );
  }
);

RdsInput.defaultProps = {
  showTitle: true,
  required: false,
};

export default RdsInput;