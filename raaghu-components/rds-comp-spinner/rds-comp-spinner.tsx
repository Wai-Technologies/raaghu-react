import clsx from "clsx";
import { useMemo } from "react";
import "./rds-comp-spinner.scss";
export { SpinnerSize, SpinnerLayout, SpinnerLevel, type RdsCompSpinnerProps } from './rds-comp-spinner-types';
import { SpinnerSize, SpinnerLayout, SpinnerLevel, type RdsCompSpinnerProps } from './rds-comp-spinner-types';

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

const RdsCompSpinner = ({
  spinnerType = "border",
  width,
  height,
  showLabel = false,
  labelText,
  size,
  layout,
  colorVariant,
  level,
}: RdsCompSpinnerProps) => {
  const spinnerClass = spinnerType === "grow" ? "spinner-grow" : "spinner-border";
  const colorClass = colorVariant ? `text-${colorVariant}` : "";

  const dimensions = useMemo(() => {
    if (size && SIZE_DIMENSIONS[size]) {
      return SIZE_DIMENSIONS[size];
    }
    return { width, height };
  }, [size, width, height]);

  const combinedClasses = clsx(spinnerClass, colorClass, size && SIZE_CLASS[size]);
  const layoutClass = layout ? LAYOUT_CLASS[layout] : "spinner-container--default";
  const labelSizeClass = size ? LABEL_SIZE_CLASS[size] ?? "spinner-label--default" : "spinner-label--default";
  const opacity = level ? LEVEL_OPACITY[level] ?? 1 : 1;

  return (
    <div className={clsx("spinner-container", layoutClass)}>
      {showLabel && <label className={clsx("spinner-label", labelSizeClass)}>{labelText}</label>}
      <div
        className={combinedClasses}
        style={{ width: dimensions.width, height: dimensions.height, opacity }}
        role="status"
        aria-live="polite"
      />
    </div>
  );
};

RdsCompSpinner.displayName = "RdsCompSpinner";
export default RdsCompSpinner;
