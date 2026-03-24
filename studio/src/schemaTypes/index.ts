import {person} from './documents/person'
import {page} from './documents/page'
import {product} from './documents/product'
import {collection} from './documents/collection'
import {productPage} from './documents/productPage'
import {header} from './documents/header'
import {footer} from './documents/footer'
import {highlightsHero} from './documents/highlightsHero'
import {icon} from './documents/icon'
import {iconOverview} from './documents/iconOverview'
import {contentImageBlock} from './documents/contentImageBlock'
import {featureOverviewBlock} from './documents/featureOverviewBlock'
import {legacyMigration} from './documents/legacyMigration'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {navLink} from './objects/navLink'
import {featureColumn} from './objects/featureColumn'

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  person,
  product,
  collection,
  productPage,
  header,
  footer,
  highlightsHero,
  icon,
  iconOverview,
  contentImageBlock,
  featureOverviewBlock,
  legacyMigration,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  navLink,
  featureColumn,
]
