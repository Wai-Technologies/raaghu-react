/**
 * Reads --rds-motion-* CSS vars and converts them to Motion-compatible values.
 * Use this hook instead of hardcoding durations/easings in animated components.
 */

export type EasingDefinition = [number, number, number, number];

export interface MotionTokens {
  fast:           number;
  base:           number;
  slow:           number;
  slower:         number;
  spring:         { type: 'spring'; stiffness: number; damping: number };
  easeStandard:   EasingDefinition;
  easeDecelerate: EasingDefinition;
  easeAccelerate: EasingDefinition;
}

const SSR_DEFAULTS: MotionTokens = {
  fast:           0.15,
  base:           0.25,
  slow:           0.35,
  slower:         0.50,
  spring:         { type: 'spring', stiffness: 300, damping: 30 },
  easeStandard:   [0.4, 0, 0.2, 1],
  easeDecelerate: [0, 0, 0.2, 1],
  easeAccelerate: [0.4, 0, 1, 1],
};

function parseMs(styles: CSSStyleDeclaration, token: string): number {
  const val = styles.getPropertyValue(token).trim();
  if (!val) return 0;
  return Number.parseFloat(val) / 1000;
}

export function useMotionTokens(): MotionTokens {
  if (typeof window === 'undefined') return SSR_DEFAULTS;

  const styles = getComputedStyle(document.documentElement);

  return {
    fast:   parseMs(styles, '--rds-motion-duration-fast')   || SSR_DEFAULTS.fast,
    base:   parseMs(styles, '--rds-motion-duration-base')   || SSR_DEFAULTS.base,
    slow:   parseMs(styles, '--rds-motion-duration-slow')   || SSR_DEFAULTS.slow,
    slower: parseMs(styles, '--rds-motion-duration-slower') || SSR_DEFAULTS.slower,
    spring:         SSR_DEFAULTS.spring,
    easeStandard:   SSR_DEFAULTS.easeStandard,
    easeDecelerate: SSR_DEFAULTS.easeDecelerate,
    easeAccelerate: SSR_DEFAULTS.easeAccelerate,
  };
}
