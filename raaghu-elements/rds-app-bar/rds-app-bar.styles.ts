import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

type AppBarSx = SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);

const contrastTextTargets =
  '.rds-header__title, .rds-header__actions, .rds-header__logo, .rds-header__center-content, .rds-avatar__name, #avatarname, .rds-avatar__designation, .rds-profile-menu__name, .rds-profile-menu__chevron';

const actionSlots = '.rds-header__actions, .rds-header__right-actions, .rds-header__center-content';

/**
 * Theme-aware AppBar styles (G1-041). Prefer this + CSS vars over SCSS `!important`
 * and `[data-theme="dark"]` remaps. Dark-only rules use `theme.applyStyles('dark', …)`.
 */
export const rdsAppBarSx: AppBarSx[] = [
  (theme) => ({
    '&.rds-header': {
      '--rds-header__search-field-bg': 'var(--rds-background-paper)',
      '--rds-header__search-field-color': 'var(--rds-text-primary)',
    },

    // Beat MuiInputBase paper fill so header search follows RDS tokens (dark = surface).
    '.rds-header__search': {
      backgroundColor: 'var(--rds-header__search-field-bg)',
      color: 'var(--rds-header__search-field-color)',
      '& input, & .MuiInputBase-input': {
        color: 'var(--rds-header__search-field-color)',
        '&::placeholder': {
          color: 'var(--rds-text-secondary)',
          opacity: 1,
        },
      },
    },

    '&.rds-header--transparent': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },

    '&.rds-header--primary': {
      '--rds-color-on-primary': 'var(--rds-color-on-surface)',
      backgroundColor: 'var(--rds-color-primary)',
      color: 'var(--rds-color-on-primary)',
      [contrastTextTargets]: {
        color: 'var(--rds-color-on-primary)',
      },
      [`${actionSlots} .MuiButton-root, ${actionSlots} .MuiButton-text, ${actionSlots} .MuiIconButton-root`]: {
        color: 'var(--rds-color-on-primary)',
      },
      [`${actionSlots} .MuiAvatar-root`]: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: 'var(--rds-color-on-primary)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
      },
      '.rds-header__search': {
        color: 'var(--rds-color-on-primary)',
      },
      '.rds-header__search-clear': {
        color: 'var(--rds-color-on-primary)',
      },
    },

    '&.rds-header--secondary': {
      '--rds-color-on-secondary': 'var(--rds-color-on-surface)',
      backgroundColor: 'var(--rds-color-secondary)',
      color: 'var(--rds-color-on-secondary)',
      [contrastTextTargets]: {
        color: 'var(--rds-color-on-secondary)',
      },
      [`${actionSlots} .MuiButton-root, ${actionSlots} .MuiButton-text, ${actionSlots} .MuiIconButton-root`]: {
        color: 'var(--rds-color-on-secondary)',
      },
      [`${actionSlots} .MuiAvatar-root`]: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: 'var(--rds-color-on-secondary)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
      },
      '.rds-header__search': {
        color: 'var(--rds-color-on-secondary)',
      },
      '.rds-header__search-clear': {
        color: 'var(--rds-color-on-secondary)',
      },
    },

    '.rds-header__menu-button': {
      marginLeft: 0,
      marginRight: 'var(--rds-spacing-sm)',
      [theme.breakpoints.down(840)]: {
        marginRight: 0,
      },
    },

    '.rds-appbar-tab-btn': {
      borderRadius: 'var(--rds-border-radius-none)',
    },
    '.rds-appbar-tab-btn-active': {
      color: 'var(--rds-text-primary)',
      borderBottom: '3px solid var(--rds-color-primary)',
    },

    '.rds-header__tabs-inline .MuiTab-root': {
      minHeight: 'auto',
      padding: 'var(--rds-spacing-sm) var(--rds-spacing-md)',
      fontSize: 'var(--rds-font-size-md)',
      fontWeight: 500,
      textTransform: 'none',
      color: 'var(--rds-color-on-surface)',
      minWidth: 'auto',
      [theme.breakpoints.down(834)]: {
        padding: 'var(--rds-spacing-sm) calc(var(--rds-spacing-md) - var(--rds-spacing-xs))',
        fontSize: 'var(--rds-font-size-sm)',
      },
      [theme.breakpoints.down(420)]: {
        padding: 'calc(var(--rds-spacing-sm) - var(--rds-spacing-xs)) calc(var(--rds-spacing-md) - var(--rds-spacing-xs))',
        fontSize: 'var(--rds-font-size-sm)',
      },
      [theme.breakpoints.down(320)]: {
        padding: 'var(--rds-spacing-compact) var(--rds-spacing-sm)',
        fontSize: 'var(--rds-font-size-xs)',
      },
      '&:hover': {
        color: 'var(--rds-color-primary)',
        backgroundColor: 'transparent',
        opacity: 1,
      },
      '&.Mui-selected': {
        color: 'var(--rds-color-primary)',
        '&:hover': {
          color: 'var(--rds-color-primary)',
          backgroundColor: 'transparent',
        },
      },
    },
    '.rds-header__tabs-inline .MuiTabs-indicator': {
      height: 2,
      backgroundColor: 'var(--rds-color-primary)',
    },

    '.rds-language-menu-paper': {
      width: 220,
      maxWidth: 260,
      maxHeight: 360,
      overflow: 'hidden',
      boxSizing: 'border-box',
      [theme.breakpoints.down(834)]: {
        width: 200,
        maxWidth: 240,
      },
      [theme.breakpoints.down(420)]: {
        width: 180,
        maxWidth: 200,
        maxHeight: 300,
      },
      [theme.breakpoints.down(320)]: {
        width: 160,
        maxWidth: 180,
        maxHeight: 280,
      },
    },
    '.rds-language-menu-paper .MuiMenuItem-root, .rds-language-menu-list .MuiMenuItem-root': {
      fontSize: 'var(--rds-font-size-sm)',
      paddingTop: 'var(--rds-spacing-compact)',
      paddingBottom: 'var(--rds-spacing-compact)',
      paddingLeft: 'var(--rds-spacing-12-px)',
      paddingRight: 'var(--rds-spacing-12-px)',
      minHeight: 0,
      lineHeight: 1.2,
    },
    '.rds-language-menu-list': {
      paddingTop: 'var(--rds-spacing-xs)',
      paddingBottom: 'var(--rds-spacing-xs)',
      maxHeight: 360,
      overflowY: 'auto',
      [theme.breakpoints.down(420)]: { maxHeight: 300 },
      [theme.breakpoints.down(320)]: { maxHeight: 280 },
    },

    [theme.breakpoints.down(420)]: {
      '.MuiIconButton-root': {
        padding: 'var(--rds-spacing-sm)',
        '& svg': { fontSize: 'var(--rds-font-size-2xl)' },
      },
      '.MuiAvatar-root': {
        width: 28,
        height: 28,
        fontSize: 'var(--rds-font-size-md)',
      },
      '.MuiTypography-body1': { fontSize: 'var(--rds-font-size-sm)' },
      '.MuiTypography-body2': { fontSize: 'var(--rds-font-size-xs)' },
      '.rds-header__tabs-inline .MuiTab-root:not(.Mui-selected), .rds-appbar-tabs-container .MuiButton-root:not(.Mui-selected), .rds-appbar-tabs-container button:not(.Mui-selected)':
        {
          color: 'var(--rds-color-on-surface)',
        },
      '.rds-bottom-navigation .rds-bottom-nav-tab:not(.rds-bottom-nav-tab--active)': {
        color: 'var(--rds-color-on-surface)',
      },
    },
    [theme.breakpoints.down(320)]: {
      '.MuiIconButton-root': {
        padding: 'var(--rds-spacing-compact)',
        marginRight: 0,
        '& svg': {
          fontSize: 'var(--rds-font-size-xl)',
          marginLeft: 0,
        },
      },
      '.MuiAvatar-root': {
        width: 'var(--rds-size-lg)',
        height: 'var(--rds-size-lg)',
        fontSize: 'var(--rds-font-size-sm)',
      },
    },
    '@media (max-width: 1280px)': {
      '.rds-bottom-navigation .rds-bottom-nav-tab:not(.rds-bottom-nav-tab--active), .rds-bottom-navigation .MuiButton-root:not(.rds-bottom-nav-tab--active)':
        {
          color: 'var(--rds-color-on-surface, var(--rds-text-primary))',
        },
      '.rds-header__tabs-inline .MuiTab-root:not(.Mui-selected), .rds-appbar-tabs-container .MuiButton-root:not(.Mui-selected), .rds-appbar-tabs-container button:not(.Mui-selected)':
        {
          color: 'var(--rds-color-on-surface)',
        },
    },

    // withMenuButton ≤840 (class set from useMediaQuery — no SCSS display wars)
    '&.rds-header--withmenubutton-compact': {
      overflow: 'visible',
      '.rds-story-nav-actions, .rds-logo-search-tabs__left-actions, .rds-appbar-badge, .rds-appbar-actions-group .MuiButton-contained':
        {
          display: 'none',
        },
      '.rds-appbar-actions-group, .rds-header__right-actions': {
        display: 'flex',
        alignItems: 'center',
      },
      '.rds-appbar-actions-group > *:not(.rds-withmenubutton-settings):not(.rds-profile-menu__button)': {
        display: 'none',
      },
      '.rds-bottom-navigation .rds-appbar-badge, .rds-bottom-navigation .MuiButton-contained': {
        display: 'inline-flex',
        alignItems: 'center',
      },
      '.rds-bottom-navigation .rds-bottom-nav-tab': {
        fontSize: 'var(--rds-font-size-sm)',
        padding: '4px 6px',
      },
      '.rds-bottom-navigation .rds-appbar-badge': {
        fontSize: 'var(--rds-font-size-xs)',
        padding: '2px 4px',
      },
      '.rds-bottom-navigation .MuiButton-root': {
        fontSize: 'var(--rds-font-size-xs)',
        padding: '3px 6px',
      },
      '.rds-profile-menu__button .MuiBox-root, .rds-profile-menu__button .rds-avatar__info, .rds-profile-menu__button .rds-profile-menu__name-lg, .rds-profile-menu__button .rds-profile-menu__email, .rds-profile-menu__button .rds-profile-menu__chevron, .rds-avatar__info':
        {
          display: 'none',
        },
      '.rds-profile-menu__avatar, .rds-profile-menu__button .MuiAvatar-root': {
        width: 30,
        height: 30,
      },
      '.rds-header__toolbar': {
        position: 'relative',
        paddingRight: 'var(--rds-spacing-96-px)',
      },
      '.rds-header__search-wrapper': {
        marginRight: 'var(--rds-spacing-12-px)',
        flex: '0 1 auto',
        maxWidth: 'calc(100% - 140px)',
        position: 'relative',
        transform: 'none',
      },
      '.rds-withmenubutton-settings': {
        display: 'inline-flex',
        alignItems: 'center',
        position: 'absolute',
        right: 72,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 'calc(var(--rds-z-index-base) + 4)',
        marginLeft: 0,
        paddingLeft: 'var(--rds-spacing-compact)',
        paddingRight: 'var(--rds-spacing-compact)',
      },
      '.rds-profile-menu__button': {
        display: 'inline-flex',
        alignItems: 'center',
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 'calc(var(--rds-z-index-base) + 5)',
        marginLeft: 0,
        paddingLeft: 'var(--rds-spacing-compact)',
        paddingRight: 'var(--rds-spacing-compact)',
      },
    },

    // withMenuButton ≤420 — narrow overrides on top of compact
    '&.rds-header--withmenubutton-compact.rds-header--withmenubutton-narrow': {
      '.rds-header__toolbar': {
        paddingLeft: 'var(--rds-spacing-sm)',
        paddingRight: 'var(--rds-spacing-110)',
        overflow: 'visible',
      },
      '.rds-header__title': {
        flex: '0 0 auto',
        maxWidth: 'none',
      },
      '.rds-header__search-wrapper': {
        order: 2,
        flex: '1 1 auto',
        minWidth: 0,
        maxWidth: 140,
      },
      '.rds-withmenubutton-settings': {
        right: 60,
        padding: 'var(--rds-spacing-compact)',
      },
      '.rds-profile-menu__button': {
        right: 12,
      },
      '.rds-profile-menu__avatar, .rds-profile-menu__button .MuiAvatar-root': {
        width: 28,
        height: 28,
      },
      '.rds-bottom-navigation .MuiButton-contained': {
        color: 'var(--rds-color-on-primary)',
      },
      [theme.breakpoints.down(320)]: {
        '.rds-appbar-logo-group, .rds-header__logo': { left: 8 },
        '.rds-header__toolbar': {
          paddingLeft: 'var(--rds-spacing-2xl-px)',
          paddingRight: 90,
        },
        '.rds-withmenubutton-settings': {
          right: 'var(--rds-spacing-52)',
          padding: 'var(--rds-spacing-xs)',
        },
        '.rds-profile-menu__button': { right: 8 },
        '.rds-profile-menu__avatar, .rds-profile-menu__button .MuiAvatar-root': {
          width: 'var(--rds-size-lg)',
          height: 'var(--rds-size-lg)',
        },
        '.rds-header__search-wrapper': {
          maxWidth: 'calc(100% - 100px)',
          minWidth: 60,
        },
      },
    },

    // Shared: avatar-only profile on logo* variants at ≤420
    '&.rds-header--logosearchtabs-compact, &.rds-header--logotabsactions-compact': {
      '.rds-profile-menu__button .MuiBox-root, .rds-profile-menu__button .rds-profile-menu__name-lg, .rds-profile-menu__button .rds-profile-menu__email, .rds-avatar__info, .rds-profile-menu__button .rds-profile-menu__chevron':
        {
          display: 'none',
        },
      '.rds-header__search input::placeholder': {
        fontSize: 'var(--rds-font-size-xs)',
        opacity: 0.9,
      },
    },

    '&.rds-header--logosearchtabs-compact': {
      '.rds-logo-search-tabs__left-actions': { display: 'none' },
      '.rds-header__search-wrapper': {
        order: 2,
        flex: 1,
        minWidth: 0,
        maxWidth: 'calc(100% - 140px)',
        position: 'relative',
        transform: 'none',
        marginRight: 0,
      },
      '.rds-profile-menu__button, .rds-profile-menu': {
        order: 99,
        marginLeft: 0,
        marginRight: 0,
        display: 'inline-flex',
        alignItems: 'center',
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 'calc(var(--rds-z-index-base) + 5)',
      },
      '.rds-header__toolbar': {
        position: 'relative',
        paddingRight: 'var(--rds-spacing-80-px)',
      },
      '.rds-appbar-overflow-content .rds-logo-search-tabs__left-actions': {
        display: 'flex',
        gap: 'calc(var(--rds-spacing-md) - var(--rds-spacing-xs))',
        alignItems: 'center',
      },
    },
    '&.rds-header--logosearchtabs-narrow': {
      '.rds-header__search-wrapper': {
        maxWidth: 'calc(100% - 120px)',
      },
      '.rds-profile-menu__button': {
        right: 8,
      },
      '.rds-header__toolbar': {
        paddingRight: 'var(--rds-spacing-68)',
      },
    },

    '&.rds-header--logosearchtabsactions-compact': {
      '.rds-story-nav-actions': { display: 'none' },
      '.rds-header__search-wrapper': {
        order: 2,
        flex: '0 1 auto',
        minWidth: 0,
      },
      '.rds-profile-menu__button, .rds-profile-menu': {
        order: 99,
        marginLeft: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
      },
    },

    '&.rds-header--logotabsactions-compact': {
      '.rds-story-nav-actions': { display: 'contents' },
      '.rds-story-nav-action': { display: 'none' },
      '.rds-header__toolbar': {
        position: 'relative',
        paddingRight: 'var(--rds-spacing-56-px)',
        overflow: 'visible',
      },
      '.rds-header__search-wrapper': {
        order: 2,
        flex: '0 1 auto',
        minWidth: 0,
        position: 'relative',
        transform: 'none',
        maxWidth: 'calc(100% - 120px)',
        marginRight: 'var(--rds-spacing-xs)',
      },
      '.rds-profile-menu__button': {
        display: 'inline-flex',
        order: 4,
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 'calc(var(--rds-z-index-base) + 5)',
      },
    },
    '&.rds-header--logotabsactions-narrow': {
      '.rds-header__search-wrapper': {
        maxWidth: 80,
      },
      '.rds-profile-menu__button': {
        right: 11,
      },
    },

    '&.rds-header--dashboardwithlang-compact': {
      '.rds-appbar-separator': { display: 'none' },
      '.rds-dashboard-title': {
        marginLeft: 'var(--rds-spacing-compact)',
        fontSize: 'var(--rds-font-size-md)',
        lineHeight: 1.1,
        fontWeight: 500,
      },
      '.rds-header__toolbar': {
        position: 'relative',
        paddingLeft: 'var(--rds-spacing-sm)',
        paddingRight: 'var(--rds-spacing-56-px)',
        gap: 'var(--rds-spacing-sm)',
      },
      '.rds-admin-profile__button': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--rds-spacing-sm)',
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: 0,
        paddingLeft: 'var(--rds-spacing-compact)',
        paddingRight: 'var(--rds-spacing-compact)',
      },
      '.rds-admin-profile__button .MuiBox-root, .rds-admin-profile__button .MuiTypography-root, .rds-admin-profile__button .rds-admin-profile__chevron':
        {
          display: 'none',
        },
      '.rds-admin-profile__button > .MuiAvatar-root': {
        display: 'inline-flex',
        width: 28,
        height: 28,
      },
      '.rds-appbar-tabs-container button, .rds-appbar-tabs-container .MuiButton-root': {
        padding: 'var(--rds-spacing-xs) var(--rds-spacing-compact)',
        minWidth: 36,
      },
      '.rds-appbar-tabs-container .MuiButton-root > svg': { display: 'none' },
      'button[aria-label="chat"], button[aria-label="theme"]': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--rds-spacing-xs)',
        margin: '0 var(--rds-spacing-xxs)',
        minWidth: 'auto',
        '& svg': {
          fontSize: 'var(--rds-font-size-xl)',
          width: 18,
          height: 18,
        },
      },
      '.rds-header__title': {
        maxWidth: '48%',
        flexShrink: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '.rds-language-button': {
        transform: 'translateX(-6px)',
        marginLeft: 0,
      },
    },
    '&.rds-header--dashboardwithlang-narrow': {
      '.rds-dashboard-title': {
        fontSize: 'var(--rds-font-size-sm)',
        lineHeight: 1,
        fontWeight: 500,
        marginLeft: 'var(--rds-spacing-sm)',
      },
      '.rds-header__toolbar': {
        paddingRight: 'var(--rds-spacing-44)',
        gap: 'var(--rds-spacing-compact)',
      },
      '.rds-admin-profile__button > .MuiAvatar-root': {
        width: 'var(--rds-size-lg)',
        height: 'var(--rds-size-lg)',
      },
      '.rds-appbar-tabs-container': {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--rds-spacing-compact)',
        flexShrink: 0,
      },
      '.rds-appbar-tabs-container > div, .rds-appbar-tabs-container button, .rds-appbar-tabs-container .rds-story-nav-action, .rds-appbar-tabs-container .rds-profile-menu__button, .rds-appbar-tabs-container .rds-admin-profile__button':
        {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 'auto',
          padding: 'var(--rds-spacing-micro)',
          margin: '0 var(--rds-spacing-xxs)',
        },
      '.rds-appbar-tabs-container .MuiButton-root > svg': { display: 'none' },
      '.rds-appbar-tabs-container .MuiButton-root > span': {
        fontSize: 'var(--rds-font-size-xs)',
      },
      'button[aria-label="chat"], button[aria-label="theme"], .rds-language-button': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--rds-spacing-micro)',
        margin: '0 var(--rds-spacing-xxs)',
        minWidth: 'auto',
      },
      'button[aria-label="chat"] svg, button[aria-label="theme"] svg': {
        fontSize: 'var(--rds-font-size-lg)',
        width: 'var(--rds-size-md)',
        height: 'var(--rds-size-md)',
      },
      '.rds-header__title': {
        maxWidth: '42%',
        fontSize: 'var(--rds-font-size-sm)',
      },
      '.rds-language-button': {
        transform: 'translateX(-10px)',
      },
      '.rds-appbar-separator': { display: 'none' },
    },

    // Tablet chrome variants (withtabs / withactions / withlogoandtabs / withnotificationbadge)
    '&.rds-header--tablet-compact': {
      '.rds-profile-menu__button .MuiBox-root, .rds-profile-menu__button .rds-avatar__info, .rds-profile-menu__button .rds-avatar__name, .rds-profile-menu__button .rds-avatar__designation, .rds-profile-menu__button .rds-profile-menu__name-lg, .rds-profile-menu__button .rds-profile-menu__email, .rds-profile-menu__button .rds-profile-menu__chevron, .rds-profile-menu__button .MuiSvgIcon-root':
        {
          display: 'none',
        },
      '.rds-profile-menu__avatar, .rds-profile-menu__button .MuiAvatar-root': {
        width: 30,
        height: 30,
      },
      '.rds-profile-menu__button': {
        paddingLeft: '0.25rem',
        paddingRight: '0.25rem',
        minWidth: 'auto',
        order: 99,
        marginLeft: 'auto',
      },
      '.rds-header__actions': {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
      },
    },

    '&.rds-header--withactions-compact': {
      '.rds-header__title': {
        flexGrow: 0,
        minWidth: 0,
        padding: 0,
      },
      '.rds-appbar-actions-group, .rds-header__right-actions': {
        display: 'none',
      },
      '.rds-header__center-content': {
        flex: '0 1 auto',
        gap: 'var(--rds-spacing-xs)',
        '.MuiButton-root, .rds-button': {
          padding: 'var(--rds-spacing-micro) var(--rds-spacing-sm)',
          minWidth: 'auto',
          minHeight: 'auto',
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
        },
      },
      '.rds-header__center-content, .rds-header__center-content > div': {
        gap: 0,
      },
      '.MuiIconButton-edgeStart, .MuiIconButton-root[aria-label="menu"], .rds-header__toolbar > .MuiIconButton-root:first-of-type':
        {
          marginRight: 0,
        },
    },
    '&.rds-header--withactions-narrow': {
      '.rds-header__logo': {
        flexShrink: 0,
        maxWidth: 80,
      },
      '.rds-header__center-content': {
        flexShrink: 1,
        gap: 'var(--rds-spacing-micro)',
        marginLeft: 'auto',
        '.MuiButton-root, .rds-button': {
          fontSize: 10,
          padding: 'var(--rds-spacing-xxs) var(--rds-spacing-compact)',
          minWidth: 'auto',
          minHeight: 'var(--rds-size-lg)',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        },
      },
      '.rds-header__actions': { flexShrink: 0 },
      '.rds-profile-menu__button .MuiBox-root, .rds-profile-menu__button .rds-profile-menu__name-lg, .rds-profile-menu__button .rds-profile-menu__email, .rds-profile-menu__button .rds-profile-menu__chevron, .rds-avatar__info':
        {
          display: 'none',
        },
    },
    '&.rds-header--withactions-xs': {
      '.rds-header__logo': { maxWidth: 60 },
      '.rds-header__center-content': {
        gap: 'var(--rds-spacing-xxs)',
        '.MuiButton-root, .rds-button': {
          fontSize: 9,
          padding: 'var(--rds-spacing-xxs) var(--rds-spacing-xs)',
          minHeight: 22,
          lineHeight: 1.1,
        },
      },
    },

    '&.rds-header--withnotificationbadge-compact': {
      '.rds-appbar-tabs-container, .rds-header__right-actions': {
        display: 'none',
      },
    },

    // Shared ≤420 / ≤320 toolbar squeeze (all variants)
    '&.rds-header--mobile-toolbar': {
      overflowX: 'hidden',
      '.rds-appbar-badge': { display: 'none' },
      '.rds-header__toolbar': {
        paddingLeft: 'var(--rds-spacing-sm)',
        paddingRight: 'var(--rds-spacing-sm)',
        gap: 'var(--rds-spacing-xs)',
      },
      '.rds-header__title': {
        maxWidth: '60%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: 'var(--rds-font-size-md)',
        margin: '0 var(--rds-spacing-xs)',
      },
      '.rds-header__search-wrapper, .rds-header__search': {
        maxWidth: 120,
        minWidth: 80,
        flex: '0 1 120px',
      },
      '.rds-header__actions': {
        gap: 'var(--rds-spacing-xs)',
        '.MuiButton-root': {
          fontSize: 'var(--rds-font-size-xs)',
          padding: 'var(--rds-spacing-xs) var(--rds-spacing-sm)',
          minWidth: 'auto',
        },
      },
      '.rds-appbar-separator': { display: 'none' },
      '.rds-appbar-title__user': { display: 'none' },
      '.rds-profile-menu__button': {
        paddingLeft: 'var(--rds-spacing-compact)',
        paddingRight: 'var(--rds-spacing-compact)',
      },
      '.rds-header__sub-tabs .MuiButton-root': {
        padding: 'var(--rds-spacing-compact)',
        minWidth: 36,
        width: 'auto',
        overflow: 'visible',
        gap: 'var(--rds-spacing-xs)',
        '& .MuiButton-startIcon': { marginRight: 0 },
        '& .MuiButton-label, & > span:not(.MuiButton-startIcon)': { display: 'none' },
      },
    },
    // Hide story chrome on mobile unless a logo* compact class owns that slot
    '&.rds-header--mobile-toolbar:not(.rds-header--logosearchtabs-compact):not(.rds-header--logosearchtabsactions-compact):not(.rds-header--logotabsactions-compact)':
      {
        '.rds-story-nav-actions': { display: 'none' },
      },
    '&.rds-header--mobile-toolbar:not(.rds-header--logosearchtabs-compact)': {
      '.rds-logo-search-tabs__left-actions': { display: 'none' },
    },
    '&.rds-header--mobile-toolbar:not(.rds-header--withmenubutton-compact)': {
      '.rds-appbar-actions-group': { display: 'none' },
    },
    '&.rds-header--mobile-toolbar-xs': {
      '.rds-header__search-wrapper, .rds-header__search': {
        maxWidth: 84,
        minWidth: 64,
      },
      '.rds-header__title': {
        maxWidth: '55%',
        fontSize: 'var(--rds-font-size-sm)',
      },
      '.rds-header__sub-tabs .MuiButton-root': {
        minWidth: 32,
        padding: 4,
        gap: 'var(--rds-spacing-xs)',
      },
      '.rds-header__search input::placeholder, .rds-header__search-wrapper input::placeholder': {
        fontSize: 'var(--rds-font-size-xs)',
        opacity: 0.9,
      },
    },

    // withuserprofile avatar-only at mobile
    '&.rds-header--variant-withuserprofile.rds-header--mobile-toolbar': {
      '.rds-profile-menu__button .MuiBox-root, .rds-profile-menu__button .rds-profile-menu__name-lg, .rds-profile-menu__button .rds-profile-menu__email, .rds-avatar__info, .rds-profile-menu__button .rds-profile-menu__chevron':
        {
          display: 'none',
        },
    },

    '.rds-header__search-clear': {
      position: 'absolute',
      right: 'var(--rds-spacing-xs)',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 'calc(var(--rds-z-index-base) + 1)',
    },

    '.rds-appbar-overflow-button': {
      display: 'inline-flex',
      marginLeft: 'var(--rds-spacing-compact)',
    },

    // Sub-header tabs on narrow screens
    [theme.breakpoints.down(420)]: {
      '.rds-header__sub-tabs': {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 'calc(var(--rds-spacing-sm) - var(--rds-spacing-xs))',
        marginLeft: 0,
        width: '100%',
      },
      '.rds-header__sub-tabs .MuiButton-root': {
        flex: '0 0 auto',
        whiteSpace: 'nowrap',
        padding: 'var(--rds-spacing-compact) var(--rds-spacing-cozy)',
        fontSize: 'var(--rds-font-size-sm)',
        minWidth: 'auto',
        '& .MuiSvgIcon-root': {
          fontSize: 'var(--rds-font-size-lg)',
          marginRight: 'var(--rds-spacing-xs)',
        },
      },
      '.rds-header__left-actions': {
        marginRight: 'var(--rds-spacing-xs)',
      },
    },
    [theme.breakpoints.down(320)]: {
      '.rds-header__sub-tabs .MuiButton-root': {
        padding: 'var(--rds-spacing-compact) var(--rds-spacing-sm)',
      },
      '.rds-header__toolbar': {
        paddingLeft: 'calc(var(--rds-spacing-sm) - var(--rds-spacing-xs))',
        paddingRight: 'calc(var(--rds-spacing-sm) - var(--rds-spacing-xs))',
        gap: 'calc(var(--rds-spacing-xs) / 2)',
      },
      '.rds-header__actions, .rds-header__right-actions': {
        gap: 'calc(var(--rds-spacing-xs) / 2)',
      },
      '.rds-header__left-actions .MuiIconButton-root': {
        padding: 'var(--rds-spacing-compact)',
      },
    },

    // Hamburger + logo flush (≤834)
    [theme.breakpoints.down(834)]: {
      '&.rds-header--has-menu-button': {
        '.rds-header__toolbar': {
          justifyContent: 'flex-start',
          columnGap: 0,
          gap: 0,
        },
        '.rds-header__menu-button, .rds-header__toolbar > .MuiIconButton-root[aria-label="menu"]': {
          marginRight: 0,
          marginLeft: 0,
        },
        '.rds-header__menu-button + .rds-header__logo, .MuiIconButton-root[aria-label="menu"] + .rds-header__logo':
          {
            marginLeft: 0,
          },
        '.rds-header__logo + :not(.rds-header__title:empty)': {
          marginLeft: 'var(--rds-spacing-xs)',
        },
        '.rds-header__title:empty': {
          flex: '1 1 auto',
          minWidth: 0,
          maxWidth: 'none',
          margin: 0,
          padding: 0,
        },
        '.rds-header__right-actions, .rds-header__actions, .rds-appbar-overflow-button': {
          marginLeft: 'auto',
        },
      },
    },

    // Title/search squeeze when menu button present (not withMenuButton layout)
    '&.rds-header--has-menu-button.rds-header--mobile-toolbar:not(.rds-header--withmenubutton-compact)': {
      '.rds-header__title:not(:empty)': {
        flex: '0 1 auto',
        minWidth: 0,
        maxWidth: '38%',
        margin: '0 var(--rds-spacing-xs)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '.rds-header__search-wrapper': {
        flex: '1 1 0',
        minWidth: 0,
        maxWidth: 120,
      },
      '.rds-header__right-actions .MuiButton-root': {
        padding: 'var(--rds-spacing-xs) var(--rds-spacing-compact)',
        minWidth: 'auto',
        fontSize: 'var(--rds-font-size-xs)',
      },
    },
    '&.rds-header--has-menu-button.rds-header--mobile-toolbar-xs:not(.rds-header--withmenubutton-compact)': {
      '.rds-header__title:not(:empty)': {
        maxWidth: 'calc(100% - 130px)',
        fontSize: 'var(--rds-font-size-sm)',
        margin: '0 var(--rds-spacing-xxs)',
      },
      '.rds-header__search-wrapper': { display: 'none' },
      '.rds-header__right-actions .MuiButton-root': { display: 'none' },
      '.rds-header__actions': { marginLeft: 'auto' },
    },

    '&.rds-header--variant-dashboardwithlang': {
      '.rds-bottom-navigation': {
        display: 'none',
        [theme.breakpoints.down(1200)]: {
          display: 'flex',
        },
      },
    },
    '.rds-dashboard-top-icons': {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--rds-spacing-sm)',
      [theme.breakpoints.down(640)]: {
        display: 'none',
      },
    },
  }),
  (theme) =>
    theme.applyStyles('dark', {
      '&.rds-header': {
        '--rds-header__search-field-bg': 'var(--rds-background-surface)',
        '--rds-header__search-field-color': 'var(--rds-text-primary)',
      },
      '&.rds-header--transparent': {
        backgroundColor: 'var(--rds-color-surface)',
      },
      '.rds-appbar-logo-label': {
        color: 'var(--rds-text-primary)',
      },
    }),
];
