import type { HTMLAttributes, Ref } from 'react';
import type { ToolbarButtonConfig } from './rds-comp-toolbar-config-types';

export enum ToolbarLayout {
  Primary = 'primary',
  Secondary = 'secondary'
}

export enum ToolbarType {
  InlineEditor = 'inline-editor',
  FullFeatured = 'full-featured',
  MoreText = 'more-text',
  MoreParagraph = 'more-paragraph',
  MoreRichContent = 'more-rich-content',
  Misc = 'misc'
}

export enum ToolbarState {
  Off = 'off',
  On = 'on',
  DisabledOn = 'disabled-on',
  DisabledOff = 'disabled-off'
}

export interface RdsCompToolbarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Figma layout: one row (`primary`) or one row per section (`secondary`). */
  layout?: ToolbarLayout;
  /** Built-in preset used when `items` is not passed. */
  type?: ToolbarType;
  /** Figma state. `disabled-on` and `disabled-off` disable the toolbar unless `disabled` is set. */
  state?: ToolbarState;
  /** Disables every button. Wins over `state`. */
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
  'data-testid'?: string;
  ref?: Ref<HTMLDivElement>;
}
