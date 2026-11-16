/** Overridable UI strings of `RdsCompChat`. */
export interface RdsCompChatLocaleText {
  /** Heading of the user list. */
  title: string;
  /** Label of the chat tab. */
  tabChat: string;
  /** Label of the media tab. */
  tabMedia: string;
  /** Accessible label of the back button shown on mobile. */
  backToUserList: string;
  /** Accessible label of the tab list. */
  chatSections: string;
  /** Accessible label of the media gallery. */
  mediaGallery: string;
  /** Message shown when the media gallery is empty. */
  noMediaAvailable: string;
  /** Accessible label of the attach button. */
  attachFile: string;
  /** Accessible label of the file input. */
  uploadFile: string;
  /** Accessible label of the emoji button. */
  openEmojiPicker: string;
  /** Placeholder of the comment input. */
  typeCommentPlaceholder: string;
  /** Accessible label of the comment input. */
  typeComment: string;
  /** Accessible label of the send button. */
  send: string;
  /** Accessible label of the camera preview video. */
  cameraPreview: string;
  /** Label of the capture photo button. */
  capturePhoto: string;
  /** Label of the camera close button. */
  close: string;
  /** Label of the captions track. */
  englishCaptions: string;
  /** Accessible label of a video shared in a comment. */
  sharedVideo: string;
  /** Accessible label of a video in the media gallery. */
  mediaVideo: string;
  /** Alt text of an image uploaded in a comment. */
  uploadedImageAlt: string;
  /** Alt text of an image in the media gallery. */
  mediaImageAlt: string;
  /** Alt text of an avatar when the user has no name. */
  userAvatarAlt: string;
}

export const DEFAULT_RDS_COMP_CHAT_LOCALE_TEXT: RdsCompChatLocaleText = {
  title: "Chat",
  tabChat: "Chat",
  tabMedia: "Media",
  backToUserList: "Back to user list",
  chatSections: "Chat sections",
  mediaGallery: "Media gallery",
  noMediaAvailable: "No media available",
  attachFile: "Attach file",
  uploadFile: "Upload file",
  openEmojiPicker: "Open emoji picker",
  typeCommentPlaceholder: "Type comment...",
  typeComment: "Type comment",
  send: "Send",
  cameraPreview: "Camera preview",
  capturePhoto: "Capture Photo",
  close: "Close",
  englishCaptions: "English captions",
  sharedVideo: "Shared video",
  mediaVideo: "Media video",
  uploadedImageAlt: "uploaded",
  mediaImageAlt: "media",
  userAvatarAlt: "User avatar",
};
