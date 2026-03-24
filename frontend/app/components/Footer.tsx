import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {footerQuery} from '@/sanity/lib/queries'
import {DEFAULT_LOCALE} from '@/sanity/lib/locale'

interface FooterProps {
  locale?: string
}

export default async function Footer({locale}: FooterProps = {}) {
  const {data: footer} = await sanityFetch({
    query: footerQuery,
    params: {locale: locale ?? DEFAULT_LOCALE},
  })

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {footer?.footerLinks?.map((link: any) => (
            <Link
              key={link._key ?? link.href}
              href={link.href}
              className="text-slate-600 transition hover:text-slate-900"
            >
              {link.title}
            </Link>
          ))}
        </nav>
        {footer?.footerText && (
          <p className="mt-4 text-center text-sm text-slate-500">{footer.footerText}</p>
        )}
      </div>
    </footer>
  )
}
