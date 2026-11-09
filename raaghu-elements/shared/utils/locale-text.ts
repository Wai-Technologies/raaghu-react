export function mergeLocaleText<T extends object>(defaults: T, overrides?: Partial<NoInfer<T>>): T {
  if (!overrides) return defaults;
  const merged = { ...defaults };
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    const value = overrides[key];
    if (value !== undefined) merged[key] = value as T[keyof T];
  }
  return merged;
}
