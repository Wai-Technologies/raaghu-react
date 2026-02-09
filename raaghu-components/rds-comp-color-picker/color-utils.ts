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

export const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

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

export const handleSpectrumClick = (e: React.MouseEvent, currentHue: number, currentAlpha: number) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  const s = x * 100;
  const v = 100 - (y * 100);
  const rgb = hsvToRgb(currentHue / 360, s / 100, v / 100);  
  return {
    rgb: { ...rgb, a: currentAlpha },
    hex: rgbToHex(rgb.r, rgb.g, rgb.b)
  };
};
