export type RdsRatingLevel =
  | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
  | 'Left' | 'Mid' | 'Right';

export type RdsRatingType = 'star' | 'slider';

export const ALLOWED_SLIDER_VALUES = [0, 2.5, 5];

export function snapToAllowed(val: number | null | undefined): number {
  if (val === null || val === undefined) return 0;
  return ALLOWED_SLIDER_VALUES.reduce((prev, curr) =>
    Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
  );
}

export function getLevelValue(
  level: NonNullable<RdsRatingLevel>
): number | undefined {
  if (level === 'Left') return 0;
  if (level === 'Mid') return 2.5;
  if (level === 'Right') return 5;
  return level;
}

export function getInitialInternalValue(
  type: RdsRatingType,
  level: RdsRatingLevel | undefined,
  value: number | null | undefined
): number | null {
  if (type === 'slider') {
    if (level !== undefined) return snapToAllowed(getLevelValue(level));
    if (value !== undefined) return snapToAllowed(value);
    return 0;
  }
  if (level !== undefined) {
    const levelVal = getLevelValue(level);
    return levelVal !== undefined ? levelVal : null;
  }
  if (value !== undefined) return value;
  return null;
}

export function resolveCurrentValue(
  type: RdsRatingType,
  internalValue: number | null,
  level: RdsRatingLevel | undefined,
  value: number | null | undefined
): number | null {
  if (type === 'slider') {
    return snapToAllowed(internalValue);
  }
  let currentValue = internalValue;
  if (currentValue === null && level !== undefined) {
    const lvl = getLevelValue(level);
    currentValue = lvl !== undefined ? lvl : null;
  }
  if (currentValue === null && value !== undefined) currentValue = value;
  return currentValue;
}

export function getSyncInternalValue(
  type: RdsRatingType,
  level: RdsRatingLevel | undefined,
  value: number | null | undefined
): number | null {
  if (type === 'slider') {
    if (level !== undefined) return snapToAllowed(getLevelValue(level));
    if (value !== undefined) return snapToAllowed(value);
    return null;
  }
  if (level !== undefined) {
    const levelVal = getLevelValue(level);
    return levelVal !== undefined ? levelVal : null;
  }
  if (value !== undefined) return value;
  return null;
}

export function getPositionClass(
  type: RdsRatingType,
  level: RdsRatingLevel | undefined
): string {
  if (type !== 'slider' || level === undefined) return '';
  const numLevel = getLevelValue(level);
  if (numLevel === 0) return 'rds-rating--position-left';
  if (numLevel === 2.5) return 'rds-rating--position-mid';
  if (numLevel === 5) return 'rds-rating--position-right';
  return '';
}
