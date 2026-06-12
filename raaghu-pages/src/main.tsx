import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@raaghu/themes/src/styles/index.scss';
import './index.css';
import App from './App.tsx';
import { RaaghuThemeProvider } from '@raaghu/themes/src/provider/RaaghuThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RaaghuThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RaaghuThemeProvider>
  </StrictMode>,
);
