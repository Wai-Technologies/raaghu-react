import type { HTMLAttributes, Ref } from "react";

export const ColorPickerType = {
  Default: 'Default',
  Button: 'Button',
  ButtonExpanded: 'Button-Expanded',
} as const;
export type ColorPickerType = (typeof ColorPickerType)[keyof typeof ColorPickerType];

export type ColorPickerVariant = 'inline' | 'button' | 'button-expanded';
export type ColorPickerFormat = 'hex' | 'rgb' | 'hsb' | 'hsl';
export type ColorPickerView = 'grid' | 'spectrum';

export const PickerType = {
  Grid: 'Grid',
  Spectrum: 'Spectrum',
} as const;
export type PickerType = (typeof PickerType)[keyof typeof PickerType];

export const ColorMode = {
  HEX: 'HEX',
  RGB: 'RGB',
  HSB: 'HSB',
  HSL: 'HSL',
} as const;
export type ColorMode = (typeof ColorMode)[keyof typeof ColorMode];

export const StyleType = {
  Type1: 'Type 1',
  Type2: 'Type 2',
} as const;
export type StyleType = (typeof StyleType)[keyof typeof StyleType];

/** Extra colour details passed as the second `onChange` argument. */
export interface ColorChangeDetails {
  /** Colour channels (0-255) plus alpha (0-1). */
  rgba: { r: number; g: number; b: number; a: number };
  /** 8-digit hex including alpha, e.g. `#9751F280`. */
  hex8: string;
}

export interface RdsCompColorPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'style' | 'children' | 'id' | 'defaultValue'> {
  /** Selected colour. */
  value?: string;
  /** Initial colour for uncontrolled use. */
  defaultValue?: string;
  /** Disables the picker. Takes precedence over `isDisabled`. */
  disabled?: boolean;
  /** @deprecated Use `disabled` instead. */
  isDisabled?: boolean;
  label: string;
  /** Picker layout. Defaults to `'inline'`. */
  variant?: ColorPickerVariant;
  /** Figma alias of `variant`. */
  type?: ColorPickerType;
  showSwatches?: boolean;
  /** Active view. */
  view?: ColorPickerView;
  /** Initial view. */
  defaultView?: ColorPickerView;
  /** @deprecated Use `view` instead. */
  pickerType?: PickerType;
  showTabs?: boolean;
  /** Colour format shown in the value field. */
  format?: ColorPickerFormat;
  /** Initial colour format. */
  defaultFormat?: ColorPickerFormat;
  /** @deprecated Use `format` instead. */
  colorMode?: ColorMode;
  /** Swatches layout; `'list'` is `StyleType.Type1` and `'grid'` is `StyleType.Type2`. */
  swatchesVariant?: 'list' | 'grid';
  style?: StyleType;
  /**
   * Called with the 6-digit hex when the colour changes. When the opacity (alpha) slider
   * changes, a second argument with `rgba` and `hex8` is passed as well.
   */
  onChange?: (colorHex: string, details?: ColorChangeDetails) => void;
  /** Called when the "add swatch" control in the swatches section is activated. */
  onAddSwatch?: () => void;
  /** Custom swatch colours. Defaults to the built-in list for the selected `style`. */
  swatches?: string[];
  /** Ref to the root `div`. */
  ref?: Ref<HTMLDivElement>;
}
