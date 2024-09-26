import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // No need for .tsx extension
import './index.css';
import '@waiin/raaghu-react-themes/build/styles/default.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
