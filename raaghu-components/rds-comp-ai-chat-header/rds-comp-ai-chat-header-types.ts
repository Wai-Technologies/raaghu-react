export const ChatHeaderSize = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
} as const;

export type ChatHeaderSize = (typeof ChatHeaderSize)[keyof typeof ChatHeaderSize];
