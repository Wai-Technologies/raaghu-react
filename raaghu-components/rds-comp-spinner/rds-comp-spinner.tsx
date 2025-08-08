import React from "react";
import "./rds-comp-spinner.scss";

export enum SpinnerSize {
    Default = "Default",
    Small = "Small",
    Large = "Large",
    Medium = "Medium",
}

export enum SpinnerLayout {
    LabelOnBottom = "Label on bottom",
    LabelAndSpinner = "Label + Spinner",
    SpinnerAndLabel = "Spinner + Label",
    LabelOnTop = "Label on top",
}

export interface RdsCompSpinnerProps {
    spinnerType?: string;
    width?: string;
    borderWidth?: string;
    height?: string;
    showLabel?: boolean;
    labelText?: string;
    size?: SpinnerSize;
    layout?: SpinnerLayout;
    colorVariant?: string;
}

const RdsCompSpinner = (props: RdsCompSpinnerProps) => {
    const spinnerClass = props.spinnerType === "grow" ? "spinner-grow" : "spinner-border";
    const colorClass = props.colorVariant ? `text-${props.colorVariant}` : "";

    const getSizeDimensions = () => {
        switch (props.size) {
            case SpinnerSize.Default:
                return { width: "30px", height: "30px" };
            case SpinnerSize.Small:
                return { width: "15px", height: "15px" };
            case SpinnerSize.Medium:
                return { width: "35px", height: "35px" };
            case SpinnerSize.Large:
                return { width: "45px", height: "45px" };
            default:
                return { width: props.width, height: props.height };
        }
    };

    const { width, height } = getSizeDimensions();
    const classes = `${spinnerClass} ${colorClass}`.trim();
    const getLayoutClass = () => {
        // Always use the layout prop to determine the layout, regardless of showLabel
        switch (props.layout) {
            case SpinnerLayout.LabelOnBottom:
                return "spinner-container--label-bottom";
            case SpinnerLayout.LabelAndSpinner:
                return "spinner-container--label-spinner";
            case SpinnerLayout.SpinnerAndLabel:
                return "spinner-container--spinner-label";
            case SpinnerLayout.LabelOnTop:
                return "spinner-container--label-top";
            default:
                return "spinner-container--default";
        }
    };

    return (
        <div className={`spinner-container ${getLayoutClass()}`}>
            {props.showLabel && (
                <label className="spinner-label">{props.labelText}</label>
            )}
            <div 
                className={classes} 
                style={{ width, height }}
                role="status"
            >
            </div>
        </div>
    );
};

export default RdsCompSpinner;