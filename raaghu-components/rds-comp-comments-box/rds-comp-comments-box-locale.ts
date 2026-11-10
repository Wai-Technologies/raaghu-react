/** Overridable UI strings of `RdsCommentBox`. */
export interface RdsCompCommentsBoxLocaleText {
  /** Accessible label of the emoji picker button. */
  emoji: string;
  /** Accessible label of the attach file button. */
  attachFile: string;
  /** Accessible label of the mention button. */
  mention: string;
  /** Accessible label of the GIF button. */
  gif: string;
  /** Accessible label of the unread indicator dot. */
  unread: string;
  /** Accessible label of the pin comment buttons. */
  pinComment: string;
  /** Accessible label of the more options buttons. */
  moreOptions: string;
  /** Accessible label of the pin thread button. */
  pinThread: string;
  /** Accessible label of the thread close button. */
  close: string;
  /** Accessible label of the send button in the selected and typing states. */
  send: string;
  /** Accessible label of the send button in the interactive composer. */
  sendComment: string;
}

export const DEFAULT_RDS_COMP_COMMENTS_BOX_LOCALE_TEXT: RdsCompCommentsBoxLocaleText = {
  emoji: 'emoji',
  attachFile: 'attach file',
  mention: 'mention',
  gif: 'gif',
  unread: 'unread',
  pinComment: 'Pin comment',
  moreOptions: 'More options',
  pinThread: 'Pin thread',
  close: 'Close',
  send: 'send',
  sendComment: 'send comment',
};
