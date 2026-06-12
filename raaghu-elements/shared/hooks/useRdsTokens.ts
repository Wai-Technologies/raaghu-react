import { useTheme } from '@mui/material';
import type { Theme } from '@mui/material/styles';

export interface RdsTokens {
  space: Theme['spacing'];
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  color: {
    primary: string;
    secondary: string;
    text: string;
    textMuted: string;
    bg: string;
    surface: string;
    divider: string;
    error: string;
    success: string;
    warning: string;
  };
  cssVar: (name: string) => `var(--rds-${string})`;
  zIndex: {
    base: string;
    layer1: string;
    layer2: string;
    layer3: string;
    raised: string;
    dropdown: string;
    sticky: string;
    modal: string;
    tooltip: string;
    toast: string;
  };
}

const toRadiusValue = (baseRadius: Theme['shape']['borderRadius'], multiplier: number): string => {
  if (typeof baseRadius === 'number') {
    return `${baseRadius * multiplier}px`;
  }

  if (multiplier === 1) {
    return baseRadius;
  }

  return `calc(${baseRadius} * ${multiplier})`;
};

export const useRdsTokens = (): RdsTokens => {
  const theme = useTheme();

  const baseRadius = theme.shape.borderRadius;

  const space: Theme['spacing'] = ((...args: Parameters<Theme['spacing']>) =>
    theme.spacing(...args)) as Theme['spacing'];

  return {
    space,
    radius: {
      sm: toRadiusValue(baseRadius, 1),
      md: toRadiusValue(baseRadius, 2),
      lg: toRadiusValue(baseRadius, 3),
      full: toRadiusValue(baseRadius, 999),
    },
    color: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      text: theme.palette.text.primary,
      textMuted: theme.palette.text.secondary,
      bg: theme.palette.background.default,
      surface: theme.palette.background.paper,
      divider: theme.palette.divider,
      error: theme.palette.error.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
    },
    cssVar: (name: string) => `var(--rds-${name})`,
    zIndex: {
      base: 'var(--rds-z-index-base)',
      layer1: 'var(--rds-z-index-layer-1)',
      layer2: 'var(--rds-z-index-layer-2)',
      layer3: 'var(--rds-z-index-layer-3)',
      raised: 'var(--rds-z-index-raised)',
      dropdown: 'var(--rds-z-index-dropdown)',
      sticky: 'var(--rds-z-index-sticky)',
      modal: 'var(--rds-z-index-modal)',
      tooltip: 'var(--rds-z-index-tooltip)',
      toast: 'var(--rds-z-index-toast)',
    },
  };
};

export default useRdsTokens;
