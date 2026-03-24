import Link from 'next/link'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import {client} from '@/sanity/lib/client'
import {sanityFetch} from '@/sanity/lib/live'
import {headerQuery, settingsQuery} from '@/sanity/lib/queries'
import {DEFAULT_LOCALE} from '@/sanity/lib/locale'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  if (!source?.asset) return null
  return builder.image(source)
}

const LOGO_WIDTH = 120
const LOGO_HEIGHT = 50

interface HeaderProps {
  locale?: string
}

export default async function Header({locale}: HeaderProps = {}) {
  const [{data: header}, {data: settings}] = await Promise.all([
    sanityFetch({query: headerQuery, params: {locale: locale ?? DEFAULT_LOCALE}}),
    sanityFetch({query: settingsQuery}),
  ])

  const primaryBrandColor =
    (settings as any)?.primaryBrandColor?.hex ?? '#FFF'
  const logoImage = header?.logoImage ?? null
  const logoImageUrl = logoImage
    ? urlFor(logoImage)?.width(LOGO_WIDTH).height(LOGO_HEIGHT).url()
    : null

  return (
    <header
      className="border-b border-slate-200 bg-white"
      style={{backgroundColor: primaryBrandColor}}
    >
      <div className="mx-auto flex max-w-7xl items-center py-4">
        <Link
          href={locale ? `/${locale}` : '/'}
          className="pr-16 text-xl font-semibold text-slate-900"
        >
          {logoImageUrl ? (
            <Image
              src={logoImageUrl}
              alt={header?.logoText ?? 'Store'}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
            />
          ) : (
            <span>{header?.logoText ?? (settings as any)?.title ?? 'Store'}</span>
          )}
        </Link>
        <nav className="flex flex-1 items-center justify-between">
          {header?.navLinks?.map((link: any) => {
            const path = link.href?.startsWith('/') ? link.href : `/${link.href}`
            const href = locale ? `/${locale}${path}` : path
            return (
              <Link
                key={link._key ?? link.href}
                href={href}
                className="text-xl font-medium text-[rgb(77,77,77)]"
              >
                {link.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
