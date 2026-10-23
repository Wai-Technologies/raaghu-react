import type { HTMLAttributes, Ref } from 'react';
import type { SxProps, Theme } from '@mui/material';
import type { ToolbarButtonConfig } from './rds-comp-toolbar-config-types';

export const ToolbarLayout = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;
export type ToolbarLayout = (typeof ToolbarLayout)[keyof typeof ToolbarLayout];

export const ToolbarType = {
  InlineEditor: 'inline-editor',
  FullFeatured: 'full-featured',
  MoreText: 'more-text',
  MoreParagraph: 'more-paragraph',
  MoreRichContent: 'more-rich-content',
  Misc: 'misc',
} as const;
export type ToolbarType = (typeof ToolbarType)[keyof typeof ToolbarType];

export interface RdsCompToolbarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Figma layout: one row (`primary`) or one row per section (`secondary`). */
  layout?: ToolbarLayout;
  /** Alias of `layout`; wins over `layout` when both are passed. */
  variant?: ToolbarLayout;
  /** Built-in preset used when `items` is not passed. */
  type?: ToolbarType;
  /** Alias of `type`; wins over `type` when both are passed. */
  preset?: `${ToolbarType}`;
  /** Disables every button. */
  disabled?: boolean;
  /** Custom sections of buttons. Replaces the `type` preset. Give a button `options` to make it a dropdown. */
  items?: ToolbarButtonConfig[][];
  /** Active formats (controlled). */
  value?: string[];
  /** Initially active formats (uncontrolled). */
  defaultValue?: string[];
  /** Called with the new list of active formats. */
  onChange?: (formats: string[]) => void;
  /** Called with the button action, or with the chosen dropdown value. */
  onAction?: (action: string) => void;
  /** Called when a dropdown option or emoji is chosen, with the parent button action and the chosen value. */
  onOptionSelect?: (action: string, value: string) => void;
  className?: string;
  /** MUI system styles applied to the toolbar root. */
  sx?: SxProps<Theme>;
  'data-testid'?: string;
  ref?: Ref<HTMLDivElement>;
}
