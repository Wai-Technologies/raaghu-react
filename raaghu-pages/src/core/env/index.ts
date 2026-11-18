/**
 * Typed access to Vite environment variables.
 * Define values in raaghu-pages/.env (see .env.example).
 */
const LOGO_BASE = 'https://raaghustorageaccount.blob.core.windows.net';
const DEFAULT_LOGO_LIGHT_URL = `${LOGO_BASE}/raaghu-blob/raaghu-design-system-lightmode.png`;
const DEFAULT_LOGO_DARK_URL = `${LOGO_BASE}/raaghu-designsystem/raaghu-design-system-darkmode3.png`;

export const env = {
  appName: import.meta.env.VITE_APP_NAME,
  logoUrl: import.meta.env.VITE_APP_LOGO_URL || DEFAULT_LOGO_LIGHT_URL,
  logoDarkUrl: import.meta.env.VITE_APP_LOGO_DARK_URL || DEFAULT_LOGO_DARK_URL,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  user: {
    name: import.meta.env.VITE_USER_NAME,
    email: import.meta.env.VITE_USER_EMAIL,
    avatarUrl: import.meta.env.VITE_USER_AVATAR_URL,
  },
} as const;
