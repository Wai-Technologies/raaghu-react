import React, { ReactNode, useState } from "react";
import "./rds-popover.css";
import RdsButton from "../rds-button";
export interface RdsPopoverProps {
    children: ReactNode;
    popoverPosition: string;
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

            <div data-testid="popover-card" className="popoverContainer">
                <RdsButton
                    type="button"
                    colorVariant="primary"
                    isOutline={true}
                    size="small"
                    label="Popover"
                    onClick={toggleDisplay}
                />
                <div
                    className={`popoverCard ${props.popoverPosition == "top"
                        ? "popoverTop popoverCardTop"
                        : props.popoverPosition == "bottom"
                            ? "popoverBottom popoverCardBottom"
                            : props.popoverPosition == "right"
                                ? "popoverRight popoverCardRight"
                                : props.popoverPosition == "left"
                                    ? "popoverLeft popoverCardLeft"
                                    : ""
                        }`}
                    style={{ display: displayType, padding: "10px" }}
                >
                    <span>{props.children}</span>
                </div>
            </div>
        </>
    );
};

export default RdsPopover;
