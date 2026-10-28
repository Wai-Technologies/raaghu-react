import { alpha, type Components, type Theme } from '@mui/material/styles';

export const designSystemComponentOverrides: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => {
        // Prefer theme.vars so light/dark colorSchemes swap at runtime via data-theme.
        const palette = theme.vars?.palette ?? theme.palette;
        return {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: palette.background.paper,
          color: palette.text.primary,
          transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
        };
      },
      input: ({ theme }) => {
        const palette = theme.vars?.palette ?? theme.palette;
        return {
          // Longhands so MuiSelect can override paddingRight for the chevron
          paddingTop: theme.spacing(1.25),
          paddingBottom: theme.spacing(1.25),
          paddingLeft: theme.spacing(1.5),
          paddingRight: theme.spacing(1.5),
          '&::placeholder': {
            color: palette.text.secondary,
            opacity: 1,
          },
        };
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
      root: ({ theme }) => ({
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--rds-primary-dark)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--rds-primary-main)',
          boxShadow: `0 0 0 ${theme.spacing(0.25)} color-mix(in srgb, ${theme.palette.primary.main} 20%, transparent)`,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.error.main,
        },
      }),
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.16 : 0.06),
        '&:hover': {
          backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.22 : 0.1),
        },
        '&.Mui-focused': {
          backgroundColor: 'color-mix(in srgb, var(--rds-primary-main) 8%, transparent)',
        },
      }),
      underline: ({ theme }) => ({
        '&:before': {
          borderBottomColor: theme.palette.divider,
        },
        '&:after': {
          borderBottomColor: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: ({ theme }) => ({
        minHeight: theme.spacing(2.5),
        // Avoid display:flex — it breaks text-overflow and lets long values cover the icon
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingRight: theme.spacing(4),
      }),
      icon: ({ theme }) => ({
        color: theme.palette.text.secondary,
        position: 'absolute',
        right: theme.spacing(1),
        pointerEvents: 'none',
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(0.25, 0.75),
        padding: theme.spacing(1, 1.5),
        '&.Mui-selected': {
          backgroundColor: theme.palette.action.selected,
        },
        '&.Mui-selected:hover': {
          backgroundColor: theme.palette.action.selected,
        },
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1, 1.5),
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
      }),
      standardError: ({ theme }) => ({
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark,
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark,
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: theme.palette.info.light,
        color: theme.palette.info.dark,
      }),
    },
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginBottom: theme.spacing(0.5),
        fontWeight: theme.typography.fontWeightMedium,
      }),
    },
  },
  MuiBadge: {
    styleOverrides: {
      // Soft defaults — RdsBadge modifiers win via `&.rds-badge` below / SCSS.
      badge: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        minWidth: theme.spacing(2.25),
        height: theme.spacing(2.25),
        padding: theme.spacing(0, 0.75),
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
      }),
      root: {
        '&.rds-badge': {
          '& .MuiBadge-badge': {
            backgroundColor: 'var(--rds-primary-main)',
            color: 'var(--rds-neutral-0)',
            fontWeight: 'var(--rds-font-weight-medium, 500)',
            fontSize: 'var(--rds-badge-dot-font-size)',
            minWidth: 'var(--rds-badge-dot-min-size)',
            height: 'var(--rds-badge-dot-min-size)',
            borderRadius: 'var(--rds-border-radius-md)',
            padding: '0 var(--rds-badge-dot-padding-x)',
            fontFamily: 'var(--rds-font-family-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            maxWidth: 'fit-content',
          },
          '&.rds-badge--primary .MuiBadge-badge': {
            backgroundColor: 'var(--rds-primary-main)',
            color: 'var(--rds-neutral-0)',
          },
          '&.rds-badge--outline .MuiBadge-badge': {
            backgroundColor: 'transparent',
            color: 'var(--rds-primary-main)',
            border: 'var(--rds-border-width-medium) solid var(--rds-primary-main)',
          },
          '&.rds-badge--transparent .MuiBadge-badge': {
            backgroundColor: 'transparent',
            color: 'var(--rds-primary-main)',
            border: 'none',
            boxShadow: 'none',
          },
          '&.rds-badge--disabled .MuiBadge-badge': {
            backgroundColor: 'var(--rds-neutral-100)',
            color: 'var(--rds-neutral-400)',
            border: 'none',
            boxShadow: 'none',
            cursor: 'not-allowed',
            opacity: 0.7,
            pointerEvents: 'none',
            transition: 'none',
          },
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        '&.rds-accordion': {
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          margin: 0,
          '&::before': {
            display: 'none',
          },
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        '&.rds-accordion__summary': {
          minHeight: 'unset',
        },
        '&.rds-accordion__summary .MuiAccordionSummary-expandIconWrapper': {
          color: 'var(--rds-color-icon-muted, var(--rds-text-secondary))',
        },
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        '&.rds-accordion__details': {
          paddingTop: 0,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        borderRadius: theme.shape.borderRadius,
        // Both variants get the divider border; outlined also drops the shadow
        ...(ownerState?.variant === 'outlined'
          ? { border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }
          : { border: `1px solid ${theme.palette.divider}` }),
      }),
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2),
        '&:last-child': {
          paddingBottom: theme.spacing(2),
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: 'var(--rds-color-primary)',
        height: 3,
      },
      root: {
        // Hide default indicator inside RdsTabs; layout skins use borders/backgrounds.
        '.rds-tabs &': {
          overflow: 'visible',
        },
        '.rds-tabs & .MuiTabs-scroller': {
          overflow: 'visible',
        },
        '.rds-tabs & .MuiTabs-indicator': {
          display: 'none',
          backgroundColor: 'transparent',
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        // Soft defaults — layout skins (pill, filled, flap, line-*) win via
        // higher-specificity `.rds-tabs--* .MuiTab-root` SCSS without !important.
        textTransform: 'none' as const,
        '&.Mui-selected': {
          color: 'var(--rds-color-primary)',
          fontWeight: 600,
        },
        '&:hover': {
          color: 'var(--rds-color-primary)',
          backgroundColor: 'transparent',
          opacity: 1,
        },
        '&.Mui-selected:hover': {
          color: 'var(--rds-color-primary)',
          backgroundColor: 'transparent',
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'var(--rds-color-primary-container)',
        },
      },
    },
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          color: 'var(--rds-color-primary)',
          fontWeight: 600,
        },
        '&:hover': {
          color: 'var(--rds-color-primary)',
          backgroundColor: 'transparent',
          opacity: 1,
        },
        '&.Mui-selected:hover': {
          color: 'var(--rds-color-primary)',
          backgroundColor: 'transparent',
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'var(--rds-color-primary-container)',
        },
      },
      label: {
        '.Mui-selected &': {
          color: 'var(--rds-color-primary)',
          fontWeight: 600,
        },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1.5, 2),
      }),
      title: ({ theme }) => ({
        ...theme.typography.h6,
      }),
      subheader: ({ theme }) => ({
        color: theme.palette.text.secondary,
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        fontWeight: theme.typography.fontWeightMedium,
      }),
      filled: ({ theme, ownerState }) => {
        const colorKey = ownerState?.color as string | undefined;

        if (!colorKey || colorKey === 'default') {
          return {
            backgroundColor: 'var(--rds-color-primary-container)',
            color: theme.palette.primary.main,
          };
        }

        const paletteColor = theme.palette[colorKey as keyof typeof theme.palette] as
          | { main?: string; contrastText?: string }
          | undefined;

        if (!paletteColor?.main) {
          return {
            backgroundColor: 'var(--rds-color-primary-container)',
            color: theme.palette.primary.main,
          };
        }

        return {
          backgroundColor: paletteColor.main,
          color: paletteColor.contrastText ?? theme.palette.common.white,
        };
      },
      outlined: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
      deleteIcon: ({ theme }) => ({
        color: theme.palette.text.secondary,
        '&:hover': {
          color: theme.palette.text.primary,
        },
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: 'var(--rds-tooltip-bg)',
        color: 'var(--rds-tooltip-color, var(--rds-tooltip-text))',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(0.75, 1),
        fontSize: theme.typography.caption.fontSize,
      }),
      arrow: {
        color: 'var(--rds-tooltip-bg)',
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
      }),
      colorDefault: ({ theme }) => ({
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        '&:focus-visible': {
          boxShadow: '0 0 0 3px var(--rds-primary-light)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--rds-text-disabled)',
        },
        // RdsButton BEM lives on the MUI root — Emotion owns hover/selected/disabled
        // so component SCSS does not need !important against theme contained* styles.
        '&.rds-button': {
          '&.Mui-disabled:not(.rds-button__loading)': {
            backgroundColor: 'var(--rds-button-primary-bg-disabled)',
            color: 'var(--rds-button-primary-text-disabled)',
            borderColor: 'var(--rds-border-light)',
            cursor: 'not-allowed',
          },
          '&.rds-button__loading.Mui-disabled': {
            opacity: 1,
          },
          '&:hover:not(:disabled):not(.rds-button--selected)': {
            '&.MuiButton-contained.MuiButton-colorPrimary, &.rds-button__primary.MuiButton-colorPrimary':
              {
                backgroundColor: 'var(--rds-button-primary-bg-hover)',
                transform: 'translateY(-1px)',
                boxShadow: 'var(--rds-elevation-2)',
              },
            '&.rds-button__secondary': {
              backgroundColor: 'transparent',
              color: 'var(--rds-button-primary-bg-hover, var(--rds-primary-main))',
              borderColor: 'var(--rds-button-primary-bg-hover, var(--rds-primary-main))',
              boxShadow: 'none',
            },
            '&.MuiButton-outlined:not(.rds-button__secondary)': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
            '&.MuiButton-text, &.rds-button__text': {
              backgroundColor:
                'var(--rds-button-text-variant-bg, var(--rds-button-text-bg-hover))',
              boxShadow: 'none',
              transform: 'none',
            },
          },
          '&.rds-button--selected': {
            '&.MuiButton-contained.MuiButton-colorPrimary, &.rds-button__primary.MuiButton-colorPrimary':
              {
                backgroundColor: 'var(--rds-button-primary-bg-active)',
                boxShadow: 'var(--rds-elevation-1)',
                '&:hover': {
                  backgroundColor: 'var(--rds-button-primary-bg-active)',
                },
              },
            '&.rds-button__secondary': {
              backgroundColor: 'transparent',
              borderColor:
                'var(--rds-button-secondary-border-active, var(--rds-button-secondary-text-active, var(--rds-primary-main)))',
              color:
                'var(--rds-button-secondary-text-active, var(--rds-primary-main))',
              boxShadow: 'none',
            },
            '&.MuiButton-outlined:not(.rds-button__secondary)': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
            '&.rds-button__text': {
              backgroundColor: 'var(--rds-button-text-bg-active)',
              color: 'var(--rds-button-text-color-active)',
              boxShadow: 'none',
            },
          },
        },
      },
      containedPrimary: ({ theme }) => ({
        backgroundColor: 'var(--rds-button-primary-bg)',
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: 'var(--rds-primary-dark)',
          color: theme.palette.primary.contrastText,
        },
      }),
      containedSecondary: ({ theme }) => ({
        backgroundColor: 'var(--rds-secondary-main)',
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: 'var(--rds-secondary-dark)',
          color: theme.palette.secondary.contrastText,
        },
      }),
      containedSuccess: ({ theme }) => ({
        backgroundColor: 'var(--rds-success-main)',
        color: theme.palette.success.contrastText,
        '&:hover': {
          backgroundColor: 'var(--rds-success-dark)',
          color: theme.palette.success.contrastText,
        },
      }),
      containedWarning: ({ theme }) => ({
        backgroundColor: 'var(--rds-warning-main)',
        color: theme.palette.warning.contrastText,
        '&:hover': {
          backgroundColor: 'var(--rds-warning-dark)',
          color: theme.palette.warning.contrastText,
        },
      }),
      containedError: ({ theme }) => ({
        backgroundColor: 'var(--rds-error-main)',
        color: theme.palette.error.contrastText,
        '&:hover': {
          backgroundColor: 'var(--rds-error-dark)',
          color: theme.palette.error.contrastText,
        },
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--rds-primary-dark)',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--rds-primary-main)',
        },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        '&.Mui-checked': {
          color: 'var(--rds-primary-main)',
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        '&.Mui-checked': {
          color: 'var(--rds-primary-main)',
        },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      // Geometry and skins when `className` includes `rds-switch` / `--style*` / `--color*`
      // (RdsSwitch). Emotion owns these so component SCSS does not need !important.
      root: {
        '&.rds-switch': {
          width: 'var(--rds-switch-root-width)',
          height: 'var(--rds-switch-root-height)',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
          verticalAlign: 'middle',
          '& .MuiButtonBase-root.MuiSwitchBase-root.MuiSwitch-switchBase': {
            backgroundColor: 'transparent',
            '&:hover, &:focus, &:active': {
              backgroundColor: 'transparent',
            },
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
          },
          '& .MuiSwitch-switchBase': {
            left: 0,
            right: 'auto',
            top: 0,
            margin: 0,
            padding: 'var(--rds-switch-thumb-padding)',
            transform: 'translateX(0)',
            '&.Mui-checked': {
              transform: 'translateX(var(--rds-switch-thumb-translate-x))',
            },
            '&.Mui-checked:not(.Mui-disabled) + .MuiSwitch-track': {
              background: 'var(--rds-switch-active-bg)',
              opacity: 1,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 'var(--rds-switch-disabled-track-opacity, 0.4)',
              background: 'var(--rds-switch-inactive-bg)',
            },
            '&.Mui-checked.Mui-disabled + .MuiSwitch-track': {
              opacity: 'var(--rds-switch-disabled-track-opacity, 0.4)',
              background: 'var(--rds-switch-disabled-bg)',
            },
          },
          '& .MuiSwitch-thumb': {
            width: 'var(--rds-switch-thumb-size)',
            height: 'var(--rds-switch-thumb-size)',
            boxSizing: 'border-box',
            margin: 0,
          },
          '& .MuiSwitch-track': {
            opacity: 1,
            overflow: 'hidden',
          },
          '& .Mui-checked + .MuiSwitch-thumb, & .MuiSwitch-input:checked + .MuiSwitch-thumb': {
            background: 'var(--rds-color-on-primary)',
            marginLeft: 0,
          },
        },
        '&.rds-switch--style1': {
          '& .MuiSwitch-track': {
            background: 'var(--rds-color-switch-track)',
            height: '100%',
            borderRadius: 'var(--rds-switch-track-border-radius, var(--rds-border-radius-3xl))',
            width: '100%',
          },
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
          },
        },
        '&.rds-switch--style2': {
          '& .MuiSwitch-track': {
            background: 'var(--rds-color-switch-track)',
            height: '100%',
            borderRadius: 'var(--rds-border-radius-sm)',
          },
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
            borderRadius: 'var(--rds-border-radius-sm)',
          },
        },
        '&.rds-switch--style3': {
          '& .MuiSwitch-track': {
            background: 'var(--rds-color-switch-track)',
            height: 'var(--rds-switch-dim-1)',
            borderRadius: 'var(--rds-border-radius-full)',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
          },
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
          },
          '& .MuiSwitch-switchBase': {
            top: 'var(--rds-spacing-xxs)',
          },
        },
        '&.rds-switch--style4': {
          '& .MuiSwitch-track': {
            background: 'var(--rds-color-switch-track)',
            height: '100%',
            borderRadius: 'calc(2.5 * var(--rds-spacing-xs))',
            position: 'relative',
            '&::before': {
              content: '"On"',
              position: 'absolute',
              left: 'calc(var(--rds-spacing-xs) / 2)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--rds-color-switch-label)',
              fontSize: 'var(--rds-font-size-sm)',
            },
            '&::after': {
              content: '"Off"',
              position: 'absolute',
              right: 'calc(var(--rds-spacing-xs) / 2)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--rds-color-switch-label)',
              fontSize: 'var(--rds-font-size-sm)',
            },
          },
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
          },
          '& .Mui-checked + .MuiSwitch-track::before, & .MuiSwitch-input:checked + .MuiSwitch-track::before':
            {
              color: 'var(--rds-color-on-primary)',
            },
          '& .Mui-checked + .MuiSwitch-track::after, & .MuiSwitch-input:checked + .MuiSwitch-track::after':
            {
              color: 'var(--rds-color-on-primary)',
            },
        },
        '&.rds-switch--style5': {
          '& .MuiSwitch-track': {
            background: 'var(--rds-color-switch-track)',
            height: '100%',
            borderRadius: 'calc(0.75 * var(--rds-spacing-xs))',
            position: 'relative',
            '&::before': {
              content: '"On"',
              position: 'absolute',
              left: 'calc(var(--rds-spacing-xs) / 2)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--rds-color-switch-label)',
              fontSize: 'var(--rds-font-size-sm)',
            },
            '&::after': {
              content: '"Off"',
              position: 'absolute',
              right: 'calc(var(--rds-spacing-xs) / 2)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--rds-color-switch-label)',
              fontSize: 'var(--rds-font-size-sm)',
            },
          },
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
            borderRadius: 'var(--rds-border-radius-sm)',
          },
          '& .Mui-checked + .MuiSwitch-track::before, & .MuiSwitch-input:checked + .MuiSwitch-track::before':
            {
              color: 'var(--rds-color-on-primary)',
            },
          '& .Mui-checked + .MuiSwitch-track::after, & .MuiSwitch-input:checked + .MuiSwitch-track::after':
            {
              color: 'var(--rds-color-on-primary)',
            },
        },
        '&.rds-switch--style1 .Mui-checked + .MuiSwitch-track, &.rds-switch--style2 .Mui-checked + .MuiSwitch-track, &.rds-switch--style3 .Mui-checked + .MuiSwitch-track, &.rds-switch--style4 .Mui-checked + .MuiSwitch-track, &.rds-switch--style5 .Mui-checked + .MuiSwitch-track':
          {
            background: 'var(--rds-switch-active-bg)',
          },
        '&.rds-switch--color-primary': {
          '& .MuiSwitch-thumb': {
            backgroundColor: 'var(--rds-background-paper)',
          },
          '& .Mui-checked + .MuiSwitch-track, & .MuiSwitch-input:checked + .MuiSwitch-track': {
            background: 'var(--rds-primary-light)',
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-thumb, & .MuiSwitch-input:checked + .MuiSwitch-thumb': {
            background: 'var(--rds-primary-main)',
          },
          '& .Mui-checked.Mui-disabled + .MuiSwitch-track, & .MuiSwitch-input:checked.Mui-disabled + .MuiSwitch-track':
            {
              background: 'var(--rds-switch-disabled-bg)',
              opacity: 'var(--rds-switch-disabled-track-opacity, 0.4)',
            },
          '& .Mui-checked.Mui-disabled + .MuiSwitch-thumb, & .MuiSwitch-switchBase.Mui-checked.Mui-disabled .MuiSwitch-thumb':
            {
              background: 'var(--rds-color-on-primary)',
              opacity: 'var(--rds-switch-disabled-opacity, 0.6)',
            },
        },
        '&.rds-switch--color-secondary': {
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
          },
          '& .Mui-checked + .MuiSwitch-track, & .MuiSwitch-input:checked + .MuiSwitch-track': {
            background: 'var(--rds-secondary-light)',
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-thumb, & .MuiSwitch-input:checked + .MuiSwitch-thumb': {
            background: 'var(--rds-secondary-main)',
          },
          '& .Mui-checked.Mui-disabled + .MuiSwitch-track, & .MuiSwitch-input:checked.Mui-disabled + .MuiSwitch-track, & .Mui-disabled + .MuiSwitch-track':
            {
              background: 'var(--rds-switch-disabled-secondary-bg, rgba(24,39,187,0.24))',
              opacity: 'var(--rds-switch-disabled-track-opacity, 0.4)',
            },
          '& .Mui-checked.Mui-disabled + .MuiSwitch-thumb, & .MuiSwitch-input:checked.Mui-disabled + .MuiSwitch-thumb, & .MuiSwitch-switchBase.Mui-checked.Mui-disabled .MuiSwitch-thumb':
            {
              background: 'var(--rds-color-on-secondary)',
              opacity: 'var(--rds-switch-disabled-opacity, 0.6)',
            },
        },
        '&.rds-switch--color-error': {
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
          },
          '& .Mui-checked + .MuiSwitch-track, & .MuiSwitch-input:checked + .MuiSwitch-track': {
            background: 'var(--rds-error-light)',
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-thumb, & .MuiSwitch-input:checked + .MuiSwitch-thumb': {
            background: 'var(--rds-error-main)',
          },
        },
        '&.rds-switch--color-warning': {
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
          },
          '& .Mui-checked + .MuiSwitch-track, & .MuiSwitch-input:checked + .MuiSwitch-track': {
            background: 'var(--rds-warning-light)',
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-thumb, & .MuiSwitch-input:checked + .MuiSwitch-thumb': {
            background: 'var(--rds-warning-main)',
          },
          '& .Mui-checked.Mui-disabled + .MuiSwitch-track, & .MuiSwitch-input:checked.Mui-disabled + .MuiSwitch-track':
            {
              background: 'var(--rds-switch-disabled-warning-bg, rgba(255,152,0,0.24))',
              opacity: 'var(--rds-switch-disabled-track-opacity, 0.4)',
            },
          '& .Mui-checked.Mui-disabled + .MuiSwitch-thumb, & .MuiSwitch-switchBase.Mui-checked.Mui-disabled .MuiSwitch-thumb':
            {
              background: 'var(--rds-color-on-warning)',
              opacity: 'var(--rds-switch-disabled-opacity, 0.6)',
            },
        },
        '&.rds-switch--color-info': {
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
          },
          '& .Mui-checked + .MuiSwitch-track, & .MuiSwitch-input:checked + .MuiSwitch-track': {
            background: 'var(--rds-info-light)',
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-thumb, & .MuiSwitch-input:checked + .MuiSwitch-thumb': {
            background: 'var(--rds-primary-main)',
          },
        },
        '&.rds-switch--color-success': {
          '& .MuiSwitch-thumb': {
            background: 'var(--rds-color-switch-thumb)',
          },
          '& .Mui-checked + .MuiSwitch-track, & .MuiSwitch-input:checked + .MuiSwitch-track': {
            background: 'var(--rds-success-light)',
            opacity: 1,
          },
          '& .Mui-checked + .MuiSwitch-thumb, & .MuiSwitch-input:checked + .MuiSwitch-thumb': {
            background: 'var(--rds-success-main)',
          },
        },
        '&.rds-switch--color-default': {
          '& .Mui-checked.Mui-disabled + .MuiSwitch-track, & .MuiSwitch-input:checked.Mui-disabled + .MuiSwitch-track':
            {
              background: 'var(--rds-switch-disabled-default-bg, rgba(158,158,158,0.24))',
              opacity: 'var(--rds-switch-disabled-track-opacity, 0.4)',
            },
          '& .Mui-checked.Mui-disabled + .MuiSwitch-thumb, & .MuiSwitch-switchBase.Mui-checked.Mui-disabled .MuiSwitch-thumb':
            {
              background: 'var(--rds-color-on-default)',
              opacity: 'var(--rds-switch-disabled-opacity, 0.6)',
            },
        },
      },
      switchBase: {
        '&.Mui-checked': {
          color: 'var(--rds-primary-main)',
        },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: 'var(--rds-primary-light)',
        },
      },
      thumb: {
        backgroundColor: 'var(--rds-primary-main)',
      },
    },
  },
};
