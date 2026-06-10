import React, { useMemo } from "react";
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
  colorVariant?: string;
  level?: SpinnerLevel;
}

const SIZE_DIMENSIONS: Record<SpinnerSize, { width: string; height: string }> = {
  [SpinnerSize.Default]: { width: "30px", height: "30px" },
  [SpinnerSize.Small]: { width: "15px", height: "15px" },
  [SpinnerSize.Medium]: { width: "35px", height: "35px" },
  [SpinnerSize.Large]: { width: "45px", height: "45px" },
};

const SIZE_CLASS: Partial<Record<SpinnerSize, string>> = {
  [SpinnerSize.Small]: "spinner--small",
  [SpinnerSize.Default]: "spinner--default",
  [SpinnerSize.Medium]: "spinner--medium",
  [SpinnerSize.Large]: "spinner--large",
};

const LABEL_SIZE_CLASS: Partial<Record<SpinnerSize, string>> = {
  [SpinnerSize.Small]: "spinner-label--small",
  [SpinnerSize.Default]: "spinner-label--default",
  [SpinnerSize.Medium]: "spinner-label--medium",
  [SpinnerSize.Large]: "spinner-label--large",
};

const LAYOUT_CLASS: Record<SpinnerLayout, string> = {
  [SpinnerLayout.LabelOnBottom]: "spinner-container--label-bottom",
  [SpinnerLayout.LabelAndSpinner]: "spinner-container--label-spinner",
  [SpinnerLayout.SpinnerAndLabel]: "spinner-container--spinner-label",
  [SpinnerLayout.LabelOnTop]: "spinner-container--label-top",
};

const LEVEL_OPACITY: Record<SpinnerLevel, number> = {
  [SpinnerLevel.Level01]: 0.25,
  [SpinnerLevel.Level02]: 0.5,
  [SpinnerLevel.Level03]: 0.75,
  [SpinnerLevel.Level04]: 1,
};

const RdsCompSpinner: React.FC<RdsCompSpinnerProps> = ({
  spinnerType = "border",
  width,
  height,
  showLabel = false,
  labelText,
  size,
  layout,
  colorVariant,
  level,
}) => {
  const spinnerClass = spinnerType === "grow" ? "spinner-grow" : "spinner-border";
  const colorClass = colorVariant ? `text-${colorVariant}` : "";

  const dimensions = useMemo(() => {
    if (size && SIZE_DIMENSIONS[size]) {
      return SIZE_DIMENSIONS[size];
    }
    return { width, height };
  }, [size, width, height]);

  const combinedClasses = useMemo(
    () =>
      [spinnerClass, colorClass, size ? SIZE_CLASS[size] : ""].filter(Boolean).join(" "),
    [spinnerClass, colorClass, size]
  );

  const layoutClass = layout ? LAYOUT_CLASS[layout] : "spinner-container--default";
  const labelSizeClass = size ? LABEL_SIZE_CLASS[size] ?? "spinner-label--default" : "spinner-label--default";
  const opacity = level ? LEVEL_OPACITY[level] ?? 1 : 1;

  return (
    <div className={`spinner-container ${layoutClass}`}>
      {showLabel && <label className={`spinner-label ${labelSizeClass}`}>{labelText}</label>}
      <div
        className={combinedClasses}
        style={{ width: dimensions.width, height: dimensions.height, opacity }}
        role="status"
      />
    </div>
  );
};

RdsCompSpinner.displayName = "RdsCompSpinner";
export default RdsCompSpinner;
