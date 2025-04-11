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
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCheck(props.checked);
  }, [props.checked]);

  const getStateClasses = () => {
    const stateClasses: string[] = [];
    
    if (props.state === CheckboxState.Disabled || props.isDisabled) {
      stateClasses.push('checkbox-disabled');
    }
    
    if (props.state === CheckboxState.Hover || isHovered) {
      stateClasses.push('checkbox-hover');
    }

    return stateClasses.join(' ');
  };

  const getBaseClasses = () => {
    if (props.isSwitch) {
      return "form-switch";
    }
    if (props.isInputGroup) {
      return "input-group-text";
    }
    if (props.status === CheckboxStatus.Indeterminate) {
      return "ps-0 d-flex";
    }
    return "form-check mb-1 d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-block";
  };

  const getInputClasses = () => {
    const classes: string[] = ["form-check-input"];

    if (props.style === CheckboxStyle.Circular) {
      classes.push("form-check-input-type-circular");
    }

    if (props.status === CheckboxStatus.Unchecked) {
      classes.push("form-check-input-error");
    }

    if (props.status === CheckboxStatus.Indeterminate) {
      classes.push("form-check-input-intermediate");
    }

    return classes.join(" ");
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.isDisabled && props.state !== CheckboxState.Disabled) {
      const newCheck = event.target.checked;
      setCheck(newCheck);
      if (props.onChange) {
        props.onChange(event);
      }
    }
  };

  const handleMouseEnter = () => {
    if (!props.isDisabled && props.state !== CheckboxState.Disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const renderLabel = () => (
    props.showText === false ? (
      <></>
    ) : (
      <label 
        className={`form-check-label ps-2 ${props.labelClass || ''} ${props.isDisabled || props.state === CheckboxState.Disabled ? 'disabled' : ''}`} 
        htmlFor={`${props.id}${props.labelText}`}
      >
        {props.labelText}
      </label>
    )
  );

  const renderCheckbox = () => {
    const isDisabled = props.state === CheckboxState.Disabled || props.isDisabled;
    const baseClasses = `rds-checkbox ${getBaseClasses()} ${getStateClasses()} ${props.classes || ''}`;

    return (
      <div>
        <div 
          className={baseClasses}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {props.status === CheckboxStatus.Indeterminate ? (
            <span className={props.style === CheckboxStyle.Circular ? 
              "form-check-input-type-circular-indeterminate" : 
              "form-check-input-type-square-indeterminate"}
            >
              <input
                type="checkbox"
                className={getInputClasses()}
                value={check ? "true" : "false"}
                disabled={isDisabled}
                checked={check}
                id={`${props.id}${props.labelText}`}
                name={props.id || props.name}
                onChange={handleCheckboxChange}
                data-testid={props.dataTestId}
                ref={ref}
              />
            </span>
          ) : (
            <input
              type="checkbox"
              className={getInputClasses()}
              value={check ? "true" : "false"}
              disabled={isDisabled}
              checked={props.status === CheckboxStatus.Unchecked ? false : check}
              id={`${props.id}${props.labelText}`}
              name={props.id || props.name}
              onChange={handleCheckboxChange}
              data-testid={props.dataTestId}
              ref={ref}
            />
          )}
          {renderLabel()}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {renderCheckbox()}
    </Fragment>
  );
};

export default RdsCheckbox;