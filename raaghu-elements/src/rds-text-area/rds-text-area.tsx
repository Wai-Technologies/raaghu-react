import React, { useEffect, useState } from "react";
import "./rds-text-area.css";
import { placements } from "../../libs";

export interface RdsTextAreaProps {
  rows?: number;
  readonly?: boolean;
  label?: string;
  placeholder: string;
  value?: string;
  isDisabled?: boolean;
  isMandatory?: boolean;
  id?: string;
  dataTestId?: string;
  isFloatingInputLabel?: boolean;
  tooltip?: boolean;
  tooltipPlacement?: placements;
  tooltipTitle?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  labelPosition?: "top" | "bottom";
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
  reset?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  validationPattern?: RegExp;
  validationMsg?: string;
  isMultiUrl?: boolean;
  state?: "Default" | "Active" | "Selected" | "Disabled" | "Error";
  style?: "Default" | "Bottom Outline" | "Pill";
  showTitle?: boolean;
  customClasses?: string;
}

const RdsTextArea: React.FC<RdsTextAreaProps> = (props) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (props.reset) setIsValid(true);
  }, [props.reset]);

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

  const getClassNames = () => {
    return props.isFloatingInputLabel ? "form-floating" : "mb-0";
  };

  const getStateClass = () => {
    switch (props.state) {
      case "Active":
        return " inputActive";
      case "Selected":
        return " inputSelected";
      case "Error":
        return " inputError";
      case "Disabled":
        return " inputDisabled";
      default:
        return " inputOutline";
    }
  };

  const getStyleClass = () => {
    switch (props.style) {
      case "Pill":
        return "rounded-4";
      case "Bottom Outline":
        return "bottom-outline";
      default:
        return "rounded";
    }
    // return props.style === "Pill" ? " rounded-5" : " rounded";

  };
  return (
    <div className="">
      {props.showTitle && (
        <label className={props.isDisabled ? " opacity-50 " : ""}>
          {props.label}
          {props.isMandatory && <span className="text-danger fs-6"> *</span>}
        </label>
      )}
      <div className={`${getClassNames()} `}>
        <textarea
          className={`form-control mt-1 ${getStateClass()} ${getStyleClass()} ${
            props.customClasses || ""
          }`}
          disabled={props.isDisabled || props.state === "Disabled"}
          rows={props.rows}
          readOnly={props.readonly}
          placeholder={props.placeholder}
          onClick={props.onClick}
          onKeyDown={props.onKeyDown}
          id={props.id}
          required={props.isMandatory}
          value={props.value}
          onChange={handleChange}
        />
        {props.isFloatingInputLabel && props.label && (
          <label
            htmlFor={props.id}
            className={` form-label ${props.isDisabled ? " opacity-50 " : ""}`}
          >
            {props.label}
          </label>
        )}
      </div>
      {props.labelPosition === "bottom" && (
        <label className="form-label mt-1">
          {props.label}
          {props.isMandatory && <span className="text-danger fs-6"> *</span>}
        </label>
      )}
      {!isValid && props.validationMsg && (
        <div className="text-danger">{props.validationMsg}</div>
      )}
    </div>
  );
};

export default RdsTextArea;
