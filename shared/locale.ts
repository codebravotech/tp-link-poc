export const LOCALES = [
  {value: 'en-US' as const, title: 'English (US)'},
  {value: 'en-GB' as const, title: 'English (UK)'},
  {value: 'fr-FR' as const, title: 'Français (FR)'},
]

export type Locale = (typeof LOCALES)[number]['value']

export const SUPPORTED_LOCALES: Locale[] = LOCALES.map(({value}) => value)

export const DEFAULT_LOCALE: Locale = 'en-US'

/** {id, title} pairs for @sanity/document-internationalization `supportedLanguages` config */
export const SUPPORTED_LANGUAGES = LOCALES.map(({value, title}) => ({id: value, title}))

export function isValidLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export const i18nTypes = ['collection', 'footer', 'header', 'page', 'product', 'productPage']
