import type { ReactNode } from 'react';

export interface ToolbarButtonConfig {
  icon: ReactNode;
  action: string;
  hasDropdown?: boolean;
  className?: string;
  ariaLabel?: string;
}

export interface ToolbarConfig {
  sections: ToolbarButtonConfig[][];
}
