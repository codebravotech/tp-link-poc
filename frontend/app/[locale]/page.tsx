import type {Locale} from '@/sanity/lib/locale'

interface HomePageProps {
  params: Promise<{locale: string}>
}

export default async function LocaleHomePage({params}: HomePageProps) {
  const {locale} = await params
  const loc = locale as Locale

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Home — {loc}</h1>
      <p className="mt-2 text-slate-600">
        Locale: {loc}. Use the nav or go to /{locale}/products to browse collections.
      </p>
    </div>
  )
}
