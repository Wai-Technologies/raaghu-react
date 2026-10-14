const warned = new Set<string>();

const isProduction = () =>
  typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';

/**
 * Logs a one-time development warning when a deprecated prop is used.
 * Silent in production builds (consumers' bundlers replace `process.env.NODE_ENV`).
 */
export function warnDeprecatedProp(component: string, prop: string, replacement: string) {
  if (isProduction()) return;
  const key = `${component}.${prop}`;
  if (warned.has(key)) return;
  warned.add(key);
  // eslint-disable-next-line no-console -- intentional developer-facing warning
  console.warn(`[${component}] The \`${prop}\` prop is deprecated and will be removed in the next major version. Use ${replacement} instead.`);
}
