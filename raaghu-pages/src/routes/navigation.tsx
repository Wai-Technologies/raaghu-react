import type { ReactNode } from 'react';
import { Dashboard } from '@mui/icons-material';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: ReactNode;
}

export const mainNavigation: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: <Dashboard />,
  },
];
