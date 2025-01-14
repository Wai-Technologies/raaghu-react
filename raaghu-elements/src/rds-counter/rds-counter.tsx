import React, { useState } from "react";
import { colors } from "../../libs/types";
import RdsButton from "../rds-button/rds-button";
import "./rds-counter.css";

export interface RdsCounterProps {
  counterValue: number;
  label?: string;
  min: number;
  max: number;
  width: number;
  type?: "Default" | "Side" | "Bottom";
  colorVariant?: colors;
  onCounterChange?: (newValue: number) => void;
  showLabel?: boolean;
  isDisabled?: boolean;
  showTitle?: boolean;
}

// Define color variables
const DISABLED_BACKGROUND_COLOR = "#f5f5f5";
const DISABLED_INPUT_COLOR = "#e0e0e0";
const DISABLED_TEXT_COLOR = "#a9a9a9";
const ENABLED_BACKGROUND_COLOR = "white";
const ENABLED_TEXT_COLOR = "black";

const RdsCounter = (props: RdsCounterProps) => {
  const initialCounterValue: number = props.counterValue ?? 0;

  const [counterValue, setCounterValue] = useState(initialCounterValue);
  const [isEditing, setIsEditing] = useState(false);

  const onMinusClick = () => {
    if (counterValue > props.min && !props.isDisabled) {
      const newValue = counterValue - 1;
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
      setIsEditing(false);
    }
  };

  const onPlusClick = () => {
    if (counterValue < props.max && !props.isDisabled) {
      const newValue = counterValue + 1;
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.isDisabled) return;

    const newValue = e.target.value === "" ? 0 : Number(e.target.value);
    if (!isNaN(newValue) && newValue >= props.min && newValue <= props.max) {
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
    }
    setIsEditing(true);
  };

  const renderDefaultLayout = () => {
    const dynamicWidth =
      props.width && props.width > 100 ? `${props.width}px` : "100px";

    return (
      <div style={{ width: dynamicWidth }}>
        {props.showLabel && <label>{props.label}</label>}
        <div
          className={`border ${props.isDisabled ? "border-gray" : "border-gray"} rounded p-1`}
          style={{
            backgroundColor: props.isDisabled
              ? DISABLED_BACKGROUND_COLOR
              : ENABLED_BACKGROUND_COLOR,
          }}
        >
          <div className="d-flex align-items-center gap-0">
            <RdsButton
              colorVariant={props.colorVariant}
              icon="minus"
              onClick={onMinusClick}
              size="medium"
              isDisabled={props.isDisabled}
            />
            <input
              type="number"
              className="form-control text-center border-0"
              style={{
                boxShadow: "none",
                backgroundColor: props.isDisabled
                  ? DISABLED_INPUT_COLOR
                  : ENABLED_BACKGROUND_COLOR,
                color: props.isDisabled ? DISABLED_TEXT_COLOR : ENABLED_TEXT_COLOR,
              }}
              value={isEditing && counterValue === 0 ? "" : counterValue}
              onChange={handleInputChange}
              min={props.min}
              max={props.max}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              disabled={props.isDisabled}
            />
            <RdsButton
              colorVariant={props.colorVariant}
              icon="plus"
              onClick={onPlusClick}
              size="medium"
              isDisabled={props.isDisabled}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSideLayout = () => {
    const dynamicWidth =
      props.width && props.width > 100 ? `${props.width}px` : "100px";

    return (
      <div style={{ width: dynamicWidth }}>
        {props.showLabel && <label>{props.label}</label>}
        <div
          className={`border ${props.isDisabled ? "border-gray" : "border-gray"} rounded p-1`}
          style={{
            backgroundColor: props.isDisabled
              ? DISABLED_BACKGROUND_COLOR
              : ENABLED_BACKGROUND_COLOR,
          }}
        >
          <div className="d-flex align-items-center gap-1">
            <input
              type="number"
              className="form-control text-center border-0"
              style={{
                boxShadow: "none",
                backgroundColor: props.isDisabled
                  ? DISABLED_INPUT_COLOR
                  : ENABLED_BACKGROUND_COLOR,
                color: props.isDisabled ? DISABLED_TEXT_COLOR : ENABLED_TEXT_COLOR,
              }}
              value={isEditing && counterValue === 0 ? "" : counterValue}
              onChange={handleInputChange}
              min={props.min}
              max={props.max}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              disabled={props.isDisabled}
            />
            <RdsButton
              colorVariant={props.colorVariant}
              icon="minus"
              onClick={onMinusClick}
              size="medium"
              isDisabled={props.isDisabled}
            />
            <RdsButton
              colorVariant={props.colorVariant}
              icon="plus"
              onClick={onPlusClick}
              size="medium"
              isDisabled={props.isDisabled}
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
      <div style={{ width: dynamicWidth }}>
        {props.showLabel && <label>{props.label}</label>}
        <div
          className={`border ${props.isDisabled ? "border-gray" : "border-gray"} rounded p-1`}
          style={{
            backgroundColor: props.isDisabled
              ? DISABLED_BACKGROUND_COLOR
              : ENABLED_BACKGROUND_COLOR,
          }}
        >
          <div className="d-flex flex-column align-items-center gap-2">
            <input
              type="number"
              className="form-control text-center border-0"
              value={isEditing && counterValue === 0 ? "" : counterValue}
              onChange={handleInputChange}
              min={props.min}
              max={props.max}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              disabled={props.isDisabled}
              style={{
                backgroundColor: props.isDisabled
                  ? DISABLED_INPUT_COLOR
                  : ENABLED_BACKGROUND_COLOR,
                color: props.isDisabled ? DISABLED_TEXT_COLOR : ENABLED_TEXT_COLOR,
              }}
            />
            <div
              className="wele"
              style={{
                width: "var(--dynamic-width-1, 100%)", // Default dynamic width fallback to 100%
                display: "flex",
                gap: "4px",
              }}
            >
              <RdsButton
                colorVariant={props.colorVariant}
                icon="minus"
                onClick={onMinusClick}
                size="medium"
                isDisabled={props.isDisabled}
              />
              <RdsButton
                colorVariant={props.colorVariant}
                icon="plus"
                onClick={onPlusClick}
                size="medium"
                isDisabled={props.isDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rds-counter">
      {props.type === "Default" && renderDefaultLayout()}
      {props.type === "Side" && renderSideLayout()}
      {props.type === "Bottom" && renderBottomLayout()}
    </div>
  );
};

export default RdsCounter;
