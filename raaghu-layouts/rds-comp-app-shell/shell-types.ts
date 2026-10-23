export const AppShellDisplayType = {
  Basic: 'Basic',
  Header: 'Header',
  Default: 'Default',
  Relaxing: 'Relaxing',
  TopNav: 'Top Nav',
  SideNav: 'Side Nav',
  DoubleNav: 'Double Nav',
  TriPane: 'TriPane',
} as const;
export type AppShellDisplayType = (typeof AppShellDisplayType)[keyof typeof AppShellDisplayType];
