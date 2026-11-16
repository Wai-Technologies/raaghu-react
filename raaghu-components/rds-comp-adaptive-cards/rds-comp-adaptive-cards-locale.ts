/** Overridable UI strings of `RdsCompAdaptiveCards`. */
export interface RdsCompAdaptiveCardsLocaleText {
  /** Accessible label of the close button. */
  close: string;
  /** Label of the live status chip of the football scorecard. */
  live: string;
  /** Alt text of an image gallery thumbnail; receives the 1-based position. */
  thumbnail: (position: number) => string;
  /** Placeholder text of the default card when `cardText` is empty. */
  instanceSlot: string;
}

export const DEFAULT_RDS_COMP_ADAPTIVE_CARDS_LOCALE_TEXT: RdsCompAdaptiveCardsLocaleText = {
  close: "Close",
  live: "Live",
  thumbnail: (position) => `Thumbnail ${position}`,
  instanceSlot: "Instance Slot",
};
