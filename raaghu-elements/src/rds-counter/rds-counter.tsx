import React, { useState } from "react";
import { colors, placements } from "../../libs/types";
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
  position?: placements; // Add the position prop
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

  // Dynamic classes for positioning
  const classes = () => {
    switch (props.position) {
      case "top":
        return "d-flex flex-column gap-3"; // Label above, no vertical centering
      case "bottom":
        return "d-flex flex-column-reverse gap-1"; // Label below, no vertical centering
      // case "left":
      //   return "d-flex align-items-start gap-3"; // Label to the left, align to the top
      // case "right":
      //   return "d-flex flex-row-reverse align-items-start gap-3"; // Label to the right, align to the top
      default:
        return "d-flex gap-3"; // Default to side-by-side, no vertical centering
    }
  };
  

  const renderDefaultLayout = () => {
    const dynamicWidth =
      props.width && props.width > 100 ? `${props.width}px` : "100px";

    return (
      <div
        className={classes()}
        style={{ width: dynamicWidth }}
      >
        {/* Conditionally show label */}
        {props.showLabel && (
          <label
            className={`fw-medium ${
              props.isDisabled ? "text-muted" : "text-primary"
            }`}
          >
            {props.label}
          </label>
        )}
        {/* Counter Container */}
        <div
          className={`border ${
            props.isDisabled ? "border-gray bg-light" : "border-gray"
          } rounded p-1`}
          style={{
            backgroundColor: props.isDisabled
              ? DISABLED_BACKGROUND_COLOR
              : ENABLED_BACKGROUND_COLOR,
          }}
        >
          <div className="d-flex align-items-center gap-0">
            {/* Minus Button */}
            <RdsButton
              colorVariant={props.colorVariant}
              icon="minus"
              onClick={onMinusClick}
              size="medium"
              isDisabled={props.isDisabled}
            />
            {/* Input Field */}
            <input
  type="number"
  className="form-control text-center border-0"
  style={{
    width: dynamicWidth, // Add dynamicWidth for input width
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

            {/* Plus Button */}
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
      <div
        className={classes()}
        style={{ width: dynamicWidth }}
      >
        {/* Conditionally show label */}
        {props.showLabel && (
          <label
            className={`fw-medium ${
              props.isDisabled ? "text-muted" : "text-primary"
            }`}
          >
            {props.label}
          </label>
        )}
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
              className="form-control border-0"
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
        {props.showLabel && <label
            className={`fw-medium ${
              props.isDisabled ? "text-muted" : "text-primary"
            }`}
          >
            {props.label}
          </label>}
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
              className="width_element"
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



// import React, { Fragment, useState } from "react";
// import { colors, placements } from "../../libs/types";
// import RdsButton from "../rds-button/rds-button";
// import "./rds-counter.css";

// export interface RdsCounterProps {
//     counterValue: number;
//     label?: string;
//     min: number;
//     max: number;
//     width: number;
//     colorVariant?: colors;
//     position?: placements;
//     onCounterChange?: (newValue: number) => void;
// }

// const RdsCounter = (props: RdsCounterProps) => {
//     const initialCounterValue: number = props.counterValue ?? 0;

//     // This state hook represents counter value
//     const [counterValue, setCounterValue] = useState(initialCounterValue);
//     const [isEditing, setIsEditing] = useState(false); // To track if the user is editing the input manually

//     const onMinusClick = () => {
//         if (counterValue > props.min) {
//             const newValue = counterValue - 1;
//             setCounterValue(newValue);
//             props.onCounterChange?.(newValue);
//             setIsEditing(false); // Reset editing state after clicking minus
//         }
//     };

//     const onPlusClick = () => {
//         if (counterValue < props.max) {
//             const newValue = counterValue + 1;
//             setCounterValue(newValue);
//             props.onCounterChange?.(newValue);
//             setIsEditing(false); // Reset editing state after clicking plus
//         }
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newValue = e.target.value === "" ? 0 : Number(e.target.value);
//         if (!isNaN(newValue) && newValue >= props.min && newValue <= props.max) {
//             setCounterValue(newValue);
//             props.onCounterChange?.(newValue);
//         }
//         setIsEditing(true); // User is manually editing the input
//     };

//     const classes = () => {
//         switch (props.position) {
//             case 'top': return 'top-0';
//             case 'bottom': return 'd-flex flex-column-reverse';
//             case 'left': return 'd-flex align-items-baseline gap-3';
//             case 'right': return 'align-items-baseline d-flex flex-row-reverse gap-3 justify-content-end';
//             default: return '';
//         }
//     };

//     const inputClasses = () => {
//         let inputClass = 'input-group mt-1';
//         if (props.position === 'top') {
//             inputClass += ' mt-2';
//         } else if (props.position === 'bottom') {
//             inputClass += ' mb-2';
//         }
//         return inputClass;
//     };

//     return (
//         <Fragment>
//             <div className="row">
//                 <div className="position-relative">
//                     <div className={classes()}>
//                         <label>{props.label}</label>
//                         <div className={inputClasses()} style={{ width: props.width }}>
//                             <RdsButton
//                                 colorVariant={props.colorVariant}
//                                 icon="minus"
//                                 onClick={onMinusClick}
//                                 size="medium"
//                             />
//                             <input
//                                 type="number"
//                                 className="form-control text-center"
//                                 value={isEditing && counterValue === 0 ? "" : counterValue}
//                                 onChange={handleInputChange}
//                                 min={props.min}
//                                 max={props.max}
//                                 onFocus={() => setIsEditing(true)} // When focused, user is editing
//                                 onBlur={() => setIsEditing(false)}  // Reset editing state when focus is lost
//                             />
//                             <RdsButton
//                                 colorVariant={props.colorVariant}
//                                 icon="plus"
//                                 onClick={onPlusClick}
//                                 size="medium"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default RdsCounter;