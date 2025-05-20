import React from "react";
import "./rds-spinner.css";
import { colors } from "../../libs";

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

export interface RdsSpinnerProps {
    spinnerType?: string; //Spinner type: border or grow
    colorVariant?: colors; //Color variant
    width?: string; //Width of the spinner
    borderWidth?: string; //Border width of the spinner
    height?: string; //Height of the spinner
    showLabel?: boolean; //Show label
    labelText?: string; //Label text
    size?: SpinnerSize; //Size of the spinner
    layout?: SpinnerLayout; //Layout of the spinner
}

const RdsSpinner = (props: RdsSpinnerProps) => {
    const spinnerClass = props.spinnerType === "grow" ? "spinner-grow" : "spinner-border";
    const colorClass = props.colorVariant ? `text-${props.colorVariant}` : "";
    // const sizeClass = props.size !== "custom" ? `${spinnerClass}-${props.size}` : "";

    const getSizeDimensions = () => {
        switch (props.size) {
            case SpinnerSize.Default:
                return { width: "30px", height: "30px" };
            case SpinnerSize.Small:
                return { width: "15px", height: "15px" };
            case SpinnerSize.Large:
                return { width: "45px", height: "45px" };
            default:
                return { width: props.width, height: props.height };
        }
    };

    const { width, height } = getSizeDimensions();
    // const classes = `${spinnerClass} ${colorClass} ${sizeClass}`.trim();
    const classes = `${spinnerClass} ${colorClass}`.trim();
    const labelClass = () => {
        switch (props.layout) {
            case SpinnerLayout.LabelOnBottom:
                return "d-flex flex-column-reverse align-items-center";
            case SpinnerLayout.LabelAndSpinner:
                return "d-flex align-items-center gap-2";
            case SpinnerLayout.SpinnerAndLabel:
                return "d-flex align-items-center gap-2 flex-row-reverse";
            case SpinnerLayout.LabelOnTop:
            default:
                return "d-flex flex-column align-items-center";
        }
    };

    return (
            <div className={props.showLabel ? labelClass() : "d-flex align-items-center"} style={{width:'10rem'}}>
                {props.showLabel && (
                    <label className="text-capitalize form-label my-2">{props.labelText}</label>
                )}
                <div className={classes} style={{ width, height }} />
            </div>
    );
};

export default RdsSpinner;