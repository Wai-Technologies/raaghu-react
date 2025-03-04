import React, { Fragment } from "react";
import { colors } from "../../libs/types";
import "./rds-illustration.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsIllustrationProps {
    mode?: string; // Mode of the illustration, e.g., "Dark NRA" or "Light NRA"
    label?: string; // Main label text to display
    subLabel?: string; // Sub label text to display
    colorVariant?: colors; // Color variant for the illustration
    iconHeight?: string; // Height of the icon
    iconWidth?: string; // Width of the icon
    iconPath?: string; // Path to the icon file
    isContinueAnimate?: boolean; // Whether the icon should continue animating
}

const RdsIllustration = (props: RdsIllustrationProps) => {
    // Define icon paths for different modes
    const darkNRAIcon = '/assets/lottie-files/outlined/dual-color/illustration-dark.json';  
    const lightNRAIcon = '/assets/lottie-files/outlined/dual-color/illustration-light.json'; 

    // Determine which icon to use based on the mode
    let iconSource = props.iconPath;
    if (props.mode === "Dark NRA") {
        iconSource = darkNRAIcon;
    } else if (props.mode === "Light NRA") {
        iconSource = lightNRAIcon;
    }

    return (
        <Fragment>
            <div className="align-items-center d-flex justify-content-center vh-75">
                <div className="text-center lottie-border-0 lottie-filter-0" data-testid="icon">
                    <RdsIcon
                        width={props.iconWidth}
                        height={props.iconHeight}
                        fill={false}
                        stroke={true}
                        type="lottie"
                        isHovered={true}
                        iconPath={iconSource} // Dynamic icon path
                        isContinueAnimate={props.isContinueAnimate}
                    />
                    <h5 data-testid="labelElement" className="fw-medium">
                        <label className="mt-4">{props.label}</label>
                    </h5>
                    <div data-testid="sublabelElement" className="mt-1 text-muted">{props.subLabel}</div>
                </div>
            </div>
        </Fragment>
    );
};

export default RdsIllustration;