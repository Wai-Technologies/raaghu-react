import React from "react";
import { resolveDeprecatedProp, warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { normalizePaletteColor } from "../../raaghu-elements/shared/utils/palette-color";
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

export enum SpinnerLevel {
    Level01 = "01",
    Level02 = "02",
    Level03 = "03",
    Level04 = "04",
}

export interface RdsCompSpinnerProps {
    spinnerType?: string;
    width?: string;
    height?: string;
    showLabel?: boolean;
    labelText?: string;
    size?: SpinnerSize;
    layout?: SpinnerLayout;
    /** Spinner color. `'danger'` is deprecated; use `'error'`. */
    color?: string;
    /** @deprecated Use `color`. */
    colorVariant?: string;
    level?: SpinnerLevel;
}

const RdsCompSpinner: React.FC<RdsCompSpinnerProps> = ({
    spinnerType = "border",
    width,
    height,
    showLabel = false,
    labelText,
    size,
    layout,
    color,
    colorVariant,
    level
}) => {
    const paletteColor = resolveDeprecatedProp(color, colorVariant, "RdsCompSpinner", "colorVariant", "`color`");
    if (paletteColor === "danger" || color === "danger" || colorVariant === "danger") {
        warnDeprecatedProp("RdsCompSpinner", 'color="danger"', '`color: "error"`');
    }
    const resolvedColorVariant = normalizePaletteColor(paletteColor);
    const spinnerClass = spinnerType === "grow" ? "spinner-grow" : "spinner-border";
    const colorClass = resolvedColorVariant ? `text-${resolvedColorVariant}` : "";

    const getSizeDimensions = () => {
        switch (size) {
            case SpinnerSize.Default:
                return { width: "var(--rds-spacing-30)", height: "var(--rds-spacing-30)" };
            case SpinnerSize.Small:
                return { width: "var(--rds-spacing-15)", height: "var(--rds-spacing-15)" };
            case SpinnerSize.Medium:
                return { width: "35px", height: "35px" };
            case SpinnerSize.Large:
                return { width: "45px", height: "45px" };
            default:
                return { width: width, height: height };
        }
    };

    const dimensions = getSizeDimensions();
    const classes = `${spinnerClass} ${colorClass}`.trim();
    const getSizeClass = () => {
        switch (size) {
            case SpinnerSize.Small:
                return "spinner--small";
            case SpinnerSize.Default:
                return "spinner--default";
            case SpinnerSize.Medium:
                return "spinner--medium";
            case SpinnerSize.Large:
                return "spinner--large";
            default:
                return "";
        }
    };
    const sizeClass = getSizeClass();
    const combinedClasses = `${classes} ${sizeClass}`.trim();
    
    const getOpacity = () => {
        switch (level) {
            case SpinnerLevel.Level01:
                return 0.25;
            case SpinnerLevel.Level02:
                return 0.5;
            case SpinnerLevel.Level03:
                return 0.75;
            case SpinnerLevel.Level04:
                return 1;
            default:
                return 1;
        }
    };
    const getLayoutClass = () => {
        switch (layout) {
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

    const getLabelSizeClass = () => {
        switch (size) {
            case SpinnerSize.Small:
                return "spinner-label--small";
            case SpinnerSize.Default:
                return "spinner-label--default";
            case SpinnerSize.Medium:
                return "spinner-label--medium";
            case SpinnerSize.Large:
                return "spinner-label--large";
            default:
                return "spinner-label--default";
        }
    };

    return (
        <div className={`spinner-container ${getLayoutClass()}`}>
            {showLabel && (
                <label className={`spinner-label ${getLabelSizeClass()}`}>{labelText}</label>
            )}
            <div
                className={combinedClasses}
                style={{ width: dimensions.width, height: dimensions.height, opacity: getOpacity() }}
                role="status"
            >
            </div>
        </div>
    );
};
RdsCompSpinner.displayName = "RdsCompSpinner";
export default RdsCompSpinner;