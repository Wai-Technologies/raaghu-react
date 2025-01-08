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
  type?: "default" | "side" | "bottom";
  colorVariant?: colors;
  onCounterChange?: (newValue: number) => void;
}

const RdsCounter = (props: RdsCounterProps) => {
  const initialCounterValue: number = props.counterValue ?? 0;

  const [counterValue, setCounterValue] = useState(initialCounterValue);
  const [isEditing, setIsEditing] = useState(false);

  const onMinusClick = () => {
    if (counterValue > props.min) {
      const newValue = counterValue - 1;
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
      setIsEditing(false);
    }
  };

  const onPlusClick = () => {
    if (counterValue < props.max) {
      const newValue = counterValue + 1;
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? 0 : Number(e.target.value);
    if (!isNaN(newValue) && newValue >= props.min && newValue <= props.max) {
      setCounterValue(newValue);
      props.onCounterChange?.(newValue);
    }
    setIsEditing(true);
  };

    const renderDefaultLayout = () => (
        <div style={{ width: props.width }}>
        <label>{props.label}</label>
        <div>
        <div className="d-flex align-items-center gap-1">
            <RdsButton colorVariant={props.colorVariant} icon="minus" onClick={onMinusClick} size="medium"/>
            <input
            type="number"
            className="form-control text-center"
            value={isEditing && counterValue === 0 ? "" : counterValue}
            onChange={handleInputChange}
            min={props.min}
            max={props.max}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            />
            <RdsButton colorVariant={props.colorVariant} icon="plus" onClick={onPlusClick} size="medium" />
        </div>
        </div>
        </div>
    );

  const renderSideLayout = () => (
    <div className="d-flex flex-row align-items-center gap-3" style={{ width: props.width }}>
      <RdsButton colorVariant={props.colorVariant} icon="minus" onClick={onMinusClick} size="medium" />
      <div className="d-flex flex-column align-items-center">
        <label>{props.label}</label>
        <input
          type="number"
          className="form-control text-center"
          value={isEditing && counterValue === 0 ? "" : counterValue}
          onChange={handleInputChange}
          min={props.min}
          max={props.max}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        />
      </div>
      <RdsButton colorVariant={props.colorVariant} icon="plus" onClick={onPlusClick} size="medium" />
    </div>
  );

  const renderBottomLayout = () => (
    <div style={{ width: props.width }}>
      <label>{props.label}</label>
      <div className="d-flex flex-column align-items-center gap-2">
        <input
          type="number"
          className="form-control text-center"
          value={isEditing && counterValue === 0 ? "" : counterValue}
          onChange={handleInputChange}
          min={props.min}
          max={props.max}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        />
        <div className="d-flex gap-2">
          <RdsButton colorVariant={props.colorVariant} icon="minus" onClick={onMinusClick} size="medium" />
          <RdsButton colorVariant={props.colorVariant} icon="plus" onClick={onPlusClick} size="medium" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="rds-counter">
      {props.type === "default" && renderDefaultLayout()}
      {props.type === "side" && renderSideLayout()}
      {props.type === "bottom" && renderBottomLayout()}
    </div>
  );
};

export default RdsCounter;