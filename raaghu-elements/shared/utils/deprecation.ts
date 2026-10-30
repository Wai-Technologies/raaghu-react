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

/**
 * Invokes a value-first `onChange` (canonical for custom Raaghu controls).
 * Call shape: `(value, event) => void`. Prefer reading `value`; use `event` only when needed.
 *
 * Thin MUI wrappers should keep calling MUI's `(event, value)` directly instead of this helper.
 */
export function invokeValueFirstOnChange<TValue, TEvent>(
  onChange: ((value: TValue, event: TEvent) => void) | undefined,
  value: TValue,
  event: TEvent,
): void {
  onChange?.(value, event);
}

/**
 * Prefers the canonical prop value. When a legacy value is provided, warns once
 * (even if canonical is also set). Canonical wins when both are defined.
 */
export function resolveDeprecatedProp<T>(
  canonical: T | undefined,
  legacy: T | undefined,
  component: string,
  legacyName: string,
  replacement: string,
): T | undefined {
  if (legacy !== undefined) {
    warnDeprecatedProp(component, legacyName, replacement);
  }
  if (canonical !== undefined) return canonical;
  return legacy;
}
