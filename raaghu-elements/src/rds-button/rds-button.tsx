import React, { useState } from "react";
import "./rds-button.scss";
import { Colors, Placements } from "../Types";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Tooltip from "../rds-tooltip/rds-tooltip";



export interface RdsButtonProps {
  isDisabled?: boolean;
  colorVariant?: Colors;
  label?: string;
  block?: boolean;
  size?: string;
  roundedButton?: boolean;
  roundedCorner?: boolean;
  icon?: string;
  outlineButton?: boolean;
  tooltip?: boolean;
  tooltipPlacement?: Placements;
  tooltipTitle: string;
}



const RdsButton = (props: RdsButtonProps) => {



  const outlineColorVariant =
    `${props.outlineButton === true ? "btn-outline-" : "btn-"}` +
    props.colorVariant;


  let size =
    props.size == "small" ? "btn-sm" : props.size == "large" ? "btn-lg" : "";

  return (
    <div className={props.block ? "d-grid gap-2" : ""}> 
    {props.tooltip && <Tooltip text={props.tooltipTitle} place={props.tooltipPlacement}>
    <button
        type="button"
        className={`btn ${outlineColorVariant} ${size}`}
        disabled={props.isDisabled}
        // data-bs-toggle={props.tooltip == true?"tooltip":""}
        // data-bs-placement={props.tooltipPlacement}
        // title={props.tooltipTitle}
      >
        {props.icon}
        {props.label}
      </button>
    </Tooltip>}
    {!props.tooltip && <button
        type="button"
        className={`btn ${outlineColorVariant} ${size}`}
        disabled={props.isDisabled}
        // data-bs-toggle={props.tooltip == true?"tooltip":""}
        // data-bs-placement={props.tooltipPlacement}
        // title={props.tooltipTitle}
      >
        {props.icon}
        {props.label}
      </button>}
      
    </div>
  );
};

export default RdsButton;
