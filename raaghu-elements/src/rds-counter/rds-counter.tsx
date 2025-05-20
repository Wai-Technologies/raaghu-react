import React, { useState } from "react";
import { colors, placements } from "../../libs/types";
import RdsButton from "../rds-button/rds-button";
import "./rds-counter.css";

export enum LayoutOptions {
  RightSide = "Right Side",
  SideToSide = "Side to Side",
  Bottom = "Bottom",
}

export enum CounterState {
  Default = "Default",
  Selected = "Selected",
  Disabled = "Disabled",
}

export interface RdsCounterProps {
  counterValue: number; // Value of the counter
  label?: string; // Label for the counter
  min: number; // Minimum value for the counter
  max: number; // Maximum value for the counter
  width: number; // Width of the counter
  layout?: LayoutOptions; // Layout of the counter
  colorVariant?: colors; // Color variant of the counter
  position?: placements; // Position of the counter
  onCounterChange?: (newValue: number) => void; // Callback function to get the new value of the counter
  showLabel?: boolean; // Show label for the counter
  isDisabled?: boolean; // Disable the counter
  showTitle?: boolean; // Show title for the counter
  state?: CounterState; // State of the counter
  isMandatory?: boolean; // Is the counter mandatory
  placeholder?: string; // Placeholder for the counter
  titleText?: string; // Title text for the counter
}


// Define color variables
const DISABLED_BACKGROUND_COLOR = "#f5f5f5";
const DISABLED_INPUT_COLOR = "#e0e0e0";
const DISABLED_TEXT_COLOR = "#a9a9a9";
const ENABLED_BACKGROUND_COLOR = "white";
const ENABLED_TEXT_COLOR = "gray";
const SELECTED_BACKGROUND_COLOR = "white";
const SELECTED_TEXT_COLOR = "#000000";

const RdsCounter = (props: RdsCounterProps) => {
  const initialCounterValue: number = props.counterValue ?? 0;

  const [counterValue, setCounterValue] = useState(initialCounterValue);
  const [isEditing, setIsEditing] = useState(false);

  const onMinusClick = () => {
    if (counterValue > props.min && props.state !== "Disabled") {
      const newValue = counterValue - 1;
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
      setIsEditing(false);
    }
  };

  const onPlusClick = () => {
    if (counterValue < props.max && props.state !== "Disabled") {
      const newValue = counterValue + 1;
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.state === "Disabled") return;

    const newValue = e.target.value === "" ? 0 : Number(e.target.value);
    if (!isNaN(newValue) && newValue >= props.min && newValue <= props.max) {
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
    }
    setIsEditing(true);
  };

  
  const classes = () => {
    switch (props.position) {
      case "top":
        return "d-flex flex-column gap-2"; 
      case "bottom":
        return "d-flex flex-column-reverse gap-1"; 
      default:
        return "d-flex flex-column gap-2"; 
    }
  };

  const getBackgroundColor = () => {
    if (props.state === "Disabled") return DISABLED_BACKGROUND_COLOR;
    if (props.state === "Selected") return SELECTED_BACKGROUND_COLOR;
    return ENABLED_BACKGROUND_COLOR;
  };

  const getTextColor = () => {
    if (props.state === "Disabled") return DISABLED_TEXT_COLOR;
    if (props.state === "Selected") return SELECTED_TEXT_COLOR;
    return ENABLED_TEXT_COLOR;
  };

  const renderSideToSideLayout = () => {
    const dynamicWidth =
      props.width && props.width > 100 ? `${props.width}px` : "100px";

    return (
      <div className={classes()} style={{ width: dynamicWidth }}>
        {props.showTitle && (
          <label>
            {props.titleText} {props.isMandatory && <span className="text-danger">*</span>}
          </label>
        )}
        <div
          className={`border ${
            props.state === "Disabled" ? "border-gray bg-light" : "border-gray"
          } rounded p-1`} id="counter-back-color"
          style={{
            backgroundColor: getBackgroundColor(),
          }}
        >
          <div className="d-flex gap-0" id="counter-button-width">
            <RdsButton
              colorVariant={props.colorVariant}
              icon="minus"
              onClick={onMinusClick}
              size="medium"
              isDisabled={props.state === "Disabled"}
            />
            <input
              type="number"
              className="form-control text-center border-0"
              style={{
                width: dynamicWidth,
                boxShadow: "none",
                backgroundColor: getBackgroundColor(),
                color: getTextColor(),
              }}
              value={isEditing ? counterValue.toString() : counterValue === 0 ? "" : counterValue}
              onChange={handleInputChange}
              min={props.min}
              max={props.max}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              disabled={props.state === "Disabled"}
              placeholder={props.placeholder} 
            />
            <RdsButton
              colorVariant={props.colorVariant}
              icon="plus"
              onClick={onPlusClick}
              size="medium"
              isDisabled={props.state === "Disabled"}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderRightSideLayout = () => {
    const dynamicWidth =
      props.width && props.width > 100 ? `${props.width}px` : "100px";

    return (
      <div className={classes()} style={{ width: dynamicWidth }}>
        {props.showTitle && (
          <label>
            {props.titleText} {props.isMandatory && <span className="text-danger">*</span>}
          </label>
        )}
        <div
          className={`border ${
            props.state === "Disabled" ? "border-gray" : "border-gray"
          } rounded p-1`} id="counter-back-color"
          style={{
            backgroundColor: getBackgroundColor(),
          }}
        >
          <div className="d-flex gap-1" id="counter-button-width">
            <input
              type="number"
              className="form-control border-0"
              style={{
                boxShadow: "none",
                backgroundColor: getBackgroundColor(),
                color: getTextColor(),
              }}
              value={isEditing ? counterValue.toString() : counterValue === 0 ? "" : counterValue}
              onChange={handleInputChange}
              min={props.min}
              max={props.max}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              disabled={props.state === "Disabled"}
              placeholder={props.placeholder} 
            />
            <RdsButton
              colorVariant={props.colorVariant}
              icon="minus"
              onClick={onMinusClick}
              size="medium"
              isDisabled={props.state === "Disabled"}
            />
            <RdsButton
              colorVariant={props.colorVariant}
              icon="plus"
              onClick={onPlusClick}
              size="medium"
              isDisabled={props.state === "Disabled"}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderBottomLayout = () => {
    const dynamicWidth =
      props.width && props.width > 100 ? `${props.width}px` : "100px";

    return (
      <div className={classes()} style={{ width: dynamicWidth }}>
        {props.showTitle && (
          <label>
            {props.titleText} {props.isMandatory && <span className="text-danger">*</span>}
          </label>
        )}
        <div
          className={`border ${
            props.state === "Disabled" ? "border-gray" : "border-gray"
          } rounded p-1`} id="counter-back-color"
          style={{
            backgroundColor: getBackgroundColor(),
          }}
        >
          <div className="d-flex flex-column gap-2">
            <input
              type="number"
              className="form-control text-center border-0"
              value={isEditing ? counterValue.toString() : counterValue === 0 ? "" : counterValue}
              onChange={handleInputChange}
              min={props.min}
              max={props.max}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              disabled={props.state === "Disabled"}
              style={{
                backgroundColor: getBackgroundColor(),
                color: getTextColor(),
              }}
              placeholder={props.placeholder} 
            />
            <div
              className="width_element"
              style={{
                width: "var(--dynamic-width-1, 100%)",
                display: "flex",
                gap: "4px",
              }}
            >
              <RdsButton
                colorVariant={props.colorVariant}
                icon="minus"
                onClick={onMinusClick}
                size="medium"
                isDisabled={props.state === "Disabled"}
              />
              <RdsButton
                colorVariant={props.colorVariant}
                icon="plus"
                onClick={onPlusClick}
                size="medium"
                isDisabled={props.state === "Disabled"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rds-counter">
      {props.layout === "Right Side" && renderRightSideLayout()}
      {props.layout === "Side to Side" && renderSideToSideLayout  ()}
      {props.layout === "Bottom" && renderBottomLayout()}
    </div>
  );
};

export default RdsCounter;