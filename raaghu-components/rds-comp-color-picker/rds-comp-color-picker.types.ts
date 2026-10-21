import type { HTMLAttributes, Ref } from "react";

export enum ColorPickerType {
  Default = "Default",
  Button = "Button",
  ButtonExpanded = "Button-Expanded",
}

export enum PickerType {
  Grid = "Grid",
  Spectrum = "Spectrum",
}

export enum ColorMode {
  HEX = "HEX",
  RGB = "RGB",
  HSB = "HSB",
  HSL = "HSL",
}

export enum StyleType {
  Type1 = "Type 1",
  Type2 = "Type 2",
}

/** Extra colour details passed as the second `onChange` argument. */
export interface ColorChangeDetails {
  /** Colour channels (0-255) plus alpha (0-1). */
  rgba: { r: number; g: number; b: number; a: number };
  /** 8-digit hex including alpha, e.g. `#9751F280`. */
  hex8: string;
}

export interface RdsCompColorPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'style' | 'children' | 'id'> {
  value: string;
  /** Disables the picker. Takes precedence over `isDisabled`. */
  disabled?: boolean;
  /** @deprecated Use `disabled` instead. */
  isDisabled?: boolean;
  label: string;
  /** Picker layout. Defaults to `ColorPickerType.Default`. */
  type?: ColorPickerType;
  showSwatches?: boolean;
  pickerType?: PickerType;
  showTabs?: boolean;
  colorMode?: ColorMode;
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
