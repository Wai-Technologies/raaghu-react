import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';  // Ensure Tailwind is imported here

// Import ShadCN Styles (Raaghu Design System Styles)
import '@waiin/raaghu-react-themes/build/styles/default.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
