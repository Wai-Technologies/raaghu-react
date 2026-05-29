import { Navigate, type RouteObject } from 'react-router-dom';
import Shell from '@/routes/Shell';
import DashboardPage from '@/pages/dashboard/DashboardPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
