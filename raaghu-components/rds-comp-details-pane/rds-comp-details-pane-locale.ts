/** Overridable UI strings of `RdsCompDetailsPane`. */
export interface RdsCompDetailsPaneLocaleText {
  /** Heading of the section listing recent history items. */
  today: string;
  /** Heading of the section listing older history items. */
  older: string;
  /** Alt text of the favourite card image. */
  loginPage: string;
  /** Accessible label of a history item's delete icon; receives the item name. */
  deleteItem: (name: string) => string;
  /** Placeholder of the agent search field. */
  searchAgentsPlaceholder: string;
  /** Alt text of an agent avatar. */
  userAvatar: string;
  /** Heading of the toolbar variant. */
  toolbar: string;
  /** Accessible label of the font settings toolbar button. */
  fontSettings: string;
  /** Accessible label of the color settings toolbar button. */
  colorSettings: string;
  /** Accessible label of the corner radius settings toolbar button. */
  cornerRadiusSettings: string;
  /** Accessible label of the spacing settings toolbar button. */
  spacingSettings: string;
  /** Accessible label of the block settings toolbar button. */
  blockSettings: string;
  /** Label above the font size control. */
  fontSize: string;
  /** Label above the font weight control. */
  fontWeight: string;
  /** Heading of the pages list in the thumbnail view. */
  pages: string;
  /** Label of the download button when `thumbnailButtonName` is empty. */
  downloadProject: string;
  /** Alt text of a thumbnail image. */
  nightSky: string;
}

export const DEFAULT_RDS_COMP_DETAILS_PANE_LOCALE_TEXT: RdsCompDetailsPaneLocaleText = {
  today: "Today",
  older: "Older",
  loginPage: "Login page",
  deleteItem: (name) => `Delete ${name}`,
  searchAgentsPlaceholder: "Search for Agents by Name or # ID",
  userAvatar: "User Avatar",
  toolbar: "Toolbar",
  fontSettings: "Font settings",
  colorSettings: "Color settings",
  cornerRadiusSettings: "Corner radius settings",
  spacingSettings: "Spacing settings",
  blockSettings: "Block settings",
  fontSize: "Font Size",
  fontWeight: "Font Weight",
  pages: "Pages",
  downloadProject: "Download Project",
  nightSky: "Night Sky",
};
