export interface Item {
  id?: string | number;
  name: string;
  username?: string;
  date?: Date;
  feedIcon?: string;
  imageUrl?: string;
  description?: string;
  hashtags?: string;
  reviews?: string;
  rating?: number;
  likes?: number;
  dislikes?: number;
}

export const VariantType = {
  Default: 'Default',
} as const;
export type VariantType = (typeof VariantType)[keyof typeof VariantType];

export const ReviewStyle = {
  Style1: 'style1',
  Style2: 'style2',
  Style3: 'style3',
  Style4: 'style4',
  Style5: 'style5',
  Style6: 'style6',
  Style7: 'style7',
  Style8: 'style8',
  Style9: 'style9',
  Style10: 'style10',
  Style11: 'style11',
  Style12: 'style12',
  Style13: 'style13',
} as const;
export type ReviewStyle = (typeof ReviewStyle)[keyof typeof ReviewStyle];

/** @deprecated Use `ReviewStyle` instead. */
export const RevieweStyle = ReviewStyle;
/** @deprecated Use `ReviewStyle` instead. */
export type RevieweStyle = ReviewStyle;
