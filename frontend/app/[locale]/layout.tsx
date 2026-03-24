import {notFound} from 'next/navigation'
import {SUPPORTED_LOCALES, isValidLocale} from '@/sanity/lib/locale'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{locale: string}>
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({locale}))
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params

  if (!locale || !isValidLocale(locale)) {
    notFound()
  }

  return <>{children}</>
}
