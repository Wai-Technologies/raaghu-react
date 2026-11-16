/** Overridable UI strings of `RdsCompAudioPlayer`. */
export interface RdsCompAudioPlayerLocaleText {
  audioPlayback: string;
  captionsLabel: string;
  skipBackward: string;
  playOrPause: string;
  skipForward: string;
  playbackProgress: string;
  openSettings: string;
  toggleVolume: string;
  trimHandle: (side: 'left' | 'right') => string;
  cancel: string;
  save: string;
  trim: string;
  delete: string;
  selected: string;
  zoomOut: string;
  zoom: string;
  zoomIn: string;
  playbackSpeedSettings: string;
  playbackSpeed: string;
  shareLink: string;
  exportAudio: string;
  exportTranscript: string;
  exportSummary: string;
  exportMindMap: string;
  moveToFolder: string;
  findAndReplace: string;
  reTranscribe: string;
  reSummarize: string;
}

export const DEFAULT_RDS_COMP_AUDIO_PLAYER_LOCALE_TEXT: RdsCompAudioPlayerLocaleText = {
  audioPlayback: 'Audio playback',
  captionsLabel: 'English captions',
  skipBackward: 'Skip backward',
  playOrPause: 'Play or pause',
  skipForward: 'Skip forward',
  playbackProgress: 'Playback progress',
  openSettings: 'Open settings',
  toggleVolume: 'Toggle volume',
  trimHandle: (side) => `${side} trim handle`,
  cancel: 'Cancel',
  save: 'Save',
  trim: 'Trim',
  delete: 'Delete',
  selected: 'Selected',
  zoomOut: 'Zoom out',
  zoom: 'Zoom',
  zoomIn: 'Zoom in',
  playbackSpeedSettings: 'Playback speed settings',
  playbackSpeed: 'Playback Speed',
  shareLink: 'Share Link',
  exportAudio: 'Export Audio',
  exportTranscript: 'Export Transcript',
  exportSummary: 'Export Summary',
  exportMindMap: 'Export Mind Map',
  moveToFolder: 'Move to folder',
  findAndReplace: 'Find & Replace',
  reTranscribe: 'Re-Transcribe',
  reSummarize: 'Re-Summarize',
};
