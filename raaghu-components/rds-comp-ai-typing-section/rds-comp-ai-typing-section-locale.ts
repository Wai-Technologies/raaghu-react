/** Overridable UI strings of `RdsCompAiTypingSection`. */
export interface RdsCompAiTypingSectionLocaleText {
  /** Tooltip of the prompt textarea. */
  promptTitle: string;
  /** Accessible label of the prompt textarea. */
  promptInputLabel: string;
  /** Accessible label of the send button. */
  sendLabel: string;
  /** Placeholder of the frontend selector. */
  selectFrontendPlaceholder: string;
  /** Label of the new project button. */
  newProject: string;
  /** Label of the import from Figma button. */
  importFromFigma: string;
  /** Attachment menu item that opens the Figma dialog. */
  uploadFromFigma: string;
  /** Attachment menu item that imports an image from the device. */
  importFromDevice: string;
  /** Title of the Figma dialog. */
  figmaDialogTitle: string;
  /** Body text of the Figma dialog. */
  figmaDialogText: string;
  /** Hint text of the Figma URL field. */
  figmaHintText: string;
  /** Placeholder of the Figma URL field. */
  figmaUrlPlaceholder: string;
}

export const DEFAULT_RDS_COMP_AI_TYPING_SECTION_LOCALE_TEXT: RdsCompAiTypingSectionLocaleText = {
  promptTitle: "Enter your prompt here",
  promptInputLabel: "Prompt input",
  sendLabel: "Send",
  selectFrontendPlaceholder: "Select Frontend",
  newProject: "New Project",
  importFromFigma: "Import From Figma",
  uploadFromFigma: "Upload From Figma",
  importFromDevice: "Import From This Device",
  figmaDialogTitle: "Import From Figma",
  figmaDialogText: "Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file.",
  figmaHintText: "Hint Text",
  figmaUrlPlaceholder: "Enter URL",
};
