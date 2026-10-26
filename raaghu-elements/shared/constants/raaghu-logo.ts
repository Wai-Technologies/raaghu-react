/** Single Azure container for both logos (G2-413). Override with {@link setRaaghuLogoBase}. */
const RAAGHU_STORAGE_ACCOUNT = 'https://raaghustorageaccount.blob.core.windows.net';
let raaghuLogoBase = `${RAAGHU_STORAGE_ACCOUNT}/raaghu-blob`;

const LIGHT_FILE = 'raaghu-design-system-lightmode.png';
const DARK_FILE = 'raaghu-design-system-darkmode3.png';

export const RAAGHU_LOGO_LIGHT_URL = `${RAAGHU_STORAGE_ACCOUNT}/raaghu-blob/${LIGHT_FILE}`;
export const RAAGHU_LOGO_DARK_URL = `${RAAGHU_STORAGE_ACCOUNT}/raaghu-blob/${DARK_FILE}`;

export type RaaghuLogoMode = 'light' | 'dark';

/** Point both light and dark logos at a different container (no trailing slash). */
export function setRaaghuLogoBase(baseUrl: string): void {
  raaghuLogoBase = baseUrl.replace(/\/$/, '');
}

export function getRaaghuLogoUrl(mode: RaaghuLogoMode): string {
  return mode === 'dark' ? `${raaghuLogoBase}/${DARK_FILE}` : `${raaghuLogoBase}/${LIGHT_FILE}`;
}

export function getRaaghuLogoUrlFromDark(isDark: boolean): string {
  return getRaaghuLogoUrl(isDark ? 'dark' : 'light');
}
