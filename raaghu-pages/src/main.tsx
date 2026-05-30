import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@raaghu/themes/src/styles/index.scss'
import App from './App.tsx'
import { RaaghuThemeProvider } from '@raaghu/themes/src/provider/RaaghuThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RaaghuThemeProvider defaultMode="light">
      <App />
    </RaaghuThemeProvider>
  </StrictMode>,
)
