import {
  aiGradientTokens,
  alphaTokens,
  animationTokens,
  appBarTokens,
  breakpointTokens,
  chartPaletteTokens,
  colorTokens,
  elevationTokens,
  esignatureTokens,
  extendedBreakpointTokens,
  fabMenuTokens,
  gridTokens,
  iconTokens,
  inputTokens,
  componentTokens,
  interactiveTokens,
  mapTokens,
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
  spacingExact,
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
    '--rds-z-index-above': String(zIndexTokens.above),
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
    '--rds-spacing-xxs': semanticAliasTokens.rdsSpacingXxs,
    '--rds-spacing-lg': spacingTokens[6],
    '--rds-spacing-xl': spacingTokens[8],
    '--rds-spacing-2xl': spacingTokens[12],
    '--rds-spacing-3xl': spacingTokens[16],
    // Exact pixel aliases (preferred when components expect px values)
    '--rds-spacing-hairline': spacingExact.hairline,
    '--rds-spacing-xs-px': spacingExact.xs,
    '--rds-spacing-sm-px': spacingExact.sm,
    '--rds-spacing-md-px': spacingExact.md,
    '--rds-spacing-lg-px': spacingExact.lg,
    '--rds-spacing-xl-px': spacingExact.xl,
    '--rds-spacing-2xl-px': spacingExact['2xl'],
    '--rds-spacing-3xl-px': spacingExact['3xl'],
    // ── Border radius ────────────────────────────────────────────────────────
    '--rds-border-radius-none': radiusTokens.none,
    '--rds-border-radius-xs': radiusTokens.sm,
    '--rds-border-radius-sm': radiusTokens.base,
    '--rds-border-radius-md': radiusTokens.lg,
    '--rds-border-radius-lg': radiusTokens.xl,
    '--rds-border-radius-xl': radiusTokens['2xl'],
    '--rds-border-radius-3xl': radiusTokens['3xl'],
    '--rds-border-radius-pill': radiusTokens.full,
    '--rds-border-radius-full': radiusTokens.full,
    // ── Header / AppBar defaults
    '--rds-header-toolbar-height': '56px',
    '--rds-toolbar-height': componentTokens.toolbar?.height || '40px',
    '--rds-toolbar-height-mobile': componentTokens.toolbar?.heightMobile || '32px',
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
    '--rds-focus-ring-width': semanticAliasTokens.rdsFocusRingWidth,
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
    // ── AI attachment component tokens (component-scoped values centralized)
    '--rds-ai-attachment-min-width': componentTokens.aiAttachment?.minWidth || '273px',
    '--rds-ai-attachment-fab-left-offset': componentTokens.aiAttachment?.fabLeftOffset || '-18px',
    '--rds-ai-attachment-fab-bottom': componentTokens.aiAttachment?.fabBottom || '10px',
    '--rds-ai-attachment-transform-x': componentTokens.aiAttachment?.transformX || '30px',
    '--rds-ai-attachment-transform-y': componentTokens.aiAttachment?.transformY || '97.5px',
    '--rds-ai-icon-size': componentTokens.aiIcon?.size || '22px',
    // AI typing section tokens
    '--rds-ai-typing-textarea-height': componentTokens.aiTyping?.textareaHeight || '100px',
    '--rds-ai-typing-autocomplete-min-width': componentTokens.aiTyping?.autocompleteMinWidth || '190px',
    '--rds-ai-typing-autocomplete-max-width': componentTokens.aiTyping?.autocompleteMaxWidth || '60px',
    '--rds-ai-typing-action-button-min-width': componentTokens.aiTyping?.actionButtonMinWidth || '140px',
    '--rds-ai-typing-fab-left-offset': componentTokens.aiTyping?.fabLeftOffset || '-129px',
    '--rds-ai-typing-action-button-margin-right': componentTokens.aiTyping?.actionButtonMarginRight || '5px',
    // Emoji generator component tokens
    '--rds-emoji-generator-width': componentTokens.emojiGenerator?.width || '360px',
    '--rds-emoji-generator-height': componentTokens.emojiGenerator?.height || '420px',
    '--rds-emoji-generator-icon-size-sm': componentTokens.emojiGenerator?.iconSizeSm || '29px',
    '--rds-emoji-generator-icon-size-xs': componentTokens.emojiGenerator?.iconSizeXs || '22px',
    '--rds-emoji-generator-popover-width': componentTokens.emojiGenerator?.popoverWidth || '45px',
    '--rds-emoji-generator-inline-min-width': componentTokens.emojiGenerator?.inlineMinWidth || '36px',
    // Empty state component tokens
    '--rds-empty-state-max-width': componentTokens.emptyState?.maxWidth || '640px',
    '--rds-empty-state-padding': componentTokens.emptyState?.padding || '32px',
    '--rds-empty-state-button-padding': componentTokens.emptyState?.buttonPadding || '6px 15px',
    // Adaptive Cards component tokens
    '--rds-adaptive-cards-thumb-width': componentTokens.adaptiveCards?.thumbWidth || '20px',
    '--rds-adaptive-cards-min-thumb-width': componentTokens.adaptiveCards?.minThumbWidth || '32px',
    '--rds-adaptive-cards-min-width': componentTokens.adaptiveCards?.minWidth || '90px',
    '--rds-adaptive-cards-max-width': componentTokens.adaptiveCards?.maxWidth || '120px',
    '--rds-adaptive-cards-min-width-100': componentTokens.adaptiveCards?.minWidth100 || '100px',
    '--rds-adaptive-cards-input-padding-vertical': componentTokens.adaptiveCards?.inputPaddingVertical || '1px',
    '--rds-adaptive-cards-input-padding-horizontal': componentTokens.adaptiveCards?.inputPaddingHorizontal || '16px',
    '--rds-adaptive-cards-gap-xxs': componentTokens.adaptiveCards?.gapXxs || '2px',
    '--rds-adaptive-cards-gap-xs': componentTokens.adaptiveCards?.gapXs || '6px',
    '--rds-adaptive-cards-gap': componentTokens.adaptiveCards?.gap || '14px',
    '--rds-adaptive-cards-max-width-sm': componentTokens.adaptiveCards?.maxWidthSm || '50px',
    '--rds-adaptive-cards-min-width-sm': componentTokens.adaptiveCards?.minWidthSm || '50px',
    '--rds-adaptive-cards-max-width-xs': componentTokens.adaptiveCards?.maxWidthXs || '48px',
    '--rds-adaptive-cards-max-width-md': componentTokens.adaptiveCards?.maxWidthMd || '55px',
    '--rds-adaptive-cards-icon-width': componentTokens.adaptiveCards?.iconWidth || '24px',
    '--rds-adaptive-cards-border-width': componentTokens.adaptiveCards?.borderWidth || '2px',
    '--rds-adaptive-cards-min-height-200': componentTokens.adaptiveCards?.minHeight200 || '200px',
    '--rds-adaptive-cards-min-height-160': componentTokens.adaptiveCards?.minHeight160 || '160px',
    '--rds-adaptive-cards-min-height-120': componentTokens.adaptiveCards?.minHeight120 || '120px',
    '--rds-adaptive-cards-min-height-48': componentTokens.adaptiveCards?.minHeight48 || '48px',
    '--rds-adaptive-cards-font-size-xxs': componentTokens.adaptiveCards?.fontSizeXxs || '9px',
    '--rds-adaptive-cards-font-size-sm': componentTokens.adaptiveCards?.fontSizeSm || '13px',
    '--rds-adaptive-cards-font-size-md': componentTokens.adaptiveCards?.fontSizeMd || '15px',
    '--rds-adaptive-cards-error-ring': componentTokens.adaptiveCards?.errorRing || '0 0 0 2px rgba(189,13,29,0.2)',
    '--rds-image-list-item-height-mobile': componentTokens.adaptiveCards?.imageListItemHeightMobile || '120px',
    '--rds-football-logo-size-mobile': componentTokens.adaptiveCards?.footballLogoSizeMobile || '72px',
    // ── Toggle button tokens
    '--rds-toggle-min-height-sm': componentTokens.toggleButton?.minHeight?.small || '32px',
    '--rds-toggle-min-height-md': componentTokens.toggleButton?.minHeight?.medium || '36px',
    '--rds-toggle-min-height-lg': componentTokens.toggleButton?.minHeight?.large || '44px',
    '--rds-toggle-min-height-lg-mobile': componentTokens.toggleButton?.minHeight?.largeMobile || '40px',
    '--rds-toggle-spacing-xs': componentTokens.toggleButton?.spacing?.xs || spacingTokens[1],
    '--rds-toggle-spacing-sm': componentTokens.toggleButton?.spacing?.sm || spacingTokens[2],
    '--rds-toggle-spacing-md': componentTokens.toggleButton?.spacing?.md || spacingTokens[4],
    '--rds-toggle-button-selected-shadow': componentTokens.toggleButton?.shadow?.selected || 'inset 0 0 0 1px currentColor',
    '--rds-toggle-button-spaced-shadow': componentTokens.toggleButton?.shadow?.spaced || 'inset 0 0 0 1px rgba(0, 0, 0, 0.12)',
    // Avatar tokens
    '--rds-avatar-size-small': componentTokens.avatar?.size?.small || '28px',
    '--rds-avatar-size-medium': componentTokens.avatar?.size?.medium || '32px',
    '--rds-avatar-size-large': componentTokens.avatar?.size?.large || '40px',
    '--rds-avatar-initials-font-size': componentTokens.avatar?.initialsFontSize || '0.875rem',
    // Chat component tokens
    '--rds-chat-height': componentTokens.chat?.height || '600px',
    '--rds-chat-max-height': componentTokens.chat?.maxHeight || '80vh',
    '--rds-chat-video-max-width': componentTokens.chat?.videoMaxWidth || '600px',
    '--rds-chat-message-max-width': componentTokens.chat?.messageMaxWidth || '280px',
    // Kanban component tokens
    '--rds-kanban-column-width': componentTokens.kanban?.columnWidth || '300px',
    '--rds-kanban-column-gap': componentTokens.kanban?.columnGap || '20px',
    '--rds-kanban-card-min-height': componentTokens.kanban?.cardMinHeight || '600px',
    '--rds-kanban-card-min-width': componentTokens.kanban?.cardMinWidth || '320px',
    '--rds-kanban-addboard-min-width-320': componentTokens.kanban?.addBoardMinWidth320 || '320px',
    '--rds-kanban-addboard-min-width-280': componentTokens.kanban?.addBoardMinWidth280 || '280px',
    '--rds-kanban-subcard-min-height': componentTokens.kanban?.subcardMinHeight || '133.6px',
    '--rds-kanban-dropdown-min-width': componentTokens.kanban?.dropdownMinWidth || '125px',
    '--rds-kanban-subcard-padding': componentTokens.kanban?.subcardPadding || '15px',
    '--rds-kanban-subcard-padding-bottom': componentTokens.kanban?.subcardPaddingBottom || '15px',
    '--rds-kanban-subcard-padding-inner': componentTokens.kanban?.subcardPaddingInner || '8px',
    '--rds-kanban-truncate-max-width': componentTokens.kanban?.truncateMaxWidth || '265px',
    '--rds-kanban-truncate-hover-max-width': componentTokens.kanban?.truncateHoverMaxWidth || '130px',
    '--rds-kanban-btn-margin': componentTokens.kanban?.btnMargin || '20px 0px 6px 0px',
    '--rds-kanban-addboard-btn-padding': componentTokens.kanban?.addBoardBtnPadding || '0px 6px',
    '--rds-kanban-container-mobile-padding': componentTokens.kanban?.containerMobilePadding || '0px 16px 5px',
    '--rds-kanban-add-item-margin': componentTokens.kanban?.addItemMargin || '6px 0px',
    '--rds-kanban-subcards-container-padding': componentTokens.kanban?.subcardsContainerPadding || '0px 8px 8px 8px',
    // Map component heatmap palette (component-scoped)
    '--rds-comp-map-heatmap-0':  componentTokens.map?.heatmapPalette?.[0]  || mapTokens.heatmap.color1,
    '--rds-comp-map-heatmap-1':  componentTokens.map?.heatmapPalette?.[1]  || mapTokens.heatmap.color2,
    '--rds-comp-map-heatmap-2':  componentTokens.map?.heatmapPalette?.[2]  || mapTokens.heatmap.color3,
    '--rds-comp-map-heatmap-3':  componentTokens.map?.heatmapPalette?.[3]  || mapTokens.heatmap.color4,
    '--rds-comp-map-heatmap-4':  componentTokens.map?.heatmapPalette?.[4]  || mapTokens.heatmap.color5,
    '--rds-comp-map-heatmap-5':  componentTokens.map?.heatmapPalette?.[5]  || mapTokens.heatmap.color6,
    '--rds-comp-map-heatmap-6':  componentTokens.map?.heatmapPalette?.[6]  || mapTokens.heatmap.color7,
    '--rds-comp-map-heatmap-7':  componentTokens.map?.heatmapPalette?.[7]  || mapTokens.heatmap.color8,
    '--rds-comp-map-heatmap-8':  componentTokens.map?.heatmapPalette?.[8]  || mapTokens.heatmap.color9,
    '--rds-comp-map-heatmap-9':  componentTokens.map?.heatmapPalette?.[9]  || mapTokens.heatmap.color10,
    '--rds-comp-map-heatmap-10': componentTokens.map?.heatmapPalette?.[10] || mapTokens.heatmap.color11,
    '--rds-comp-map-heatmap-11': componentTokens.map?.heatmapPalette?.[11] || mapTokens.heatmap.color12,
    // ── Chart component tokens (component-scoped defaults)
    '--rds-comp-chart-bar-barchart1-height': componentTokens.chart?.bar?.barchart1Height || '65vh',
    '--rds-comp-chart-bar-histogram-size': componentTokens.chart?.bar?.histogramSize || '50px',
    '--rds-comp-chart-bar-default-height': componentTokens.chart?.bar?.defaultHeight || '76vh',
    '--rds-comp-chart-bar-tablet-height': componentTokens.chart?.bar?.tabletHeight || '600px',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    '--rds-comp-chart-pie-height': componentTokens.chart?.bar?.pieHeight || (componentTokens.chart as any)?.pie?.pieHeight || (componentTokens.chart as any)?.pieHeight || '335px',
    '--rds-comp-chart-bar-ds1-bg':        componentTokens.chart?.bar?.dataset?.ds1Bg        || chartPaletteTokens.dataset.teal,
    '--rds-comp-chart-bar-ds1-border':    componentTokens.chart?.bar?.dataset?.ds1Border    || chartPaletteTokens.dataset.teal,
    '--rds-comp-chart-bar-ds2-bg':        componentTokens.chart?.bar?.dataset?.ds2Bg        || chartPaletteTokens.dataset.blue,
    '--rds-comp-chart-bar-ds2-border':    componentTokens.chart?.bar?.dataset?.ds2Border    || chartPaletteTokens.dataset.blue,
    '--rds-comp-chart-bar-dataset-bg':    componentTokens.chart?.bar?.dataset?.datasetBg    || chartPaletteTokens.dataset.teal,
    '--rds-comp-chart-bar-dataset-border':componentTokens.chart?.bar?.dataset?.datasetBorder|| chartPaletteTokens.dataset.blue,
    '--rds-comp-chart-boolean-size': componentTokens.chart?.boolean?.size || '20vh',
    // ── Table component tokens
    '--rds-table-sticky-max-height': componentTokens.table?.stickyMaxHeight || '440px',
    '--rds-table-actions-width': componentTokens.table?.actionsWidth || '120px',
    // ── Table checkbox tokens
    '--rds-table-checkbox-size': componentTokens.table?.checkbox?.size || '18px',
    '--rds-table-checkbox-border-width': componentTokens.table?.checkbox?.borderWidth || '2px',
    '--rds-table-checkbox-check-width': componentTokens.table?.checkbox?.checkWidth || '6px',
    '--rds-table-checkbox-check-height': componentTokens.table?.checkbox?.checkHeight || '10px',
    '--rds-table-checkbox-indeterminate-width': componentTokens.table?.checkbox?.indeterminateWidth || '8px',
    '--rds-table-checkbox-indeterminate-height': componentTokens.table?.checkbox?.indeterminateHeight || '2px',
    '--rds-table-checkbox-hover-ring-size': componentTokens.table?.checkbox?.hoverRingSize || '4px',
    '--rds-table-checkbox-focus-ring-size': componentTokens.table?.checkbox?.focusRingSize || '2px',
    '--rds-table-checkbox-disabled-opacity': componentTokens.table?.checkbox?.disabledOpacity || '0.6',
    // ── Table focus tokens
    '--rds-table-focus-ring-width': componentTokens.table?.focus?.ringWidth || '2px',
    '--rds-table-focus-ring-offset': componentTokens.table?.focus?.ringOffset || '2px',
    // ── Progress component tokens
    '--rds-progress-dash-width': componentTokens.progress?.dashWidth || '50px',
    '--rds-progress-dash-height': componentTokens.progress?.dashHeight || '5px',
    '--rds-progress-block-width': componentTokens.progress?.blockWidth || '80px',
    '--rds-progress-block-height': componentTokens.progress?.blockHeight || '40px',
    '--rds-progress-step-size': componentTokens.progress?.stepSize || '40px',
    '--rds-progress-step-size-mobile': componentTokens.progress?.stepSizeMobile || '30px',
    '--rds-progress-connector-width': componentTokens.progress?.connectorWidth || '60px',
    '--rds-progress-connector-width-mobile': componentTokens.progress?.connectorWidthMobile || '35px',
    '--rds-progress-inner-dot-size': componentTokens.progress?.innerDotSize || '20px',
    '--rds-progress-transition': componentTokens.progress?.transition || animationTokens.duration.normal,
    // ── Popover component tokens
    '--rds-popover-container-max-width': componentTokens.popover?.containerMaxWidth || '400px',
    '--rds-popover-container-min-width': componentTokens.popover?.containerMinWidth || '200px',
    '--rds-popover-wide-min-width': componentTokens.popover?.wideMinWidth || '300px',
    '--rds-popover-wide-max-width': componentTokens.popover?.wideMaxWidth || '600px',
    '--rds-popover-narrow-min-width': componentTokens.popover?.narrowMinWidth || '150px',
    '--rds-popover-narrow-max-width': componentTokens.popover?.narrowMaxWidth || '250px',
    '--rds-popover-position-grid-max-width': componentTokens.popover?.positionGridMaxWidth || '120px',
    '--rds-popover-list-mobile-max-width': componentTokens.popover?.listMobileMaxWidth || '220px',
    '--rds-popover-list-mobile-min-width': componentTokens.popover?.listMobileMinWidth || '120px',
    '--rds-ai-gradient-start': aiGradientTokens.gradientStart,
    '--rds-ai-gradient-mid': aiGradientTokens.gradientMid,
    '--rds-ai-gradient-end': aiGradientTokens.gradientEnd,
    '--rds-switch-disabled-secondary-bg': switchTokens.disabledSecondaryBg,
    '--rds-switch-track-border-radius': switchTokens.trackBorderRadius,
    // ── Pagination component tokens
    '--rds-pagination-item-size-xs': componentTokens.pagination?.itemSize?.xs || '18px',
    '--rds-pagination-item-size-sm': componentTokens.pagination?.itemSize?.sm || '22px',
    '--rds-pagination-item-size-md': componentTokens.pagination?.itemSize?.md || '24px',
    '--rds-pagination-item-size-lg': componentTokens.pagination?.itemSize?.lg || '28px',
    '--rds-pagination-item-size-xl': componentTokens.pagination?.itemSize?.xl || '30px',
    '--rds-pagination-button-min-width': componentTokens.pagination?.buttonMinWidth || '60px',
    '--rds-pagination-textfield-width': componentTokens.pagination?.textFieldWidth || '44px',
    '--rds-pagination-small-gap-offset': componentTokens.pagination?.smallGapOffset || '3px',
    '--rds-pagination-dropdown-min-width': componentTokens.pagination?.dropdownMinWidth || '120px',
    '--rds-pagination-font-size-xs': componentTokens.pagination?.fontSize?.xs || '0.65rem',
    '--rds-pagination-font-size-sm': componentTokens.pagination?.fontSize?.sm || '0.7rem',
    '--rds-pagination-font-size-md': componentTokens.pagination?.fontSize?.md || '0.75rem',
    '--rds-pagination-font-size-lg': componentTokens.pagination?.fontSize?.lg || '0.85rem',
    // ── Alert component tokens
    '--rds-alert-padding-sm': componentTokens.alert.padding.small,
    '--rds-alert-padding-md': componentTokens.alert.padding.medium,
    '--rds-alert-padding-lg': componentTokens.alert.padding.large,
    '--rds-alert-style-border-width': componentTokens.alert.style.borderWidth,
    '--rds-alert-left-border-width': componentTokens.alert.style.leftBorderWidth,
    '--rds-alert-style1-shadow': componentTokens.alert.style.style1Shadow,
    '--rds-alert-link-font-size': componentTokens.alert.linkFontSize,
    '--rds-alert-link-margin-right': componentTokens.alert.linkMarginRight,
    // ── Accordion component tokens (component-local -> injected CSS vars)
    '--rds-accordion-summary-height-sm': componentTokens.accordion.summary.height.small,
    '--rds-accordion-summary-height-md': componentTokens.accordion.summary.height.medium,
    '--rds-accordion-summary-height-lg': componentTokens.accordion.summary.height.large,
    '--rds-accordion-summary-padding-sm-x': componentTokens.accordion.summary.paddingX.small,
    '--rds-accordion-summary-padding-md-x': componentTokens.accordion.summary.paddingX.medium,
    '--rds-accordion-summary-padding-lg-x': componentTokens.accordion.summary.paddingX.large,
    '--rds-accordion-summary-content-margin-sm': componentTokens.accordion.summary.contentMargin.small,
    '--rds-accordion-summary-content-margin-md': componentTokens.accordion.summary.contentMargin.medium,
    '--rds-accordion-summary-content-margin-lg': componentTokens.accordion.summary.contentMargin.large,
    '--rds-accordion-size-sm': componentTokens.accordion.summary.iconSize.small,
    '--rds-accordion-size-md': componentTokens.accordion.summary.iconSize.medium,
    '--rds-accordion-size-lg': componentTokens.accordion.summary.iconSize.large,
    '--rds-accordion-details-margin-top': componentTokens.accordion.details.marginTop,
    '--rds-accordion-details-margin-right': componentTokens.accordion.details.marginRight,
    '--rds-accordion-details-margin-bottom': componentTokens.accordion.details.marginBottom,
    '--rds-accordion-details-margin-left': componentTokens.accordion.details.marginLeft,
    '--rds-accordion-details-min-height': componentTokens.accordion.details.minHeight,
    '--rds-accordion-disabled-opacity': componentTokens.accordion.disabledOpacity,
    // ── File uploader component tokens
    '--rds-file-uploader-dropzone-padding-y': componentTokens.fileUploader?.dropzone?.paddingY || '32px',
    '--rds-file-uploader-dropzone-padding-x': componentTokens.fileUploader?.dropzone?.paddingX || '24px',
    '--rds-file-uploader-dropzone-min-width': componentTokens.fileUploader?.dropzone?.minWidth || '500px',
    '--rds-file-uploader-dropzone-min-height': componentTokens.fileUploader?.dropzone?.minHeight || '60px',
    '--rds-file-uploader-dropzone-border-radius': componentTokens.fileUploader?.dropzone?.borderRadius || '8px',
    '--rds-file-uploader-dropzone-border-width': componentTokens.fileUploader?.dropzone?.borderWidth || '2px',
    '--rds-file-uploader-icon-size': componentTokens.fileUploader?.iconSize || '32px',
    '--rds-file-uploader-btn-min-width': componentTokens.fileUploader?.button?.minWidth || '120px',
    '--rds-file-uploader-control-radius': componentTokens.fileUploader?.controlRadius || '6px',
    '--rds-file-uploader-disabled-opacity': componentTokens.fileUploader?.disabledOpacity || '0.6',
    '--rds-file-uploader-side-padding-left': componentTokens.fileUploader?.sidePaddingLeft || '8px',
    '--rds-file-uploader-title-size-left': componentTokens.fileUploader?.titleSizeLeft || '20px',
    '--rds-file-uploader-info-size-left': componentTokens.fileUploader?.infoSizeLeft || '15px',
    '--rds-file-uploader-upload-padding-y': componentTokens.fileUploader?.uploadPaddingY || '4px',
    '--rds-file-uploader-upload-padding-x': componentTokens.fileUploader?.uploadPaddingX || '13px',
    '--rds-file-uploader-filename-height': componentTokens.fileUploader?.filenameHeight || '40px',
    '--rds-file-uploader-hint-row-height': componentTokens.fileUploader?.hintRowHeight || '20px',
    '--rds-file-uploader-hint-padding-right': componentTokens.fileUploader?.hintPaddingRight || '10px',
    '--rds-file-uploader-file-progress-height': componentTokens.fileUploader?.fileProgressHeight || '6px',
    '--rds-file-uploader-file-progress-radius': componentTokens.fileUploader?.fileProgressRadius || '3px',
    // ── Range component tokens
    '--rds-range-max-width-sm': componentTokens.range?.maxWidthSm || '370px',
    '--rds-range-max-width-xs': componentTokens.range?.maxWidthXs || '275px',
    '--rds-range-slider-width-mobile': componentTokens.range?.sliderWidthMobile || '288px',
    '--rds-range-slider-width-tablet': componentTokens.range?.sliderWidthTablet || '382px',
    '--rds-range-disabled-opacity': componentTokens.range?.disabledOpacity || '0.6',
    // ── Menu component tokens
    '--rds-menu-list-min-width': componentTokens.menu?.listMinWidth || '180px',
    '--rds-menu-list-min-width-small': componentTokens.menu?.listMinWidthSmall || '140px',
    '--rds-menu-list-min-width-medium': componentTokens.menu?.listMinWidthMedium || '180px',
    '--rds-menu-list-min-width-large': componentTokens.menu?.listMinWidthLarge || '260px',
    '--rds-mlm-min-width': componentTokens.menu?.mlmMinWidth || '220px',
    '--rds-mlm-root-offset': componentTokens.menu?.mlmRootOffset || '43px',
    '--rds-menu-item-min-height': componentTokens.menu?.itemMinHeight || '40px',
    '--rds-menu-item-min-height-small': componentTokens.menu?.itemMinHeightSmall || '26px',
    '--rds-menu-item-min-height-large': componentTokens.menu?.itemMinHeightLarge || '56px',
    '--rds-menu-header-margin-bottom': componentTokens.menu?.headerMarginBottom || '2px',
    '--rds-menu-focus-ring': componentTokens.menu?.focusRing || '2px',
    '--rds-menu-letter-spacing': componentTokens.menu?.letterSpacing || '0.5px',
    // ── Autocomplete component tokens
    '--rds-autocomplete-focus-ring-width': '1px',
    '--rds-autocomplete-focus-outline-width': '2px',
    '--rds-autocomplete-overflow-chip-bg': alphaTokens.actionHoverLight,
    '--rds-autocomplete-overflow-chip-bg-dark': alphaTokens.actionHoverDark,
    '--rds-field-min-height': spacingTokens[10],
    // ── Avatar component tokens
    '--rds-avatar-dot-size': spacingTokens[3],
    '--rds-avatar-dot-scale': '1',
    '--rds-avatar-ring-width': '2.5px',
    '--rds-avatar-dot-size-lg': '14px',
    '--rds-avatar-dot-border-width': '2px',
    // ── Backdrop component tokens
    '--rds-backdrop-focus-ring-width': '2px',
    '--rds-backdrop-disabled-opacity': '0.6',
    // ── Banner component tokens
    '--rds-banner-close-hover-bg': alphaTokens.actionHoverLight,
    '--rds-banner-style-left-border-width': '0.375rem',
    '--rds-banner-mobile-offset': '-0.5rem',
    '--rds-banner-mobile-gap-xs': '0.375rem',
    // ── Badge component tokens
    '--rds-badge-dot-font-size': '0.75rem',
    '--rds-badge-dot-min-size': spacingTokens[5],
    '--rds-badge-dot-padding-x': '6px',
    '--rds-badge-pill-shadow': 'var(--rds-elevation-1)',
    // ── Bottom navigation component tokens
    '--rds-bottom-navigation-z-index': 'var(--rds-z-index-dropdown)',
    '--rds-bottom-navigation-focus-ring-width': '2px',
    '--rds-bottom-navigation-disabled-opacity': '0.6',
    '--rds-bottom-navigation-action-min-width': '72px',
    '--rds-bottom-navigation-action-padding-y': '6px',
    '--rds-bottom-navigation-action-padding-x': spacingTokens[2],
    '--rds-bottom-navigation-label-font-size': '0.8rem',
    '--rds-bottom-navigation-label-margin-top': '2px',
    '--rds-bottom-navigation-label-line-height': '1.2',
    '--rds-bottom-navigation-icon-size': '1.6rem',
    // ── Chip component tokens
    '--rds-chip-focus-ring-width': componentTokens.chip.focusRingWidth,
    '--rds-chip-disabled-opacity': componentTokens.chip.disabledOpacity,
    // ── Container component tokens
    '--rds-container-padding': componentTokens.container.padding,
    // ── Icon button focus color (component-specific)
    '--rds-icon-button-focus-color': semanticAliasTokens.rdsIconButtonFocusColor,
    // ── Button component tokens
    '--rds-button-primary-bg': 'var(--rds-primary-main)',
    '--rds-button-primary-text': 'var(--rds-color-on-primary)',
    '--rds-button-primary-bg-hover': 'var(--rds-primary-light)',
    '--rds-button-primary-bg-active': 'var(--rds-primary-dark)',
    '--rds-button-primary-bg-disabled': alphaTokens.actionDisabledLight,
    '--rds-button-primary-text-disabled': 'var(--rds-text-disabled)',
    '--rds-button-secondary-bg': 'var(--rds-secondary-main)',
    '--rds-button-secondary-text': 'var(--rds-color-on-secondary)',
    '--rds-button-secondary-border': 'var(--rds-border-default)',
    '--rds-button-secondary-bg-hover': 'var(--rds-secondary-light)',
    '--rds-button-secondary-border-hover': 'var(--rds-border-default)',
    '--rds-button-secondary-bg-active': 'var(--rds-secondary-dark)',
    '--rds-button-secondary-bg-disabled': alphaTokens.actionDisabledLight,
    '--rds-button-text-color': 'var(--rds-primary-main)',
    '--rds-button-text-bg-hover': alphaTokens.actionHoverLight,
    '--rds-button-text-bg-active': alphaTokens.actionActiveLight,
    '--rds-button-text-color-active': 'var(--rds-primary-dark)',

    // ── Button dropdown component tokens
    '--rds-button-dropdown-menu-padding': spacingTokens[2],
    '--rds-button-dropdown-menu-min-width': '200px',
    '--rds-button-dropdown-hover-bg': alphaTokens.actionHoverLight,
    '--rds-button-dropdown-hover-bg-dark': alphaTokens.actionHoverDark,
    '--rds-button-dropdown-selected-bg': 'var(--rds-primary-main)',
    '--rds-button-dropdown-selected-text': 'var(--rds-neutral-0)',
    '--rds-button-dropdown-secondary-bg': 'var(--rds-primary-dark)',
    '--rds-button-dropdown-secondary-bg-hover': 'var(--rds-primary-dark)',
    '--rds-button-dropdown-secondary-bg-active': 'var(--rds-primary-dark)',
    '--rds-button-dropdown-transition': 'var(--rds-transition-base)',
    // ── Card component tokens
    '--rds-card-content-padding-left': '14px',
    '--rds-card-content-min-height': '20px',
    '--rds-card-hover-offset': '-2px',
    '--rds-card-avatar-controls-mobile-offset': '6.875rem',
    // Map card-detail shadows to elevation tokens
    '--rds-card-detail-shadow-light': 'var(--rds-elevation-1)',
    '--rds-card-detail-shadow-dark': 'var(--rds-elevation-4)',
    // Card indicator color
    '--rds-card-indicator-bg': 'var(--rds-color-gray-700)',
    // Card color tokens
    '--rds-card-surface-filled': 'var(--rds-color-surface-light)',
    '--rds-card-bg-hover': 'var(--rds-color-gray-200)',
    '--rds-card-selected-bg': 'var(--rds-color-gray-200)',
    '--rds-card-disabled-bg': 'var(--rds-color-gray-300)',
    '--rds-card-text-disabled': 'var(--rds-color-disabled-text)',
    '--rds-card-text-secondary': 'var(--rds-color-text-secondary)',
    // ── Carousel component tokens
    '--rds-carousel-navigation-bg': alphaTokens.modalBackdrop,
    '--rds-carousel-navigation-bg-hover': alphaTokens.actionHoverDark,
    '--rds-carousel-indicator-bg': 'var(--rds-color-gray-500)',
    '--rds-carousel-indicator-active': 'var(--rds-primary-main)',
    '--rds-carousel-divider': 'var(--rds-border-light)',
    // ── Box component tokens
    '--rds-box-surface-outline': 'var(--rds-color-outline)',
    '--rds-box-surface-primary': 'var(--rds-primary-main)',
    '--rds-box-surface-secondary': 'var(--rds-secondary-main)',
    '--rds-box-surface-tertiary': 'var(--rds-tertiary-main)',
    // ── Breadcrumbs component tokens
    '--rds-breadcrumbs-focus-ring-width': '2px',
    '--rds-breadcrumbs-separator-gap': spacingTokens[2],
    '--rds-breadcrumbs-item-padding-y': spacingTokens[1],
    '--rds-breadcrumbs-item-padding-x': spacingTokens[2],
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

    // ── Missing-var backfills: Category A (aliases to existing tokens) ────────
    '--rds-accordion-item-divider-color':      'var(--rds-border-default)',
    '--rds-background-light':                  'var(--rds-background-default)',
    '--rds-border-hover':                      'var(--rds-primary-main)',
    '--rds-border-selected':                   'var(--rds-primary-main)',
    '--rds-box-shadow-hover':                  'var(--rds-elevation-2)',
    '--rds-box-shadow-lg':                     'var(--rds-elevation-4)',
    '--rds-box-shadow-xs':                     'var(--rds-elevation-1)',
    '--rds-color-gray-300':                    'var(--rds-neutral-300)',
    '--rds-color-gray-600':                    'var(--rds-neutral-600)',
    '--rds-color-light':                       'var(--rds-background-default)',
    '--rds-color-neutral-1000':                black,
    '--rds-color-on-danger':                   'var(--rds-neutral-0)',
    '--rds-color-on-dark':                     'var(--rds-neutral-0)',
    '--rds-color-on-light':                    'var(--rds-text-primary)',
    '--rds-color-on-primary-soft':             'var(--rds-primary-dark)',
    '--rds-color-on-success':                  'var(--rds-neutral-0)',
    '--rds-color-on-warning':                  'var(--rds-neutral-0)',
    '--rds-color-primary-bg':                  'var(--rds-surface-primary-light)',
    '--rds-color-surface-container-high':      'var(--rds-background-surface)',
    '--rds-color-white':                       'var(--rds-neutral-0)',
    '--rds-font-size-caption':                 'var(--rds-font-size-xs)',
    '--rds-grid-row-selected':                 'var(--rds-surface-primary-light)',
    '--rds-semantic-error-main':               'var(--rds-error-main)',
    '--rds-semantic-success-main':             'var(--rds-success-main)',
    '--rds-semantic-warning-dark':             'var(--rds-warning-dark)',
    '--rds-semantic-warning-main':             'var(--rds-warning-main)',
    '--rds-stack-divider-color-dark':          'var(--rds-border-dark)',
    '--rds-stack-divider-color-light':         'var(--rds-border-light)',
    '--rds-surface-subtle':                    'var(--rds-background-surface)',
    '--rds-text-tertiary':                     'var(--rds-text-hint)',
    '--rds-time-picker-accent':                'var(--rds-primary-main)',

    // ── Missing-var backfills: Category B (new static values) ────────────────
    // Primary palette as R,G,B for rgba() — derived from primary[700] = #3C98FF
    '--rds-primary-rgb':                       '60, 152, 255',
    '--rds-time-picker-accent-rgb':            '60, 152, 255',
    // Switch sizing (mirrors .rds-switch SCSS-scope defaults)
    '--rds-switch-root-width':                 '44px',
    '--rds-switch-root-height':                '24px',
    '--rds-switch-thumb-size':                 '20px',
    '--rds-switch-thumb-padding':              '2px',
    '--rds-switch-thumb-translate-x':          '20px',
    // Stepper mobile layout (mirrors .rds-stepper SCSS-scope defaults)
    '--rds-stepper-mobile-offset-left':        'calc(-1 * var(--rds-spacing-sm, 10px))',
    '--rds-stepper-mobile-step-padding-right': 'var(--rds-spacing-xs, 0px)',
    // Tooltip sizing (mirrors .rds-tooltip SCSS-scope defaults)
    '--rds-tooltip-min-width':                 '80px',
    '--rds-tooltip-max-width':                 '320px',
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
    // ── App bar tokens (light theme)
    '--rds-appbar-bg': p[700],
    '--rds-appbar-color': white,
    '--rds-appbar-shadow': 'var(--rds-elevation-1)',
    '--rds-appbar-separator-bg': 'var(--rds-border-light)',
    '--rds-appbar-secondary-bg': s[700],
    '--rds-appbar-badge-bg': p[50],
    '--rds-appbar-badge-color': p[700],
    // ── App bar separator / sizing tokens
    '--rds-appbar-separator-horizontal-margin': spacingTokens[2],
    '--rds-appbar-separator-horizontal-margin-sm': '6px',
    '--rds-appbar-separator-horizontal-margin-xs': spacingTokens[1],
    '--rds-appbar-separator-min-height': spacingTokens[6],
    '--rds-appbar-separator-min-height-sm': spacingTokens[5],
    '--rds-appbar-separator-min-height-xs': '18px',
    '--rds-appbar-separator-max-height': '60px',
    '--rds-appbar-separator-width': '1px',
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
    '--rds-button-text-variant-bg': interactiveTokens.variantTextBg,
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
    '--rds-alert-warning-text': w[700],
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
    // ── Button primary ───────────────────────────────────────────────────────
    '--rds-button-primary-text': white,
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
    // ── Form (dark overrides) ─────────────────────────────────────────────────
    '--rds-form-bg': n[800],
    '--rds-form-border': n[700],
    '--rds-form-border-focus': p[200],
    '--rds-form-bg-focus': n[800],
    '--rds-form-control-asterisk-color': e[200],
    // ── Alerts (dark overrides) ───────────────────────────────────────────────
    '--rds-alert-success-bg': 'rgba(31, 118, 48, 0.15)',
    '--rds-alert-success-border': su[200],
    '--rds-alert-success-text': su[200],
    '--rds-alert-error-bg': 'rgba(189, 13, 29, 0.15)',
    '--rds-alert-error-border': e[200],
    '--rds-alert-error-text': e[200],
    '--rds-alert-warning-bg': 'rgba(160, 120, 0, 0.15)',
    '--rds-alert-warning-border': w[200],
    '--rds-alert-warning-text': w[200],
    '--rds-alert-info-bg': n[800],
    '--rds-alert-info-border': n[400],
    '--rds-alert-info-text': p[200],
    // ── Badge (dark overrides) ────────────────────────────────────────────────
    '--rds-badge-error-bg': e[200],
    '--rds-badge-warning-bg': w[200],
    '--rds-badge-neutral-bg': n[200],
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
