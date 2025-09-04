import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GriffelProvider } from '../../utils/griffel/GriffelProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GriffelProvider initialTheme="light">
      <App />
    </GriffelProvider>
  </StrictMode>,
)
