/**
 * Typed access to Vite environment variables.
 * Define values in raaghu-pages/.env (see .env.example).
 */
export const env = {
  appName: import.meta.env.VITE_APP_NAME,
  logoUrl: import.meta.env.VITE_APP_LOGO_URL,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  user: {
    name: import.meta.env.VITE_USER_NAME,
    email: import.meta.env.VITE_USER_EMAIL,
    avatarUrl: import.meta.env.VITE_USER_AVATAR_URL,
  },
} as const;
