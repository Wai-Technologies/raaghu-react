/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import "../../../raaghu-react-themes/src/styles/toggle.scss";

export enum ToggleStyle {
  Style1 = "Style 1",
  Style2 = "Style 2",
  Style3 = "Style 3",
  Style4 = "Style 4",
  Style5 = "Style 5",
  Style6 = "Style 6",
}

export enum ToggleLayout {
  SwitchLabel = "Switch + Label",
  LabelSwitch = "Label + Switch",
  TopLabelSwitch = "Top Label + Switch",
  BottomLabelSwitch = "Bottom Label + Switch",
}

export enum ToggleState {
  On = "On",
  Off = "Off",
  DisabledOn = "Disabled On",
  DisabledOff = "Disabled Off",
}

export interface RdsToggleProps {
  onClick?: React.MouseEventHandler<HTMLInputElement>; // Click event for the toggle
  checked: boolean; // Checked/Unchecked state for the toggle
  style?: ToggleStyle; // Different styles for the toggle
  layout?: ToggleLayout; // Different layouts for the toggle
  state?: ToggleState; // Different states for the toggle
  showLabel?: boolean; // Show/Hide label for the toggle
  label?: string; // Label for the toggle
}

const RdsToggle = (props: RdsToggleProps) => {
  const [checked, setChecked] = useState(props.checked);
  const [styleClass, setStyleClass] = useState(props.style);

  useEffect(() => {
    setStyleClass(props.style);
  }, [props.style]);

  const onChangeHandler = () => {
    setChecked((prev) => !prev);
  };

  const classes = () => {
    let classes: string = "form-check-input";
    return classes;
  };

  const rootClasses = () => {
    let classList = "position-relative form-check form-switch";
    classList += ` ${styleClass?.toLowerCase().replace(/\s+/g, "-")}`;
    if (props.state === ToggleState.DisabledOn || props.state === ToggleState.DisabledOff) {
      classList += " disabled";
    }
    return classList;
  };

  const isChecked = props.state === ToggleState.On || props.state === ToggleState.DisabledOn;

  return (
    <div className="rds-toggle">
      {props.layout === ToggleLayout.SwitchLabel && (
        <>
          <div className={rootClasses()}>
            {(props.style === ToggleStyle.Style5 || props.style === ToggleStyle.Style6) && (
              <span className={isChecked ? "on" : "off"}>{isChecked ? "on" : "off"}</span>
            )}
            {(props.style === ToggleStyle.Style2 || props.style === ToggleStyle.Style4) && (
              <span className={isChecked ? "input-custom checked" : "input-custom"}></span>
            )}
            <input
              className={classes()}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={isChecked}
              onChange={onChangeHandler}
            />
            {props.showLabel && (
              <label className="form-check-label ms-2">
                {props.label || (props.style === ToggleStyle.Style3 ? "style 3" : "Label")}
              </label>
            )}
          </div>
        </>
      )}

      {props.layout === ToggleLayout.LabelSwitch && (
        <>
          <div className="d-flex align-items-center">
            {props.showLabel && (
              <label className="form-check-label me-2" htmlFor="flexSwitchCheckDefault">
                {props.label || "Label"}
              </label>
            )}
            <div className={rootClasses()}>
              <span className="position-relative">
                {(props.style === ToggleStyle.Style5 || props.style === ToggleStyle.Style6) && (
                  <span className={isChecked ? "on left" : "off left"}>{isChecked ? "on" : "off"}</span>
                )}
                {(props.style === ToggleStyle.Style2 || props.style === ToggleStyle.Style4) && (
                  <span className={isChecked ? "input-custom checked" : "input-custom"}></span>
                )}
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={isChecked}
                  onChange={onChangeHandler}
                />
              </span>
            </div>
          </div>
        </>
      )}

      {props.layout === ToggleLayout.TopLabelSwitch && (
        <>
          <div>
            {props.showLabel && (
              <label className="d-flex align-items-center form-check-label me-2" htmlFor="flexSwitchCheckDefault">
                {props.label || "Label"}
              </label>
            )}
            <div className={rootClasses()}>
              {(props.style === ToggleStyle.Style5 || props.style === ToggleStyle.Style6) && (
                <span className={isChecked ? "on" : "off"}>{isChecked ? "on" : "off"}</span>
              )}
              {(props.style === ToggleStyle.Style2 || props.style === ToggleStyle.Style4) && (
                <span className={isChecked ? "input-custom checked" : "input-custom"}></span>
              )}
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isChecked}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </>
      )}

      {props.layout === ToggleLayout.BottomLabelSwitch && (
        <>
          <div>
            <div className={rootClasses()}>
              {(props.style === ToggleStyle.Style5 || props.style === ToggleStyle.Style6) && (
                <span className={isChecked ? "on" : "off"}>{isChecked ? "on" : "off"}</span>
              )}
              {(props.style === ToggleStyle.Style2 || props.style === ToggleStyle.Style4) && (
                <span className={isChecked ? "input-custom checked" : "input-custom"}></span>
              )}
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isChecked}
                onChange={onChangeHandler}
              />
            </div>
            {props.showLabel && (
              <label className="d-flex align-items-center form-check-label me-2" htmlFor="flexSwitchCheckDefault">
                {props.label || "Label"}
              </label>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RdsToggle;