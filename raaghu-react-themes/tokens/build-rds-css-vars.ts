/**
 * Builds flat --rds-* CSS custom property maps from design-tokens.ts.
 * This file is a pure projection of design-tokens.ts — zero raw hex/rgba/px literals.
 */

import {
  aiGradientTokens,
  alphaTokens,
  animationTokens,
  appBarTokens,
  breakpointTokens,
  colorTokens,
  elevationTokens,
  esignatureTokens,
  extendedBreakpointTokens,
  fabMenuTokens,
  gridTokens,
  iconTokens,
  inputTokens,
  interactiveTokens,
  miscTokens,
  radiusTokens,
  scrollbarTokens,
  semanticAliasTokens,
  shadowTokens,
  spacingTokens,
  spinnerTokens,
  surfaceTokens,
  switchTokens,
  tooltipTokens,
  typographyTokens,
  zIndexTokens,
} from './design-tokens';

export type RdsThemeMode = 'light' | 'dark';

const white = colorTokens.neutral[0];
const black = colorTokens.neutral[1000];
const tertiaryTokens = colorTokens.tertiary;
const infoPaletteTokens = colorTokens.info;

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
    // ── Explicit breakpoint aliases (for static var audits) ─────────────────
    '--rds-breakpoint-xs': breakpointTokens.xs,
    '--rds-breakpoint-sm': breakpointTokens.sm,
    '--rds-breakpoint-md': breakpointTokens.md,
    '--rds-breakpoint-lg': breakpointTokens.lg,
    '--rds-breakpoint-xl': breakpointTokens.xl,
    '--rds-breakpoint-mobile-sm': extendedBreakpointTokens['mobile-sm'],
    '--rds-breakpoint-mobile-md': extendedBreakpointTokens['mobile-md'],
    '--rds-breakpoint-mobile-lg': extendedBreakpointTokens['mobile-lg'],
    '--rds-breakpoint-tablet-sm': extendedBreakpointTokens['tablet-sm'],
    '--rds-breakpoint-tablet-md': extendedBreakpointTokens['tablet-md'],
    '--rds-breakpoint-tablet-lg': extendedBreakpointTokens['tablet-lg'],
    '--rds-breakpoint-280': extendedBreakpointTokens['280'],
    '--rds-breakpoint-340': extendedBreakpointTokens['340'],
    '--rds-breakpoint-360': extendedBreakpointTokens['360'],
    '--rds-breakpoint-375': extendedBreakpointTokens['375'],
    '--rds-breakpoint-380': extendedBreakpointTokens['380'],
    '--rds-breakpoint-400': extendedBreakpointTokens['400'],
    '--rds-breakpoint-420': extendedBreakpointTokens['420'],
    '--rds-breakpoint-430': extendedBreakpointTokens['430'],
    '--rds-breakpoint-514': extendedBreakpointTokens['514'],
    '--rds-breakpoint-568': extendedBreakpointTokens['568'],
    '--rds-breakpoint-576': extendedBreakpointTokens['576'],
    '--rds-breakpoint-600': extendedBreakpointTokens['600'],
    '--rds-breakpoint-640': extendedBreakpointTokens['640'],
    '--rds-breakpoint-650': extendedBreakpointTokens['650'],
    '--rds-breakpoint-700': extendedBreakpointTokens['700'],
    '--rds-breakpoint-767': extendedBreakpointTokens['767'],
    '--rds-breakpoint-769': extendedBreakpointTokens['769'],
    '--rds-breakpoint-800': extendedBreakpointTokens['800'],
    '--rds-breakpoint-833': extendedBreakpointTokens['833'],
    '--rds-breakpoint-834': extendedBreakpointTokens['834'],
    '--rds-breakpoint-835': extendedBreakpointTokens['835'],
    '--rds-breakpoint-840': extendedBreakpointTokens['840'],
    '--rds-breakpoint-896': extendedBreakpointTokens['896'],
    '--rds-breakpoint-991': extendedBreakpointTokens['991'],
    '--rds-breakpoint-992': extendedBreakpointTokens['992'],
    '--rds-breakpoint-1023': extendedBreakpointTokens['1023'],
    '--rds-breakpoint-1025': extendedBreakpointTokens['1025'],
    '--rds-breakpoint-1112': extendedBreakpointTokens['1112'],
    '--rds-breakpoint-1280': extendedBreakpointTokens['1280'],
    '--rds-breakpoint-1600': extendedBreakpointTokens['1600'],
    // ── Z-index ──────────────────────────────────────────────────────────────
    // Local / utility layers (component-internal stacking, not MUI-level)
    '--rds-z-index-hide': String(zIndexTokens.hide),
    '--rds-z-index-base': String(zIndexTokens.base),
    '--rds-z-index-docked': String(zIndexTokens.docked),
    '--rds-z-index-raised': String(zIndexTokens.docked),   // alias: same as docked (10)
    '--rds-z-index-layer-1': '1',
    '--rds-z-index-layer-2': '2',
    '--rds-z-index-layer-3': '3',
    '--rds-z-index-local-15': '15',
    '--rds-z-index-local-20': '20',
    '--rds-z-index-local-30': '30',
    '--rds-z-index-local-50': '50',
    // MUI-aligned scale (matches zIndexTokens in design-tokens.ts)
    '--rds-z-index-dropdown': String(zIndexTokens.dropdown),   // 1000
    '--rds-z-index-sticky': String(zIndexTokens.sticky),       // 1100
    '--rds-z-index-banner': String(zIndexTokens.banner),       // 1200
    '--rds-z-index-fixed': String(zIndexTokens.banner),        // 1200 — alias for banner
    '--rds-z-index-drawer': String(zIndexTokens.banner),       // 1200 — drawers sit at banner level
    '--rds-z-index-overlay': String(zIndexTokens.overlay),     // 1300
    '--rds-z-index-modal': String(zIndexTokens.modal),         // 1400
    '--rds-z-index-modal-backdrop': String(zIndexTokens.overlay), // 1300 — backdrop below modal
    '--rds-z-index-popover': String(zIndexTokens.popover),     // 1500
    '--rds-z-index-skip-link': String(zIndexTokens.skipLink),  // 1600
    '--rds-z-index-toast': String(zIndexTokens.toast),         // 1700
    '--rds-z-index-tooltip': String(zIndexTokens.tooltip),     // 1800
    // Portal helpers (above all MUI layers)
    '--rds-z-index-portal': String(zIndexTokens.tooltip + 200),        // 2000
    '--rds-z-index-picker-portal': String(zIndexTokens.tooltip + 200), // 2000
    // ── Typography ───────────────────────────────────────────────────────────
    '--rds-font-family-base': typographyTokens.fontFamily.primary,
    '--rds-font-family': typographyTokens.fontFamily.primary,
    '--rds-font-family-poppins': typographyTokens.fontFamily.primary,
    '--rds-font-family-monospace': typographyTokens.fontFamily.monospace,
    '--rds-font-size-base': miscTokens.fontSizeBase,
    '--rds-font-size-body': typographyTokens.fontSize.sm,
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
    '--rds-letter-spacing-button': miscTokens.letterSpacingButton,
    '--rds-backdrop-blur': miscTokens.backdropBlur,
    // ── Font sizes (component scale) ─────────────────────────────────────────
    '--rds-font-size-xs': typographyTokens.fontSize.xs,
    '--rds-font-size-sm': typographyTokens.fontSize.sm,
    '--rds-font-size-md': typographyTokens.fontSize.base,
    '--rds-font-size-lg': typographyTokens.fontSize.lg,
    '--rds-font-size-xl': typographyTokens.fontSize.xl,
    '--rds-font-size-2xl': typographyTokens.fontSize['2xl'],
    '--rds-font-size-3xl': typographyTokens.fontSize['3xl'],
    '--rds-font-size-4xl': typographyTokens.fontSize['4xl'],
    '--rds-font-size-5xl': typographyTokens.fontSize['5xl'],
    // ── Typography aliases (legacy component contracts) ─────────────────────
    '--rds-typography-h1-size': typographyTokens.fontSize['5xl'],
    '--rds-typography-h1-size-mobile': typographyTokens.fontSize['4xl'],
    '--rds-typography-h2-size': typographyTokens.fontSize['4xl'],
    '--rds-typography-h2-size-mobile': typographyTokens.fontSize['3xl'],
    '--rds-typography-h3-size': typographyTokens.fontSize['3xl'],
    '--rds-typography-h4-size': typographyTokens.fontSize['2xl'],
    '--rds-typography-h5-size': typographyTokens.fontSize.xl,
    '--rds-typography-h6-size': typographyTokens.fontSize.lg,
    '--rds-typography-body1-size': typographyTokens.fontSize.base,
    '--rds-typography-body2-size': typographyTokens.fontSize.sm,
    '--rds-typography-caption-size': typographyTokens.fontSize.xs,
    '--rds-typography-overline-size': typographyTokens.fontSize.xs,
    '--rds-typography-font-weight-light': String(typographyTokens.fontWeight.light),
    '--rds-typography-font-weight-regular': String(typographyTokens.fontWeight.normal),
    '--rds-typography-font-weight-medium': String(typographyTokens.fontWeight.medium),
    // ── Spacing ──────────────────────────────────────────────────────────────
    '--rds-spacing-xs': spacingTokens[1],
    '--rds-spacing-sm': spacingTokens[2],
    '--rds-spacing-md': spacingTokens[4],
    '--rds-spacing-lg': spacingTokens[6],
    '--rds-spacing-xl': spacingTokens[8],
    '--rds-spacing-2xl': spacingTokens[12],
    '--rds-spacing-3xl': spacingTokens[16],
    // ── Border radius ────────────────────────────────────────────────────────
    '--rds-border-radius-none': radiusTokens.none,
    '--rds-border-radius-xs': radiusTokens.sm,
    '--rds-border-radius-sm': radiusTokens.base,
    '--rds-border-radius-md': radiusTokens.lg,
    '--rds-border-radius-lg': radiusTokens.xl,
    '--rds-border-radius-xl': radiusTokens['2xl'],
    '--rds-border-radius-pill': radiusTokens.full,
    '--rds-border-radius-full': radiusTokens.full,
    // ── Transitions ──────────────────────────────────────────────────────────
    '--rds-transition-fast': animationTokens.duration.fast,
    '--rds-transition-base': animationTokens.duration.normal,
    '--rds-transition-slow': animationTokens.duration.slow,
    '--rds-transition-ease-in': animationTokens.easing.easeIn,
    '--rds-transition-ease-out': animationTokens.easing.easeOut,
    '--rds-transition-ease-in-out': animationTokens.easing.easeInOut,
    // ── Elevation shadows ────────────────────────────────────────────────────
    '--rds-elevation-0': elevationTokens[0],
    '--rds-elevation-1': elevationTokens[1],
    '--rds-elevation-2': elevationTokens[2],
    '--rds-elevation-3': elevationTokens[3],
    '--rds-elevation-4': elevationTokens[4],
    '--rds-elevation-5': elevationTokens[5],
    // ── Code block ───────────────────────────────────────────────────────────
    '--rds-code-bg': surfaceTokens.codeBg,
    '--rds-code-color': surfaceTokens.codeColor,
    // ── Form misc ────────────────────────────────────────────────────────────
    '--rds-form-control-asterisk-font-weight': String(typographyTokens.fontWeight.semibold),
    '--rds-form-control-fullwidth-margin-right': spacingTokens[9],
    '--rds-placeholder-color-light': alphaTokens.placeholderLight,
    '--rds-placeholder-color-dark': alphaTokens.placeholderDark,
    '--rds-border-opacity-light': alphaTokens.borderOpacityLight,
    '--rds-border-opacity-dark': alphaTokens.borderOpacityDark,
    '--rds-focus-ring-offset': miscTokens.focusRingOffset,
    '--rds-card-bg': 'var(--rds-background-paper)',
    '--rds-card-border': 'var(--rds-border-light)',
    '--rds-modal-backdrop': alphaTokens.modalBackdrop,
    // ── Input component ──────────────────────────────────────────────────────
    '--rds-input-border-width-thin': inputTokens.borderWidthThin,
    '--rds-input-border-width-thick': inputTokens.borderWidthThick,
    '--rds-input-focus-ring-error': inputTokens.focusRingError,
    '--rds-input-padding-small-y': inputTokens.paddingSmallY,
    '--rds-input-padding-small-x': inputTokens.paddingSmallX,
    '--rds-input-padding-medium-y': inputTokens.paddingMediumY,
    '--rds-input-padding-medium-x': inputTokens.paddingMediumX,
    '--rds-input-padding-large-y': inputTokens.paddingLargeY,
    '--rds-input-padding-large-x': inputTokens.paddingLargeX,
    '--rds-input-mui-padding-small-y': inputTokens.muiPaddingSmallY,
    '--rds-input-mui-padding-medium-y': inputTokens.muiPaddingMediumY,
    '--rds-input-mui-padding-small-x': inputTokens.muiPaddingSmallX,
    '--rds-input-mui-padding-medium-x': inputTokens.muiPaddingMediumX,
    '--rds-input-mui-padding-large-x': inputTokens.muiPaddingLargeX,
    '--rds-input-label-large-x': inputTokens.labelLargeX,
    '--rds-input-label-large-y': inputTokens.labelLargeY,
    '--rds-input-font-size-label': inputTokens.fontSizeLabel,
    '--rds-input-asterisk-offset': inputTokens.asteriskOffset,
    '--rds-input-sr-only-size': inputTokens.srOnlySize,
    '--rds-input-sr-only-offset': inputTokens.srOnlyOffset,
    // ── Spinner component ────────────────────────────────────────────────────
    '--rds-spinner-primary-color': spinnerTokens.primaryColor,
    '--rds-spinner-secondary-color': spinnerTokens.secondaryColor,
    '--rds-spinner-success-color': spinnerTokens.successColor,
    '--rds-spinner-danger-color': spinnerTokens.dangerColor,
    '--rds-spinner-warning-color': spinnerTokens.warningColor,
    '--rds-spinner-info-color': spinnerTokens.infoColor,
    '--rds-spinner-light-color': spinnerTokens.lightColor,
    '--rds-spinner-dark-color': spinnerTokens.darkColor,
    '--rds-spinner-animation-duration': spinnerTokens.animationDuration,
    // ── Tooltip component ────────────────────────────────────────────────────
    '--rds-tooltip-border-width': tooltipTokens.borderWidth,
    '--rds-tooltip-arrow-offset': tooltipTokens.arrowOffset,
    '--rds-tooltip-arrow-shadow': tooltipTokens.arrowShadow,
    '--rds-tooltip-focus-ring-width': tooltipTokens.focusRingWidth,
    // ── Component-specific shared vars ──────────────────────────────────────
    '--rds-esignature-draw-height': esignatureTokens.drawHeight,
    '--rds-esignature-spacing-md': esignatureTokens.spacingMd,
    '--rds-fab-menu-open-height': fabMenuTokens.openHeight,
    '--rds-ai-gradient-start': aiGradientTokens.gradientStart,
    '--rds-ai-gradient-mid': aiGradientTokens.gradientMid,
    '--rds-ai-gradient-end': aiGradientTokens.gradientEnd,
    '--rds-switch-disabled-secondary-bg': switchTokens.disabledSecondaryBg,
    // ── Semantic aliases used directly in components ────────────────────────
    '--rds-color-dark': semanticAliasTokens.colorDark,
    '--rds-color-gray-500': semanticAliasTokens.colorGray500,
    '--rds-color-icon': semanticAliasTokens.colorIcon,
    '--rds-color-text': semanticAliasTokens.colorText,
    '--rds-color-background': semanticAliasTokens.colorBackground,
    '--rds-background-hover': semanticAliasTokens.backgroundHover,
    '--rds-action-disabled-background': semanticAliasTokens.actionDisabledBackground,
    '--rds-color-surface-alt': semanticAliasTokens.colorSurfaceAlt,
    '--rds-color-surface-disabled': semanticAliasTokens.colorSurfaceDisabled,
    '--rds-color-switch-label': semanticAliasTokens.colorSwitchLabel,
    '--rds-color-on-secondary': semanticAliasTokens.colorOnSecondary,
    '--rds-popover-surface-border': semanticAliasTokens.popoverSurfaceBorder,
    '--rds-sidebar-overlay-bg': semanticAliasTokens.sidebarOverlayBg,
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
    // ── Primary ──────────────────────────────────────────────────────────────
    '--rds-primary-main': p[700],
    '--rds-primary-light': p[100],
    '--rds-primary-dark': p[600],
    '--rds-primary-contrast-text': white,
    // ── Surface primary ──────────────────────────────────────────────────────
    '--rds-surface-primary-darker': p[800],
    '--rds-surface-primary-dark': p[700],
    '--rds-surface-primary-medium': p[100],
    '--rds-surface-primary-light': p[50],
    '--rds-surface-primary-subtle': p[50],
    // ── Surface neutral ──────────────────────────────────────────────────────
    '--rds-surface-neutral-darker': surfaceTokens.neutralDarker,
    '--rds-surface-neutral-dark': surfaceTokens.neutralDark,
    '--rds-surface-neutral-medium': surfaceTokens.neutralMedium,
    '--rds-surface-neutral-light': n[200],
    '--rds-surface-neutral-subtle': white,
    // ── Secondary ────────────────────────────────────────────────────────────
    '--rds-secondary-main': s[700],
    '--rds-secondary-light': s[100],
    '--rds-secondary-dark': s[600],
    '--rds-secondary-contrast-text': white,
    // ── Tertiary ─────────────────────────────────────────────────────────────
    '--rds-tertiary-main': t[500],
    '--rds-tertiary-light': t[100],
    '--rds-tertiary-dark': t[600],
    '--rds-tertiary-contrast-text': white,
    // ── Neutral scale ────────────────────────────────────────────────────────
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
    // ── Dark surface aliases (used in light theme for dark-mode sub-components)
    '--rds-surface-dark': surfaceTokens.darkBase,
    '--rds-surface-dark-hover': surfaceTokens.darkHover,
    '--rds-surface-dark-alt': surfaceTokens.darkAlt,
    '--rds-surface-dark-deep': surfaceTokens.darkDeep,
    '--rds-border-dark-elevated': surfaceTokens.darkElevatedBorder,
    // ── Semantic colors ──────────────────────────────────────────────────────
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
    // ── Background ───────────────────────────────────────────────────────────
    '--rds-background-default': white,
    '--rds-background-paper': white,
    '--rds-background-surface': n[50],
    '--rds-background-overlay': alphaTokens.overlayDark,
    // ── Text ─────────────────────────────────────────────────────────────────
    '--rds-text-primary': n[900],
    '--rds-text-secondary': n[600],
    '--rds-text-disabled': n[400],
    '--rds-text-hint': n[500],
    // ── Border ───────────────────────────────────────────────────────────────
    '--rds-border-default': n[300],
    '--rds-border-light': n[200],
    '--rds-border-dark': n[400],
    '--rds-border-focus': 'var(--rds-primary-main)',
    // ── Button primary ───────────────────────────────────────────────────────
    '--rds-button-primary-bg': p[700],
    '--rds-button-primary-bg-hover': p[750],
    '--rds-button-primary-bg-active': p[800],
    '--rds-button-primary-bg-disabled': p[100],
    '--rds-button-primary-text': white,
    '--rds-button-primary-text-disabled': p[300],
    // ── Button secondary ─────────────────────────────────────────────────────
    '--rds-button-secondary-bg': 'transparent',
    '--rds-button-secondary-bg-hover': interactiveTokens.secondaryBgHover,
    '--rds-button-secondary-bg-active': interactiveTokens.secondaryBgActive,
    '--rds-button-secondary-border': s[700],
    '--rds-button-secondary-border-hover': s[750],
    '--rds-button-secondary-border-active': s[750],
    '--rds-button-secondary-border-disabled': n[300],
    '--rds-button-secondary-text': interactiveTokens.secondaryText,
    '--rds-button-secondary-text-active': interactiveTokens.secondaryText,
    '--rds-button-secondary-text-disabled': interactiveTokens.secondaryTextDisabled,
    '--rds-button-secondary-bg-disabled': n[100],
    // ── Button text ──────────────────────────────────────────────────────────
    '--rds-button-text-bg-hover': t[50],
    '--rds-button-text-bg-active': t[100],
    '--rds-button-text-color': t[400],
    '--rds-button-text-color-active': t[500],
    '--rds-button-text-color-disabled': t[300],
    // ── Alerts ───────────────────────────────────────────────────────────────
    '--rds-alert-success-bg': p[50],
    '--rds-alert-success-border': interactiveTokens.alertSuccessBorder,
    '--rds-alert-success-text': su[600],
    '--rds-alert-error-bg': interactiveTokens.alertErrorBg,
    '--rds-alert-error-border': e[700],
    '--rds-alert-error-text': e[600],
    '--rds-alert-warning-bg': interactiveTokens.alertWarningBg,
    '--rds-alert-warning-border': w[700],
    '--rds-alert-warning-text': w[600],
    '--rds-alert-info-bg': white,
    '--rds-alert-info-border': n[700],
    '--rds-alert-info-text': i[600],
    // ── Form ─────────────────────────────────────────────────────────────────
    '--rds-form-bg': white,
    '--rds-form-border': n[300],
    '--rds-form-border-focus': p[700],
    '--rds-form-bg-focus': white,
    '--rds-placeholder-color': 'var(--rds-placeholder-color-light)',
    '--rds-form-control-asterisk-color': e[700],
    // ── Badge ────────────────────────────────────────────────────────────────
    '--rds-badge-error-bg': e[700],
    '--rds-badge-error-text': white,
    '--rds-badge-warning-bg': w[700],
    '--rds-badge-warning-text': white,
    '--rds-badge-neutral-bg': n[700],
    '--rds-badge-neutral-text': white,
    // ── Overlays / actions ───────────────────────────────────────────────────
    '--rds-overlay-dark': alphaTokens.overlayDark,
    '--rds-overlay-darker': alphaTokens.overlayDarker,
    '--rds-overlay-semi': alphaTokens.overlaySemi,
    '--rds-action-hover': alphaTokens.actionHoverLight,
    '--rds-action-active': alphaTokens.actionActiveLight,
    '--rds-action-disabled': alphaTokens.actionDisabledLight,
    // ── Tooltip ──────────────────────────────────────────────────────────────
    '--rds-tooltip-bg': n[900],
    '--rds-tooltip-text': white,
    // ── Focus ring ───────────────────────────────────────────────────────────
    '--rds-focus-ring': '0 0 0 2px var(--rds-primary-main)',
    // ── Semantic aliases ─────────────────────────────────────────────────────
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
    '--rds-color-text-primary': 'var(--rds-text-primary)',
    '--rds-color-text-secondary': 'var(--rds-text-secondary)',
    '--rds-color-text-disabled': 'var(--rds-text-disabled)',
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
    // ── Primary ──────────────────────────────────────────────────────────────
    '--rds-primary-main': p[200],
    '--rds-primary-light': p[100],
    '--rds-primary-dark': p[400],
    '--rds-primary-contrast-text': n[900],
    // ── Surface primary ──────────────────────────────────────────────────────
    '--rds-surface-primary-darker': p[200],
    '--rds-surface-primary-dark': p[400],
    '--rds-surface-primary-medium': p[600],
    '--rds-surface-primary-light': p[800],
    '--rds-surface-primary-subtle': p[900],
    // ── Surface neutral ──────────────────────────────────────────────────────
    '--rds-surface-neutral-darker': n[200],
    '--rds-surface-neutral-dark': n[400],
    '--rds-surface-neutral-medium': n[700],
    '--rds-surface-neutral-light': n[800],
    '--rds-surface-neutral-subtle': black,
    // ── Secondary ────────────────────────────────────────────────────────────
    '--rds-secondary-main': s[200],
    '--rds-secondary-light': s[100],
    '--rds-secondary-dark': s[400],
    '--rds-secondary-contrast-text': n[900],
    // ── Tertiary ─────────────────────────────────────────────────────────────
    '--rds-tertiary-main': t[200],
    '--rds-tertiary-light': t[100],
    '--rds-tertiary-dark': t[400],
    // ── Semantic colors ──────────────────────────────────────────────────────
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
    // ── Neutral scale ────────────────────────────────────────────────────────
    '--rds-neutral-main': n[200],
    '--rds-neutral-light': n[100],
    '--rds-neutral-dark': n[400],
    // ── Background ───────────────────────────────────────────────────────────
    '--rds-background-default': n[900],
    '--rds-background-paper': n[800],
    '--rds-background-surface': n[800],
    '--rds-background-overlay': alphaTokens.overlayDarker,
    // ── Text ─────────────────────────────────────────────────────────────────
    '--rds-text-primary': white,
    '--rds-text-secondary': n[400],
    '--rds-text-disabled': n[600],
    '--rds-text-hint': n[500],
    // ── Border ───────────────────────────────────────────────────────────────
    '--rds-border-default': n[700],
    '--rds-border-light': n[800],
    '--rds-border-dark': n[600],
    // ── Semantic aliases ─────────────────────────────────────────────────────
    '--rds-color-on-surface': 'var(--rds-text-primary)',
    '--rds-color-on-surface-variant': 'var(--rds-text-secondary)',
    '--rds-color-text-primary': 'var(--rds-text-primary)',
    '--rds-color-text-secondary': 'var(--rds-text-secondary)',
    '--rds-color-text-disabled': 'var(--rds-text-disabled)',
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
    // ── Dark-mode surface chrome ──────────────────────────────────────────────
    '--rds-color-surface': n[800],
    '--rds-color-surface-dark': surfaceTokens.darkBase,
    '--rds-color-surface-variant-dark': surfaceTokens.darkVariant,
    '--rds-color-surface-selected-dark': surfaceTokens.darkSelected,
    '--rds-color-on-surface-dark': white,
    '--rds-color-on-surface-variant-dark': iconTokens.onSurfaceVariantDark,
    '--rds-color-on-primary': n[900],
    '--rds-color-disabled-surface-dark': surfaceTokens.darkDisabled,
    '--rds-color-disabled-text-dark': miscTokens.disabledTextDark,
    '--rds-color-hover-bg': surfaceTokens.darkAlt,
    '--rds-color-disabled-bg': surfaceTokens.darkDeep,
    // ── Dark-mode elevation ───────────────────────────────────────────────────
    '--rds-elevation-2-dark': alphaTokens.elevation2Dark,
    '--rds-elevation-focus-dark': alphaTokens.elevationFocusDark,
    // ── Dark-mode actions ─────────────────────────────────────────────────────
    '--rds-action-hover': alphaTokens.actionHoverDark,
    '--rds-action-active': alphaTokens.actionActiveDark,
    '--rds-action-disabled': alphaTokens.actionDisabledDark,
    '--rds-placeholder-color': 'var(--rds-placeholder-color-dark)',
    // ── Toggle group ──────────────────────────────────────────────────────────
    '--rds-toggle-group-border-light': alphaTokens.toggleGroupBorderDark,
    '--rds-toggle-group-border-disabled-light': alphaTokens.toggleGroupBorderDisabledDark,
    // ── Tooltip ───────────────────────────────────────────────────────────────
    '--rds-tooltip-bg': white,
    '--rds-tooltip-color': black,
    '--rds-tooltip-border': white,
    // ── Scrollbar ─────────────────────────────────────────────────────────────
    '--rds-color-scrollbar-track': scrollbarTokens.track,
    '--rds-color-scrollbar-thumb': scrollbarTokens.thumb,
    '--rds-color-scrollbar-thumb-hover': scrollbarTokens.thumbHover,
    // ── Icon ──────────────────────────────────────────────────────────────────
    '--rds-color-on-surface-dark-icon': white,
    '--rds-color-surface-container': surfaceTokens.darkContainer,
    '--rds-color-hover-dark': surfaceTokens.darkContainer,
    // ── Grid / data-table ─────────────────────────────────────────────────────
    '--rds-grid-bg': gridTokens.bg,
    '--rds-grid-bg-alt': gridTokens.bgAlt,
    '--rds-grid-header-bg': gridTokens.headerBg,
    '--rds-grid-text': white,
    '--rds-grid-text-subtle': gridTokens.textSubtle,
    '--rds-grid-border': gridTokens.border,
    '--rds-grid-border-soft': gridTokens.border,
    '--rds-grid-border-alt': gridTokens.border,
    '--rds-grid-row-hover': surfaceTokens.darkHover,
    // ── Misc dark tokens ──────────────────────────────────────────────────────
    '--rds-color-border-dark': miscTokens.borderColorDark,
    '--rds-color-surface-hover-dark': surfaceTokens.darkSurfaceHover,
    '--rds-color-icon-muted-dark': iconTokens.mutedDark,
    '--rds-offcanvas-cancel-color': miscTokens.offcanvasCancelColor,
    '--rds-color-surface-variant-hover-dark': surfaceTokens.darkVariantHover,
    '--rds-color-disabled-container-dark': surfaceTokens.darkDisabledContainer,
    // ── App bar dark tokens ───────────────────────────────────────────────────
    '--rds-appbar-bg-dark': appBarTokens.darkBg,
    '--rds-appbar-secondary-bg-dark': appBarTokens.darkSecondaryBg,
    '--rds-appbar-badge-bg-dark': appBarTokens.darkBadgeBg,
    '--rds-appbar-badge-color-dark': appBarTokens.darkBadgeColor,
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

/**
 * A map of `--rds-*` CSS variable overrides for white-label / multi-brand theming.
 *
 * Keys must be valid `--rds-*` CSS variable names that exist in the design token set.
 * Values must be valid CSS color or size strings (e.g. `'#FF6600'`, `'1rem'`).
 *
 * @example
 * const overrides: RdsBrandOverrides = {
 *   '--rds-primary-main': '#FF6600',
 *   '--rds-primary-dark': '#CC5200',
 * };
 */
export type RdsBrandOverrides = Partial<Record<string, string>>;

const TRACKED_CSS_VAR_KEYS = new Set<string>();

/**
 * Injects all --rds-* tokens onto document.documentElement.
 * Call on app mount and whenever the theme mode changes.
 *
 * @param mode - Theme mode. Only `'light'` and `'dark'` are supported.
 * @param overrides - Optional brand overrides applied on top of the base token set.
 */
export function injectTokens(mode: RdsThemeMode = 'light', overrides?: RdsBrandOverrides): void {
  if (typeof document === 'undefined') return;

  const vars = buildRdsCssVars(mode);
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

  if (overrides) {
    const knownKeys = new Set(Object.keys(vars));
    Object.entries(overrides).forEach(([key, value]) => {
      if (!knownKeys.has(key)) {
        console.warn(
          `[RaaghuDesignSystem] Unknown override key "${key}". ` +
            `Must be a known --rds-* variable.`,
        );
      }
      root.style.setProperty(key, value ?? '');
    });
  }
}

/**
 * Generates a complete `:root { --rds-* }` CSS string from the design token set.
 * This function is SSR-safe — it does NOT reference `document` or `window`.
 *
 * Use this in Next.js `_document.tsx` or Remix `root.tsx` to inject critical CSS
 * before hydration, preventing FOUC (flash of unstyled content).
 *
 * @param mode - Theme mode to generate CSS for. Defaults to `'light'`.
 * @returns A complete, valid CSS string ready to inject into a `<style>` tag.
 *
 * @example
 * // Next.js _document.tsx
 * const criticalCss = buildStaticCssSnapshot('light');
 * // <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
 */
export function buildStaticCssSnapshot(mode: RdsThemeMode = 'light'): string {
  const vars = buildRdsCssVars(mode);
  const entries = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return `:root {\n${entries}\n}`;
}
