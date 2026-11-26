import { THEME_STORAGE_KEY } from './theme-utils';

export interface InitRaaghuThemeScriptProps {
  /** localStorage key used by RaaghuThemeProvider. @default 'raaghu-theme' */
  storageKey?: string;
  /** Fallback mode when nothing is stored. @default 'system' */
  defaultMode?: 'light' | 'dark' | 'system';
  /** Optional nonce for CSP. */
  nonce?: string;
}

/**
 * Blocking inline script (MUI InitColorSchemeScript pattern) that sets
 * `data-theme` on `<html>` before React hydrates, avoiding a flash of the wrong theme.
 *
 * Place once in the document `<head>` of SSR/SSG apps:
 *
 * ```tsx
 * <html>
 *   <head>
 *     <InitRaaghuThemeScript />
 *   </head>
 *   <body>
 *     <RaaghuThemeProvider>...</RaaghuThemeProvider>
 *   </body>
 * </html>
 * ```
 */
export function InitRaaghuThemeScript({
  storageKey = THEME_STORAGE_KEY,
  defaultMode = 'system',
  nonce,
}: InitRaaghuThemeScriptProps = {}) {
  const script = `(function(){try{var k=${JSON.stringify(storageKey)};var d=${JSON.stringify(defaultMode)};var m=localStorage.getItem(k);if(m!=='light'&&m!=='dark'&&m!=='system')m=d;var e=m==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):m;document.documentElement.setAttribute('data-theme',e);document.documentElement.style.colorScheme=e;}catch(e){}})();`;
  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: script }} />;
}

InitRaaghuThemeScript.displayName = 'InitRaaghuThemeScript';
