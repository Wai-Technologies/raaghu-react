import { useRoutes } from 'react-router-dom';
import { routes } from '@/routes';

export default function App() {
  return useRoutes(routes);
}
