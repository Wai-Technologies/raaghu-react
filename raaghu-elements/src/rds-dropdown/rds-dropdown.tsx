import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.min.js";

export interface RdsDropdownProps {
  colorVariant: string;
  size: string;
  darkDropdown: boolean;
  label: string;
  direction: string;
//   dropdownAlignment: [];
  role: string;
  listItems: string;
  splitButton: boolean;
}

const RdsDropdown = (props: RdsDropdownProps) => {
  let size: "btn-sm" | "btn-lg" | undefined = undefined;
  if (props.size == "small") {
    size = "btn-sm";
  } else if (props.size == "large") {
    size = "btn-lg";
  }

  let dropdowndirection: "dropup" | "dropend" | "dropstart" | undefined=undefined;
if (props.direction=="Drop-Up") {
    dropdowndirection="dropup";
}else if(props.direction=="Drop-Right"){
    dropdowndirection="dropend";
}else if(props.direction=="Drop-Left"){
    dropdowndirection="dropstart";
}else if(props.direction=="Drop-Down"){
    dropdowndirection=undefined;
}






  // const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Simple tooltip
  //   </Tooltip>
  // );

  return (
    <>
      <div className={`dropdown ${dropdowndirection} btn-group`}>
      {props.role=="Dropdown-Button with split" && <button type="button" className={`btn btn-${props.colorVariant}`}>{props.label}</button>}
        <button
          className={`
            btn btn-${props.colorVariant}  
            dropdown-toggle 
             ${size}  ${props.role=="Dropdown-Button with split"?"dropdown-toggle-split":""}`
          }
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
            {props.role=="Dropdown-Button with split" && <span className="visually-hidden">Toggle Dropdown</span>}
            {props.role=="Dropdown-Button without split" && `${props.label}`}
        </button>
        <ul className={`dropdown-menu ${props.darkDropdown?"dropdown-menu-dark":""}`  } aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RdsDropdown;
