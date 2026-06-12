import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './app/App.tsx'
import { applyTheme, defaultTheme, getStoredTheme, setTheme } from './theme'
import { useAuthStore } from './features/auth/auth.store'
import { setAuthToken } from './services/api/client'

// apply saved theme if present
const stored = getStoredTheme()
applyTheme(stored ?? defaultTheme)

const token = useAuthStore.getState().token
if (token) {
  setAuthToken(token)
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (pathname === '/login' || pathname === '/register') {
    window.location.replace('/')
  }
} else {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (pathname !== '/login' && pathname !== '/register') {
    window.location.replace('/login')
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
