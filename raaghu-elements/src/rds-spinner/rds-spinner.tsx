import React from "react";
import "./rds-spinner.css";

export interface RdsSpinnerProps {
    spinnerType?: string;
    colorVariant?: string;
    width?: string;
    borderWidth?: string;
    height?: string;
    showLabel?: boolean;
    labelText?: string;
    size?: "Default" | "Small" | "Large";
    layout?: "Label on bottom" | "Spinner + Label" | "Label + Spinner" | "Label on top";
}

const RdsSpinner = (props: RdsSpinnerProps) => {
    const spinnerClass = props.spinnerType === "grow" ? "spinner-grow" : "spinner-border";
    const colorClass = props.colorVariant ? `text-${props.colorVariant}` : "";
    // const sizeClass = props.size !== "custom" ? `${spinnerClass}-${props.size}` : "";

    const getSizeDimensions = () => {
        switch (props.size) {
            case "Default":
                return { width: "30px", height: "30px" };
            case "Small":
                return { width: "15px", height: "15px" };
            case "Large":
                return { width: "45px", height: "45px" };
            // case "custom":
            //     return { width: props.width, height: props.height };
            default:
                return { width: props.width, height: props.height };
        }
    };

    const { width, height } = getSizeDimensions();
    // const classes = `${spinnerClass} ${colorClass} ${sizeClass}`.trim();
    const classes = `${spinnerClass} ${colorClass}`.trim();
    const labelClass = () => {
        switch (props.layout) {
            case "Label on bottom":
                return "d-flex flex-column-reverse align-items-center";
            case "Label + Spinner":
                return "d-flex align-items-center gap-2";
            case "Spinner + Label":
                return "d-flex align-items-center gap-2 flex-row-reverse";
            case "Label on top":
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