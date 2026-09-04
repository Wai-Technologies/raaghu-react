const RAAGHU_BLOB_BASE =
  'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob';

export const RAAGHU_LOGO_LIGHT_URL = `${RAAGHU_BLOB_BASE}/raaghu-design-system-lightmode.png`;
export const RAAGHU_LOGO_DARK_URL =
  'https://raaghustorageaccount.blob.core.windows.net/raaghu-designsystem/raaghu-design-system-darkmode3.png';

export type RaaghuLogoMode = 'light' | 'dark';

export function getRaaghuLogoUrl(mode: RaaghuLogoMode): string {
  return mode === 'dark' ? RAAGHU_LOGO_DARK_URL : RAAGHU_LOGO_LIGHT_URL;
}

export function getRaaghuLogoUrlFromDark(isDark: boolean): string {
  return getRaaghuLogoUrl(isDark ? 'dark' : 'light');
}
