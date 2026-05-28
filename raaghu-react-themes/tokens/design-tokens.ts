/**
 * Design Tokens for Raaghu Design System
 * These tokens define the foundation of the design system
 */

// Color Tokens
export const colorTokens = {
  // Primary Colors
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#3C98FF', // Dark theme normal
    250: '#66B2FF', // Dark theme hover
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Primary
    600: '#1e88e5',
    700: '#3C98FF', // Light theme normal
    750: '#2E7CE0', // Light theme hover
    800: '#1565c0',
    900: '#0d47a1',
  },
  
  // Secondary Colors
  secondary: {
    50: '#fce4ec',
    100: '#f8bbd9',
    200: '#2534E9', // Dark theme normal
    250: '#4666FF', // Dark theme hover
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63', // Secondary
    600: '#d81b60',
    700: '#2534E9', // Light theme normal
    750: '#1827BB', // Light theme hover
    800: '#ad1457',
    900: '#880e4f',
  },
  
  // Semantic Colors
  success: {
    50: '#e8f5e8',
    100: '#c8e6c8',
    200: '#1F7630', // Dark theme normal
    250: '#31B64A', // Dark theme hover
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50', // Success
    600: '#43a047',
    700: '#1F7630', // Light theme normal
    750: '#1D5E2A', // Light theme hover
    800: '#2e7d32',
    900: '#1b5e20',
  },
  
  warning: {
    50: '#fffde7',
    100: '#fff9c4',
    200: '#C2510C', // Dark theme normal
    250: '#F98816', // Dark theme hover
    300: '#fff176',
    400: '#ffee58',
    500: '#ffeb3b', // Warning
    600: '#fdd835',
    700: '#C2510C', // Light theme normal
    750: '#9A4012', // Light theme hover
    800: '#f9a825',
    900: '#f57f17',
  },
  
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#BD0D1D', // Dark theme normal
    250: '#FF544F', // Dark theme hover
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336', // Error
    600: '#e53935',
    700: '#BD0D1D', // Light theme normal
    750: '#930011', // Light theme hover
    800: '#c62828',
    900: '#b71c1c',
  },
  
  // Neutral Colors
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#646464', // Dark theme normal
    250: '#969696', // Dark theme hover
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#646464', // Light theme normal
    750: '#4C4C4C', // Light theme hover
    800: '#424242',
    900: '#212121',
    1000: '#000000',
  },

  tertiary: {
    10: '#FEF3FF',
    50: '#F9CCFF',
    100: '#F8A4FF',
    200: '#F56EFF',
    300: '#EB37FE',
    400: '#B30FBC',
    500: '#DA25E9',
    600: '#940F99',
    700: '#7B127D',
    800: '#530054',
    900: '#29002A',
  },

  info: {
    10: '#E3F2FD',
    50: '#BBDEFB',
    100: '#90CAF9',
    200: '#64B5F6',
    300: '#42A5F5',
    400: '#2196F3',
    500: '#1E88E5',
    600: '#1976D2',
    700: '#1565C0',
    800: '#0D47A1',
    900: '#0B3D91',
  },
};

// (component-specific blocks for detailsPane and eSignature relocated below)

/** Extended breakpoints for responsive SCSS (injected as --rds-breakpoint-*). */
export const extendedBreakpointTokens = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
  'mobile-sm': '320px',
  'mobile-md': '375px',
  'mobile-lg': '414px',
  'tablet-sm': '768px',
  'tablet-md': '834px',
  'tablet-lg': '1024px',
  '280': '280px',
  '340': '340px',
  '360': '360px',
  '375': '375px',
  '380': '380px',
  '400': '400px',
  '420': '420px',
  '430': '430px',
  '514': '514px',
  '568': '568px',
  '576': '576px',
  '600': '600px',
  '640': '640px',
  '650': '650px',
  '700': '700px',
  '767': '767px',
  '769': '769px',
  '800': '800px',
  '833': '833px',
  '834': '834px',
  '835': '835px',
  '840': '840px',
  '896': '896px',
  '900': '900px',
  '991': '991px',
  '992': '992px',
  '1023': '1023px',
  '1025': '1025px',
  '1112': '1112px',
  '1280': '1280px',
  '1600': '1600px',
} as const;

// Typography Tokens
export const typographyTokens = {
  fontFamily: {
    primary: '"Poppins", sans-serif',
    secondary: '"Poppins", sans-serif',
    monospace: '"Roboto Mono", "Monaco", "Consolas", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    popover: {
      containerMaxWidth: '400px',
      containerMinWidth: '200px',
      wideMinWidth: '300px',
      wideMaxWidth: '600px',
      narrowMinWidth: '150px',
      narrowMaxWidth: '250px',
      positionGridMaxWidth: '120px',
      listMobileMaxWidth: '220px',
      listMobileMinWidth: '120px',
    },
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  
  fontWeight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
      // Secondary Colors (blue/indigo brand palette)
    widest: '0.1em',
  }
};

// Spacing Tokens
export const spacingTokens = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
};

// Exact pixel aliases for spacing (useful for CSS var injection when exact px needed)
export const spacingExact = {
  hairline: '1px',
  xxs: '2px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

// Border Radius Tokens
export const radiusTokens = {
  none: '0px',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
};

// Shadow Tokens
export const shadowTokens = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Animation Tokens
export const animationTokens = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },
  
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
};

// Z-Index Tokens
export const zIndexTokens = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  above: 2,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Breakpoint Tokens
export const breakpointTokens = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

// Component Tokens
export const componentTokens = {
  button: {
    height: {
      small: '32px',
      medium: '40px',
      large: '48px',
    },
    padding: {
      small: '0 16px',
      medium: '0 24px',
      large: '0 32px',
    }
  },
  
  input: {
    height: {
      small: '32px',
      medium: '40px',
      large: '48px',
    },
    padding: {
      small: '0 12px',
      medium: '0 16px',
      large: '0 20px',
    }
  },
  
  card: {
    padding: {
      small: '16px',
      medium: '24px',
      large: '32px',
    }
  }
  ,
  alert: {
    padding: {
      small: '0.25rem 0.5rem',
      medium: '0.375rem 0.75rem',
      large: '0.5rem 1rem',
    },
    style: {
      style1Shadow: '0px 12px 20px -4px rgba(0, 0, 0, 0.15)',
      borderWidth: '1.5px',
      leftBorderWidth: '6px',
    },
    linkFontSize: '0.8125rem',
    linkMarginRight: '0.625rem',
  }
  ,
  container: {
    padding: spacingTokens[4],
  }
  ,
  chip: {
    focusRingWidth: '2px',
    disabledOpacity: '0.6',
  },
  toggleButton: {
    minHeight: {
      small: '32px',
      medium: '36px',
      large: '44px',
      largeMobile: '40px',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
    },
    shadow: {
      selected: 'inset 0 0 0 1px currentColor',
      spaced: 'inset 0 0 0 1px rgba(0, 0, 0, 0.12)',
    }
  },
  aiAttachment: {
    minWidth: '273px',
    fabLeftOffset: '-18px',
    fabBottom: '10px',
    transformX: '30px',
    transformY: '97.5px',
  },
  aiIcon: {
    size: '22px',
  },
  aiTyping: {
    textareaHeight: '100px',
    autocompleteMinWidth: '190px',
    actionButtonMinWidth: '140px',
    fabLeftOffset: '-129px',
    actionButtonMarginRight: '5px',
    autocompleteMaxWidth: '60px',
  },
  chart: {
    bar: {
      // Heights for various presets used by the component
      barchart1Height: '65vh',
      histogramSize: '50px',
      defaultHeight: '76vh',
      tabletHeight: '600px',
      // Pie chart height token (used by pie component)
      pieHeight: '335px',
      // Dataset default colors (source of truth for component examples)
      dataset: {
        ds1Bg: '#4BC0C0', // rgba(75,192,192,1)
        ds1Border: '#4BC0C0',
        ds2Bg: '#36A2EB', // rgba(54,162,235,1)
        ds2Border: '#36A2EB',
        datasetBg: '#4BC0C0',
        datasetBorder: '#36A2EB',
      }
    },
    boolean: {
      size: '20vh'
    }
  },
  accordion: {
    summary: {
      height: {
        small: '32px',
        medium: '48px',
        large: '64px',
      },
      paddingX: {
        small: '8px',
        medium: '16px',
        large: '24px',
      },
      contentMargin: {
        small: '6px',
        medium: '12px',
        large: '16px',
      },
      iconSize: {
        small: '16px',
        medium: '20px',
        large: '28px',
      }
    },
    details: {
      marginTop: '12px',
      marginRight: '12px',
      marginBottom: '20px',
      marginLeft: '12px',
      minHeight: '80px',
      paddingY: '16px'
    },
    disabledOpacity: '0.6'
  }
  ,
  fileUploader: {
    dropzone: {
      paddingY: '32px',
      paddingX: '24px',
      minWidth: '500px',
      minHeight: '60px',
      borderRadius: '8px',
      borderWidth: '2px'
    },
    iconSize: '32px',
    button: {
      minWidth: '120px',
    },
    controlRadius: '6px',
    disabledOpacity: '0.6',
    sidePaddingLeft: '8px',
    titleSizeLeft: '20px',
    infoSizeLeft: '15px',
    uploadPaddingY: '4px',
    uploadPaddingX: '13px',
    filenameHeight: '40px',
    hintRowHeight: '20px',
    hintPaddingRight: '10px',
    fileProgressHeight: '6px',
    fileProgressRadius: '3px'
  }
  ,
  menu: {
    listMinWidth: '180px',
    listMinWidthSmall: '140px',
    listMinWidthMedium: '180px',
    listMinWidthLarge: '260px',
    itemMinHeight: '40px',
    itemMinHeightSmall: '26px',
    itemMinHeightLarge: '56px',
    headerMarginBottom: '2px',
    focusRing: '2px',
    letterSpacing: '0.5px',
    /* Multi-level menu specific tokens */
    mlmMinWidth: '220px',
    mlmRootOffset: '43px',
  }
  ,
  // Avatar tokens used across components
  avatar: {
    size: {
      small: '28px',
      medium: '32px',
      large: '40px',
    },
    // fallback font-size for avatar initials
    initialsFontSize: '0.875rem',
  },
  // Chat component size tokens
  chat: {
    height: '600px',
    maxHeight: '80vh',
    videoMaxWidth: '600px',
    messageMaxWidth: '280px',
  }
  ,
  // Kanban board component tokens
  kanban: {
    columnWidth: '300px',
    columnGap: '20px',
    cardMinHeight: '600px',
    cardMinWidth: '320px',
    addBoardMinWidth320: '320px',
    addBoardMinWidth280: '280px',
    subcardMinHeight: '133.6px',
    dropdownMinWidth: '125px',
    subcardPadding: '15px',
    subcardPaddingBottom: '15px',
    subcardPaddingInner: '8px',
    truncateMaxWidth: '265px',
    truncateHoverMaxWidth: '130px',
    btnMargin: '20px 0px 6px 0px',
    addBoardBtnPadding: '0px 6px',
    containerMobilePadding: '0px 16px 5px',
    addItemMargin: '6px 0px',
    subcardsContainerPadding: '0px 8px 8px 8px',
  },
  // Map component tokens (heatmap palette)
  map: {
    heatmapPalette: [
      '#FFAF00',
      '#2CC1A5',
      '#26BEAE',
      '#E1CF00',
      '#FEA200',
      '#28C0AB',
      '#F94E00',
      '#CCDE00',
      '#F84A00',
      '#1DBBBC',
      '#FC4703',
      '#25BDB1',
    ],
  },
};

  // Toolbar component tokens (used by rds-comp-toolbar)
  componentTokens.toolbar = {
    height: '40px',
    heightMobile: '32px',
    spacingXxs: spacingExact.xxs, // 2px
  };

// Component-specific tokens for details pane + e-signature (relocated)
componentTokens.detailsPane = {
  width: '338.098px',
  height: '671px',
  padding: '14px 7px',
  headerMarginLeft: '17px',
  tabUnderlineOffset: '-2px',
  tabUnderlineHeight: '3px',
  activityItemPadding: '8px 5px',
  sectionLineHeight: '1px',
  agentCardBeforeWidth: '5px',
  agentNameMarginBottom: '3px',
  agentRadioSize: '16px',
  footerFixedMarginLeft: '-28px',
  footerButtonHeight: '36px',
  footerButtonMaxWidth: '360px',
  favouriteCardImageMaxWidth: '340px',
  carouselIndicatorsTop: '180px',
  thumbnailViewWidth: '329px',
  thumbnailViewHeight: '596px',
  downloadButtonContainerMarginRight: '3px',
  historyItemPadding: '10px 8px',
  historyIconSize: '36px',
  carouselMobileMarginRight: '-30px',
  carouselMobileHeight: '152px',
  mobileWidth: '281.098px',
  mobileHeight: '543px',
};

componentTokens.eSignature = {
  paddingBottom: '68px',
  controlsPadding: '14px 24px 12px',
  drawHeightCompact: '200px',
  compactMaxWidth: '420px',
  compactPaddingBottom: '56px',
  uploadPanelMaxWidth: '420px',
  uploadPanelPadding: '20px',
  fileButtonHeight: '32px',
  fileButtonMinWidth: '108px',
  fileButtonFontSize: '13px',
  fileButtonPadding: '0 12px',
  fileTextHeight: '32px',
  fileTextFontSize: '13px',
  fileTextPaddingHorizontal: '12px',
  fileDeleteHeight: '32px',
  fileDeletePaddingHorizontal: '8px',
  colorPaletteGap: '10px',
  colorButtonSize: '32px',
};

// Pagination component tokens
componentTokens.pagination = {
  itemSize: {
    xs: '18px',
    sm: '22px',
    md: '24px',
    lg: '28px',
    xl: '30px',
  },
  buttonMinWidth: '60px',
  textFieldWidth: '44px',
  smallGapOffset: '3px',
  dropdownMinWidth: '120px',
  fontSize: {
    xs: '0.65rem',
    sm: '0.7rem',
    md: '0.75rem',
    lg: '0.85rem',
  }
};

// Progress component tokens
componentTokens.progress = {
  dashWidth: '50px',
  dashHeight: '5px',
  blockWidth: '80px',
  blockHeight: '40px',
  stepSize: '40px',
  stepSizeMobile: '30px',
  connectorWidth: '60px',
  connectorWidthMobile: '35px',
  innerDotSize: '20px',
  transition: '0.2s ease-in-out',
};

// Range component tokens (used by rds-range)
componentTokens.range = {
  maxWidthSm: '370px',
  maxWidthXs: '275px',
  sliderWidthMobile: '288px',
  sliderWidthTablet: '382px',
  disabledOpacity: '0.6',
};

// Component tokens for emoji generator and empty state (used by components)
componentTokens.emojiGenerator = {
  width: '360px',
  height: '420px',
  iconSizeSm: '29px',
  iconSizeXs: '22px',
  popoverWidth: '45px',
  inlineMinWidth: '36px',
};

componentTokens.emptyState = {
  maxWidth: '640px',
  padding: '32px',
  buttonPadding: '6px 15px',
};

// Table component tokens
componentTokens.table = {
  stickyMaxHeight: '440px',
  actionsWidth: '120px',
  checkbox: {
    size: '18px',
    borderWidth: '2px',
    checkWidth: '6px',
    checkHeight: '10px',
    indeterminateWidth: '8px',
    indeterminateHeight: '2px',
    hoverRingSize: '4px',
    focusRingSize: '2px',
    disabledOpacity: '0.6',
  },
  focus: {
    ringWidth: '2px',
    ringOffset: '2px',
  }
};

/**
 * Surface / UI chrome tokens — named semantic aliases used by build-rds-css-vars.ts.
 * These are NOT raw palette entries; they carry intent (e.g. "code background").
 */
export const surfaceTokens = {
  /** Dark code-block background */
  codeBg: '#0b1220',
  /** Light code-block foreground */
  codeColor: '#e6eef6',

  // ── Light-theme surface neutrals ──────────────────────────────────────────
  // Adaptive Cards component tokens (component-scoped defaults)
  adaptiveCards: {
    thumbWidth: '20px',
    minThumbWidth: '32px',
    minWidth: '90px',
    maxWidth: '120px',
    minWidth100: '100px',
    inputPaddingVertical: '1px',
    inputPaddingHorizontal: '16px',
    gapXxs: '2px',
    gapXs: '6px',
    gap: '14px',
    maxWidthSm: '50px',
    minWidthSm: '50px',
    maxWidthXs: '48px',
    maxWidthMd: '55px',
    iconWidth: '24px',
    borderWidth: '2px',
    minHeight200: '200px',
    minHeight160: '160px',
    minHeight120: '120px',
    minHeight48: '48px',
    fontSizeXxs: '9px',
    fontSizeSm: '13px',
    fontSizeMd: '15px',
    errorRing: '0 0 0 2px rgba(189,13,29,0.2)',
    imageListItemHeightMobile: '120px',
    footballLogoSizeMobile: '72px'
  },
  /** Darkest neutral surface (light theme) */
  neutralDarker: '#202020',
  /** Dark neutral surface (light theme) */
  neutralDark: '#4C4C4C',
  /** Medium neutral surface (light theme) */
  neutralMedium: '#CDCDCD',

  // ── Dark-mode UI chrome ───────────────────────────────────────────────────
  /** Standard dark surface (cards, panels) */
  darkBase: '#424242',
  /** Hovered dark surface */
  darkHover: '#505050',
  /** Alternate dark surface */
  darkAlt: '#3a3a3a',
  /** Deep dark surface */
  darkDeep: '#2a2a2a',
  /** Elevated dark border */
  darkElevatedBorder: '#5a5a5a',
  /** Dark surface variant */
  darkVariant: '#303030',
  /** Selected dark surface */
  darkSelected: '#3b3b3b',
  /** Disabled dark surface */
  darkDisabled: '#272727',
  /** Container dark surface */
  darkContainer: '#4a4a4a',
  /** Surface hover (dark) */
  darkSurfaceHover: '#1F2123',
  /** Variant hover (dark) */
  darkVariantHover: '#b9b7b7',
  /** Disabled container (dark) */
  darkDisabledContainer: '#4a4a4a',
};

/**
 * Semantic button / interactive color tokens not covered by colorTokens palette.
 * These represent specific design decisions for interactive states.
 */
export const interactiveTokens = {
  // ── Light-theme secondary button ──────────────────────────────────────────
  /** Secondary button hover background */
  secondaryBgHover: '#EBDCFF',
  /** Secondary button active background */
  secondaryBgActive: '#D4BBFF',
  /** Secondary button text color */
  secondaryText: '#7825E9',
  /** Secondary button disabled text */
  secondaryTextDisabled: '#A875FF',

  /** Variant text background used for text-buttons hover (semi-transparent blue) */
  variantTextBg: 'rgba(60, 152, 255, 0.04)',

  // ── Alert backgrounds ─────────────────────────────────────────────────────
  /** Alert success border (uses primary purple brand) */
  alertSuccessBorder: '#7825E9',
  /** Alert error background */
  alertErrorBg: '#FFDAD6',
  /** Alert warning background (neutral mid) */
  alertWarningBg: '#FED99B',
};

/**
 * Alpha / overlay tokens — semi-transparent values used for overlays, actions, borders.
 */
export const alphaTokens = {
  // ── Overlays ──────────────────────────────────────────────────────────────
  /** Standard modal/overlay scrim */
  overlayDark: 'rgba(0, 0, 0, 0.5)',
  /** Heavy overlay scrim */
  overlayDarker: 'rgba(0, 0, 0, 0.7)',
  /** Semi-transparent grey overlay */
  overlaySemi: 'rgba(128, 128, 128, 0.4)',

  // ── Light-theme action states ─────────────────────────────────────────────
  /** Hover state background (light) */
  actionHoverLight: 'rgba(0, 0, 0, 0.04)',
  /** Active state (light) */
  actionActiveLight: 'rgba(0, 0, 0, 0.54)',
  /** Disabled state (light) */
  actionDisabledLight: 'rgba(0, 0, 0, 0.26)',

  // ── Dark-theme action states ──────────────────────────────────────────────
  /** Hover state background (dark) */
  actionHoverDark: 'rgba(255, 255, 255, 0.08)',
  /** Active state (dark) */
  actionActiveDark: 'rgba(255, 255, 255, 0.16)',
  /** Disabled state (dark) */
  actionDisabledDark: 'rgba(255, 255, 255, 0.3)',

  // ── Border alphas ─────────────────────────────────────────────────────────
  /** Light-theme border with opacity */
  borderOpacityLight: 'rgba(0, 0, 0, 0.12)',
  /** Dark-theme border with opacity */
  borderOpacityDark: 'rgba(255, 255, 255, 0.12)',

  // ── Placeholder colors ────────────────────────────────────────────────────
  /** Placeholder text (light theme) */
  placeholderLight: 'rgba(0, 0, 0, 0.6)',
  /** Placeholder text (dark theme) */
  placeholderDark: 'rgba(255, 255, 255, 0.65)',

  // ── Modal backdrop ────────────────────────────────────────────────────────
  /** Modal backdrop scrim */
  modalBackdrop: 'rgba(0, 0, 0, 0.5)',

  // ── Dark-theme toggle / scrollbar ─────────────────────────────────────────
  /** Toggle group border (dark) */
  toggleGroupBorderDark: 'rgba(255, 255, 255, 0.23)',
  /** Toggle group disabled border (dark) */
  toggleGroupBorderDisabledDark: 'rgba(100, 100, 100, 0.5)',

  // ── Dark-theme elevation shadows ──────────────────────────────────────────
  /** Elevation shadow level 2 (dark) */
  elevation2Dark: '0 4px 8px rgba(0, 0, 0, 0.6)',
  /** Focus ring elevation (dark) */
  elevationFocusDark: '0 0 0 1px rgba(255, 255, 255, 0.04)',
};

/**
 * Elevation shadow tokens for the shared CSS var map.
 * These are the Material-style layered shadows used by --rds-elevation-*.
 */
export const elevationTokens = {
  0: 'none',
  1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  2: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
  3: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
  4: '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
  5: '0 20px 40px rgba(0, 0, 0, 0.20)',
};

/**
 * Dark-mode grid / data-table surface tokens.
 */
export const gridTokens = {
  bg: '#424242',
  bgAlt: '#3a3a3a',
  headerBg: '#424242',
  textSubtle: '#bdbdbd',
  border: '#5a5a5a',
};

/**
 * Dark-mode icon / text muted tokens.
 */
export const iconTokens = {
  mutedDark: '#B0B3B8',
  onSurfaceVariantDark: '#E1E6EB',
};

/**
 * Scrollbar tokens (dark mode).
 */
export const scrollbarTokens = {
  track: '#2a2a2a',
  thumb: '#555555',
  thumbHover: '#6a6a6a',
};

/**
 * App bar component tokens — dark-mode overrides that have no palette equivalent.
 */
export const appBarTokens = {
  /** Dark app bar background — deeper than page background */
  darkBg: '#181c20',
  /** Dark secondary-variant app bar background */
  darkSecondaryBg: '#7c2946',
  /** Dark badge background */
  darkBadgeBg: '#232e3a',
  /** Dark badge foreground — light blue accent */
  darkBadgeColor: '#90caf9',
};

/**
 * Misc UI tokens that don't fit other categories.
 */
export const miscTokens = {
  /** Offcanvas cancel / link color */
  offcanvasCancelColor: '#2196F3',
  /** Dark-mode disabled text */
  disabledTextDark: '#9e9e9e',
  /** Dark-mode border color */
  borderColorDark: '#44474A',
  /** Letter-spacing for MUI button (matches MUI default) */
  letterSpacingButton: '0.02857em',
  /** Backdrop blur value */
  backdropBlur: '2px',
  /** Focus ring offset */
  focusRingOffset: '2px',
  /** Base font size (px, for CSS var) */
  fontSizeBase: '14px',
};

/**
 * Spinner component tokens — fallback colors for the spinner variants.
 * These are used as CSS custom property defaults in rds-comp-spinner.scss.
 */
export const spinnerTokens = {
  primaryColor: '#1976d2',
  secondaryColor: '#6c757d',
  successColor: '#28a745',
  dangerColor: '#dc3545',
  warningColor: '#ffc107',
  infoColor: '#17a2b8',
  lightColor: '#f8f9fa',
  darkColor: '#343a40',
  animationDuration: '0.75s',
};

/**
 * These are defined as local CSS vars inside .rds-input and referenced by child rules.
 * Injecting them at :root ensures they are available even outside the .rds-input scope.
 */
export const inputTokens = {
  borderWidthThin: 'calc(var(--rds-spacing-xs) / 4)',
  borderWidthThick: 'calc(var(--rds-spacing-xs) / 2)',
  focusRingError: '0 0 0 var(--rds-input-border-width-thick) var(--rds-error-light)',
  paddingSmallY: 'calc(var(--rds-spacing-xs) / 2)',
  paddingSmallX: 'calc(var(--rds-spacing-sm) - var(--rds-input-border-width-thin))',
  paddingMediumY: 'var(--rds-spacing-xs)',
  paddingMediumX: 'calc(var(--rds-spacing-md) - var(--rds-spacing-xs))',
    /** Secondary button hover background */
  paddingLargeY: 'calc(var(--rds-spacing-sm) - var(--rds-input-border-width-thin))',
  paddingLargeX: 'calc(var(--rds-spacing-md) - var(--rds-input-border-width-thin))',
  muiPaddingSmallY: 'calc(var(--rds-spacing-sm) + (var(--rds-input-border-width-thin) / 2))',
  muiPaddingMediumY: 'calc(var(--rds-spacing-md) + (var(--rds-input-border-width-thin) / 2))',
  muiPaddingSmallX: 'var(--rds-spacing-sm)',
  muiPaddingMediumX: 'calc(var(--rds-spacing-xs) / 2)',
  muiPaddingLargeX: 'calc(var(--rds-input-border-width-thick) / 2)',
  labelLargeX: 'calc(var(--rds-spacing-md) - (var(--rds-input-border-width-thick) / 2))',
  labelLargeY: 'calc(var(--rds-spacing-lg) - (var(--rds-spacing-xs) / 2))',
  fontSizeLabel: 'var(--rds-font-size-sm)',
  asteriskOffset: 'calc(var(--rds-input-border-width-thick))',
  srOnlySize: 'var(--rds-input-border-width-thin)',
  srOnlyOffset: 'calc(var(--rds-input-sr-only-size) * -1)',
};

/**
 * Tooltip component tokens — arrow geometry and focus ring.
 */
export const tooltipTokens = {
  borderWidth: '1.5px',
  arrowOffset: '0.4em',
  arrowShadow: 'var(--rds-elevation-2)',
  focusRingWidth: '2px',
};

/**
 * E-signature component tokens.
 */
export const esignatureTokens = {
  drawHeight: 'var(--rds-signature-draw-height, 280px)',
  spacingMd: 'var(--rds-spacing-md)',
};

/**
 * FAB menu component tokens.
 */
export const fabMenuTokens = {
  openHeight: '290px',
};

/**
 * AI gradient brand tokens for rds-comp-ai-gradient-text-with-icon.
 */
export const aiGradientTokens = {
  gradientStart: '#7825E9',
  gradientMid: '#E91E8C',
  gradientEnd: '#FF6B6B',
};

/**
 * Switch component tokens — disabled secondary background.
 */
export const switchTokens = {
  disabledSecondaryBg: 'rgba(24, 39, 187, 0.24)',
  /** Track border radius for styled switches (exact 25px when requested) */
  trackBorderRadius: '25px',
};

/**
 * Semantic color aliases used in components but not covered by the main palette.
 * These provide stable names for colors that appear in multiple components.
 */
export const semanticAliasTokens = {
  /** Generic "dark" color (Bootstrap-style) */
  colorDark: '#343a40',
  /** Generic gray-500 (Bootstrap-style) */
  colorGray500: '#adb5bd',
  /** Generic icon color (neutral mid) */
  colorIcon: '#646464',
  /** Generic text color alias */
  colorText: 'var(--rds-text-primary)',
  /** Generic background color alias */
  colorBackground: 'var(--rds-background-default)',
  /** Background hover alias */
  backgroundHover: 'var(--rds-action-hover)',
  /** Action disabled background */
  actionDisabledBackground: 'var(--rds-background-surface)',
  /** Surface alt (slightly different from surface) */
  colorSurfaceAlt: 'var(--rds-background-surface)',
  /** Surface disabled */
  colorSurfaceDisabled: 'var(--rds-background-surface)',
  /** Switch label color */
  colorSwitchLabel: '#757575',
  /** On-secondary contrast text */
  colorOnSecondary: '#ffffff',
  /** Popover surface border */
    popoverSurfaceBorder: '1px solid var(--rds-border-default)', // uses theme-aware border-default token
  /** Sidebar overlay background */
  sidebarOverlayBg: 'var(--rds-action-hover)',
  /** Font size body alias */
  fontSizeBody: 'var(--rds-font-size-sm)',
  /** --- Component/alias tokens added for rds-counter refactor --- */
  /** Primary main token used by components */
  rdsPrimaryMain: colorTokens.primary[700],
  /** Primary darker/hover variant */
  rdsPrimaryDark: colorTokens.primary[750],
  /** Primary contrast text color */
  rdsPrimaryContrastText: '#ffffff',
  /** Primary hover alias (explicit) */
  rdsPrimaryHover: colorTokens.primary[750],
  /** Secondary text color alias */
  rdsTextSecondary: colorTokens.neutral[600],
  /** Default border color used across components */
  rdsBorderDefault: colorTokens.neutral[400],
  /** Medium border radius alias */
  rdsBorderRadiusMd: radiusTokens.md,
  /** Extra-extra-small spacing (used as 2px fallback) */
  rdsSpacingXxs: '2px',
  /** Focus ring width used by components as fallback */
  rdsFocusRingWidth: '2px',
  /** Action disabled color and background aliases */
  rdsActionDisabled: colorTokens.neutral[400],
  rdsActionDisabledBackground: colorTokens.neutral[100],
  /** Icon button focus color (used by rds-icon-button) */
  rdsIconButtonFocusColor: colorTokens.info[600],
};

// Export all tokens as a single object (single human-edited source for the design system)
export const designTokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  animation: animationTokens,
  zIndex: zIndexTokens,
  breakpoint: breakpointTokens,
  extendedBreakpoint: extendedBreakpointTokens,
  component: componentTokens,
  surface: surfaceTokens,
  interactive: interactiveTokens,
  alpha: alphaTokens,
  elevation: elevationTokens,
  grid: gridTokens,
  icon: iconTokens,
  scrollbar: scrollbarTokens,
  misc: miscTokens,
  appBar: appBarTokens,
  spinner: spinnerTokens,
  input: inputTokens,
  tooltip: tooltipTokens,
  esignature: esignatureTokens,
  fabMenu: fabMenuTokens,
  aiGradient: aiGradientTokens,
  switch: switchTokens,
  semanticAlias: semanticAliasTokens,
};

export default designTokens;
