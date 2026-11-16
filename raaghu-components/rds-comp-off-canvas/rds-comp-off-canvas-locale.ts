/** Overridable UI strings of `RdsCompOffcanvas`. */
export interface RdsCompOffcanvasLocaleText {
  /** Tooltip and accessible label of the close button. */
  close: string;
  /** Label of the built-in trigger button of the uncontrolled drawer. */
  openOffCanvas: string;
  /** Label of the restore footer button. */
  restoreToDefault: string;
  /** Label of the cancel footer button. */
  cancel: string;
  /** Label of the save footer button. */
  save: string;
}

export const DEFAULT_RDS_COMP_OFFCANVAS_LOCALE_TEXT: RdsCompOffcanvasLocaleText = {
  close: "Close",
  openOffCanvas: "Open Off Canvas",
  restoreToDefault: "RESTORE TO DEFAULT",
  cancel: "CANCEL",
  save: "SAVE",
};
