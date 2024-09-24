import React, { Fragment } from "react";
import { colors } from "../../libs/types";
import "./rds-illustration.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsIllustrationProps {
    label?: string;
    subLabel?: string;
    colorVariant?: colors;
    iconHeight?: string;
    iconWidth?: string;
    iconPath?: string;
    isContinueAnimate?: boolean;
    displayType? : string;
    height ? : string;
}

const RdsIllustration = (props: RdsIllustrationProps) => {
    return (
        <Fragment>
            <div className="align-items-center d-flex justify-content-center vh-75">
                <div className="text-center lottie-border-0 lottie-filter-0" data-testid="icon" >
                    <RdsIcon
                        width={props.iconWidth}
                        height={props.iconHeight}
                        fill={false}
                        stroke={true}
                        type="lottie"
                        isHovered={true}
                        iconPath={props.iconPath}
                        isContinueAnimate={props.isContinueAnimate}
                    ></RdsIcon>
                    <h5 data-testid="labelElement" className="fw-medium">
                        <label className="mt-4" >{props.label}</label>
                    </h5>
                    <div data-testid="sublabelElement" className="mt-1 text-muted">{props.subLabel}</div>
                </div>

            </div>
        </Fragment>
    );
};
export default RdsIllustration;
