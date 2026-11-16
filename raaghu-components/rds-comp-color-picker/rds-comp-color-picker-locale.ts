/** Overridable UI strings of the colour picker. */
export interface RdsCompColorPickerLocaleText {
  colorPicker: string;
  grid: string;
  spectrum: string;
  selectColor: (hex: string) => string;
  saturationBrightness: string;
  saturationBrightnessValue: (saturation: number, brightness: number) => string;
  hue: string;
  opacity: string;
  redChannelValue: string;
  greenChannelValue: string;
  blueChannelValue: string;
  hueValue: string;
  saturationValue: string;
  brightnessValue: string;
  lightnessValue: string;
  hexColorValue: string;
  changeColorMode: string;
  colorFormat: string;
  opacityPercentage: string;
  swatches: string;
  addSwatch: string;
  selectSolidMode: string;
  selectGradientMode: string;
  linear: string;
  radial: string;
  direction: (degrees: number) => string;
  gradientDirection: string;
  selectGradientStop: (index: number) => string;
  gradientStopPosition: (index: number) => string;
  addGradientStop: string;
}

export const DEFAULT_RDS_COMP_COLOR_PICKER_LOCALE_TEXT: RdsCompColorPickerLocaleText = {
  colorPicker: 'Color Picker',
  grid: 'Grid',
  spectrum: 'Spectrum',
  selectColor: (hex) => `Select color ${hex}`,
  saturationBrightness: 'Saturation and brightness',
  saturationBrightnessValue: (s, b) => `Saturation ${s}%, brightness ${b}%`,
  hue: 'Hue',
  opacity: 'Opacity',
  redChannelValue: 'Red channel value',
  greenChannelValue: 'Green channel value',
  blueChannelValue: 'Blue channel value',
  hueValue: 'Hue value',
  saturationValue: 'Saturation value',
  brightnessValue: 'Brightness value',
  lightnessValue: 'Lightness value',
  hexColorValue: 'Hex color value',
  changeColorMode: 'Change color mode',
  colorFormat: 'Color format',
  opacityPercentage: 'Opacity percentage',
  swatches: 'Swatches',
  addSwatch: 'Add swatch',
  selectSolidMode: 'Select solid mode',
  selectGradientMode: 'Select gradient mode',
  linear: 'Linear',
  radial: 'Radial',
  direction: (d) => `Direction: ${d}°`,
  gradientDirection: 'Gradient direction',
  selectGradientStop: (i) => `Select gradient stop ${i}`,
  gradientStopPosition: (i) => `Gradient stop ${i} position`,
  addGradientStop: 'Add gradient stop',
};
