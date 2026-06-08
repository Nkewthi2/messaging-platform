import { useEffect, useState } from "react"
import { applyTheme, themes, defaultTheme, type ThemeName } from "../theme"
import { getLocale, setLocale, onLocaleChange, t, type Locale } from "../i18n"
import { logout } from "../features/auth/api"
import { useAuthStore } from "../features/auth/auth.store"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme)
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
    applyTheme(t)
    setTheme(t)
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
    <div className="w-full" style={{ backgroundColor: 'var(--color-header)' }}>
      <div className="flex items-center justify-end gap-3 w-full px-10 py-3">
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="p-2 rounded bg-transparent"
        style={{ color: 'var(--color-primary-text)', border: '1px solid var(--color-border)', background: 'transparent' }}
      >
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>

      <select
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value as ThemeName)}
        className="p-2 rounded bg-transparent"
        style={{ color: 'var(--color-primary-text)', border: '1px solid var(--color-border)', background: 'transparent' }}
      >
        {Object.keys(themes).map((k) => (
          <option key={k} value={k}>
            {t(`theme.${k}` as any)}
          </option>
        ))}
      </select>

      {token ? (
        <button
          type="button"
          onClick={handleLogout}
          className="p-2 rounded"
          style={{ color: 'var(--color-primary-text)', border: '1px solid var(--color-border)' }}
        >
          {t('auth.logout')}
        </button>
      ) : null}
      </div>
    </div>
  )
}
