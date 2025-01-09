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
  type?: "Default" | "Side-by-side" | "Bottom";
  colorVariant?: colors;
  onCounterChange?: (newValue: number) => void;
  showLabel?: boolean;
  isDisabled?: boolean;
  showTitle?: boolean;
}

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
          style={{ backgroundColor: props.isDisabled ? "#f5f5f5" : "white" }}
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
                backgroundColor: props.isDisabled ? "#e0e0e0" : "white",
                color: props.isDisabled ? "#a9a9a9" : "black",
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
          style={{ backgroundColor: props.isDisabled ? "#f5f5f5" : "white" }}
        >
          <div className="d-flex align-items-center gap-1">
            <input
              type="number"
              className="form-control text-center border-0"
              style={{
                boxShadow: "none",
                backgroundColor: props.isDisabled ? "#e0e0e0" : "white",
                color: props.isDisabled ? "#a9a9a9" : "black",
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
          style={{ backgroundColor: props.isDisabled ? "#f5f5f5" : "white" }}
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
                backgroundColor: props.isDisabled ? "#e0e0e0" : "white",
                color: props.isDisabled ? "#a9a9a9" : "black",
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
      {props.type === "Side-by-side" && renderSideLayout()}
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

