import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ShapesProvider } from '@electric-sql/react'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShapesProvider>
      <App />
    </ShapesProvider>
  </StrictMode>,
)
