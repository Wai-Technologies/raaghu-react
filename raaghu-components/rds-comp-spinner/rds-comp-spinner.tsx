import clsx from "clsx";
import { useId, useMemo } from "react";
import { Box } from "@mui/material";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-spinner.scss";
export { SpinnerSize, SpinnerLayout, SpinnerLevel, type RdsCompSpinnerProps } from './rds-comp-spinner-types';
import { SpinnerSize, SpinnerLayout, SpinnerLevel, type RdsCompSpinnerProps } from './rds-comp-spinner-types';

/** Inline sizes use the `--rds-spinner-size-*` vars from scss (G6-103); tests assert these strings. */
const SIZE_DIMENSIONS: Record<SpinnerSize, { width: string; height: string }> = {
  [SpinnerSize.Default]: { width: "var(--rds-spinner-size-default)", height: "var(--rds-spinner-size-default)" },
  [SpinnerSize.Small]: { width: "var(--rds-spinner-size-small)", height: "var(--rds-spinner-size-small)" },
  [SpinnerSize.Medium]: { width: "var(--rds-spinner-size-medium)", height: "var(--rds-spinner-size-medium)" },
  [SpinnerSize.Large]: { width: "var(--rds-spinner-size-large)", height: "var(--rds-spinner-size-large)" },
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

const LEGACY_SIZE_MAP: Record<string, SpinnerSize> = {
  Default: SpinnerSize.Default,
  Small: SpinnerSize.Small,
  Medium: SpinnerSize.Medium,
  Large: SpinnerSize.Large,
  default: SpinnerSize.Default,
  small: SpinnerSize.Small,
  medium: SpinnerSize.Medium,
  large: SpinnerSize.Large,
};

const normalizeSpinnerSize = (
  value: string | number | undefined
): SpinnerSize | number | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === "number") return value;
  return LEGACY_SIZE_MAP[value] ?? (value as SpinnerSize);
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

/**
 * @deprecated Prefer `RdsLoader` for indeterminate loading (G6-098).
 */
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
  const size = normalizeSpinnerSize(sizeProp);
  const layout = (labelPlacement ? PLACEMENT_LAYOUT[labelPlacement] : layoutProp) as SpinnerLayout | undefined;
  const level = levelProp as SpinnerLevel | undefined;
  const resolvedVariant = variant ?? spinnerType ?? "border";
  const resolvedLabel = label ?? labelText;
  const resolvedColor = color ?? colorVariant;
  const spinnerClass = resolvedVariant === "grow" ? "spinner-grow" : "spinner-border";
  const colorClass = resolvedColor ? `text-${resolvedColor}` : "";
  const tokenSize = typeof size === "string" ? size : undefined;

  const dimensions = useMemo(() => {
    if (typeof size === "number") {
      return { width: `${size}px`, height: `${size}px` };
    }
    if (size && SIZE_DIMENSIONS[size]) {
      return SIZE_DIMENSIONS[size];
    }
    return { width, height };
  }, [size, width, height]);

  const combinedClasses = clsx(spinnerClass, colorClass, tokenSize && SIZE_CLASS[tokenSize]);
  const layoutClass = layout ? LAYOUT_CLASS[layout] : "spinner-container--default";
  const labelSizeClass = tokenSize ? LABEL_SIZE_CLASS[tokenSize] ?? "spinner-label--default" : "spinner-label--default";
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
