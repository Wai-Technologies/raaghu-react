import { colorTokens } from './design-tokens';

const AA_NORMAL_TEXT = 4.5;

function hexToRgb(hex: string): [number, number, number] | null {
  const raw = hex.trim().replace('#', '');
  if (!/^[\da-fA-F]{3}$|^[\da-fA-F]{6}$/.test(raw)) return null;
  const full = raw.length === 3 ? raw.split('').map((channel) => channel + channel).join('') : raw;
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ];
}

function linearize(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return 0.2126 * linearize(rgb[0]) + 0.7152 * linearize(rgb[1]) + 0.0722 * linearize(rgb[2]);
}

/** WCAG 2.1 contrast ratio. Returns null when either color is not a hex. */
export function contrastRatio(foreground: string, background: string): number | null {
  const fg = luminance(foreground);
  const bg = luminance(background);
  if (fg === null || bg === null) return null;
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Text color that reaches WCAG 2.1 AA (4.5:1) on `background`.
 * White is used when it passes; otherwise neutral 900.
 */
export function contrastText(background: string): string {
  const white = colorTokens.neutral[0];
  const dark = colorTokens.neutral[900];
  const whiteRatio = contrastRatio(white, background);
  if (whiteRatio !== null && whiteRatio >= AA_NORMAL_TEXT) return white;
  return dark;
}
