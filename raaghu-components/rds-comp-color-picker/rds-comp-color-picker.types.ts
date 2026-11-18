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

export interface RdsCompColorPickerProps {
  value: string;
  isDisabled?: boolean;
  disabled?: boolean;
  label: string;
  type: ColorPickerType;
  showSwatches?: boolean;
  pickerType?: PickerType;
  showTabs?: boolean;
  colorMode?: ColorMode;
  style?: StyleType;
  onChange?: (colorHex: string, details?: { rgba: { r: number; g: number; b: number; a: number }; hex8: string }) => void;
}
