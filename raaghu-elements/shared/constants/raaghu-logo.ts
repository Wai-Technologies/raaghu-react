/**
 * Raaghu logo URLs.
 * Light and dark assets live in different Azure containers; override both with
 * {@link setRaaghuLogoBase} when hosting your own copies.
 */
const RAAGHU_STORAGE_ACCOUNT = 'https://raaghustorageaccount.blob.core.windows.net';
const DEFAULT_LIGHT_BASE = `${RAAGHU_STORAGE_ACCOUNT}/raaghu-blob`;
/** Dark logo is published under `raaghu-designsystem` (not `raaghu-blob`). */
const DEFAULT_DARK_BASE = `${RAAGHU_STORAGE_ACCOUNT}/raaghu-designsystem`;

const LIGHT_FILE = 'raaghu-design-system-lightmode.png';
const DARK_FILE = 'raaghu-design-system-darkmode3.png';

let lightLogoBase = DEFAULT_LIGHT_BASE;
let darkLogoBase = DEFAULT_DARK_BASE;

export const RAAGHU_LOGO_LIGHT_URL = `${DEFAULT_LIGHT_BASE}/${LIGHT_FILE}`;
export const RAAGHU_LOGO_DARK_URL = `${DEFAULT_DARK_BASE}/${DARK_FILE}`;

export type RaaghuLogoMode = 'light' | 'dark';

/**
 * Point both light and dark logos at a different container (no trailing slash).
 * Call with no argument to restore the default published URLs.
 */
export function setRaaghuLogoBase(baseUrl?: string): void {
  if (baseUrl === undefined) {
    lightLogoBase = DEFAULT_LIGHT_BASE;
    darkLogoBase = DEFAULT_DARK_BASE;
    return;
  }
  const base = baseUrl.replace(/\/$/, '');
  lightLogoBase = base;
  darkLogoBase = base;
}

export function getRaaghuLogoUrl(mode: RaaghuLogoMode): string {
  return mode === 'dark' ? `${darkLogoBase}/${DARK_FILE}` : `${lightLogoBase}/${LIGHT_FILE}`;
}

export function getRaaghuLogoUrlFromDark(isDark: boolean): string {
  return getRaaghuLogoUrl(isDark ? 'dark' : 'light');
}
