interface AppConfig {
  NODE_ENV: string;
  REACT_APP_URL: string;
  REACT_APP_API_URL: string;
  REACT_APP_GRANT_TYPE: string;
  REACT_APP_CLIENT_ID: string;
  REACT_APP_SCOPE: string;
  REACT_APP_REPLACE_URL: boolean;
}

const getConfig = (): AppConfig => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  REACT_APP_URL: localStorage.getItem('REACT_APP_URL') || 'http://localhost:8080',
  REACT_APP_API_URL: localStorage.getItem('REACT_APP_API_URL') || 'https://abpstagereact12api.raaghu.io',
  REACT_APP_GRANT_TYPE: localStorage.getItem('REACT_APP_GRANT_TYPE') || 'authorization_code',
  REACT_APP_CLIENT_ID: localStorage.getItem('REACT_APP_CLIENT_ID') || 'abp_react_7_2_2_App',
  REACT_APP_SCOPE:
    localStorage.getItem('REACT_APP_SCOPE') ||
    'address openid email phone profile roles offline_access abp_react_7_2_2',
  REACT_APP_REPLACE_URL: localStorage.getItem('REACT_APP_REPLACE_URL') === 'true',
});

const setConfig = (newConfig: Partial<AppConfig>): void => {
    debugger
  Object.entries(newConfig).forEach(([key, value]) => {
    localStorage.setItem(key, String(value));
  });
};

export { getConfig, setConfig };