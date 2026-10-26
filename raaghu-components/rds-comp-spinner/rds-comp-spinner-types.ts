/** Canonical lowercase size tokens. Enum keys stay PascalCase for existing call sites. */
export const SpinnerSize = {
  Default: 'default',
  Small: 'small',
  Large: 'large',
  Medium: 'medium',
} as const;
export type SpinnerSize = (typeof SpinnerSize)[keyof typeof SpinnerSize];

/** @deprecated PascalCase string sizes; use `SpinnerSize.Small` / `'small'` etc. */
export type SpinnerSizeLegacy = 'Default' | 'Small' | 'Medium' | 'Large';

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

/**
 * Indeterminate spinner.
 * @deprecated Prefer `RdsLoader` from `raaghu-elements` for indeterminate loading,
 * and `RdsProgress` for determinate progress (G6-098).
 */
export interface RdsCompSpinnerProps {
  /** Spinner animation: "border" or "grow". */
  variant?: string;
  /** @deprecated Use `variant` instead. */
  spinnerType?: string;
  /** @deprecated Prefer `size` (token or px number). */
  width?: string;
  /** @deprecated Prefer `size` (token or px number). */
  height?: string;
  showLabel?: boolean;
  /** Label text shown when `showLabel` is true; also the accessible name. */
  label?: string;
  /** @deprecated Use `label` instead. */
  labelText?: string;
  /** Token size, legacy PascalCase size, or a pixel number (G6-102). */
  size?: SpinnerSize | SpinnerSizeLegacy | number;
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
