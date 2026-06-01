import { Navigate, type RouteObject } from 'react-router-dom';
import HomePage from '@/pages/HomePage';

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
