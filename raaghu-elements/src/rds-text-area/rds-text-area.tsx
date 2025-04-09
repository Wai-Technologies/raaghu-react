import React, { useEffect, useState } from "react";
import "./rds-text-area.css";
import { placements } from "../../libs";

export enum  TextareaStyle {
  Default = "Default",
  BottomOutline = "Bottom Outline",
  Pill = "Pill"
}
export enum TextareaState {
  Default = "Default",
  Active = "Active",
  Selected = "Selected",
  Disabled = "Disabled",
  Error = "Error"
}

export interface RdsTextAreaProps {
  rows?: number; //rows of text area
  readonly?: boolean; //readonly text area
  label?: string; //label of text area
  placeholder: string; //placeholder of text area
  value?: string; //value of text area
  isDisabled?: boolean; //disabled text area
  isMandatory?: boolean; //mandatory text area
  id?: string; //id of text area
  dataTestId?: string; //data test id of text area
  isFloatingInputLabel?: boolean; //floating label of text area
  tooltip?: boolean; //tooltip of text area
  tooltipPlacement?: placements; //tooltip placement of text area
  tooltipTitle?: string; //tooltip title of text area
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; //on change event of text area
  labelPosition?: "top" | "bottom"; //label position of text area
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void; //on click event of text area
  reset?: boolean; //reset text area
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void; //on key down event of text area
  validationPattern?: RegExp; //validation pattern of text area
  validationMsg?: string; //validation message of text area 
  isMultiUrl?: boolean; //is multi url of text area
  state?: TextareaState; //state of text area
  style?: TextareaStyle;  //style of text area
  showTitle?: boolean; //show title of text area
  customClasses?: string; //custom classes of text area
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
      case TextareaState.Active:
        return " inputActive";
      case TextareaState.Selected:
        return " inputSelected";
      case TextareaState.Error:
        return " inputError";
      case TextareaState.Disabled:
        return " inputDisabled";
      default:
        return "";
    }
  };

  const getStyleClass = () => {
    switch (props.style) {
      case TextareaStyle.Pill:
        return "rounded-4";
      case TextareaStyle.BottomOutline:
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
          disabled={props.isDisabled || props.state === TextareaState.Disabled}
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
        <div className="text-danger text-end">{props.validationMsg}</div>
      )}
    </div>
  );
};

export default RdsTextArea;
