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

/** Overridable UI strings of `RdsCompScrollBar`. */
export interface RdsCompScrollBarLocaleText {
  /** Accessible label of the scroll-to-top button. */
  scrollToTop: string;
  /** Accessible label of the scroll-to-bottom button. */
  scrollToBottom: string;
}

export const DEFAULT_RDS_COMP_SCROLLBAR_LOCALE_TEXT: RdsCompScrollBarLocaleText = {
  scrollToTop: 'Scroll to top',
  scrollToBottom: 'Scroll to bottom',
};
