import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('main.tsx: Starting application...')

const container = document.getElementById('root')

if (!container) {
  console.error('main.tsx: Failed to find root element')
  throw new Error('Failed to find root element')
}

console.log('main.tsx: Creating root...')

const root = createRoot(container)

console.log('main.tsx: Rendering app...')

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)