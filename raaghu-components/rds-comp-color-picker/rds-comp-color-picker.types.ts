import type { CSSProperties, HTMLAttributes, Ref } from "react";
import type { SxProps, Theme } from "@mui/material";

/** Canonical layout union — prefer over {@link ColorPickerType}. */
export type ColorPickerVariant = 'inline' | 'button' | 'button-expanded';
/** Canonical colour format — prefer over {@link ColorMode}. */
export type ColorPickerFormat = 'hex' | 'rgb' | 'hsb' | 'hsl';
/** Canonical view — prefer over {@link PickerType}. */
export type ColorPickerView = 'grid' | 'spectrum';

/** @deprecated Prefer `ColorPickerVariant` (`'inline' | 'button' | 'button-expanded'`). */
export const ColorPickerType = {
  Default: 'Default',
  Button: 'Button',
  ButtonExpanded: 'Button-Expanded',
} as const;
/** @deprecated Prefer `ColorPickerVariant`. */
export type ColorPickerType = (typeof ColorPickerType)[keyof typeof ColorPickerType];

/** @deprecated Prefer `ColorPickerView` (`'grid' | 'spectrum'`). */
export const PickerType = {
  Grid: 'Grid',
  Spectrum: 'Spectrum',
} as const;
/** @deprecated Prefer `ColorPickerView`. */
export type PickerType = (typeof PickerType)[keyof typeof PickerType];

/** @deprecated Prefer `ColorPickerFormat` (`'hex' | 'rgb' | 'hsb' | 'hsl'`). */
export const ColorMode = {
  HEX: 'HEX',
  RGB: 'RGB',
  HSB: 'HSB',
  HSL: 'HSL',
} as const;
/** @deprecated Prefer `ColorPickerFormat`. */
export type ColorMode = (typeof ColorMode)[keyof typeof ColorMode];

/** @deprecated Prefer `swatchesVariant: 'list' | 'grid'`. */
export const StyleType = {
  Type1: 'Type 1',
  Type2: 'Type 2',
} as const;
/** @deprecated Prefer `swatchesVariant`. */
export type StyleType = (typeof StyleType)[keyof typeof StyleType];

/** Extra colour details passed as the second `onChange` argument. */
export interface ColorChangeDetails {
  /** Colour channels (0-255) plus alpha (0-1). */
  rgba: { r: number; g: number; b: number; a: number };
  /** 8-digit hex including alpha, e.g. `#9751F280`. */
  hex8: string;
}

export interface RdsCompColorPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'style' | 'children' | 'defaultValue'> {
  /** Selected colour. */
  value?: string;
  /** Initial colour for uncontrolled use. */
  defaultValue?: string;
  /** Disables the picker. Takes precedence over `isDisabled`. */
  disabled?: boolean;
  /** @deprecated Use `disabled` instead. */
  isDisabled?: boolean;
  /** Label shown in the picker header and used as its accessible name. */
  label: string;
  /** Picker layout. Defaults to `'inline'`. */
  variant?: ColorPickerVariant;
  /** Figma alias of `variant`. */
  type?: ColorPickerType;
  /** Shows the swatches section. */
  showSwatches?: boolean;
  /** Active view. */
  view?: ColorPickerView;
  /** Initial view. */
  defaultView?: ColorPickerView;
  /** @deprecated Use `view` instead. */
  pickerType?: PickerType;
  /** Shows the tabs for switching between picker views. */
  showTabs?: boolean;
  /** Colour format shown in the value field. */
  format?: ColorPickerFormat;
  /** Initial colour format. */
  defaultFormat?: ColorPickerFormat;
  /** @deprecated Use `format` instead. */
  colorMode?: ColorMode;
  /** Swatches layout; `'list'` is `StyleType.Type1` and `'grid'` is `StyleType.Type2`. */
  swatchesVariant?: 'list' | 'grid';
  /** @deprecated Passing a variant string is deprecated; use `swatchesVariant`. Pass CSSProperties for inline styles. */
  style?: StyleType | CSSProperties;
  /**
   * Called with the 6-digit hex when the colour changes. When the opacity (alpha) slider
   * changes, a second argument with `rgba` and `hex8` is passed as well.
   */
  onChange?: (colorHex: string, details?: ColorChangeDetails) => void;
  /** Called when the "add swatch" control in the swatches section is activated. */
  onAddSwatch?: () => void;
  /** Custom swatch colours. Defaults to the built-in list for the selected `style`. */
  swatches?: string[];
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref to the root `div`. */
  ref?: Ref<HTMLDivElement>;
}
