import React, { Fragment, useEffect, useState } from "react";
import RdsButton from "../rds-button";
import RdsInput from "../rds-input";
import { colors } from "../../libs/types";
import "./rds-input-group.css";
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";

export enum InputGroupSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export interface RdsInputGroupProps {
  buttonLabel?: string;
  colorVariant: colors;
  placeholder?: string;
  size?: InputGroupSize;
  inputGroupLabel?: string;
  labelPosition?: string;
  outline?: boolean;
  icon?: string;
  value?: string;
  iconColorVariant?: string;
  iconHeight?: string;
  iconWidth?: string;
  iconFill?: boolean;
  iconStroke?: boolean;
  inputValue?: (arg: string) => void;
}

const RdsInputGroup = (props: RdsInputGroupProps) => {
  const [value, setValue] = useState("");
  const inputGroupDivClasses = `d-flex align-items-center input-group input-group-${props.size === InputGroupSize.Small ? "sm" : "md"}`;
  const inputGroupLabelClasses =
    props.size === InputGroupSize.Small
      ? "fs-small-size"
      : props.size === InputGroupSize.Large
      ? "fs-5"
      : "mb-2";

  const buttonClickHandler = (e: any) => {
    e.preventDefault();
    props.inputValue?.(value);
  };

  const formName = "input-group_" + Math.random().toString(36).substr(2, 9);
  function changeValue(e: any) {
    setValue(e.target.value);
  }
  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);
  return (
    <Fragment>
      <form
        id={formName}
        className="RdsInputGroup__form"
        onSubmit={buttonClickHandler}
      >
        {props.inputGroupLabel && props.labelPosition == "top" && (
          <label className={inputGroupLabelClasses}>
            {" "}
            {props.inputGroupLabel}{" "}
          </label>
        )}
        <div data-testid="rds-icon" className={inputGroupDivClasses}>
          <div className="flex-grow-1">
            <RdsInput
              name={formName + "-input"}
              placeholder={props.placeholder}
              value={value}
              onChange={changeValue}
              formName={formName}
              size={props.size === InputGroupSize.Small ? InputSize.Small : props.size === InputGroupSize.Large ? InputSize.Large : InputSize.Medium}
              showTitle={false}
            ></RdsInput>
          </div>
          <div className="mb-2">
            <RdsButton
              label={props.buttonLabel}
              tooltipTitle={""}
              type={"submit"}
              icon={props.icon}
              iconColorVariant={props.iconColorVariant}
              iconHeight={props.iconHeight}
              iconWidth={props.iconWidth}
              iconFill={props.iconFill}
              iconStroke={props.iconStroke}
              colorVariant={props.colorVariant}
              isOutline={props.outline}
              formName={formName}
              size={props.size}
            ></RdsButton>
          </div>
        </div>
        {props.inputGroupLabel && props.labelPosition == "bottom" && (
          <label className={inputGroupLabelClasses}>
            {" "}
            {props.inputGroupLabel}{" "}
          </label>
        )}
      </form>
    </Fragment>
  );
};

export default RdsInputGroup;