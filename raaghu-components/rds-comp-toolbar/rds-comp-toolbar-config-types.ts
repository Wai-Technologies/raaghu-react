import type { ReactNode } from 'react';

export interface ToolbarOption {
  label: string;
  value: string;
}

export interface ToolbarButtonConfig {
  icon: ReactNode;
  action: string;
  /** Defaults to true when the button has options (or is an emoji button). */
  hasDropdown?: boolean;
  /** Dropdown options. Defaults to the built-in options for the action. */
  options?: ToolbarOption[];
  className?: string;
  ariaLabel?: string;
}

export interface ToolbarConfig {
  sections: ToolbarButtonConfig[][];
}
