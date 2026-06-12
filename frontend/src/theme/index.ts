export type ThemeName = "white" | "black"

export const defaultTheme: ThemeName = "white"

export const applyTheme = (themeName: ThemeName) => {
  if (typeof document === "undefined") return

  const root = document.documentElement
  if (themeName === 'black') root.classList.add('dark')
  else root.classList.remove('dark')
}

export const THEME_KEY = 'theme'

export const persistTheme = (themeName: ThemeName) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(THEME_KEY, themeName)
    }
  } catch {}
}

export const getStoredTheme = (): ThemeName | null => {
  try {
    if (typeof window === 'undefined') return null
    const v = localStorage.getItem(THEME_KEY)
    if (v === 'white' || v === 'black') return v
    return null
  } catch {
    return null
  }
}

export const setTheme = (themeName: ThemeName) => {
  applyTheme(themeName)
  persistTheme(themeName)
}
