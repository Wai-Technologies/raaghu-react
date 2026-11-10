/** Overridable UI strings of `RdsCompReviews`. */
export interface RdsCompReviewsLocaleText {
  /** Accessible label of the like button. */
  like: string;
  /** Accessible label of the dislike button. */
  dislike: string;
  /** Text shown when a review has no date. */
  dateNotAvailable: string;
}

export const DEFAULT_RDS_COMP_REVIEWS_LOCALE_TEXT: RdsCompReviewsLocaleText = {
  like: "Like",
  dislike: "Dislike",
  dateNotAvailable: "Date not available",
};
