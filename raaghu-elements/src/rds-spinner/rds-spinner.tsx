import React from "react";
import "./rds-spinner.css";

export interface RdsSpinnerProps {
    spinnerType?: string;
    colorVariant?: string;
    width?: string;
    borderWidth?: string;
    height?: string;
    showLabel?: boolean;
    label?: string;
    size?: "small" | "large" | "medium" | "custom";
    labelPosition?: "top" | "bottom" | "left" | "right";
}

const RdsSpinner = (props: RdsSpinnerProps) => {
    const spinnerClass = props.spinnerType === "grow" ? "spinner-grow" : "spinner-border";
    const colorClass = props.colorVariant ? `text-${props.colorVariant}` : "";
    const sizeClass = props.size !== "custom" ? `${spinnerClass}-${props.size}` : "";

    const getSizeDimensions = () => {
        switch (props.size) {
            case "small":
                return { width: "15px", height: "15px" };
            case "medium":
                return { width: "30px", height: "30px" };
            case "large":
                return { width: "45px", height: "45px" };
            case "custom":
                return { width: props.width, height: props.height };
            default:
                return { width: props.width, height: props.height };
        }
    };

    const { width, height } = getSizeDimensions();
    const classes = `${spinnerClass} ${colorClass} ${sizeClass}`.trim();

    const labelClass = () => {
        switch (props.labelPosition) {
            case "bottom":
                return "d-flex flex-column-reverse align-items-center";
            case "left":
                return "d-flex align-items-center gap-2";
            case "right":
                return "d-flex align-items-center gap-2 flex-row-reverse";
            case "top":
            default:
                return "d-flex flex-column align-items-center";
        }
    };

    return (
            <div className={props.showLabel ? labelClass() : "d-flex align-items-center"} style={{width:'10rem'}}>
                {props.showLabel && (
                    <label className="text-capitalize form-label my-2">{props.label}</label>
                )}
                <div className={classes} style={{ width, height }} />
            </div>
    );
};

export default RdsSpinner;