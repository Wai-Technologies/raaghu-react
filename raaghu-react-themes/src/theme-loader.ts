/**
 * Theme Loader for Raaghu Design System
 * 
 * This file provides a way to apply theme classes and attributes for proper theme switching.
 */

/**
 * Apply a theme by adding proper classes and attributes
 * @param mode 'light' | 'dark'
 */
export function loadTheme(mode: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;

  // Set the theme attribute on the document element
  document.documentElement.setAttribute('data-theme', mode);
  
  // Add theme-specific classes to body to ensure SCSS variables are properly applied
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${mode}-theme`);
  
  // If using localStorage, store the preference
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('raaghu-theme', mode);
  }
}

/**
 * Initialize the theme based on user preferences or stored setting
 */
export function initializeTheme(): 'light' | 'dark' {
  // Check if there's a stored theme preference
  const storedTheme = typeof localStorage !== 'undefined' ? 
    localStorage.getItem('raaghu-theme') : null;
  
  // Or check user system preferences
  const prefersDark = 
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Determine theme
  const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark) ? 'dark' : 'light';
  
  // Load the theme
  loadTheme(initialTheme);
  
  return initialTheme;
}

export default {
  loadTheme,
  initializeTheme
};
