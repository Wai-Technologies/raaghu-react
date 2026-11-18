/** Raaghu palette tokens that still accept Bootstrap-style `danger`. */
export type RaaghuPaletteColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'error'
  | 'warning'
  | 'light'
  | 'success'
  | 'info'
  | 'dark';

/** Maps legacy `danger` to MUI-aligned `error`. Other tokens pass through. */
export function normalizePaletteColor<T extends string | undefined>(color: T): T | 'error' {
  if (color === 'danger') return 'error';
  return color;
}
