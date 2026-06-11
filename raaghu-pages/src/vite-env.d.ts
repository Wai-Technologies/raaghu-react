/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_LOGO_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USER_NAME: string;
  readonly VITE_USER_EMAIL: string;
  readonly VITE_USER_AVATAR_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
