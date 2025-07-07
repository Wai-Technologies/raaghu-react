import React, { Fragment } from "react";
import { colors } from "../../libs/types";
import "./rds-empty-state.css";
import RdsCompIcon from "../../../raaghu-components/src/rds-comp-icon/rds-comp-icon";

export interface RdsEmptyStateProps {
    mode?: string; // Mode of the illustration, e.g., "Dark NRA" or "Light NRA"
    label?: string; // Main label text to display
    subLabel?: string; // Sub label text to display
    colorVariant?: colors; // Color variant for the illustration
    iconHeight?: string; // Height of the icon
    iconWidth?: string; // Width of the icon
    iconPath?: string; // Path to the icon file
    isContinueAnimate?: boolean; // Whether the icon should continue animating
}

const RdsEmptyState = (props: RdsEmptyStateProps) => {
    // Define icon names for different modes
    const darkNRAIcon = 'empty_state_dark'; 
    const lightNRAIcon = 'empty_state_light'; 

    // Determine which icon to use based on the mode
    let iconName;
    if (props.mode === "Dark NRA") {
        iconName = darkNRAIcon;
    } else if (props.mode === "Light NRA") {
        iconName = lightNRAIcon;
    }
    const iconSource = props.iconPath || '/assets/empty_state_light.svg';

    return (
        <Fragment>
            <div className="align-items-center d-flex justify-content-center vh-75">
                <div className="text-center lottie-border-0 lottie-filter-0" data-testid="icon">
                    <RdsCompIcon
                        width={props.iconWidth}
                        height={props.iconHeight}
                        fill={false}
                        stroke={false}
                        isCursorPointer={true}
                        //type="lottie"
                        name={iconName} // Dynamic icon name based on mode
                        isHovered={true}
                        iconPath={iconSource} // Dynamic icon path
                        isContinueAnimate={props.isContinueAnimate}
                    />
                    <h5 data-testid="labelElement" className="fw-medium">
                        <label className="mt-1">{props.label}</label>
                    </h5>
                    <div data-testid="sublabelElement" className="mt-1 fw-regular text-black">{props.subLabel}</div>
                    <div className="my-3">
                        <RdsCompIcon
                            height="24px"
                            isCursorPointer
                            name="empty_button"
                            width="162px"
                            fill={true}
                            stroke={false}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default RdsEmptyState;