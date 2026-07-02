import { alpha, type Components, type Theme } from '@mui/material/styles';

export const designSystemComponentOverrides: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
      }),
      input: ({ theme }) => ({
        padding: theme.spacing(1.25, 1.5),
        '&::placeholder': {
          color: theme.palette.text.secondary,
          opacity: 1,
        },
      }),
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
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.spacing(4),
      }),
      icon: ({ theme }) => ({
        color: theme.palette.text.secondary,
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
        color: theme.palette.success.contrastText,
      }),
      standardError: ({ theme }) => ({
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.contrastText,
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.contrastText,
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: theme.palette.info.light,
        color: theme.palette.info.contrastText,
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
      badge: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        minWidth: theme.spacing(2.25),
        height: theme.spacing(2.25),
        padding: theme.spacing(0, 0.75),
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme, ownerState }: any) => ({
        borderRadius: theme.shape.borderRadius,
        // Only apply the default border for outlined variant; elevation variant uses MUI shadows
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
      filled: ({ theme, ownerState }: any) => {
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
        backgroundColor: alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.92 : 0.82),
        color: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(0.75, 1),
        fontSize: theme.typography.caption.fontSize,
      }),
      arrow: ({ theme }) => ({
        color: alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.92 : 0.82),
      }),
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
