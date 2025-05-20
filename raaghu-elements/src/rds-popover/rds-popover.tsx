import React, { ReactNode, useState } from "react";
import "./rds-popover.css";
import RdsButton from "../rds-button";

export enum PopoverState {
  NoArrow = "NoArrow",
  TopLeft = "TopLeft",
  TopCentre = "TopCentre",
  TopRight = "TopRight",
  BottomLeft = "BottomLeft",
  BottomCentre = "BottomCentre",
  BottomRight = "BottomRight",
  LeftTop = "LeftTop",
  LeftCentre = "LeftCentre",
  LeftBottom = "LeftBottom",
  RightBottom = "RightBottom",
  RightCentre = "RightCentre",
  RightTop = "RightTop"
}

export interface RdsPopoverProps {
  children: ReactNode; // The content to be displayed in the popover
  state: PopoverState; // The position of the popover
}

const RdsPopover = (props: RdsPopoverProps) => {
  const [displayType, setDisplaytype] = useState("none");

  function toggleDisplay() {
    if (displayType === "none") {
      setDisplaytype("inline-block");
    } else if (displayType === "inline-block") {
      setDisplaytype("none");
    }
  }

  return (
    <>
      <div className="col-auto d-flex justify-content-center pcard">
        <div data-testid="popover-card" className="popoverContainer my-5">
          <RdsButton
            type="button"
            colorVariant="primary"
            isOutline={true}
            size="small"
            label="Popover Button"
            onClick={toggleDisplay}
          />
          <div
            className={`popoverCard ${props.state}`}
            style={{ display: displayType }}
          >
            <hr style={{ width: "100%" }} />
            <div className="popover-content">
              {props.children}
            </div>
            <hr style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RdsPopover;