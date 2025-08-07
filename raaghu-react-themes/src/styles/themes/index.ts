/**
 * Theme index file
 * Export all theme-related objects and utilities from here
 */

// Export themes
export { lightTheme } from './lightTheme';
export { darkTheme } from './darkTheme';

// Re-export other theme-related utilities and tokens
export * from '../../../tokens/design-tokens';

// Theme type definitions
export type ThemeMode = 'light' | 'dark' | 'semi-dark';

/**
 * Get the appropriate theme based on mode
 */
export function getThemeByMode(mode: ThemeMode) {
  // Import the themes locally to avoid circular dependencies
  const { lightTheme } = require('./lightTheme');
  const { darkTheme } = require('./darkTheme');
  
  switch(mode) {
    case 'dark':
      return darkTheme;
    case 'semi-dark':
      // If implemented in the future, return semi-dark theme
      return darkTheme;
    case 'light':
    default:
      return lightTheme;
  }
}
