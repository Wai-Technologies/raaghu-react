/**
 * Builds flat --rds-* CSS custom property maps from design-tokens.ts.
 * Values mirror the former _custom-properties.scss + _light-compile.scss pipeline.
 */

import {
  animationTokens,
  breakpointTokens,
  colorTokens,
  extendedBreakpointTokens,
  shadowTokens,
  typographyTokens,
} from './design-tokens';

export type RdsThemeMode = 'light' | 'dark';

const tertiaryTokens = colorTokens.tertiary;
const infoPaletteTokens = colorTokens.info;

const white = '#ffffff';
const black = '#000000';

function breakpointCssVars(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(breakpointTokens)) {
    vars[`--rds-breakpoint-${key}`] = value;
  }
  for (const [key, value] of Object.entries(extendedBreakpointTokens)) {
    vars[`--rds-breakpoint-${key}`] = value;
  }
  return vars;
}

function sharedCssVars(): Record<string, string> {
  return {
    '--rds-z-index-base': '0',
    '--rds-z-index-raised': '10',
    '--rds-z-index-dropdown': '100',
    '--rds-z-index-sticky': '200',
    '--rds-z-index-fixed': '300',
    '--rds-z-index-drawer': '400',
    '--rds-z-index-modal': '500',
    '--rds-z-index-tooltip': '600',
    '--rds-z-index-toast': '700',
    '--rds-z-index-layer-1': '1',
    '--rds-z-index-layer-2': '2',
    '--rds-z-index-layer-3': '3',
    '--rds-z-index-local-15': '15',
    '--rds-z-index-local-20': '20',
    '--rds-z-index-local-30': '30',
    '--rds-z-index-local-50': '50',
    '--rds-z-index-portal': '1000',
    '--rds-z-index-picker-portal': '2000',
    '--rds-z-index-banner': 'var(--rds-z-index-raised)',
    '--rds-z-index-overlay': 'var(--rds-z-index-drawer)',
    '--rds-z-index-modal-backdrop': 'var(--rds-z-index-drawer)',
    '--rds-z-index-popover': 'var(--rds-z-index-tooltip)',
    '--rds-font-family-base': typographyTokens.fontFamily.primary,
    '--rds-font-family-monospace': typographyTokens.fontFamily.monospace,
    '--rds-font-size-base': '14px',
    '--rds-line-height-base': typographyTokens.lineHeight.normal.toString(),
    '--rds-font-weight-light': String(typographyTokens.fontWeight.light),
    '--rds-font-weight-regular': String(typographyTokens.fontWeight.normal),
    '--rds-font-weight-normal': String(typographyTokens.fontWeight.normal),
    '--rds-font-weight-medium': String(typographyTokens.fontWeight.medium),
    '--rds-font-weight-semibold': String(typographyTokens.fontWeight.semibold),
    '--rds-font-weight-bold': String(typographyTokens.fontWeight.bold),
    '--rds-letter-spacing-tight': typographyTokens.letterSpacing.tight,
    '--rds-letter-spacing-normal': typographyTokens.letterSpacing.normal,
    '--rds-letter-spacing-wide': typographyTokens.letterSpacing.wide,
    '--rds-letter-spacing-button': '0.02857em',
    '--rds-backdrop-blur': '2px',
    '--rds-font-size-xs': '0.625rem',
    '--rds-font-size-sm': '0.75rem',
    '--rds-font-size-md': '0.875rem',
    '--rds-font-size-lg': '1rem',
    '--rds-font-size-xl': '1.125rem',
    '--rds-font-size-2xl': '1.25rem',
    '--rds-font-size-3xl': '1.5rem',
    '--rds-font-size-4xl': '2rem',
    '--rds-font-size-5xl': '3rem',
    '--rds-spacing-xs': '4px',
    '--rds-spacing-sm': '8px',
    '--rds-spacing-md': '16px',
    '--rds-spacing-lg': '24px',
    '--rds-spacing-xl': '32px',
    '--rds-spacing-2xl': '48px',
    '--rds-spacing-3xl': '64px',
    '--rds-border-radius-none': '0',
    '--rds-border-radius-xs': '2px',
    '--rds-border-radius-sm': '4px',
    '--rds-border-radius-md': '8px',
    '--rds-border-radius-lg': '12px',
    '--rds-border-radius-xl': '16px',
    '--rds-border-radius-pill': '9999px',
    '--rds-border-radius-full': '9999px',
    '--rds-transition-fast': animationTokens.duration.fast,
    '--rds-transition-base': animationTokens.duration.normal,
    '--rds-transition-slow': animationTokens.duration.slow,
    '--rds-transition-ease-in': animationTokens.easing.easeIn,
    '--rds-transition-ease-out': animationTokens.easing.easeOut,
    '--rds-transition-ease-in-out': animationTokens.easing.easeInOut,
    '--rds-elevation-0': shadowTokens.none,
    '--rds-elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    '--rds-elevation-2': '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    '--rds-elevation-3': '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
    '--rds-elevation-4': '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
    '--rds-elevation-5': '0 20px 40px rgba(0, 0, 0, 0.20)',
    '--rds-code-bg': '#0b1220',
    '--rds-code-color': '#e6eef6',
    '--rds-form-control-asterisk-font-weight': '600',
    '--rds-form-control-fullwidth-margin-right': '35px',
    '--rds-placeholder-color-light': 'rgba(0, 0, 0, 0.6)',
    '--rds-placeholder-color-dark': 'rgba(255, 255, 255, 0.65)',
    '--rds-border-opacity-light': 'rgba(0, 0, 0, 0.12)',
    '--rds-border-opacity-dark': 'rgba(255, 255, 255, 0.12)',
    '--rds-focus-ring-offset': '2px',
    '--rds-card-bg': 'var(--rds-background-paper)',
    '--rds-card-border': 'var(--rds-border-light)',
    '--rds-modal-backdrop': 'rgba(0, 0, 0, 0.5)',
  };
}

function lightThemeCssVars(): Record<string, string> {
  const p = colorTokens.primary;
  const s = colorTokens.secondary;
  const t = tertiaryTokens;
  const n = colorTokens.neutral;
  const e = colorTokens.error;
  const w = colorTokens.warning;
  const su = colorTokens.success;
  const i = infoPaletteTokens;

  return {
    '--rds-primary-main': p[700],
    '--rds-primary-light': p[100],
    '--rds-primary-dark': p[600],
    '--rds-primary-contrast-text': white,
    '--rds-surface-primary-darker': p[800],
    '--rds-surface-primary-dark': p[700],
    '--rds-surface-primary-medium': p[100],
    '--rds-surface-primary-light': p[50],
    '--rds-surface-primary-subtle': p[50],
    '--rds-surface-neutral-darker': '#202020',
    '--rds-surface-neutral-dark': '#4C4C4C',
    '--rds-surface-neutral-medium': '#CDCDCD',
    '--rds-surface-neutral-light': n[200],
    '--rds-surface-neutral-subtle': white,
    '--rds-secondary-main': s[700],
    '--rds-secondary-light': s[100],
    '--rds-secondary-dark': s[600],
    '--rds-secondary-contrast-text': white,
    '--rds-tertiary-main': t[500],
    '--rds-tertiary-light': t[100],
    '--rds-tertiary-dark': t[600],
    '--rds-tertiary-contrast-text': white,
    '--rds-neutral-main': n[700],
    '--rds-neutral-light': n[100],
    '--rds-neutral-dark': n[600],
    '--rds-neutral-contrast-text': white,
    '--rds-neutral-0': white,
    '--rds-neutral-50': n[50],
    '--rds-neutral-100': n[100],
    '--rds-neutral-200': n[200],
    '--rds-neutral-300': n[300],
    '--rds-neutral-400': n[400],
    '--rds-neutral-500': n[500],
    '--rds-neutral-600': n[600],
    '--rds-neutral-700': n[700],
    '--rds-neutral-800': n[800],
    '--rds-neutral-900': n[900],
    '--rds-surface-dark': '#424242',
    '--rds-surface-dark-hover': '#505050',
    '--rds-surface-dark-alt': '#3a3a3a',
    '--rds-surface-dark-deep': '#2a2a2a',
    '--rds-border-dark-elevated': '#5a5a5a',
    '--rds-error-main': e[700],
    '--rds-error-light': e[100],
    '--rds-error-dark': e[600],
    '--rds-error-contrast-text': white,
    '--rds-warning-main': w[700],
    '--rds-warning-light': w[100],
    '--rds-warning-dark': w[600],
    '--rds-warning-contrast-text': white,
    '--rds-success-main': su[700],
    '--rds-success-light': su[100],
    '--rds-success-dark': su[600],
    '--rds-success-contrast-text': white,
    '--rds-info-main': i[400],
    '--rds-info-light': i[50],
    '--rds-info-dark': i[600],
    '--rds-info-contrast-text': white,
    '--rds-background-default': white,
    '--rds-background-paper': white,
    '--rds-background-surface': n[50],
    '--rds-background-overlay': 'rgba(0, 0, 0, 0.5)',
    '--rds-text-primary': n[900],
    '--rds-text-secondary': n[600],
    '--rds-text-disabled': n[400],
    '--rds-text-hint': n[500],
    '--rds-border-default': n[300],
    '--rds-border-light': n[200],
    '--rds-border-dark': n[400],
    '--rds-border-focus': 'var(--rds-primary-main)',
    '--rds-button-primary-bg': p[700],
    '--rds-button-primary-bg-hover': p[750],
    '--rds-button-primary-bg-active': p[800],
    '--rds-button-primary-bg-disabled': p[100],
    '--rds-button-primary-text': white,
    '--rds-button-primary-text-disabled': p[300],
    '--rds-button-secondary-bg': 'transparent',
    '--rds-button-secondary-bg-hover': '#EBDCFF',
    '--rds-button-secondary-bg-active': '#D4BBFF',
    '--rds-button-secondary-border': s[700],
    '--rds-button-secondary-border-hover': s[750],
    '--rds-button-secondary-text': '#7825E9',
    '--rds-button-secondary-text-disabled': '#A875FF',
    '--rds-button-text-bg-hover': t[50],
    '--rds-button-text-bg-active': t[100],
    '--rds-button-text-color': t[400],
    '--rds-button-text-color-disabled': t[300],
    '--rds-alert-success-bg': p[50],
    '--rds-alert-success-border': '#7825E9',
    '--rds-alert-success-text': su[600],
    '--rds-alert-error-bg': '#FFDAD6',
    '--rds-alert-error-border': e[700],
    '--rds-alert-error-text': e[600],
    '--rds-alert-warning-bg': '#CDCDCD',
    '--rds-alert-warning-border': w[700],
    '--rds-alert-warning-text': w[600],
    '--rds-alert-info-bg': white,
    '--rds-alert-info-border': n[700],
    '--rds-alert-info-text': i[600],
    '--rds-form-bg': white,
    '--rds-form-border': n[300],
    '--rds-form-border-focus': p[700],
    '--rds-form-bg-focus': white,
    '--rds-placeholder-color': 'var(--rds-placeholder-color-light)',
    '--rds-form-control-asterisk-color': e[700],
    '--rds-badge-error-bg': e[700],
    '--rds-badge-error-text': white,
    '--rds-badge-warning-bg': w[700],
    '--rds-badge-warning-text': white,
    '--rds-badge-neutral-bg': n[700],
    '--rds-badge-neutral-text': white,
    '--rds-overlay-dark': 'rgba(0, 0, 0, 0.5)',
    '--rds-overlay-darker': 'rgba(0, 0, 0, 0.7)',
    '--rds-overlay-semi': 'rgba(128, 128, 128, 0.4)',
    '--rds-action-hover': 'rgba(0, 0, 0, 0.04)',
    '--rds-action-active': 'rgba(0, 0, 0, 0.54)',
    '--rds-action-disabled': 'rgba(0, 0, 0, 0.26)',
    '--rds-tooltip-bg': n[900],
    '--rds-tooltip-text': white,
    '--rds-focus-ring': '0 0 0 2px var(--rds-primary-main)',
    '--rds-color-hover-bg': 'var(--rds-action-hover)',
    '--rds-color-disabled-bg': 'var(--rds-neutral-50)',
    '--rds-color-disabled-text': 'var(--rds-text-disabled)',
    '--rds-background-disabled': 'var(--rds-color-disabled-bg)',
    '--rds-border-disabled': 'var(--rds-border-light)',
    '--rds-color-surface': 'var(--rds-background-paper)',
    '--rds-color-surface-variant': 'var(--rds-background-surface)',
    '--rds-color-surface-hover': 'var(--rds-action-hover)',
    '--rds-color-surface-dark': 'var(--rds-surface-dark)',
    '--rds-color-on-surface': 'var(--rds-text-primary)',
    '--rds-color-on-surface-variant': 'var(--rds-text-secondary)',
    '--rds-color-outline': 'var(--rds-border-default)',
    '--rds-color-outline-variant': 'var(--rds-border-light)',
    '--rds-color-primary': 'var(--rds-primary-main)',
    '--rds-color-primary-dark': 'var(--rds-primary-dark)',
    '--rds-color-primary-hover': 'var(--rds-primary-light)',
    '--rds-color-primary-container': 'color-mix(in srgb, var(--rds-primary-main) 8%, transparent)',
    '--rds-color-primary-container-hover': 'color-mix(in srgb, var(--rds-primary-main) 12%, transparent)',
    '--rds-color-info': 'var(--rds-info-main)',
    '--rds-color-info-container': 'var(--rds-info-light)',
    '--rds-color-on-info': 'var(--rds-info-contrast-text)',
    '--rds-color-on-info-container': 'var(--rds-info-dark)',
    '--rds-color-success': 'var(--rds-success-main)',
    '--rds-color-success-container': 'var(--rds-success-light)',
    '--rds-color-on-success-container': 'var(--rds-success-dark)',
    '--rds-color-error': 'var(--rds-error-main)',
    '--rds-color-danger': 'var(--rds-error-main)',
    '--rds-color-error-container': 'var(--rds-error-light)',
    '--rds-color-on-error-container': 'var(--rds-error-dark)',
    '--rds-color-warning': 'var(--rds-warning-main)',
    '--rds-color-secondary': 'var(--rds-secondary-main)',
    '--rds-primary-alpha-10': 'color-mix(in srgb, var(--rds-primary-main) 10%, transparent)',
    '--rds-secondary-alpha-10': 'color-mix(in srgb, var(--rds-secondary-main) 10%, transparent)',
    '--rds-color-border': 'var(--rds-border-default)',
    '--rds-color-border-disabled': 'var(--rds-border-light)',
    '--rds-color-on-primary': 'var(--rds-primary-contrast-text)',
    '--rds-rating-color-dark': 'var(--rds-text-primary)',
    '--rds-rating-color-light': 'var(--rds-border-default)',
  };
}

function darkThemeCssVars(): Record<string, string> {
  const p = colorTokens.primary;
  const s = colorTokens.secondary;
  const t = tertiaryTokens;
  const n = colorTokens.neutral;
  const e = colorTokens.error;
  const w = colorTokens.warning;
  const su = colorTokens.success;

  return {
    '--rds-primary-main': p[200],
    '--rds-primary-light': p[100],
    '--rds-primary-dark': p[400],
    '--rds-primary-contrast-text': n[900],
    '--rds-surface-primary-darker': p[200],
    '--rds-surface-primary-dark': p[400],
    '--rds-surface-primary-medium': p[600],
    '--rds-surface-primary-light': p[800],
    '--rds-surface-primary-subtle': p[900],
    '--rds-surface-neutral-darker': n[200],
    '--rds-surface-neutral-dark': n[400],
    '--rds-surface-neutral-medium': n[700],
    '--rds-surface-neutral-light': n[800],
    '--rds-surface-neutral-subtle': black,
    '--rds-secondary-main': s[200],
    '--rds-secondary-light': s[100],
    '--rds-secondary-dark': s[400],
    '--rds-secondary-contrast-text': n[900],
    '--rds-tertiary-main': t[200],
    '--rds-tertiary-light': t[100],
    '--rds-tertiary-dark': t[400],
    '--rds-neutral-main': n[200],
    '--rds-neutral-light': n[100],
    '--rds-neutral-dark': n[400],
    '--rds-error-main': e[200],
    '--rds-error-light': e[100],
    '--rds-error-dark': e[400],
    '--rds-warning-main': w[200],
    '--rds-warning-light': w[100],
    '--rds-warning-dark': w[400],
    '--rds-success-main': su[200],
    '--rds-success-light': su[100],
    '--rds-success-dark': su[400],
    '--rds-info-main': p[200],
    '--rds-info-light': p[100],
    '--rds-info-dark': p[400],
    '--rds-background-default': n[900],
    '--rds-background-paper': n[800],
    '--rds-background-surface': n[800],
    '--rds-background-overlay': 'rgba(0, 0, 0, 0.7)',
    '--rds-text-primary': white,
    '--rds-text-secondary': n[400],
    '--rds-text-disabled': n[600],
    '--rds-text-hint': n[500],
    '--rds-border-default': n[700],
    '--rds-border-light': n[800],
    '--rds-border-dark': n[600],
    '--rds-color-on-surface': 'var(--rds-text-primary)',
    '--rds-color-on-surface-variant': 'var(--rds-text-secondary)',
    '--rds-color-outline': 'var(--rds-border-default)',
    '--rds-color-outline-variant': 'var(--rds-border-light)',
    '--rds-color-surface-variant': 'var(--rds-background-surface)',
    '--rds-color-surface-hover': 'var(--rds-action-hover)',
    '--rds-color-primary': 'var(--rds-primary-main)',
    '--rds-color-primary-hover': 'var(--rds-primary-light)',
    '--rds-color-success': 'var(--rds-success-main)',
    '--rds-color-error': 'var(--rds-error-main)',
    '--rds-color-danger': 'var(--rds-error-main)',
    '--rds-color-warning': 'var(--rds-warning-main)',
    '--rds-color-info': 'var(--rds-info-main)',
    '--rds-color-secondary': 'var(--rds-secondary-main)',
    '--rds-rating-color-dark': 'var(--rds-text-primary)',
    '--rds-rating-color-light': 'var(--rds-border-default)',
    '--rds-color-surface': n[800],
    '--rds-color-surface-dark': '#424242',
    '--rds-color-surface-variant-dark': '#303030',
    '--rds-color-surface-selected-dark': '#3b3b3b',
    '--rds-color-surface-hover': '#505050',
    '--rds-color-on-surface-dark': white,
    '--rds-color-on-surface-variant-dark': '#E1E6EB',
    '--rds-color-on-primary': n[900],
    '--rds-color-disabled-surface-dark': '#272727',
    '--rds-color-disabled-text-dark': '#9e9e9e',
    '--rds-color-hover-bg': '#3a3a3a',
    '--rds-color-disabled-bg': '#2a2a2a',
    '--rds-elevation-2-dark': '0 4px 8px rgba(0, 0, 0, 0.6)',
    '--rds-elevation-focus-dark': '0 0 0 1px rgba(255, 255, 255, 0.04)',
    '--rds-action-hover': 'rgba(255, 255, 255, 0.08)',
    '--rds-action-active': 'rgba(255, 255, 255, 0.16)',
    '--rds-action-disabled': 'rgba(255, 255, 255, 0.3)',
    '--rds-placeholder-color': 'var(--rds-placeholder-color-dark)',
    '--rds-toggle-group-border-light': 'rgba(255, 255, 255, 0.23)',
    '--rds-toggle-group-border-disabled-light': 'rgba(100, 100, 100, 0.5)',
    '--rds-tooltip-bg': white,
    '--rds-tooltip-color': black,
    '--rds-tooltip-border': white,
    '--rds-color-scrollbar-track': '#2a2a2a',
    '--rds-color-scrollbar-thumb': '#555555',
    '--rds-color-scrollbar-thumb-hover': '#6a6a6a',
    '--rds-color-on-surface-dark-icon': white,
    '--rds-color-surface-container': '#4a4a4a',
    '--rds-color-hover-dark': '#4a4a4a',
    '--rds-grid-bg': '#424242',
    '--rds-grid-bg-alt': '#3a3a3a',
    '--rds-grid-header-bg': '#424242',
    '--rds-grid-text': white,
    '--rds-grid-text-subtle': '#bdbdbd',
    '--rds-grid-border': '#5a5a5a',
    '--rds-grid-border-soft': '#5a5a5a',
    '--rds-grid-border-alt': '#5a5a5a',
    '--rds-grid-row-hover': '#505050',
    '--rds-color-border-dark': '#44474A',
    '--rds-color-surface-hover-dark': '#1F2123',
    '--rds-color-icon-muted-dark': '#B0B3B8',
    '--rds-offcanvas-cancel-color': '#2196F3',
    '--rds-color-surface-variant-hover-dark': '#b9b7b7',
    '--rds-color-disabled-container-dark': '#4a4a4a',
  };
}

export function buildRdsCssVars(mode: RdsThemeMode): Record<string, string> {
  const themeVars = mode === 'dark' ? darkThemeCssVars() : lightThemeCssVars();
  return {
    ...sharedCssVars(),
    ...breakpointCssVars(),
    ...themeVars,
  };
}

const TRACKED_CSS_VAR_KEYS = new Set<string>();

/**
 * Injects all --rds-* tokens onto document.documentElement.
 * Call on app mount and whenever the theme mode changes.
 */
export function injectTokens(mode: RdsThemeMode | 'semi-dark' = 'light'): void {
  if (typeof document === 'undefined') return;

  const resolved: RdsThemeMode = mode === 'dark' ? 'dark' : 'light';
  const vars = buildRdsCssVars(resolved);
  const root = document.documentElement;

  for (const key of TRACKED_CSS_VAR_KEYS) {
    if (!(key in vars)) {
      root.style.removeProperty(key);
    }
  }
  TRACKED_CSS_VAR_KEYS.clear();

  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value);
    TRACKED_CSS_VAR_KEYS.add(name);
  }
}
