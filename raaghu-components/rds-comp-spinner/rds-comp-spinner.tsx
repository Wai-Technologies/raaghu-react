import clsx from "clsx";
import { useId, useMemo } from "react";
import { Box } from "@mui/material";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
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

const PLACEMENT_LAYOUT: Record<NonNullable<RdsCompSpinnerProps["labelPlacement"]>, SpinnerLayout> = {
  top: SpinnerLayout.LabelOnTop,
  bottom: SpinnerLayout.LabelOnBottom,
  start: SpinnerLayout.LabelAndSpinner,
  end: SpinnerLayout.SpinnerAndLabel,
};

const LEVEL_OPACITY: Record<SpinnerLevel, number> = {
  [SpinnerLevel.Level01]: 0.25,
  [SpinnerLevel.Level02]: 0.5,
  [SpinnerLevel.Level03]: 0.75,
  [SpinnerLevel.Level04]: 1,
};

const RdsCompSpinner = ({
  variant,
  spinnerType,
  width,
  height,
  showLabel = false,
  label,
  labelText,
  size: sizeProp,
  layout: layoutProp,
  labelPlacement,
  color,
  colorVariant,
  level: levelProp,
  className,
  sx,
  ref,
  ...rest
}: RdsCompSpinnerProps) => {
  if (spinnerType !== undefined) warnDeprecatedProp("RdsCompSpinner", "spinnerType", "`variant`");
  if (labelText !== undefined) warnDeprecatedProp("RdsCompSpinner", "labelText", "`label`");
  if (colorVariant !== undefined) warnDeprecatedProp("RdsCompSpinner", "colorVariant", "`color`");
  const labelId = useId();
  const size = sizeProp as SpinnerSize | undefined;
  const layout = (labelPlacement ? PLACEMENT_LAYOUT[labelPlacement] : layoutProp) as SpinnerLayout | undefined;
  const level = levelProp as SpinnerLevel | undefined;
  const resolvedVariant = variant ?? spinnerType ?? "border";
  const resolvedLabel = label ?? labelText;
  const resolvedColor = color ?? colorVariant;
  const spinnerClass = resolvedVariant === "grow" ? "spinner-grow" : "spinner-border";
  const colorClass = resolvedColor ? `text-${resolvedColor}` : "";

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
    <Box {...rest} ref={ref} className={clsx("spinner-container", layoutClass, className)} sx={sx}>
      {showLabel && <label id={labelId} className={clsx("spinner-label", labelSizeClass)}>{resolvedLabel}</label>}
      <output
        className={combinedClasses}
        style={{ width: dimensions.width, height: dimensions.height, opacity }}
        aria-live="polite"
        aria-label={resolvedLabel ?? "Loading"}
        aria-labelledby={showLabel ? labelId : undefined}
      />
    </Box>
  );
};

RdsCompSpinner.displayName = "RdsCompSpinner";
export default RdsCompSpinner;
