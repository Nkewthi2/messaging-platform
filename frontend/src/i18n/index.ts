import { en } from "./locales/en"
import { vi } from "./locales/vi"

export type Locale = "en" | "vi"
export type I18nKey = keyof typeof en

const dictionaries: Record<Locale, Record<I18nKey, string>> = {
  en,
  vi
}

let currentLocale: Locale = "vi"

export const getLocale = () => currentLocale

export const setLocale = (locale: Locale) => {
  currentLocale = locale
  i18nEvent.dispatchEvent(new Event("localechange"))
}

const i18nEvent = new EventTarget()

export const onLocaleChange = (cb: (locale: Locale) => void) => {
  const handler = () => cb(currentLocale)
  i18nEvent.addEventListener("localechange", handler)
  return () => i18nEvent.removeEventListener("localechange", handler)
}

const interpolate = (template: string, params?: Record<string, string | number>) => {
  if (!params) return template

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = params[key]
    return value === undefined ? match : String(value)
  })
}

export const t = (key: I18nKey, params?: Record<string, string | number>) => {
  const template = dictionaries[currentLocale][key] ?? dictionaries.en[key]
  return interpolate(template, params)
}
