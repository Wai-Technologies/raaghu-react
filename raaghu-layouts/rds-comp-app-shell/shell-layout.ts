export type ShellLayoutType = 'default' | 'triPane' | 'minimal';

export interface ShellLayoutConfig {
  type: ShellLayoutType;
  sideNavWidth: number;
  collapsedSideNavWidth: number;
  topNavHeight: number;
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const defaultShellLayout: ShellLayoutConfig = {
  type: 'default',
  sideNavWidth: 280,
  collapsedSideNavWidth: 80,
  topNavHeight: 64,
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  },
};

export const triPaneShellLayout: ShellLayoutConfig = {
  type: 'triPane',
  sideNavWidth: 320,
  collapsedSideNavWidth: 80,
  topNavHeight: 64,
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  },
};

export const minimalShellLayout: ShellLayoutConfig = {
  type: 'minimal',
  sideNavWidth: 280,
  collapsedSideNavWidth: 0,
  topNavHeight: 56,
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  },
};

export const getShellLayoutConfig = (type: ShellLayoutType): ShellLayoutConfig => {
  switch (type) {
    case 'triPane':
      return triPaneShellLayout;
    case 'minimal':
      return minimalShellLayout;
    default:
      return defaultShellLayout;
  }
};
