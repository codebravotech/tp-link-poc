import {NextRequest, NextResponse} from 'next/server'
import {SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale} from '@/sanity/lib/locale'

const RESERVED_PREFIXES = ['studio', 'api', '_next', 'favicon.ico', 'products', 'images']

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url), 307)
  }

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (!firstSegment || RESERVED_PREFIXES.some((p) => firstSegment.toLowerCase() === p)) {
    return NextResponse.next()
  }

  const isLocale = SUPPORTED_LOCALES.includes(firstSegment as Locale)

  const requestHeaders = new Headers(request.headers)
  if (isLocale) {
    requestHeaders.set('x-next-locale', firstSegment)
  }

  return NextResponse.next({request: {headers: requestHeaders}})
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|favicon.ico).*)'],
}
