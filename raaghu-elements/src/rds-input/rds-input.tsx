import React, { useEffect, useRef, useState } from "react";
import "./rds-input.css";
import RdsIcon from "../rds-icon";
import Tooltip from "../rds-tooltip/rds-tooltip";
import { useTranslation } from "react-i18next";

export interface RdsInputProps {
  size?: "small" | "large" | "medium" | string;
  isDisabled?: boolean;
  readonly?: boolean;
  value?: string;
  inputType?: string;
  state?: string;
  style?: string;
  showTitle?: boolean;
  validatonPattern?: RegExp;
  validationMsg?: string;
  placeholder?: string;
  autoFocus?: [boolean, number];
  singleDigit?: boolean;
  ref?: any;
  labelPosition?: string;
  name?: string;
  label?: string;
  id?: string;
  required?: boolean;
  dataTestId?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  customClasses?: string;
  formName?: string;
  reset?: boolean;
  fontWeight?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  showIcon?: boolean;
  HintText?: string;
  ShowHintText?: boolean;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  tooltipTitle?: string;
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

    if (props.size === "small") {
      size = "sm";
    } else if (props.size === "large") {
      size = "lg";
    } else {
      size = "md";
    }

    const borderColorClass =
      (props.state === "active" ? " inputOutlineActive " : "  ") +
      (props.state === "selected" ? " inputOutlineSelected " : " ") +
      (props.state === "error" ? " inputOutlineError " : "  ") +
      (props.state === "default" ? " inputOutline " : "  ");

    const inputClasses =
      "form-control mt-1 form-control-" +
      size +
      " flex-grow-1 " +
      (props.customClasses ? props.customClasses : "") +
      (props.state === "active" ? " inputActive" : "") +
      (props.state === "selected" ? " inputSelected" : "") +
      (props.state === "error" ? " inputError" : "") +
      (props.style === "Bottom Outline" ? borderColorClass : "") +
      (props.style === "Pill" ? " rounded-5" : " rounded ");

    const getClassNames = () => {
      let defaultClasses: string = "input-group mb-0";
      if (props.labelPosition === "floating") {
        defaultClasses = "form-floating";
      }
      return defaultClasses;
    };

    const labelClass = () => {
      let labelPositionClass: string = "";
      if (props.labelPosition === "bottom") {
        labelPositionClass = " d-flex flex-column-reverse";
      }
      if (props.labelPosition === "left") {
        labelPositionClass = " d-flex align-items-center gap-2";
      }
      if (props.labelPosition === "right") {
        labelPositionClass =
          " d-flex align-items-center gap-2 flex-row-reverse";
      }
      if (props.labelPosition === "floating") {
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

    return (
      <>
        <div className={` ${props.id == "passwordfield" ? "":"mb-2"} ${labelClass()} position-relative`}>
          {props.showTitle && (
            <label
            id="labelText"
              htmlFor={props.id}
              className={`text-capitalize mt-2 ${fontWeight}`}
            >
              {props.label}
              {(props.required || props.validatonPattern) && (
                <span className="text-danger ms-1">*</span>
              )}
            </label>
          )}
          <div className="mb-0 input-group">
            {props.tooltipTitle ? (
              <Tooltip text={props.tooltipTitle} place={props.tooltipPlacement}>
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
                  {props.label} {t("is required")}
                </span>
              </div>
            )}
          {/* Error Messages */}
          {props.inputType === "password" && props.showIcon ? (
            <RdsIcon
              name={showPassword ? "eye" : "eye_slash"}
              classes={"password-toggle mysettingspage"}
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
                classes="password-toggle"
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
      </>
    );
  }
);

RdsInput.defaultProps = {
  showTitle: true,
  required: false,
};

export default RdsInput;