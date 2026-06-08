import { useEffect, useState } from "react"
import { applyTheme, themes, defaultTheme, type ThemeName } from "../theme"
import { getLocale, setLocale, onLocaleChange, t, type Locale } from "../i18n"

export default function Header() {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme)
  const [locale, setLocaleState] = useState<Locale>(getLocale())

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
      </div>
    </div>
  )
}
