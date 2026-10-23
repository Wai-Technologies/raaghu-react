export const SpinnerSize = {
  Default: 'Default',
  Small: 'Small',
  Large: 'Large',
  Medium: 'Medium',
} as const;
export type SpinnerSize = (typeof SpinnerSize)[keyof typeof SpinnerSize];

export const SpinnerLayout = {
  LabelOnBottom: 'Label on bottom',
  LabelAndSpinner: 'Label + Spinner',
  SpinnerAndLabel: 'Spinner + Label',
  LabelOnTop: 'Label on top',
} as const;
export type SpinnerLayout = (typeof SpinnerLayout)[keyof typeof SpinnerLayout];

export const SpinnerLevel = {
  Level01: '01',
  Level02: '02',
  Level03: '03',
  Level04: '04',
} as const;
export type SpinnerLevel = (typeof SpinnerLevel)[keyof typeof SpinnerLevel];

import type { Ref } from "react";
import type { SxProps, Theme } from "@mui/material";

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
  size?: SpinnerSize;
  layout?: SpinnerLayout;
  /** Label position relative to the spinner; wins over `layout`. */
  labelPlacement?: "top" | "bottom" | "start" | "end";
  /** Colour name applied as `text-{color}`. */
  color?: string;
  /** @deprecated Use `color` instead. */
  colorVariant?: string;
  level?: SpinnerLevel;
  className?: string;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
}
