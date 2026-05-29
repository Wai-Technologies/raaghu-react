import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import DemoShell from './layouts/DemoShell';
import DashboardPage from './pages/DashboardPage';
import ElementsPage from './pages/ElementsPage';
import ComponentsPage from './pages/ComponentsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DemoShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="elements" element={<ElementsPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
