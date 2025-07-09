import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '../../raaghu-react-themes/src/styles/default.scss';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
