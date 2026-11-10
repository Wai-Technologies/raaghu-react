/** Overridable UI strings of `RdsCompCodeSnippet`. */
export interface RdsCompCodeSnippetLocaleText {
  /** Accessible label of the copy button. */
  copyCodeAriaLabel: string;
  /** Visible label of the copy button. */
  copyCode: string;
  /** Visible label of the copy button after the code was copied. */
  copied: string;
  /** Label of the show more button in the footer. */
  showMore: string;
}

export const DEFAULT_RDS_COMP_CODE_SNIPPET_LOCALE_TEXT: RdsCompCodeSnippetLocaleText = {
  copyCodeAriaLabel: "Copy code",
  copyCode: "Copy Code",
  copied: "Copied!",
  showMore: "Show More",
};
