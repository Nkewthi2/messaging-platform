import { useEffect, useState } from "react"
import { applyTheme, defaultTheme, type ThemeName } from "../theme"
import { getLocale, setLocale, onLocaleChange, t, type Locale } from "../i18n"
import { logout } from "../features/auth/api"
import { useAuthStore } from "../features/auth/auth.store"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      const v = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
      return (v === 'white' || v === 'black') ? (v as ThemeName) : defaultTheme
    } catch {
      return defaultTheme
    }
  })
  const [locale, setLocaleState] = useState<Locale>(getLocale())
  const token = useAuthStore((s) => s.token)
  const setToken = useAuthStore((s) => s.setToken)
  const navigate = useNavigate()

  useEffect(() => {
    // apply default on mount
    applyTheme(theme)
  }, [])

  useEffect(() => {
    const unsub = onLocaleChange((l) => setLocaleState(l))
    return unsub
  }, [])

  const handleThemeChange = (t: ThemeName) => {
    // use setTheme from theme module to persist
    import('../theme').then((m) => m.setTheme(t))
    setThemeState(t)
  }

  const handleLocaleChange = (l: Locale) => {
    setLocale(l)
    setLocaleState(l)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    } finally {
      setToken(null)
      navigate('/login')
    }
  }

  return (
    <div className="w-full bg-header">
      <div className="flex items-center justify-end gap-3 w-full px-10 py-3">
      <div className="select-wrapper">
        <select
          value={locale}
          onChange={(e) => handleLocaleChange(e.target.value as Locale)}
          className="p-2 pr-8 rounded bg-transparent text-primary border border-border"
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
        <span className="arrow text-muted-text" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="select-wrapper">
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value as ThemeName)}
          className="p-2 pr-8 rounded bg-transparent text-primary border border-border"
        >
          {(['white','black'] as ThemeName[]).map((k) => (
            <option key={k} value={k}>
              {t(`theme.${k}` as any)}
            </option>
          ))}
        </select>
        <span className="arrow text-muted-text" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {token ? (
        <button
          type="button"
          onClick={handleLogout}
          className="p-2 rounded text-primary-text border border-border"
        >
          {t('auth.logout')}
        </button>
      ) : null}
      </div>
    </div>
  )
}
