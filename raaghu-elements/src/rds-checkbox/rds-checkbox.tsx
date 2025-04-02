import React, { useState, useEffect, useRef, Fragment } from "react";
//import "./rds-checkbox.css";
import "../../../raaghu-react-themes/src/styles/checkbox.scss";

export enum CheckboxStyle {
  Square = "Square",
  Circular = "Circular"
}

export enum CheckboxStatus {
  Checked = "checked",
  Unchecked = "unchecked",
  Indeterminate = "indeterminate"
}

export enum CheckboxState {
  Default = "Default",
  Disabled = "Disabled",
  Hover = "Hover"
}

export enum LabelPosition {
  Left = "left",
  Right = "right"
}

export interface RdsCheckboxProps {
  labelText?: string;
  labelClass?: string;
  checked?: boolean;
  isDisabled?: boolean;
  classes?: string;
  isSwitch?: boolean;
  showText?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CheckboxStyle;
  status?: CheckboxStatus;
  state?: CheckboxState;
  id?: string;
  dataTestId?: string;
  isInputGroup?: boolean;
  choiceId?: any;
  labelPosition?: LabelPosition;
}

const RdsCheckbox: React.FC<RdsCheckboxProps> = (props) => {
  const [check, setCheck] = useState(props.checked);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCheck(props.checked);
  }, [props.checked]);

  const classes = () => {
    let classes: string = "form-check";
    if (props.isSwitch !== true) {
      classes = "form-check mb-1 d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-block";
    } else {
      classes = "form-switch";
    }
    if (props.isInputGroup === true) {
      classes = "input-group-text";
    }
    if (props.status === "indeterminate") {
      classes = "ps-0 d-flex";
    }
    if (props.state === "Hover") {
      classes += " hover";
    }
    return classes;
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheck = event.target.checked;
    setCheck(newCheck);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const renderLabel = () => (
    props.showText === false ? (
      <></>
    ) : (
      <label className={`form-check-label ps-2 ${props.labelClass}`} htmlFor={`${props.id}${props.labelText}`}>
        {props.labelText}
      </label>
    )
  );

  return (
    <>
      {props.style === "Circular" && props.status !== "indeterminate" ? (
        <Fragment>
          <div>
            <div className={`rds-checkbox ${classes()}`}>
              <input
                type="checkbox"
                className={
                  props.status === "unchecked"
                    ? "form-check-input form-check-input-error form-check-input-type-circular"
                    : "form-check-input form-check-input-type-circular"
                }
                value={props.checked ? "true" : "false"}
                disabled={props.state === "Disabled" || props.isDisabled}
                checked={props.status === "unchecked" ? false : check}
                id={`${props.id}${props.labelText}`}
                name={props.id}
                onChange={handleCheckboxChange}
                data-testid={props.dataTestId}
                ref={ref}
              />
              {renderLabel()}
            </div>
          </div>
        </Fragment>
      ) : props.style === "Circular" && props.status === "indeterminate" ? (
        <Fragment>
          <div>
            <div className={`rds-checkbox ${classes()}`}>
              <span className="form-check-input-type-circular-indeterminate">
                <input
                  type="checkbox"
                  className="form-check-input form-check-input-intermediate form-check-input-type-circular"
                  value={props.checked ? "true" : "false"}
                  disabled={props.state === "Disabled" || props.isDisabled}
                  checked={check}
                  id={`${props.id}${props.labelText}`}
                  name={props.id}
                  onChange={handleCheckboxChange}
                  data-testid={props.dataTestId}
                  ref={ref}
                />
              </span>
              {renderLabel()}
            </div>
          </div>
        </Fragment>
      ) : props.style === "Square" && props.status === "indeterminate" ? (
        <Fragment>
          <div>
            <div className={`rds-checkbox ${classes()}`}>
              <span className="form-check-input-type-square-indeterminate">
                <input
                  type="checkbox"
                  className="form-check-input form-check-input-intermediate"
                  value={props.checked ? "true" : "false"}
                  disabled={props.state === "Disabled" || props.isDisabled}
                  checked={check}
                  id={`${props.id}${props.labelText}`}
                  name={props.id}
                  onChange={handleCheckboxChange}
                  data-testid={props.dataTestId}
                  ref={ref}
                />
              </span>
              {renderLabel()}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div>
            <div className={`rds-checkbox ${classes()}`}>
              <input
                type="checkbox"
                className={
                  props.status === "indeterminate"
                    ? "form-check-input form-check-input-intermediate"
                    : props.status === "unchecked"
                    ? "form-check-input form-check-input-error"
                    : "form-check-input"
                }
                value={props.checked ? "true" : "false"}
                disabled={props.state === "Disabled" || props.isDisabled}
                checked={props.status === "unchecked" ? false : check}
                id={`${props.id}${props.labelText}`}
                name={props.id}
                onChange={handleCheckboxChange}
                data-testid={props.dataTestId}
                ref={ref}
              />
              {renderLabel()}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default RdsCheckbox;