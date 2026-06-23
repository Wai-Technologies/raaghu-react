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

export interface RdsCompToolbarProps {
  layout?: ToolbarLayout;
  type?: ToolbarType;
  state?: ToolbarState;
  onAction?: (action: string) => void;
  className?: string;
  'data-testid'?: string;
}
