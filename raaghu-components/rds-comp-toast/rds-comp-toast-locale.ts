/**
 * Toast / notification popup.
 * @deprecated Prefer `RdsSnackbar` from `raaghu-elements` (G6-149).
 */
/** Overridable UI strings of `RdsCompToast`. */
export interface RdsCompToastLocaleText {
  /** Accessible label of the close button. */
  close: string;
  /** Accessible label of the chat reply input when no placeholder is set. */
  replyInputLabel: string;
}

export const DEFAULT_RDS_COMP_TOAST_LOCALE_TEXT: RdsCompToastLocaleText = {
  close: "Close",
  replyInputLabel: "Toast reply input",
};
