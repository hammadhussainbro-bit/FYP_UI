import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize theme on load - default to dark
try {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.add(savedTheme);
} catch (e) {
  // If localStorage is not available, default to dark
  document.documentElement.classList.add('dark');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
