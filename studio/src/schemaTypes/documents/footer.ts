import {defineField, defineType} from 'sanity'
import {LOCALES} from 'shared'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {list: LOCALES},
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [{type: 'navLink'}],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
    }),
  ],
  preview: {
    select: {footerText: 'footerText', language: 'language'},
    prepare({footerText, language}) {
      return {
        title: footerText
          ? footerText.slice(0, 40) + (footerText.length > 40 ? '…' : '')
          : 'Footer',
        subtitle: language || undefined,
      }
    },
  },
})
