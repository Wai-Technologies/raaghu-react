export const ScrollBarType = {
  Mac: 'Mac',
  Simple: 'Simple',
} as const;
export type ScrollBarType = (typeof ScrollBarType)[keyof typeof ScrollBarType];

export const ScrollPosition = {
  Start: 'Start',
  Middle: 'Middle',
  End: 'End',
} as const;
export type ScrollPosition = (typeof ScrollPosition)[keyof typeof ScrollPosition];
