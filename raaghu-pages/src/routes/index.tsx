import { Navigate, type RouteObject } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
];
