export type ThemeName = "white" | "black"

export const themes = {
  white: {
    colors: {
      background: "#f6f1e8",
      surface: "#ffffff",
      primary: "#1f6feb",
      primaryText: "#0b1f44",
      mutedText: "#6b7280",
      border: "#e5e7eb"
    },
    radius: {
      sm: "6px",
      md: "10px",
      lg: "16px"
    },
    shadow: {
      soft: "0 10px 30px rgba(17, 24, 39, 0.12)"
    }
  },
  black: {
    colors: {
      background: "#0b0b0b",
      surface: "#121212",
      primary: "#5ab0ff",
      primaryText: "#e7eef7",
      mutedText: "#9aa4b2",
      border: "#262626"
    },
    radius: {
      sm: "6px",
      md: "10px",
      lg: "16px"
    },
    shadow: {
      soft: "0 12px 28px rgba(0, 0, 0, 0.4)"
    }
  }
} as const

export const defaultTheme: ThemeName = "white"

export const applyTheme = (themeName: ThemeName) => {
  if (typeof document === "undefined") return

  const theme = themes[themeName]
  const root = document.documentElement

  root.dataset.theme = themeName
  root.style.setProperty("--color-bg", theme.colors.background)
  root.style.setProperty("--color-surface", theme.colors.surface)
  root.style.setProperty("--color-header", theme.colors.surface)
  root.style.setProperty("--color-primary", theme.colors.primary)
  root.style.setProperty("--color-primary-text", theme.colors.primaryText)
  root.style.setProperty("--color-muted-text", theme.colors.mutedText)
  root.style.setProperty("--color-border", theme.colors.border)
  root.style.setProperty("--radius-sm", theme.radius.sm)
  root.style.setProperty("--radius-md", theme.radius.md)
  root.style.setProperty("--radius-lg", theme.radius.lg)
  root.style.setProperty("--shadow-soft", theme.shadow.soft)
}
