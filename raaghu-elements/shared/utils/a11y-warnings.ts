const warned = new Set<string>();

/**
 * Logs a one-time development warning when an icon-only control renders without an accessible name.
 * Silent in production builds.
 */
export function warnMissingAccessibleName(component: string, hint: string) {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') return;
  if (warned.has(component)) return;
  warned.add(component);
  console.warn(`[${component}] Icon-only buttons need an accessible name (WCAG 4.1.2). Pass ${hint}.`);
}
