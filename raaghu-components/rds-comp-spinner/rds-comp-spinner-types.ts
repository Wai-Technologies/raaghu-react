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
