import {defineField, defineType} from 'sanity'

export const iconOverview = defineType({
  name: 'iconOverview',
  title: 'Icon Overview',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'icons',
      title: 'Icons',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'icon'}]}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Untitled', subtitle: 'Icon Overview'}
    },
  },
})
