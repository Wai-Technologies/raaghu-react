export const VideoPlayerType = {
  Default: 'Default',
  YouTube: 'YouTube',
  Vimeo: 'Vimeo',
} as const;
export type VideoPlayerType = (typeof VideoPlayerType)[keyof typeof VideoPlayerType];
