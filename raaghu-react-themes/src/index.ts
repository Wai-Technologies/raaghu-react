// Theme utilities and exports

// Import SCSS once in your app entry:

//   import 'raaghu-react-themes/src/styles/index.scss';

// Wrap the app with:

//   <RaaghuThemeProvider>...</RaaghuThemeProvider>



export { lightTheme, darkTheme } from './mui';
export { designTokens } from '../tokens/design-tokens';
export { injectTokens, buildRdsCssVars, buildStaticCssSnapshot, type RdsThemeMode, type RdsBrandOverrides } from '../tokens/build-rds-css-vars';

export {

  RaaghuThemeProvider,

  useRaaghuTheme,

  type RaaghuThemeProviderProps,

} from './provider/RaaghuThemeProvider';

export {

  applyRaaghuTheme,

  getRaaghuThemeMode,

  initializeRaaghuTheme,

  isDarkMode,

  resolveEffectiveMode,

  THEME_STORAGE_KEY,

  type RaaghuThemeMode,

} from './provider/theme-utils';


