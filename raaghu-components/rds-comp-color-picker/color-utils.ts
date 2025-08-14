/**
 * Color utility functions for the RdsColorPicker component
 * Helper functions for converting between different color formats
 */

/**
 * Convert RGB to HSB (HSV) color format
 */
export const rgbToHsb = (rgb: { r: number; g: number; b: number }) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const h =
    delta === 0
      ? 0
      : max === r
      ? ((g - b) / delta) % 6
      : max === g
      ? (b - r) / delta + 2
      : (r - g) / delta + 4;
  const s = max === 0 ? 0 : delta / max;
  const v = max;
  return { h: Math.round(h * 60), s: Math.round(s * 100), b: Math.round(v * 100) };
};

/**
 * Convert RGB to HSL color format
 */
export const rgbToHsl = (rgb: { r: number; g: number; b: number }) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const h =
    delta === 0
      ? 0
      : max === r
      ? ((g - b) / delta) % 6
      : max === g
      ? (b - r) / delta + 2
      : (r - g) / delta + 4;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return { h: Math.round(h * 60), s: Math.round(s * 100), l: Math.round(l * 100) };
};

/**
 * Convert HSL to RGB color format
 */
export const hslToRgb = (h: number, s: number, l: number) => {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

/**
 * Convert a single RGB component to a hex string
 */
export const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

/**
 * Convert RGB to Hex color format
 */
export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

/**
 * Convert HEX to RGB color format
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number; a: number } | null => {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  let r, g, b, a = 1;
  
  // Check if it's a 3, 4, 6, or 8 character hex
  if (hex.length === 3) {
    // 3 digits
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 4) {
    // 4 digits (with alpha)
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
    a = parseInt(hex[3] + hex[3], 16) / 255;
  } else if (hex.length === 6) {
    // 6 digits
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (hex.length === 8) {
    // 8 digits (with alpha)
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    a = parseInt(hex.substring(6, 8), 16) / 255;
  } else {
    return null; // Invalid hex
  }
  
  return { r, g, b, a };
};

/**
 * Convert HSV to RGB color format
 * Used for spectrum picker color calculations
 */
export const hsvToRgb = (h: number, s: number, v: number) => {
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0;
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

/**
 * Get color format display value based on selected color mode
 */
export const getColorDisplay = (colorMode: string, colorState: {
  hex: string,
  rgb: { r: number, g: number, b: number, a: number }
}) => {
  switch (colorMode) {
    case 'RGB':
      return `rgb(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b})`;
    case 'HSB':
      const hsb = rgbToHsb(colorState.rgb);
      return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
    case 'HSL':
      const hsl = rgbToHsl(colorState.rgb);
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    case 'HEX':
    default:
      return colorState.hex;
  }
};

/**
 * Handle spectrum area click to calculate new color
 */
export const handleSpectrumClick = (e: React.MouseEvent, currentHue: number, currentAlpha: number) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  
  // Convert coordinates to HSV
  const s = x * 100;
  const v = 100 - (y * 100);
  
  // Convert HSV to RGB
  const rgb = hsvToRgb(currentHue / 360, s / 100, v / 100);
  
  return {
    rgb: { ...rgb, a: currentAlpha },
    hex: rgbToHex(rgb.r, rgb.g, rgb.b)
  };
};
