/** Cryptographically secure numeric ID for client-side unique keys. */
export function secureRandomId(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0];
}

/** Stable DOM id suffix when `crypto.randomUUID` is available. */
export function createUniqueId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${secureRandomId()}`;
}

/** Basic email shape check without backtracking-prone regex. */
export function isValidEmail(value: string): boolean {
  const at = value.indexOf('@');
  if (at <= 0) return false;
  const dot = value.indexOf('.', at + 1);
  return dot > at + 1 && dot < value.length - 1 && !value.includes(' ');
}
