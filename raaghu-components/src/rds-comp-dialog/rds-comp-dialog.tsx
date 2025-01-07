import React from "react";
import "./rds-comp-dialog.css";
import { RdsButton, RdsIcon } from "../rds-elements";

interface RdsCompDialogProps {
  Size?: string;
  Style?: string;
  ShowDissmiss?: boolean;
  ShowPrimary?: boolean;
  ShowSecondary?: boolean;
  Title?: string;
  ShowTitle?: boolean;
  Content?: string;
  Icon?: string;
  ColorVariant?: string;
  ContentPosition?: string;
}

const RdsCompDialog = (props: RdsCompDialogProps) => {
  
  const getDialogStyle = () => {
    switch (props.Style?.toLowerCase()) {
      case "outlined":
        return {
          border: "1px solid #adb5bd",
        };
      case "filled":
        return {
          backgroundColor: "#FEF7FF",
        };
      default:
        return {};
    }
  };
  const getSizeClass = () => {
    switch (props.Size?.toLowerCase()) {
      case "large":
        return "col-12";
      case "small":
        return "col-3";
      default:
        return "";
    }
  };

  function resetToDefault(event:any): void {
    //handle the condition after clicking on cancel button
  }

  function handleSave(event:any): void {
    //handle the condition after clicking on save button
  }

  return (
    <>
    <div
      className={`dialog-container ${getSizeClass()} `}
      style={getDialogStyle()}>
      <div className="d-flex ">
        {props.ShowTitle && props.Title && (
          <h2 className="dialog-title mt-1">{props.Title}</h2>
        )}
        {props.ShowDissmiss && (
          <span className="text-end col mt-0">
            <RdsIcon
              name="close"
              fill={false}
              stroke={true}
              colorVariant={props.ColorVariant}
              isCursorPointer={true}
              width="18px"
              height="18px"
            />
          </span>
        )}
      </div>
      {props.ContentPosition?.toLowerCase() === "bottom" ? (
  <div className="d-flex flex-column align-items-center">
    {props.Icon && (
      <RdsIcon
        height="28px"
        width="28px"
        colorVariant={props.ColorVariant}
        name={props.Icon}
        fill={false}
        stroke={true}
      />
    )}
    {props.Content && <div className="dialog-content text-center mt-2">{props.Content}</div>}
  </div>
) : (
  <div className="d-flex flex-column align-items-center">
    {props.Icon && (
      <RdsIcon
        height="28px"
        width="28px"
        colorVariant={props.ColorVariant}
        name={props.Icon}
        fill={false}
        stroke={true}
      />
    )}
    {props.Content && <div className="dialog-content mt-2 text-center">{props.Content}</div>}
  </div>
)}

<div className={`dialog-actions gap-2 ${props.Size?.toLowerCase() === 'small' ? 'flex-column' : ''}`}>
  {props.ShowSecondary && (
    <RdsButton
      type="button"
      label="Cancel"
      size="small"
      colorVariant={`outline-${props.ColorVariant}`}
      databsdismiss="offcanvas"
      onClick={resetToDefault}
    ></RdsButton>
  )}
  {props.ShowPrimary && (
    <RdsButton
      type="button"
      label="Okay"
      colorVariant={props.ColorVariant}
      size="small"
      databsdismiss="offcanvas"
      onClick={handleSave}
    ></RdsButton>
  )}
</div>
    </div>
    </>
  );
};



export default RdsCompDialog;
