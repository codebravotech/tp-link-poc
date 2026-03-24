import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// --- TP-Link product queries ---

const imageUrlFragment = /* groq */ `
  _key,
  _type,
  asset,
  "imageUrl": asset->url,
  "assetUrl": asset->url,
  alt
`

const highlightsHeroFragment = /* groq */ `
  _type == "highlightsHero" => {
    _id, _type, title, description, modelNumber,
    bgDesktopImage{ _type, asset, "url": asset->url, alt },
    bgMobileImage{ _type, asset, "url": asset->url, alt }
  }
`

const iconOverviewFragment = /* groq */ `
  _type == "iconOverview" => {
    _id, _type, title,
    "icons": icons[]->{
      _id, _type, title,
      "iconImageUrl": iconImage.asset->url,
      "iconImageAlt": iconImage.alt
    }
  }
`

const contentImageBlockFragment = /* groq */ `
  _type == "contentImageBlock" => {
    _id, _type, title, description,
    image{ _type, asset, "url": asset->url, alt },
    imagePosition
  }
`

const featureOverviewBlockFragment = /* groq */ `
  _type == "featureOverviewBlock" => {
    _id, _type, title,
    columns[]{
      _key, title, description,
      image{ _type, asset, "url": asset->url, alt },
      icon{ _type, asset, "url": asset->url, alt }
    }
  }
`

const legacyMigrationFragment = /* groq */ `
  _type == "legacyMigration" => {
    _id, _type, title,
    "externalAssets": externalAssets,
    bodyHtml, legacyClassName
  }
`

const productComponentsProjection = /* groq */ `
  components[] {
    _key, _type,
    ...@-> {
      ...select(
        ${highlightsHeroFragment},
        ${iconOverviewFragment},
        ${contentImageBlockFragment},
        ${featureOverviewBlockFragment},
        ${legacyMigrationFragment}
      )
    }
  }
`

const productProjection = /* groq */ `
  _id, name, modelNumber, slug,
  "imageUrls": images[].asset->url,
  images[]{ ${imageUrlFragment} },
  features, links,
  versions{ versionName, description }
`

export const headerQuery = defineQuery(`
  *[_type == "header" && (!defined($locale) || language == $locale)][0]{
    _id, _type, language, logoText,
    logoImage{ _type, asset, crop, hotspot },
    navLinks[]{ _key, title, href }
  }
`)

export const footerQuery = defineQuery(`
  *[_type == "footer" && (!defined($locale) || language == $locale)][0]{
    _id, _type, language,
    footerLinks[]{ _key, title, href },
    footerText
  }
`)

export const productsQuery = defineQuery(`
  *[_type == "product"] | order(name asc){
    _id, _type, name, modelNumber, slug,
    images[]{ ${imageUrlFragment} },
    features,
    links[]{ _key, label, url }
  }
`)

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug == $slug][0]{
    ${productProjection}
  }
`)

export const productPageBySlugQuery = defineQuery(`
  *[_type == "productPage" && slug.current == $slug][0]{
    _id, _type, title, slug,
    "products": products[]{
      _key, isDefault,
      "product": product->{ ${productProjection} }
    },
    "defaultProduct": products[isDefault == true][0].product->{ ${productProjection} },
    ${productComponentsProjection},
    metaTitle, metaDescription
  }
`)

export const localizedProductPageQuery = defineQuery(`
  *[_type == "productPage" && language == $locale && slug.current == $model][0]{
    _id, _type, title, slug,
    "products": products[]{
      _key, isDefault,
      "product": product->{ ${productProjection} }
    },
    "defaultProduct": products[isDefault == true][0].product->{ ${productProjection} },
    ${productComponentsProjection},
    metaTitle, metaDescription
  }
`)

export const localizedProductsByCollectionQuery = defineQuery(`
  *[_type == "product" && language == $locale && collection->slug.current == $collection] | order(name asc){
    _id, name, modelNumber, slug,
    "collectionSlug": collection->slug.current,
    images[]{ ${imageUrlFragment} }
  }
`)

export const collectionsByLocaleQuery = defineQuery(`
  *[_type == "collection" && language == $locale] | order(title asc){
    _id, _type, title, "slug": slug.current, language,
    image{ ${imageUrlFragment} },
    description
  }
`)

export const collectionBySlugQuery = defineQuery(`
  *[_type == "collection" && language == $locale && slug.current == $collectionSlug][0]{
    _id, _type, title, "slug": slug.current, language,
    image{ ${imageUrlFragment} },
    description
  }
`)
