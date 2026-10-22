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
  /** Spinner animation: "border" or "grow". */
  variant?: string;
  /** @deprecated Use `variant` instead. */
  spinnerType?: string;
  width?: string;
  height?: string;
  showLabel?: boolean;
  /** Label text shown when `showLabel` is true; also the accessible name. */
  label?: string;
  /** @deprecated Use `label` instead. */
  labelText?: string;
  size?: SpinnerSize | `${SpinnerSize}`;
  layout?: SpinnerLayout | `${SpinnerLayout}`;
  /** Label position relative to the spinner; wins over `layout`. */
  labelPlacement?: "top" | "bottom" | "start" | "end";
  /** Colour name applied as `text-{color}`. */
  color?: string;
  /** @deprecated Use `color` instead. */
  colorVariant?: string;
  level?: SpinnerLevel | `${SpinnerLevel}`;
}
